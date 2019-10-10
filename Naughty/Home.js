import React from 'react'
import {View,
TouchableHighlight,
Text,Image,Button,TextInput,
StyleSheet,ImageBackground,
Modal,
FlatList,
Alert} from 'react-native'

export default class HomeS extends React.Component{
constructor(props){
	super(props);
	this.state={
		arr:[],
		text:"",
		modalRank:false,
		modalAbout:false,
	}
}
setModal(type){
	switch(type){
		case 'connect':
			this.setState({modalRank:true});
		break;
		case 'about':
			this.setState({modalAbout:true});
		break;
	}
}
setRank(){
	var Array=this.state.arr;
	Array.push({name:this.state.text});
	this.setState({arr:Array});
	this.setState({modalAbout:false})
}
render(){
	var Array=[];
  return (
     <ImageBackground resizeMode="stretch" source={require("./Photo/bg_final.png")} style={{flex:1}}>
	<View style={{flex:4,justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
	<Image source={require("./Photo/logofinal.png")} style={{borderWidth:5}}/>
	<Text style={{fontSize:20,height:40,textAlignVertical:"bottom",marginLeft:2}}>'Puzzle</Text>
	</View>
	<View style={{flex:6,justifyContent:"space-around", alignItems:"center"}}>
	<Text onPress={()=>{this.props.navigation.navigate("PageApp")}}
	style={{fontSize:20, textAlign:"center",
	borderRadius:50,backgroundColor:"#dd7943",
	paddingVertical:10, paddingHorizontal:20}}>Let'Start</Text>
	<View style={{width:"100%",flexDirection:"row", justifyContent:"space-around"}}>
	<TouchableHighlight onPress={()=>this.setModal('connect')}>
		<Image source={require('./Photo/connect.png')} style={{borderRadius:50}}/>
	</TouchableHighlight>
	<TouchableHighlight>
		<Image source={require('./Photo/rating.png')}  style={{borderRadius:50}}/>
	</TouchableHighlight>
	<TouchableHighlight onPress={()=>this.setModal('about')}>
		<Image source={require('./Photo/about.png')} style={{borderRadius:50}}/>
	</TouchableHighlight>
	</View>
	<Modal
	animationType="fade"
	transparent={true}
	visible={this.state.modalRank}>
	<View style={{flex:1,margin:20,backgroundColor:"blue"}}>
	<View style={{flexDirection:"row"}}>
	<Text style={{flex:2,backgroundColor:"yellow"}}>Name</Text>
	<Text style={{flex:3,backgroundColor:"#fff"}}>Move</Text>
	<Text style={{flex:4,backgroundColor:"green"}}>Time</Text>
	</View>
	<FlatList
		data={this.state.arr}
		renderItem={({item})=>
		<View style={{flexDirection:"row"}}>
			<Text style={{flex:1}}>{item.name}</Text>
		</View>
		}
	/>
	<Text onPress={()=>{this.setState({modalRank:false})}}>Xin chao</Text>
	</View>
	</Modal>
	<Modal
	animationType="none"
	transparent={true}
	visible={this.state.modalAbout}>
	<View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
	<View style={{width:"70%", heigh:"30%", backgroundColor:"#fff"}}>
	<Text >Nhap ten:</Text>
	<TextInput onChangeText={(text)=>this.setState({text})}/>
	<Button title="oke" onPress={()=>this.setRank()}/>
	</View>
	</View>
	</Modal>
	</View>
     </ImageBackground>
  );}
}

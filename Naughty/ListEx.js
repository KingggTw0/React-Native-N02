import React from 'react'
import {View,Text,FlatList,Image} from 'react-native'
export default class ListUser extends React.Component{
	state={
		manglist:this.props.navigation.state.params.thamso
	}
	delete(index){
	var arr=this.state.manglist;
	arr.splice(index,1);
	this.setState({manglist:arr});
	}
	render(){
	return(
		<View style={{flex:1, justifyContent:"space-between",padding:2}}>
			<FlatList
				data={this.state.manglist}
				renderItem={({item,index})=>
				<View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:2, margin:2}}>
				<Image source={item.anh}/>
					<View style={{flex:7, marginLeft:5}}>
					<Text>user: {item.user}</Text>
					<Text>pass: {item.pass}</Text>
					</View>
				<Text style={{fontSize:20, color:"red"}}
				onPress={()=>{this.delete(index)}}>X</Text>
				</View>
				}
			/>
			<Text> Total: {this.state.manglist.length}</Text>
		</View>
	)
	}
}
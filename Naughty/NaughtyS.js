
import React, {Component} from 'react';
import {
  View,
  Text,Modal,TextInput,
  FlatList,
  Image,
  TouchableHighlight,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
export default class NaughtyS extends Component{
	constructor(props){
		super(props);
		this.state={
			touch:[
			{key:"9",img:null},{key:"2",img:require('./Photo/WomemItem2.png')}, {key:"3",img:require('./Photo/WomemItem3.png')},
			{key:"1",img:require('./Photo/WomemItem1.png')},{key:"4",img:require('./Photo/WomemItem4.png')},{key:"6",img:require('./Photo/WomemItem6.png')},
			{key:"7",img:require('./Photo/WomemItem7.png')},{key:"5",img:require('./Photo/WomemItem5.png')},{key:"8",img:require('./Photo/WomemItem8.png')}
			],
			arrRank:[],
			timeSecond:"00",nameInput:"",
			timeMinute:"00",
			move:0,
			modalRank:false, modalPause:false, modalTextInput:false,
			stoptime:''
		}
	}
	StopApp(control){
		switch(control){
			case 'pause':
				clearTimeout(this.state.stoptime);
				this.setState({modalPause:true});
			break;
			case 'rank':
				clearTimeout(this.state.stoptime);
				this.setState({modalRank:true});
			break;
			case 'tieptuc':
				if(this.state.nameInput==""){
					this.startTime();
				}
				this.setState({modalPause:false});
			break;
			case 'thoat':
				this.setState({modalPause:false});
				this.props.navigation.goBack();
			break;
			case 'reload':
				if(this.state.nameInput !==""){
					this.setState({nameInput:""});
					this.startTime();	
				}
				var reArr=[
			{key:"9",img:null},{key:"2",img:require('./Photo/WomemItem2.png')}, {key:"3",img:require('./Photo/WomemItem3.png')},
			{key:"1",img:require('./Photo/WomemItem1.png')},{key:"4",img:require('./Photo/WomemItem4.png')},{key:"6",img:require('./Photo/WomemItem6.png')},
			{key:"7",img:require('./Photo/WomemItem7.png')},{key:"5",img:require('./Photo/WomemItem5.png')},{key:"8",img:require('./Photo/WomemItem8.png')}
			];
				this.setState({touch:reArr,
					timeSecond:"00",timeMinute:"00",move:0});
			break;
			case 'nameInput':
				this.setState({modalTextInput:true});
			break;		
			case 'oke':
				var arr=this.state.arrRank;
				var key,name;
				if(arr.length!=0){
					key=(arr.length+1).toString();
				}else{
					key="1";
				}
				if(this.state.nameInput.trim("")==""){
					name="unknows";
					this.setState({nameInput:name});
				}else{
					name=this.state.nameInput;
				}
				arr.push({key:key,
				name:name,
				move:this.state.move,
				time:this.state.timeMinute+":"+this.state.timeSecond});
				this.setState({arrRank:arr});
				this.setState({modalTextInput:false})
			break;		
		}
	}
	startTime(){
		if(parseInt(this.state.timeSecond)<9){
			this.setState({timeSecond:"0"+(parseInt(this.state.timeSecond)+1)});
		}else if(parseInt(this.state.timeSecond)<59){
			this.setState({timeSecond:parseInt(this.state.timeSecond)+1});
		}else{
			if(parseInt(this.state.timeMinute)<9){			
			this.setState({timeMinute:"0"+(parseInt(this.state.timeMinute)+1)});
			}else{
			this.setState({timeMinute:parseInt(this.state.timeMinute)+1});
			}
			this.setState({timeSecond:"00"});	
		}
		this.setState({stoptime: setTimeout(()=>{this.startTime()},1000)});
		
	}
	checkAns(){
		var mang=[];
		var kt="";
		for(let i=0;i<this.state.touch.length;i++){
			mang[i]=this.state.touch[i];
			kt+=mang[i].key;
		}
		this.setState({touch:mang});
		this.setState({move:this.state.move+1});
		if(kt.toString()=="123456789"){
			clearTimeout(this.state.stoptime);
			this.StopApp("nameInput");
		}
	}
	Moving(index){

		var n=this.state.touch[index];
		var move="";
		if(this.state.nameInput==""){
		if(this.state.touch[(index+3)%9].img==null&&(index+3)%9>2){
			this.state.touch[index]=this.state.touch[(index+3)%9];
			this.state.touch[(index+3)%9]=n;
			return this.checkAns();		
		}
		else if(this.state.touch[(index+6)%9].img==null && (index+6)%9<6){
			this.state.touch[index]=this.state.touch[(index+6)%9];
			this.state.touch[(index+6)%9]=n;
			return this.checkAns();	
		}
		else if(this.state.touch[(index+1)%9].img==null && (index+1)%3!=0){
			this.state.touch[index]=this.state.touch[(index+1)%9];
			this.state.touch[(index+1)%9]=n;
			return this.checkAns();	
		}
		else if(this.state.touch[(index+8)%9].img==null && index%3!=0){
			this.state.touch[index]=this.state.touch[(index+8)%9];
			this.state.touch[(index+8)%9]=n;
			return this.checkAns();	
		}
		else{
			return false;
		}}
		else{
			return false;
		}
		
	}
	
	render(){
	var heightScreen=Dimensions.get('window').height;
	var widthScreen=Dimensions.get('window').width;
	return (
	<ImageBackground source={require('./Photo/background.png')} resizeMode={'stretch'} style={{flex:1}}>	
	<View style={{height:3*(heightScreen/10),justifyContent:"flex-end", flexDirection:"row"}}>
	<View style={{flex:6}}>
		<View style={{flex:3, flexDirection:"row", justifyContent:"space-around",backgroundColor:"rgb(239,228,176)", margin:2}}>
			<TouchableHighlight onPress={()=>{this.StopApp('pause')}}>
				<Image source={require('./Photo/pause.png')} resizeMode={'stretch'}/>
			</TouchableHighlight>
			<TouchableHighlight onPress={()=>{this.StopApp('rank')}}>
				<Image source={require('./Photo/rank.png')} resizeMode={'stretch'}/>
			</TouchableHighlight>
			<TouchableHighlight onPress={()=>{this.StopApp('reload')}}>
				<Image source={require('./Photo/reload.png')} resizeMode={'stretch'}/>
			</TouchableHighlight>	
		</View>
		<View style={{flex:7,justifyContent:"space-between",margin:2, borderWidth:2, borderColor:"yellow"}}>
		<Text style={{fontSize:20, margin:5,color:"#fff"}}>Time:</Text>
		<Text style={{textAlign:"center",fontSize:50,fontWeight:"bold", marginBottom:5,color:"yellow"}}>{this.state.timeMinute}:{this.state.timeSecond}</Text>
		</View>
	</View>
		<View style={{flex:4, margin:2}}>
		<Image source={require('./Photo/WomemWeeping.png')} style={{flex:1}}
		onLoad={()=>{this.startTime()}}/>
		</View>
	</View>
	<View style={{backgroundColor:"#fff"}}>
	<FlatList
		data={this.state.touch}
		renderItem={({item, index})=>
		<TouchableHighlight onPress={()=>{this.Moving(index);}}
		style={{width:widthScreen/3, margin:1,height:2*(heightScreen/10), justifyContent:"center"}}>
		<Image source={item.img} style={{flex:1,width:null}} resizeMode={'stretch'}/>
		</TouchableHighlight>
		}
		numColumns={3}
	/>
	</View>
	<View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
		<Text style={{color:"#fff",fontSize:20, marginLeft:5}}>Move: {this.state.move}</Text>
	</View>
	<Modal
	animationType="fade"
	transparent={true}
	visible={this.state.modalRank}>
	<View style={{flex:1,padding:20,justifyContent:"center", alignItems:"center"}}>
	<View style={{backgroundColor:"#224f2b"}}>
	<Text style={{width:widthScreen-40, textAlign:"center",backgroundColor:"#3c8a4b",color:"#fff", fontSize:30}}>*** Rank ***</Text>
	<View style={{flexDirection:"row", margin:5}}>
	<Text style={{flex:1,backgroundColor:"#5cb871"}}>#</Text>
	<Text style={{flex:4,backgroundColor:"#a2d7ad"}}>Name</Text>
	<Text style={{flex:2,backgroundColor:"#5cb871"}}>Move</Text>
	<Text style={{flex:3,backgroundColor:"#a2d7ad"}}>Time</Text>
	</View>
	<FlatList
		data={this.state.arrRank}
		renderItem={({item})=>
		<View style={{flexDirection:"row",backgroundColor:"#d2ecd8",padding:2,marginHorizontal:5}}>
			<Text style={{flex:1}}>{item.key}</Text>
			<Text style={{flex:4}}>{item.name}</Text>
			<Text style={{flex:2}}>{item.move}</Text>
			<Text style={{flex:3}}>{item.time}</Text>
		</View>
		}
	/>
	<Text style={{margin:5,fontSize:20,backgroundColor:"orange", 
	textAlign:"center", borderRadius:10,paddingVertical:10, paddingHorizontal:20}}
	 onPress={()=>{this.setState({modalRank:false})}}>Close</Text>
	</View>
	</View>
	</Modal>
	<Modal 
	animationType="fade"
	transparent={true}
	visible={this.state.modalPause}>
		<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
		<View style={{width:"80%",backgroundColor:"#6f0943",padding:10,borderRadius:20}}>
		<Text style={{textAlign:"center", fontWeight:"bold", fontSize:30}}>Game Pause!</Text>
		<Text style={{marginVertical:10,color:"#ff9dff", fontSize:20}}>Do you want to continue?</Text>
		<View style={{flexDirection:"row",justifyContent:"space-around"}}>
		<Text style={{backgroundColor:"orange", padding:5, borderRadius:10, fontSize:15}}
		onPress={()=>{this.StopApp('tieptuc')}}>Resume</Text>
		<Text style={{backgroundColor:"orange", padding:5, borderRadius:10, fontSize:15}}
		onPress={()=>{this.StopApp('thoat')}}>Exit</Text>
		</View>
		</View>
		</View>
	</Modal>
	<Modal
	animationType="fade"
	transparent={true}
	visible={this.state.modalTextInput}>
		<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
		<View style={{backgroundColor:"#3c6307", width:"80%",borderRadius:10}}>
			<Text style={{padding:10,fontSize:25,textAlign:"center",color:"#b7f464"}}>Done!</Text>
			<TextInput style={{backgroundColor:"#fff",margin:5,borderRadius:5}}
			placeholder="Enter your name!" 
			onChangeText={(text)=>{this.setState({nameInput:text})}}/>
			<View style={{flexDirection:"row",justifyContent:"center", margin:5}}>
			<Text style={{textAlign:"center",width:"30%",fontSize:15,padding:10, backgroundColor:"orange",borderRadius:10}} 
			onPress={()=>{this.StopApp('oke')}}>Oke</Text>
			</View>
		</View>
		</View>
	</Modal>
	</ImageBackground>
	);	
	}
}
//(<Text style={{ textAlign:"center"}}>{index}+{item.key}</Text>)}
//C:\Users\nguye\AppData\Local\Android\Sdk\emulator
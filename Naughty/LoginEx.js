import React, {Component} from 'react';
import {
  View,TextInput,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  Button,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
export default class Login extends Component{
	state={
		mang:[],
		user:"",
		pass:"",
	}
	setMang(user,pass){
	var arr=this.state.mang;
	if(arr.length<0){
		arr.push({key:"1",anh:require('./Photo/pause.png'),user:user,pass:pass});
	}
	else{
		for(let i=0;i<arr.length;i++){
		 if(arr[i].user==user){
			this.props.navigation.navigate("PageApp",{thamso:arr});
			//alert("ten da ton tai");
			return false;
		 }
		}
		var key=arr.length +1;
		arr.push({key:key.toString(),anh:require('./Photo/pause.png'),user:user,pass:pass});
	}
	this.setState({mang:arr});
	this.props.navigation.navigate("PageApp",{thamso:this.state.mang})
	}
	CheckItem(user,pass){
		if(user==""||pass==""){
		alert("user hoac passwork can phai nhap day du");
		return false;
		}
		return this.setMang(user,pass);
	}
	render(){
	return(
		<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
		<View style={{margin:2, width:"70%", flexDirection:"row",alignItems:"center" }}>
			<Text style={{flex:2}}>User:</Text>
			<TextInput style={{flex:8, backgroundColor:"green"}} 
			onChangeText={(text)=>this.setState({user:text})}
			placeholder="user name"/>
		</View>
		<View style={{margin:2, width:"70%",flexDirection:"row",alignItems:"center" }}>
			<Text style={{flex:2}}>Pass:</Text>
			<TextInput style={{flex:8, backgroundColor:"yellow"}} 
			onChangeText={(text)=>this.setState({pass:text})}
			placeholder="password"/>
		</View>
		<Button style={{margin:2}} title="Login" color="red" 
		onPress={()=>{
		this.CheckItem(this.state.user,this.state.pass);}}/>
		</View>
	)
	}
}
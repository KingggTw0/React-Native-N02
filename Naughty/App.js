import React from 'react'
import {View,Text} from 'react-native'
import { StackNavigator,createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import  HomeS from './Home';
import NaughtyS from './NaughtyS';
import Login from './LoginEx';
import ListUser from './ListEx';
class HomeScreen extends React.Component {
  render() {
    return (
	<View>
      		<Text onPress={()=>{this.props.navigation.navigate('PageApp')}}>sda</Text>
	</View>
    );
  }
}

const App= createStackNavigator (
{
	PageHome:{
	 screen: HomeS,
	},
	PageApp:{
	 screen: NaughtyS,
	}
},
{
	headerMode:'none',
}
);

export default createAppContainer(App);

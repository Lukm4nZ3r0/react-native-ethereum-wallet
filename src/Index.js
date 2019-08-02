import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground} from 'react-native'
// Assets, History, Market Price, Account
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Assets from './components/Assets'
import History from './components/History'
import Market from './components/Market'
import Account from './components/Account'
//ComponentChild
import Login from './component_units/Login'

// Assets, History, Market Price, Account

const bottomTabNavigator = createMaterialBottomTabNavigator({
  Assets:{screen:Assets},
  History:{screen:History},
  Market:{screen:Market},
  Account:{screen:Account},
},{
  defaultNavigationOptions: ({ navigation }) =>{ 
    const { routeName } = navigation.state;
    let IconComponent = FontAwesome;
    let iconName;
    let barColor;
    if (routeName === 'Assets'){
      iconName = 'money';
      barColor = 'black';
    }
    else if(routeName === 'History'){
      iconName = 'history';
      barColor = '#2e2e2e';
    }
    else if(routeName === 'Market'){
      iconName = 'signal';
      barColor = 'white';
    }
    else if(routeName === 'Account'){
      iconName = 'id-card';
      barColor = '#454545';
    }
    return({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
      barStyle: { backgroundColor: barColor },
  })
  }
})

const Index = createStackNavigator({
  Assets:{
    screen:bottomTabNavigator,
    navigationOptions: () => ({
      header:null,
    })
  },
  Login:{
    screen:Login,
    navigationOptions: () => ({
      header:null,
    })
  },
},{
  initialRouteName: 'Assets'
})

export default createAppContainer(Index)
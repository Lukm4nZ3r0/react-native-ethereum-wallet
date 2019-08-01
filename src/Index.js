import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground} from 'react-native'
// Assets, History, Market Price, Account
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Assets from './components/Assets'
import History from './components/History'
import Market from './components/Market'
import Account from './components/Account'
//ComponentChild
import Login from './component_units/Login'

// Assets, History, Market Price, Account

const bottomTabNavigator = createBottomTabNavigator({
  Assets:{screen:Assets},
  History:{screen:History},
  Market:{screen:Market},
  Account:{screen:Account},
},{
  defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = FontAwesome;
          let iconName;
          if (routeName === 'Assets'){
            iconName = 'money';
          }
          else if(routeName === 'History'){
            iconName = 'history';
          }
          else if(routeName === 'Market'){
            iconName = 'signal';
          }
          else if(routeName === 'Account'){
            iconName = 'id-card';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={25} color={tintColor} />;
      }
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    style:{
        backgroundColor:'white'
    },
    showLabel:false
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
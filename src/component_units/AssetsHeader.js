import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AssetsHeader = ({logoutHandler}) =>{
    return(
        <ImageBackground style={{flex:1, resizeMode:'contain', alignItems:'center', justifyContent:'center'}} source={require('../../assets/image/header.png')}>
          <View style={{position:'absolute', flexDirection:'row', left:'5%', top:'8%'}}>
              <TouchableOpacity style={{marginLeft:5}} onPress={()=>logoutHandler()}>
                <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white'}} name="sign-out"/>
              </TouchableOpacity>
          </View>
          <View style={{position:'absolute', flexDirection:'row', right:'5%', top:'8%'}}>
              <TouchableOpacity style={{marginRight:20}}>
                <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white'}} name="undo"/>
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight:5}}>
                <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white'}} name="qrcode"/>
              </TouchableOpacity>
          </View>
          <View style={{flex:1}}/>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Your Primary Address:</Text>
              <Text style={{color:'white', fontSize:13}}>0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A</Text>
          </View>
          <View style={{width:'95%', flexDirection:'row', flex:1}}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'white', flexDirection:'row'}}>
                <Image style={{width:50, height:50, resizeMode:'contain'}} source={{uri:'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/09/ethereum-icon.png?resize=210%2C300'}}/>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Your Eth:</Text>
                  <Text numberOfLines={1} style={{color:'white', fontWeight:'bold', fontSize:15, marginTop:5}}>40,123.32</Text>
                </View>
              </View>
              <View style={{flex:1, justifyContent:'center', alignItems:'center', borderLeftWidth:0.5, borderColor:'white', flexDirection:'row'}}>
                <View style={{alignItems:'center', justifyContent:'center', margin:20}}>
                  <FontAwesome style={{color:'white', fontSize:30}} name="arrow-up"/>
                  <Text style={{color:'white'}}>+ 3.30%</Text>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>USD:</Text>
                  <Text numberOfLines={1} style={{color:'white', fontWeight:'bold', fontSize:15, marginTop:5}}>$332,123.32</Text>
                </View>
              </View>
          </View>
        </ImageBackground>
    )
}

export default AssetsHeader
import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AssetsHeaderLoginFalse = ({navigation}) =>{
    return(
        <ImageBackground style={{flex:1, resizeMode:'contain', alignItems:'center', justifyContent:'center'}} source={require('../../assets/image/header.png')}>
            <View style={{width:'90%'}}>
                <Text style={{color:'white', fontSize:30}}>Nikmati Kemudahan</Text>
                <Text style={{color:'white', fontSize:30}}>Untuk</Text>
                <Text style={{color:'white', fontSize:30}}>Mengakses Dompet Anda.</Text>
                <View style={{borderBottomWidth: 2, borderColor:'white', marginTop:10, marginBottom:10}}/>
                <Text style={{color:'white', fontSize:18}}>Login Sekarang</Text>
            </View>
            <View style={{justifyContent:'center', width:'90%', margin:20}}>
                <TouchableOpacity style={{width:'40%', borderRadius:5}} onPress={()=>navigation.navigate('Login')}>
                <LinearGradient colors={['black', 'grey']} start={{ x: 0, y: 0 }} end={{ x: 3, y: 3 }} style={{alignItems:'center', justifyContent:'center',borderRadius:5, flexDirection:'row'}} >
                    <FontAwesome name="sign-in" style={{color:'white', fontSize:20, fontWeight:'bold', margin:10}} />
                    <Text style={{color:'white'}}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default AssetsHeaderLoginFalse
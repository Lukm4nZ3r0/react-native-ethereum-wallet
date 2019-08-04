import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AssetsBody = ({flatListData,navigation,deleteAddress}) =>{
    return(
        <View style={{flex:1}}>
            <FlatList 
                data={flatListData}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item})=>(
                <TouchableOpacity onLongPress={()=>deleteAddress(item.ethAddress)} onPress={()=>navigation.navigate('QRCodeScreen', {ethAddress:item.ethAddress})} style={{padding:10, margin:5, borderRadius:10, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                    <Image style={{width:50, height:50, resizeMode:'contain'}} source={{uri:'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/09/ethereum-icon.png?resize=210%2C300'}}/>
                    <View style={{flex:3}}>
                    <Text style={{color:'green'}}>Your Address:</Text>
                    <Text numberOfLines={1}>{item.ethAddress}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'green'}}>Detail</Text>
                    </View>
                </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default AssetsBody
import React, {Component} from 'react'
import {View,Text,ImageBackground, FlatList, TouchableOpacity, Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class History extends Component{
    constructor(props){
        super(props)
        this.state = {
          flatListData:[
            {blockNumber:0, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:1, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:2, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:3, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:4, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:3, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:4, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:3, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:4, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:3, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:4, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:3, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
            {blockNumber:4, timeStamp:1561556478, hash:'0x9c81f44c29ff0226f835cd0a8a2f2a7eca6db52a711f8211b566fd15d3e0e8d4', from:'0x5abfec25f74cd88437631a7731906932776356f9', to:'', value:11901464239480000000000000, gas:2000000, gasPrice:10000000000000, confirmations:8209581},
          ]
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1, resizeMode:'contain', alignItems:'center', justifyContent:'center'}} source={require('../../assets/image/header.png')}>
                <View style={{position:'absolute', flexDirection:'row', right:'5%', top:'8%'}}>
                    <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white', marginRight:20}} name="undo"/>
                    <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white', marginRight:5}} name="qrcode"/>
                </View>
                <View style={{width:'90%'}}>
                    <Text style={{color:'white', fontSize:30, fontWeight: 'bold',}}>History:</Text>
                </View>

                </ImageBackground>
                <View style={{flex:3}}>
                <FlatList 
                    data={this.state.flatListData}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item})=>{
                    let newDate = new Date(item.timeStamp).toString().split(' ')
                    let timeStamp = `${newDate[0]}, ${newDate[2]}-${newDate[1]} ${newDate[3]}`
                    return (
                    <TouchableOpacity style={{padding:10, margin:5, borderRadius:10, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                        <Image style={{width:50, height:50, resizeMode:'contain'}} source={{uri:'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/09/ethereum-icon.png?resize=210%2C300'}}/>
                        <View style={{flex:3}}>
                        <Text style={{color:'green'}}>Date:</Text>
                        <Text numberOfLines={1}>{timeStamp}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red'}}>TxHash: </Text>
                            <Text numberOfLines={1}>{item.hash}</Text>
                        </View>
                        </View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'green'}}>Detail</Text>
                        </View>
                    </TouchableOpacity>
                    )}}
                />
                </View>
            </View>
        )
    }
}

export default History
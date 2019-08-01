import React, {Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,Image} from 'react-native'
import StackedAreaExample from '../component_units/chart'
import {data} from '../dummy/DummyData'

class Market extends Component{
    constructor(props){
        super(props)
        this.state = {
            marketList : [
                {id:0, market:'Indodax', image:'https://upload.wikimedia.org/wikipedia/id/b/b0/Logo_Indodax.png', priceLates:'2500000', priceNow:'3000000'},
                {id:1, market:'Indodax', image:'https://upload.wikimedia.org/wikipedia/id/b/b0/Logo_Indodax.png', priceLates:'2500000', priceNow:'3000000'},
                {id:2, market:'Indodax', image:'https://upload.wikimedia.org/wikipedia/id/b/b0/Logo_Indodax.png', priceLates:'2500000', priceNow:'3000000'},
            ]
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <StackedAreaExample data={data}/>
                <View style={{flex:1}}>
                    <FlatList 
                        data={this.state.marketList}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item})=>{
                        return (
                        <TouchableOpacity style={{padding:10, margin:5, borderRadius:10, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                            <Image style={{width:50, height:50, resizeMode:'contain', margin:10}} source={{uri:item.image}}/>
                            <View style={{flex:3}}>
                            <Text style={{color:'green'}}>Market:</Text>
                            <Text>{item.market}</Text>
                            <Text numberOfLines={1}>{item.price}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>Status: </Text>
                                <Text numberOfLines={1}>Naik</Text>
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

export default Market
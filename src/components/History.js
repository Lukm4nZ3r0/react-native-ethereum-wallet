import React, {Component} from 'react'
import {View,Text,ImageBackground, FlatList, TouchableOpacity, Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { logout,updatePrice,updatePercentagePrice } from '../redux/actions/user';
import {URL} from '../../URL'

class History extends Component{
    constructor(props){
        super(props)
        this.state = {
          flatListData:[]
        }
    }
    flatListData = () =>{
        return(
            <View style={{flex:3}}>
                <FlatList 
                    data={this.props.user.historyTransaction}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item})=>{
                    let newDate = new Date(Number(item.timeStamp)).toString().split(' ')
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
        )
    }
    dataNotFound = () =>{
        return(
            <View style={{flex:3, alignItems: 'center', justifyContent:'center'}}>
                <Text>No transaction yet ..</Text>
            </View>
        )
    }
    render(){
        const {historyTransaction} = this.props.user
        if(historyTransaction==undefined){
            historyTransaction=[]
        }
        return(
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1, resizeMode:'contain', alignItems:'center', justifyContent:'center'}} source={require('../../assets/image/header.png')}>
                <View style={{position:'absolute', flexDirection:'row', right:'5%', top:'8%'}}>
                    <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white', marginRight:20}} name="undo"/>
                    <FontAwesome style={{fontSize:30, fontWeight:'bold', color:'white', marginRight:5}} name="qrcode"/>
                </View>
                <View style={{width:'90%'}}>
                    <Text>{this.props.user.isLogin.toString()}</Text>
                    <Text style={{color:'white', fontSize:30, fontWeight: 'bold',}}>History:</Text>
                </View>
                </ImageBackground>
                {historyTransaction.length>0?this.flatListData():this.dataNotFound()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(History)
import React, {Component} from 'react'
import {View,Text,ScrollView, Dimensions} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
//redux
import { connect } from 'react-redux';

const {width,height} = Dimensions.get('window')

class HistoryDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            blockNumber:props.navigation.state.params.item.blockNumber,
            timeStamp:props.navigation.state.params.item.timeStamp,
            hash:props.navigation.state.params.item.hash,
            from:props.navigation.state.params.item.from,
            to:props.navigation.state.params.item.to,
            value:props.navigation.state.params.item.value,
            gasUsed:props.navigation.state.params.item.gasUsed,
            confirmations:props.navigation.state.params.item.confirmations,
        }
    }
    render(){
        let newDate = new Date(Number(this.state.timeStamp)).toString().split(' ')
        let timeStamp = `${newDate[0]}, ${newDate[2]}-${newDate[1]} ${newDate[3]}`
        return(
            <ScrollView>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>TxHash</Text>
                    <Text style={{flex:3}}>: {this.state.hash}</Text>
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>Time</Text>
                    <Text style={{flex:3}}>: {timeStamp}</Text>
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>From</Text>
                    <Text style={{flex:3}}>: {this.state.from}</Text>
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>To</Text>
                    <Text style={{flex:3}}>: {this.state.to}</Text>
                </View>
                <View style={{width:'100%', alignItems: 'center', justifyContent: 'center', padding:5}}>
                    <QRCode 
                        value={this.props.user.primaryAddress.toLowerCase() == this.state.from.toLowerCase()? this.state.to:this.state.from}
                        size={width*70/100}
                        logoBackgroundColor='transparent'
                    />
                    <Text style={{margin:10}}>{this.props.user.primaryAddress.toLowerCase() == this.state.from.toLowerCase()? this.state.to:this.state.from}</Text>
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>Status:</Text>
                    {this.props.user.primaryAddress.toLowerCase() === this.state.to.toLowerCase()?
                        <Text style={{flex:3, textAlign:'center', color:'white', backgroundColor:'green', padding:8, borderRadius:10}}>RECEIVED : {this.state.value/1000000000000000000} Eth</Text>
                        :
                        <Text style={{flex:3, textAlign:'center', color:'white', backgroundColor:'red', padding:8, borderRadius:10}}>SEND : {this.state.value/1000000000000000000} Eth</Text>
                    }
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>Gas used</Text>
                    <Text style={{flex:3}}>: {this.state.gasUsed}</Text>
                </View>
                <View style={{width:'100%', flexDirection:'row', padding:5}}>
                    <Text style={{flex:1}}>Confirmations</Text>
                    <Text style={{flex:3}}>: {this.state.confirmations}</Text>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(HistoryDetails)
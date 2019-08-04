import React,{Component} from 'react'
import {View,Text,Dimensions} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const {width,height} = Dimensions.get('window')

class QRCodeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            address:props.navigation.state.params.ethAddress
        }
    }
    render(){
        return(
            <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
                <QRCode 
                    value={this.state.address}
                    size={width*85/100}
                    logoBackgroundColor='transparent'
                />
                <View style={{alignItems:'center', justifyContent:'center', padding:5, borderWidth:1, borderRadius:10, borderColor:'black', marginTop:15}}>
                    <Text>Eth Address:</Text>
                    <Text>{this.state.address}</Text>
                </View>
            </View>
        )
    }
}

export default QRCodeScreen
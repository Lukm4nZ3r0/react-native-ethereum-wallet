import React, {Component} from 'react'
import {View,Text,ImageBackground,Image,TextInput,TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { addPrimaryAddress } from '../redux/actions/user';
import axios from 'axios'
import {URL} from '../../URL'

class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            address:'',
            errorMessage:false
        }
    }
    addressHandler = (text) =>{
        this.setState({address:text})
    }
    sendAddressToStore = () =>{
        axios.get(`${URL}module=account&action=balance&address=${this.state.address}&tag=latest`).then((response)=>{
            if(response.data.status == '1'){
                let responseData = Number(response.data.result)/1000000000000000000
                this.props.dispatch(addPrimaryAddress(this.state.address,responseData))
                this.setState({errorMessage:false,address:''})
                this.props.navigation.goBack()
                this.props.navigation.state.params.loginEvent()
            }
            else{
                this.setState({errorMessage:true})
            }
        })
    }
    render(){
        return(
        <ImageBackground source={{uri:'https://images.pexels.com/photos/1156684/pexels-photo-1156684.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} style={{resizeMode:'contain', flex:1}}>
            <LinearGradient colors={['black', 'grey']} start={{ x: 0, y: 0 }} end={{ x: 3, y: 3 }} style={{flex:1, opacity:0.6}} />
            <View style={{position:'absolute', width:'100%', height:'100%', alignItems: 'center', justifyContent:'center'}}>
            <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', width:'90%', margin:20}}>
                <Image style={{width:80, height:80, resizeMode:'contain'}} source={{uri:'https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/09/ethereum-icon.png?resize=210%2C300'}}/>
                <View style={{justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:25}}>My Ethereum</Text>
                <Text style={{color:'white', fontSize:25}}>Wallet</Text>
                </View>
            </View>
            {this.state.errorMessage&&<Text style={{color:'white'}}>Invalid Eth Address Format</Text>}
            <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', width:'90%'}}>
                <FontAwesome name="usd" style={{color:'white', fontSize:20, margin:20}}/>
                <TextInput style={{flex:1, color:'white'}} placeholder="Your Eth Address" placeholderTextColor="white" underlineColorAndroid="#EDAEB9" onChangeText={this.addressHandler}/>
            </View>
            <View style={{alignItems:'center', justifyContent:'center', width:'90%', margin:20}}>
                <TouchableOpacity style={{width:'40%', borderRadius:20}} onPress={this.sendAddressToStore}>
                <LinearGradient colors={['red', 'pink']} start={{ x: 0, y: 0 }} end={{ x: 3, y: 3 }} style={{alignItems:'center', justifyContent:'center',borderRadius:20, flexDirection:'row'}} >
                    <FontAwesome name="sign-in" style={{color:'white', fontSize:20, fontWeight:'bold', margin:10}} />
                    <Text style={{color:'white'}}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity style={{position:'absolute', top:'5%', left:'5%'}} onPress={()=>this.props.navigation.goBack()}>
                <FontAwesome style={{color:'white', fontSize:20,}} name="arrow-left"/>
            </TouchableOpacity>
        </ImageBackground>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(Login)
import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { logout,updatePrice,updatePercentagePrice } from '../redux/actions/user';
import Config from "react-native-config";
import axios from 'axios'
//ChildComponent
import AssetsHeader from '../component_units/AssetsHeader'
import AssetsBody from '../component_units/AssetsBody'
import AssetsHeaderLoginFalse from '../component_units/AssetsHeaderLoginFalse'
import {URL} from '../../URL'

class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLogged: props.user.isLogin,
      flatListData:[
        {id:0, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
        {id:1, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
        {id:2, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
      ],
      ethPrice:{
        ethbtc:0, 
        ethbtc_stamp:0, 
        ethusd:props.user.primaryAddressPrice!==undefined?props.user.primaryAddressPrice:0, 
        ethusd_timestamp:0
      },
      currentPrice:0,
      percentage:0
    }
  }
  componentDidMount(){
    const {primaryAddress} = this.props.user
    if(primaryAddress !== undefined){
      if(primaryAddress.length>0){
        this.setState({isLogged:true})
      }
      else{
        this.setState({isLogged:false})
      }
    }
    else{
      this.setState({isLogged:false})
    }

    this.state.isLogged && this.getPriceData()
  }

  componentWillUnmount = () => {
    clearInterval(this.setPrice)
  };

  getPriceData = () =>{
    axios.get(`${URL}module=stats&action=ethprice`).then((response)=>{
      this.setState({ethPrice:response.data.result})
      this.props.dispatch(updatePrice(Number(response.data.result.ethusd)))
    })

    this.setPrice = setInterval(()=>{
      this.getPrice()
    },5000)
  }

  getPrice = () =>{
    axios.get(`${URL}module=stats&action=ethprice`).then((response)=>{
      this.state.ethPrice.ethusd!==undefined&&this.setState({
        currentPrice:this.state.ethPrice.ethusd
      },()=>{
        let price = {now:Number(this.state.currentPrice), last:Number(response.data.result.ethusd)}
        // price percentage
        let percentage = ((price.last-price.now)*100)/price.now
        this.setState({ethPrice:response.data.result, percentage:percentage!==0?percentage:this.state.percentage})
        this.props.dispatch(updatePrice(price.last))
        percentage!==0&&this.props.dispatch(updatePercentagePrice(percentage))
      })
    })
    console.warn(this.props.user.percentagePrice)
    // console.warn('Now: '+this.state.currentPrice+', Last'+this.state.ethPrice.ethusd+', Percentage:'+this.state.percentage)
  }
  

  loginEvent = () =>{
    this.setState({isLogged:true})
    this.getPriceData()
  }

  logoutHandler = () =>{
    this.props.dispatch(logout())
    clearInterval(this.setPrice)
    this.setState({isLogged:false})
  }

  render(){
    const {primaryAddress, primaryAddressAmount, percentagePrice} = this.props.user
    const ethData = {primaryAddress,primaryAddressAmount,percentagePrice}
    return(
      <View style={{flex:1}}>
        {this.state.isLogged?<AssetsHeader ethPrice={this.state.ethPrice} ethData={ethData} logoutHandler={this.logoutHandler}/>:<AssetsHeaderLoginFalse loginEvent={this.loginEvent} navigation={this.props.navigation} />}
        {this.state.isLogged&&<AssetsBody flatListData={this.state.flatListData}/>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Assets)
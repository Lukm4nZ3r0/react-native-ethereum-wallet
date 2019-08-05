import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { logout,updatePrice,updatePercentagePrice,updateHistoryTransaction,deleteAddress,deleteAddressWhere,deleteAllHistory } from '../redux/actions/user';
import {URL} from '../../URL'
import axios from 'axios'
//ChildComponent
import AssetsHeader from '../component_units/AssetsHeader'
import AssetsBody from '../component_units/AssetsBody'
import AssetsHeaderLoginFalse from '../component_units/AssetsHeaderLoginFalse'

class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLogged: props.user.isLogin,
      flatListData:this.props.user.otherAddress!==undefined?this.props.user.otherAddress:[],
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

    if(this.state.isLogged){
      this.getPriceData()
      this.getTransactionHistory()
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.setPrice)
  };

  getTransactionHistory = () =>{
    axios.get(`${URL}module=account&action=txlist&address=${this.props.user.primaryAddress}&startblock=0&endblock=99999999&sort=asc`).then((response)=>{
      this.props.dispatch(updateHistoryTransaction(response.data.result))
    })
  }

  getPriceData = () =>{
    axios.get(`${URL}module=stats&action=ethprice`).then((response)=>{
      this.setState({ethPrice:response.data.result})
      this.props.dispatch(updatePrice(Number(response.data.result.ethusd)))
    })

    this.setPrice = setInterval(()=>{
      this.getPrice()
    },10000)
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
    // console.warn(this.props.user.percentagePrice)
    // console.warn('Now: '+this.state.currentPrice+', Last'+this.state.ethPrice.ethusd+', Percentage:'+this.state.percentage)
  }
  
  addNewAddress = (address) =>{
    this.setState({
      flatListData:[...this.state.flatListData, {ethAddress:address}]
    })
    console.warn(this.props.user.otherAddress)
  }

  deleteAddress = (address) =>{
    let {flatListData} = this.state
    let {otherAddress} = this.props.user
    if(flatListData.length>1){
      for(let i = 0 ; i<flatListData.length ; i++){
        if(flatListData[i].ethAddress === address){
          flatListData.splice(i,1)
          this.props.dispatch(deleteAddressWhere(address))
        }
      }
    }
    else{
      this.props.dispatch(deleteAddress())
      flatListData=[]
    }
    this.setState({
      flatListData:flatListData
    })
    console.warn(this.props.user.otherAddress)
  }

  loginEvent = () =>{
    this.setState({isLogged:true})
    this.getPriceData()
    this.getTransactionHistory()
  }

  logoutHandler = () =>{
    this.props.dispatch(logout())
    this.props.dispatch(deleteAllHistory())
    clearInterval(this.setPrice)
    this.setState({isLogged:false})
  }

  render(){
    const {primaryAddress, primaryAddressAmount, percentagePrice} = this.props.user
    const ethData = {primaryAddress,primaryAddressAmount,percentagePrice}
    return(
      <View style={{flex:1}}>
        {this.state.isLogged?<AssetsHeader flatListData={this.state.flatListData} addNewAddress={this.addNewAddress} navigation={this.props.navigation} ethPrice={this.state.ethPrice} ethData={ethData} logoutHandler={this.logoutHandler}/>:<AssetsHeaderLoginFalse loginEvent={this.loginEvent} navigation={this.props.navigation} />}
        {this.state.isLogged&&this.state.flatListData.length>0&&<AssetsBody deleteAddress={this.deleteAddress} flatListData={this.state.flatListData} navigation={this.props.navigation}/>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Assets)
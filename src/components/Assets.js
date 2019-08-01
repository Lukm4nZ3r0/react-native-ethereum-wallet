import React, {Component} from 'react'
import {View,Text,TextInput,ImageBackground, FlatList,TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { updateName,addPrimaryAddress,logout } from '../redux/actions/user';
import Config from "react-native-config";
import axios from 'axios'
//ChildComponent
import AssetsHeader from '../component_units/AssetsHeader'
import AssetsBody from '../component_units/AssetsBody'
import AssetsHeaderLoginFalse from '../component_units/AssetsHeaderLoginFalse'

class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      flatListData:[
        {id:0, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
        {id:1, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
        {id:2, ethAddress:'0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A', total:'0.02'},
      ]
    }
  }
  componentDidMount(){
    const {primaryAddress} = this.props.user
    console.warn(primaryAddress.length)
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
  }

  logoutHandler = () =>{
    this.props.dispatch(logout())
    console.warn(this.props.user.primaryAddress)
    console.warn(this.props.user.otherAddress)
    this.setState({isLogged:false})
  }

  handleChange = (name) =>{
    this.props.dispatch(updateName(name))
  }

  render(){
    return(
      <View style={{flex:1}}>
        {this.state.isLogged?<AssetsHeader logoutHandler={this.logoutHandler}/>:<AssetsHeaderLoginFalse navigation={this.props.navigation} />}
        {this.state.isLogged&&<AssetsBody flatListData={this.state.flatListData}/>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Assets)
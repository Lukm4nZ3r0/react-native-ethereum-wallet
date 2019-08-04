import React, {Component} from 'react'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { connect } from 'react-redux';
import { addAddress } from '../redux/actions/user';
import {URL} from '../../URL'
import axios from 'axios'

class AddNewAddress extends Component{
    constructor(props){
        super(props)
        this.state = {
            address:'',
            error:false,
            success:false,
            duplicate:false
        }
    }
    addressHandler = (text) =>{
        text = text.replace(/\s/g, '');
        this.setState({address:text})
    }
    saveAddress = () =>{
        axios.get(`${URL}module=account&action=balance&address=${this.state.address}&tag=latest`).then((response)=>{
            console.warn(response)
            if(response.data.status=='0'){
                this.setState({error:true,success:false})
            }
            else{
                this.props.dispatch(addAddress(this.state.address))
                this.props.navigation.state.params.addNewAddress(this.state.address)
                this.setState({error:false,success:true,address:'',duplicate:false})
                this.props.navigation.goBack()
            }
        })
    }
    render(){
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center',}}>
                {this.state.success&&<Text style={{color:'green'}}>create success.</Text>}
                {this.state.duplicate&&<Text style={{color:'red'}}>this address is already exist.</Text>}
                {this.state.error&&<Text style={{color:'red'}}>this address is not valid.</Text>}
                <TextInput placeholder="Your Eth Address" onChangeText={this.addressHandler} value={this.state.address} />
                <TouchableOpacity onPress={this.saveAddress}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(AddNewAddress)
import React, {Component} from 'react'
import {View,Text,TextInput,TouchableOpacity, ImageBackground} from 'react-native'
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
    componentDidMount(){
        console.warn(this.props.navigation.state.params.flatListData)
    }
    addressHandler = (text) =>{
        text = text.replace(/\s/g, '');
        this.setState({address:text})
    }
    saveAddress = () =>{
        const {flatListData} = this.props.navigation.state.params
        console.warn('flatlistdata:',flatListData)
        console.warn('state:'+this.state.address)
        axios.get(`${URL}module=account&action=balance&address=${this.state.address}&tag=latest`).then((response)=>{
            console.warn(response)
            if(response.data.status=='0'){
                this.setState({error:true,success:false})
            }
            else{
                // BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG, BUG,
                console.warn(flatListData.length)
                if(flatListData.length>0){
                    for(let i = 0 ; i < flatListData.length ; i++){
                        if(flatListData[i].ethAddress.toString().toLowerCase() !== this.state.address.toString().toLowerCase()){
                            console.warn('unique')
                            this.props.dispatch(addAddress(this.state.address),()=>{
                                this.setState({error:false,success:true,address:'',duplicate:false})
                            })
                            this.props.navigation.state.params.addNewAddress(this.state.address)
                            this.props.navigation.goBack()
                        }
                        else{
                            console.warn('duplikat')
                            this.setState({duplicate:true})
                        }
                    }
                }
                else{
                    this.props.dispatch(addAddress(this.state.address))
                    this.props.navigation.state.params.addNewAddress(this.state.address)
                    this.setState({error:false,success:true,address:'',duplicate:false})
                    this.props.navigation.goBack()
                }
            }
        })
    }
    render(){
        return(
            <ImageBackground source={{uri:'https://images.wallpaperscraft.com/image/deer_art_vector_134088_225x300.jpg'}} style={{resizeMode:'contain',flex:1, alignItems: 'center', justifyContent: 'center',}}>
                {this.state.success&&
                    <View style={{backgroundColor:'green', borderRadius:15, padding:10}}>
                        <Text style={{color:'white'}}>create success.</Text>
                    </View>
                }
                {this.state.duplicate&&
                    <View style={{backgroundColor:'red', borderRadius:15, padding:10}}>
                        <Text style={{color:'white'}}>this address is already exist.</Text>
                    </View>
                }
                {this.state.error&&
                <View style={{backgroundColor:'red', borderRadius:15, padding:10}}>
                    <Text style={{color:'white'}}>this address is not valid.</Text>
                </View>
                }
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', padding:5, borderRadius:40, backgroundColor:'white', elevation:5, width:'90%', marginTop:10}}>
                    <FontAwesome style={{flex:1,color:'grey', fontSize:25, marginLeft:10}} name="key" />
                    <TextInput style={{flex:6}} placeholder="Your Eth Address" onChangeText={this.addressHandler} value={this.state.address} />
                </View>
                <TouchableOpacity style={{marginTop:15,padding:15, borderRadius:30, backgroundColor:'red', elevation:5, width:'40%', flexDirection:'row', alignItems: 'center', justifyContent:'center'}} onPress={this.saveAddress}>
                    <FontAwesome style={{flex:1,color:'white', fontSize:25}} name="key" />
                    <Text style={{flex:1,color:'white', fontSize:17, fontWeight:'bold'}}>Submit</Text>
                </TouchableOpacity>
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
  
  export default connect(mapStateToProps)(AddNewAddress)
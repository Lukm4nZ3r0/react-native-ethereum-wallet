import React, {Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,Image} from 'react-native'
import StackedAreaExample from '../component_units/chart'
import {data} from '../dummy/DummyData'
//redux
import { connect } from 'react-redux';
import { logout,updatePrice,updatePercentagePrice } from '../redux/actions/user';
import {URL} from '../../URL'
import axios from 'axios'

class Market extends Component{
    constructor(props){
        super(props)
        this.state = {
            marketList : [],
            chartData:[]
        }
    }
    componentDidMount(){
        let chartDataCopy = this.state.chartData
        for(let i = 0 ; i<1000 ; i++){
            chartDataCopy.push({chart:0})
        }
        setInterval(()=>{
            axios.get(`${URL}module=stats&action=ethprice`).then((response)=>{
                const {ethusd} = response.data.result
                for(let i = 0 ; i<this.state.chartData.length ; i++){
                    if(this.state.chartData.length-1!==i){
                        chartDataCopy[i].chart = (Number(chartDataCopy[i+1].chart))
                    }
                    else{
                        chartDataCopy[i].chart=(Number(ethusd))
                    }
                }
                // chartDataCopy[0].chart = chartDataCopy[1].chart
                // chartDataCopy[1].chart = chartDataCopy[2].chart
                // chartDataCopy[2].chart = chartDataCopy[3].chart
                // chartDataCopy[3].chart = ethusd
                this.setState({  chartData:chartDataCopy })
            })
        },10000)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <StackedAreaExample data={this.state.chartData}/>
                {this.state.marketList.length>0 && <View style={{flex:1}}>
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
                </View>}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(Market)
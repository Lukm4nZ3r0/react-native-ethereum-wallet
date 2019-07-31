import React, {Component} from 'react'
import {View,Text,TextInput} from 'react-native'
//redux
import { connect } from 'react-redux';
import { updateName } from './redux/actions/user';

class Index extends Component{
  state = {
    name: this.props.user.name || '',
  }

  handleChange = (name) =>{
    this.props.dispatch(updateName(name))
  }

  render(){
    return(
      <View>
        <Text>Hi</Text>
        <TextInput onChangeText={this.handleChange} placeholder="here"/>
        <Text>{this.props.user.name}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Index)
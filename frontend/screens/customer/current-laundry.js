import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ScrollView,Image,  TouchableOpacity} from 'react-native';
import Current from '../../components/current';


class currentLaundryScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }
  render(){
    console.log( this.props.navigation.state.params );

    return(
      <Current />
    );
  }
}



export default currentLaundryScreen;


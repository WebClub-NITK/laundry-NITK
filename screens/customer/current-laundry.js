import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ScrollView,Image,  TouchableOpacity} from 'react-native';
import Current from '../../components/current';

const currentLaundryScreen = props => {

    console.log( props.navigation.state.params );
 
    return (

      <Current />

    );
  }

   export default currentLaundryScreen;


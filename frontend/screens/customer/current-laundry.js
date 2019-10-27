import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import Current from '../../components/current';
import customerLaundryDetails from '../../_services/customer-laundry-details';

class currentLaundryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerKey: "",
      currentLaundry:{}
    }

    try {
      console.log("from customer");
      this.state.customerKey = this.props.navigation.state.params;
      console.log(this.props.navigation.state.params);
      this.state.currentLaundry = this.props.navigation.state.params.current;
    } catch{
      console.log("from admin");
      this.state.customerKey = this.props.screenProps.customerKey;
      this.state.currentLaundry = this.props.screenProps.result.current;
      console.log(this.state.currentLaundry);
    }

  }


  render() {

    return (
      <Current screenProps={this.state.currentLaundry} />
    );
  }
}



export default currentLaundryScreen;


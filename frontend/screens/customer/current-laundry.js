import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import Current from '../../components/current';
import customerLaundryDetails from '../../_services/customer-laundry-details';

class currentLaundryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerKey: "",
      currentLaundry: [
        "here",
        "there"
      ],
      prop:{}
    }

    try {
      this.state.customerKey = this.props.navigation.state.params.customerData.key;
      this.state.currentLaundry = this.props.navigation.state.params.current;
      this.state.prop = this.props.navigation.state.params;
      console.log("pay")
    } catch{
      console.log("from admin");
      this.state.customerKey = this.props.screenProps.customerKey;
      this.state.currentLaundry = this.props.screenProps.result.current;
      
    }

  }
  updateStateOnPayment=(result)=>{
    console.log("update");
    try{
      console.log("go back");
      console.log(result)
      // this.state.prop.returnData();
      // this.props.returnData();
      // this.props.navigation.state.params.returnData(this.props.navigation.state.params.result.customerData);
      // this.props.navigation.goBack();
      this.state.customerKey = this.props.navigation.state.params.customerData.key;
      this.state.currentLaundry = result.current;
      console.log("callback");
      // this.setState({customerKey:this.state.customerKey});
      // this.setState({currentLaundry:this.props.navigation.state.params.result.current})
      console.log(this.state.currentLaundry);
      this.setState({currentLaundry:result.current});
      console.log("callback")
      this.render();
      // console.log(this.props.navigation.state.params);
      // this.render();
      // console.log(this.props);
      // console.log(this.props.navigation);
    }
    catch(e){
      console.log(e);
      console.log("catch here")
    }
    // this.props.navigation.state.params.returnData();
    
  }

  renderListofCurrentComponents() {
    return (
      this.state.currentLaundry.map((data) => {
        return (
          <Current updateState={this.updateStateOnPayment} screenProps={{key:this.state.customerKey,data:data}} />
        )
      })
    )
  }

  render() {
    console.log(this.state.currentLaundry);
    if (this.state.currentLaundry&&this.state.currentLaundry.length) {
      console.log("shit")
      return (
        <View>{this.renderListofCurrentComponents()}</View>
      )

    }

    else {
      return (
        <View>
          <Text>
            you don't have any current laundry
          </Text>
        </View>
      );
    }



  }
}



export default currentLaundryScreen;


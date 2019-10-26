import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'

class historyCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.screenProps);
    this.state = {
      items: [],
      customerKey: " "
    };


    try {
      this.state.items = this.props.screenProps[0].lis;
      console.log("history component");
      console.log(this.state.items);
    }
    catch{
      console.log("catch");
    }



    // if (this.props.screenProps) {
    //     this.setState({ items: this.props.screenProps.lis });
    // }


  }
  render() {
    return (
      <Card >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>25/09/2019</Text>
          <Text>25/09/2019</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>
            350/-
              </Text>
          <Text>
            Details
               </Text>
        </View>
      </Card>
    );
  }

}


export default historyCard;
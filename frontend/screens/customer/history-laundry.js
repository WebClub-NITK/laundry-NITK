import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ScrollView,Image,  TouchableOpacity} from 'react-native';
import HistoryCards from '../../components/history-card';
class historyLaundryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerKey: "",
      historyLaundry:{}
    }

    try {
      console.log("from customer");
      this.state.customerKey = this.props.navigation.state.params.key;
    } catch{
      console.log("from admin for history");
      this.state.customerKey = this.props.screenProps.customerKey;
      this.state.historyLaundry = this.props.screenProps.result.history;
      console.log(this.state.historyLaundry);
    }

  }


  render() {

    return (
      <HistoryCards screenProps={this.state.historyLaundry} />
    );
  }
}


   export default historyLaundryScreen;


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity, TouchableHighlight, ScorllView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import customerLaundryDetails from '../../_services/customer-laundry-details';
class Create extends React.Component {
  customerLaundryData = {};
  constructor(props) {
    super(props);
    this.state = {
      shirtQty: 0,
      trouserQty: 0,
      tshirtQty: 0,
      towelQty: 0,
      bedSheetQty: 0,
      customerKey: ""
    }
    this.state.customerKey = this.props.screenProps.customerKey;
  }

  render() {


  

const { shirtQty } = this.state.shirtQty;
const { trouserQty } = this.state.trouserQty;
const { tshirtQty } = this.state.tshirtQty;
const { towelQty } = this.state.towelQty;
const { bedSheetQty } = this.state.bedSheetQty;

var userLaundry = {
  quantity: {
    shirt: this.state.shirtQty,
    trouser: this.state.trouserQty,
    tshirt: this.state.tshirtQty,
    towel: this.state.towelQty,
    bedSheet: this.state.bedSheetQty
  },
  key: this.state.customerKey
}
addCustomerLaundry = () => {
  if (this.state.customerKey != "") {
    customerLaundryDetails.postCustomerLaundry(userLaundry).then((res) => {
    }).catch((e) => {
      console.log(e);
    });
  }
}

return (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.elements}>
        <Text>Shirt</Text>
        <NumericInput
          value={shirtQty}
          onChange={shirtQty => this.setState({
            shirtQty
          })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={40}
          iconSize={25}
          step={1}
          valueType='real'
          rounded
          textColor='#000000'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#00bfff'
          leftButtonBackgroundColor='#00bfff' />
      </View>
      <View style={styles.elements}>
        <Text>Trouser</Text>
        <NumericInput
          value={trouserQty}
          onChange={trouserQty => this.setState({
            trouserQty
          })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={40}
          iconSize={25}
          step={1}
          valueType='real'
          rounded
          textColor='#000000'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#00bfff'
          leftButtonBackgroundColor='#00bfff' />
      </View>
      <View style={styles.elements}>
        <Text>T-Shirt</Text>
        <NumericInput
          value={tshirtQty}
          onChange={tshirtQty => this.setState({
            tshirtQty
          })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={40}
          iconSize={25}
          step={1}
          valueType='real'
          rounded
          textColor='#000000'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#00bfff'
          leftButtonBackgroundColor='#00bfff' />
      </View>

      <View style={styles.elements}>
        <Text>Towel</Text>
        <NumericInput
          value={towelQty}
          onChange={towelQty => this.setState({
            towelQty
          })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={40}
          iconSize={25}
          step={1}
          valueType='real'
          rounded
          textColor='#000000'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#00bfff'
          leftButtonBackgroundColor='#00bfff' />
      </View>

      <View style={styles.elements}>
        <Text>BedSheet</Text>
        <NumericInput
          value={bedSheetQty}
          onChange={bedSheetQty => this.setState({
            bedSheetQty
          })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={40}
          iconSize={25}
          step={1}
          valueType='real'
          rounded
          textColor='#000000'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#00bfff'
          leftButtonBackgroundColor='#00bfff' />
      </View>
      <View style={styles.Btn}>
        <TouchableHighlight style={styles.endBtn} onPress={() => {
          addCustomerLaundry();
        }}>
          <Text style={styles.text}>Done</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  </View>
);
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000000",
    height: 200,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#000000",
  },
  elements: {
    flexDirection: 'row',
    justifyContent: "space-between",
    margin: 20,
  },

  Btn: {
    padding: 10,
    marginTop: 10,
  },
  endBtn: {
    alignItems: 'center',
    backgroundColor: '#8fbc8f',
    padding: 10,
  },
  container: {
    margin: 10,
    padding: 5,
    flex: 1,
  },
  text: {
    color: 'white'
  }
});
export default Create;

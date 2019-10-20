import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ScrollView,Image,  TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input'
class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shirts: {
        qty: 0,
      },
      trouser: {
        qty: 0,
      },
    }
  }
    componentDidMount(){

    }
      render(){
        return (
          <NumericInput 
          value={this.state.value} 
          onChange={value => this.setState({value})} 
          onLimitReached={(isMax,msg) => console.log(isMax,msg)}
          totalWidth={240} 
          totalHeight={50} 
          iconSize={25}
          step={1.5}
          valueType='real'
          rounded 
          textColor='#B0228C' 
          iconStyle={{ color: 'white' }} 
          rightButtonBackgroundColor='#EA3788' 
          leftButtonBackgroundColor='#E56B70'/>
      );
      }  
      
  }

export default createScreen;

  const styles = StyleSheet.create({
    header:{
      backgroundColor: "#000000",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#000000",
    },
  });
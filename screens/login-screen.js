import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ScrollView,Image,  TouchableOpacity} from 'react-native';


const loginScreen = props => {

    console.log(props);
    return (
       
     <View>
         <Text>
             welcome to laundry app
         </Text>
         <Button title="login" onPress={()=>{props.navigation.navigate('studentHome')}}/>
     </View>
    );
  }

   export default loginScreen;



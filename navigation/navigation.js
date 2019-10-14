import {createAppContainer} from 'react-navigation';
import studentProfileScreen from '../screens/student-profile';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import currentLaundryScreen from '../screens/current-laundry';
import historyLaundryScreen from '../screens/history-laundry';
import loginScreen from '../screens/login-screen';


const BottomTabNavigator = createBottomTabNavigator({
    Home : {
      screen:createMaterialTopTabNavigator({
        current : currentLaundryScreen,
        history : historyLaundryScreen
      })
    },
    Profile : studentProfileScreen
  }
);

const stackNavigator = createStackNavigator({
  login : loginScreen,
  studentHome : BottomTabNavigator
});


export default createAppContainer(stackNavigator);

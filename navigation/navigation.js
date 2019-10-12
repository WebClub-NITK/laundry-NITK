import {createAppContainer} from 'react-navigation';
import studentHomeScreen from  '../screens/student-home-page';
import studentProfileScreen from '../screens/student-profile';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import currentLaundryScreen from '../screens/current-laundry';
import historyLaundryScreen from '../screens/history-laundry';
const stackNavigator = createStackNavigator({
    studentHome : studentHomeScreen,
    studentProfile : studentProfileScreen
});

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


export default createAppContainer(BottomTabNavigator,BottomTabNavigator);

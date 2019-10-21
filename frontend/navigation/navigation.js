import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
//customer routes
import studentProfileScreen from '../screens/customer/student-profile';
import currentLaundryScreen from '../screens/customer/current-laundry';
import historyLaundryScreen from '../screens/customer/history-laundry';
import loginScreen from '../screens/customer/login-screen';
//admin routes
import createScreen from '../screens/admin/create';


const customerBottomTabNavigator = createBottomTabNavigator({
    Home : {
      screen:createMaterialTopTabNavigator({
        current : currentLaundryScreen,
        history : historyLaundryScreen
      })
    },
    Profile : studentProfileScreen
  }
);


const adminBottomTabNavigator = createBottomTabNavigator({
  Laundry : {
    screen:createMaterialTopTabNavigator({
      AddLaundry : createScreen,
      current : currentLaundryScreen,
      history : historyLaundryScreen
    })
  },
  Notify : studentProfileScreen
}
);

const stackNavigator = createStackNavigator({
  login : loginScreen,
  customerHome : customerBottomTabNavigator,
  adminHome: adminBottomTabNavigator
});


export default createAppContainer(stackNavigator);

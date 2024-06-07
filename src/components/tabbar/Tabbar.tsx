import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddReportScreen from '../../pages/add/AddReportScreen.tsx';
import ProfileScreen from '../../pages/profile/ProfileScreen.tsx';
import FoundReportNavStack from '../../pages/found/FoundReportNavStack';
import LostReportNavStack from '../../pages/lost/LostReportNavStack';
//import AuthAlert from '../auth/alerts/AuthAlert.tsx';
import AuthStack from '../auth/AuthStack.tsx';
import {useUser} from '../../hooks/useUser.tsx';
import StartScreen from '../../pages/home/StartScreen.tsx';

const Tab = createBottomTabNavigator();

// defining tab bar options
const getTabBarOptions = () => ({
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'black',
  tabBarHideOnKeyboard: true,
  tabBarStyle: {backgroundColor: 'lightgray'},
});

// const AuthAlertView = () => {
//   return <AuthAlert textField={true} />;
// };

const NewReportView = () => {
  return <AddReportScreen reportType={'lost'} />;
};

function Tabbar() {
  const {isLoggedIn} = useUser();

  if (!isLoggedIn) {
    return <AuthStack />;
  }
  return (
    <Tab.Navigator screenOptions={getTabBarOptions}>
      <Tab.Screen
        name="Start"
        component={StartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Verloren"
        component={LostReportNavStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'bag-remove' : 'bag-remove-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={NewReportView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? 'add' : 'add-outline'}
              size={40}
              color={color}
            />
          ),
          tabBarItemStyle: {
            bottom: 50,
            backgroundColor: 'lightgray',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            elevation: 5,
            paddingTop: 16,
            padding: 0,
            aspectRatio: 1,
          },
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Gefunden"
        component={FoundReportNavStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'bag-check' : 'bag-check-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabbar;

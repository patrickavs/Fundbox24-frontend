import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LostReportScreen from '../../pages/lost/LostReportScreen.tsx';
import AddReportScreen from '../../pages/add/AddReportScreen.tsx';
import FoundReportScreen from '../../pages/found/FoundReportScreen.tsx';
import ProfileScreen from '../../pages/profile/ProfileScreen.tsx';
import AuthAlert from '../auth/alerts/AuthAlert.tsx';
import AuthStack from '../auth/AuthStack.tsx';

const Tab = createBottomTabNavigator();

// defining tab bar options
const getTabBarOptions = () => ({
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'black',
  tabBarHideOnKeyboard: true,
  tabBarStyle: {backgroundColor: 'lightgray'},
});

const AuthAlertView = () => {
  return <AuthAlert textField={true} />;
};

function Tabbar() {
  return (
    <Tab.Navigator screenOptions={getTabBarOptions}>
      <Tab.Screen
        name="Start"
        component={AuthAlertView}
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
        component={LostReportScreen}
        options={{
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
        component={AddReportScreen}
        options={{
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
        component={FoundReportScreen}
        options={{
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
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabbar;

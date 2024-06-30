import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import AddReportScreen from '../../pages/add/AddReportScreen.tsx';
import ProfileScreen from '../../pages/profile/ProfileScreen.tsx';
import FoundReportNavStack from '../../pages/found/FoundReportNavStack';
import LostReportNavStack from '../../pages/lost/LostReportNavStack';
import AuthStack from '../auth/AuthStack.tsx';
import {useUser} from '../../hooks/useUser.tsx';
import StartScreen from '../../pages/home/StartScreen.tsx';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SetPerimeterScreen from '../map/SetPerimeterScreen.tsx';
import {AddReportStack} from '../../pages/add/AddReportStack.tsx';

import {Platform} from 'react-native';
const Tab = createBottomTabNavigator();

// defining tab bar options
const getTabBarOptions = () => (Platform.OS === 'android' ?
    {     tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarHideOnKeyboard: true,
      lazy: false,
      tabBarStyle: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '10%',
        elevation: 3,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: -15,
      },
    }
    : {     tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarHideOnKeyboard: true,
      lazy: false,
      tabBarStyle: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '12%',
        elevation: 3,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: -15,
      },
    }
);

// const AuthAlertView = () => {
//   return <AuthAlert textField={true} />;
// };

// const NewReportView = () => {
//   return <AddReportScreen reportType={'lost'} />;
// };

function Tabbar() {
  const {isLoggedIn} = useUser();

    const renderIcon = (focused, color, size, iconName, iconNameOutline) => (
        <Ionicons
            name={focused ? iconName : iconNameOutline}
            size={size}
            color={color}
        />
    );

  if (!isLoggedIn) {
    return <AuthStack />;
  }
  return (
    <Tab.Navigator screenOptions={getTabBarOptions} initialRouteName="Start">
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
          tabBarItemStyle: {
              paddingBottom: 5,
              paddingTop: 17,
              marginBottom: 20,
          },
        }}
      />
      <Tab.Screen
        name="Verloren"
        component={LostReportNavStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
              renderIcon(focused, color, size, 'bag-remove', 'bag-remove-outline')),
          tabBarItemStyle: {
              paddingBottom: 5,
              paddingTop: 17,
              marginBottom: 20,
          },
        }}
      />
      <Tab.Screen
        name="Plus"
        component={AddReportStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            renderIcon(focused, color, size, 'add', 'add-outline')
          ),
          tabBarItemStyle: {
            bottom: 40,
            backgroundColor: 'white',
            elevation: 3,
            borderStyle: 'solid',
            borderWidth: 0.5,
            borderColor: 'lightgray',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
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
            renderIcon(focused, color, size, 'bag-check', 'bag-check-outline')
          ),
          tabBarItemStyle: {
              paddingBottom: 5,
              paddingTop: 17,
              marginBottom: 20,
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            renderIcon(focused, color, size, 'person-circle', 'person-circle-outline')
          ),
          headerShown: false,
          tabBarItemStyle: {
              paddingBottom: 5,
              paddingTop: 17,
              marginBottom: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabbar;

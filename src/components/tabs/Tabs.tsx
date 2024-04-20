import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import StartScreen from '../home/StartScreen.tsx';
import LostReportScreen from '../lost/LostReportScreen.tsx';
import AddReportScreen from '../add/AddReportScreen.tsx';
import FoundReportScreen from '../found/FoundReportScreen.tsx';
import ProfileScreen from '../profile/ProfileScreen.tsx';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

// defining tab bar options
const getTabBarOptions = route => ({
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'black',
  tabBarHideOnKeyboard: true,
  tabBarStyle: {backgroundColor: 'lightgray'},
});

function Tabs() {
  const screens = [
    {name: 'Start', component: StartScreen},
    {name: 'Verloren', component: LostReportScreen},
    {name: 'Plus', component: AddReportScreen},
    {name: 'Gefunden', component: FoundReportScreen},
    {name: 'Profil', component: ProfileScreen},
  ];

  return (
    <Tab.Navigator
      screenOptions={getTabBarOptions} // Use existing options
    >
      {screens.map(screen => (
        <Tab.Screen
          key={screen.name}
          {...screen}
          options={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              switch (route.name) {
                case 'Start':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Verloren':
                  iconName = focused ? 'bag-remove' : 'bag-remove-outline';
                  break;
                case 'Plus':
                  iconName = focused ? 'add' : 'add-outline';
                  size = 50;
                  break;
                case 'Gefunden':
                  iconName = focused ? 'bag-check' : 'bag-check-outline';
                  break;
                case 'Profil':
                  iconName = focused
                    ? 'person-circle'
                    : 'person-circle-outline';
                  break;
                default:
                  iconName = '';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarItemStyle: {
              bottom: route.name === 'Plus' ? 50 : 0,
              backgroundColor:
                route.name === 'Plus' ? 'lightgray' : 'lightgray',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              elevation: route.name === 'Plus' ? 5 : 0,
              paddingTop: route.name === 'Plus' ? 16 : 0,
              padding: route.name === 'Plus' ? -10 : 0,
              aspectRatio: route.name === 'Plus' ? 1 : 1.8,
            },
            tabBarLabel: route.name === 'Plus' ? '' : route.name,
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

export default Tabs;

import Ionicons from 'react-native-vector-icons/Ionicons';
import SetPerimeterScreen from '../map/SetPerimeterScreen.tsx';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StartScreen from '../StartScreen.tsx';

const Tab = createBottomTabNavigator();

function Tabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Start') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Verloren') {
            iconName = focused ? 'bag-remove' : 'bag-remove-outline';
          } else if (route.name === 'Plus') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Gefunden') {
            iconName = focused ? 'bag-check' : 'bag-check-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {backgroundColor: 'lightgray'},
        tabBarItemStyle: {
          bottom: route.name === 'Plus' ? 40 : 0,
          backgroundColor: route.name === 'Plus' ? 'gray' : 'transparent',
        },
      })}>
      <Tab.Screen name="Start" component={StartScreen} />
      <Tab.Screen name="Verloren" component={StartScreen} />
      <Tab.Screen name="Plus" component={SetPerimeterScreen} />
      <Tab.Screen name="Gefunden" component={StartScreen} />
      <Tab.Screen name="Profil" component={StartScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;

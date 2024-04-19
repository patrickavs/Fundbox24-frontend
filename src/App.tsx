import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapComponent from './components/MapComponent.tsx';
import StartComponent from './components/StartComponent.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SetPerimeterScreen from './map/SetPerimeterScreen.tsx';
import {Provider} from 'react-redux';
import store from './redux/store.ts';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SetPerimeterScreen />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={StartComponent} />
          <Tab.Screen name="Settings" component={MapComponent} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

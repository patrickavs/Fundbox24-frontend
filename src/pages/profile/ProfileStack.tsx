import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetHomePerimeterScreen from '../../components/map/SetHomePerimeterScreen.tsx';
import React from 'react';
import ProfileScreen from './ProfileScreen';
import MyReports from './MyReports.tsx';

import MyChatsScreen from '../chat/MyChatsScreen.tsx';
import ChatConversationScreen from '../chat/ChatConversationScreen.tsx';
const ProfileNavStack = createNativeStackNavigator();

export const ProfileStack = () => (
  <ProfileNavStack.Navigator>
    <ProfileNavStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <ProfileNavStack.Screen
      name="Map"
      component={SetHomePerimeterScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
      }}
    />
    <ProfileNavStack.Screen
      name="MyReports"
      component={MyReports}
      options={{
        headerTitle: '',
        headerTransparent: true,
      }}
    />
    <ProfileNavStack.Screen
      name="MyChats"
      component={MyChatsScreen}
      options={{
          headerTitle: '',
          headerTransparent: true,
    }}
    />
    <ProfileNavStack.Screen
      name="ChatConversation"
      component={ChatConversationScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
      }}
    />
  </ProfileNavStack.Navigator>
);

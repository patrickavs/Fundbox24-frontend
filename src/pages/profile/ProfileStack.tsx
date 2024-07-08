import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from './ProfileScreen';
import MyChatsScreen from './MyChatsScreen';
const ProfileNavStack = createNativeStackNavigator();

export const ProfileStack = () => (
    <ProfileNavStack.Navigator>
        <ProfileNavStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
        />
        <ProfileNavStack.Screen
            name="MyChats"
            component={MyChatsScreen}
            options={{
                headerTitle: '',
                headerTransparent: true,
            }}
        />
    </ProfileNavStack.Navigator>
);

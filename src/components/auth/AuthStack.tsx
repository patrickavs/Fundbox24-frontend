import LoginScreen from './LoginScreen.tsx';
import RegisterScreen from './RegisterScreen.tsx';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStackNavigator = createNativeStackNavigator();

function AuthStack() {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login', headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: ''}}
      />
    </AuthStackNavigator.Navigator>
  );
}

export default AuthStack;

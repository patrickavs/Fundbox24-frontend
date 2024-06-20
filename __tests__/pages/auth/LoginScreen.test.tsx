import React from 'react';
import {describe, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react-native';
import LoginScreen from '../../../src/components/auth/LoginScreen.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from '../../../src/hooks/useUser.tsx';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}));

describe('LoginScreen', () => {
  // Mock the fetch function
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
      status: 200,
      ok: true,
    } as Response),
  );

  it('can login with correct credentials', async () => {
    const AuthStackNavigator = createNativeStackNavigator();

    render(
      <UserProvider>
        <NavigationContainer>
          <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Login', headerShown: false}}
            />
          </AuthStackNavigator.Navigator>
        </NavigationContainer>
      </UserProvider>,
    );

    // Press login button
    const loginButton = await screen.findByTestId('LoginButton');
    fireEvent.press(loginButton);
  });
});

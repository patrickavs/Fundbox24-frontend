import React from 'react';
import {describe, it, expect, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react-native';
import LoginScreen from '../../../src/components/auth/LoginScreen.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from '../../../src/hooks/useUser.tsx';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...(typeof actualNav === 'object' ? actualNav : {}),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

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

  it('should render email and password input fields', () => {
    render(
      <UserProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </UserProvider>,
    );

    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passwordInput = screen.getByPlaceholderText('Passwort');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should update email and password state on input change', () => {
    render(
      <UserProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </UserProvider>,
    );

    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passwordInput = screen.getByPlaceholderText('Passwort');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});

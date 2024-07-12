import React from 'react';
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react-native';
import LoginScreen from '../../../src/components/auth/LoginScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { UserProvider, useUser } from '../../../src/hooks/useUser.tsx';
import { Alert } from 'react-native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...(typeof actualNav === 'object' ? actualNav : {}),
    useNavigation: jest.fn(),
  };
});

jest.mock('../../../src/hooks/useUser.tsx');

jest.spyOn(Alert, 'alert');

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // Mock the fetch function
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
        ok: true,
      } as Response)
    );
  });

  const AuthStackNavigator = createNativeStackNavigator();

  render(
    <UserProvider>
      <NavigationContainer>
        <AuthStackNavigator.Navigator>
          <AuthStackNavigator.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }}
          />
        </AuthStackNavigator.Navigator>
      </NavigationContainer>
    </UserProvider>
  );

  it('calls login and resets email and password on successful login', async () => {
    const login = jest.fn(() => true);
    (useUser as jest.Mock).mockReturnValue({ login });

    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('E-Mail');
    const passwordInput = getByPlaceholderText('Passwort');
    const loginButton = getByTestId('LoginButton');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password');
    });

    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  it('shows an alert when email or password is empty', () => {
    const { getByTestId } = render(<LoginScreen />);

    const loginButton = getByTestId('LoginButton');
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith('Bitte Benutzername und Passwort eingeben.');
  });

  it('should render email and password input fields', () => {
    render(<LoginScreen />);
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passwordInput = screen.getByPlaceholderText('Passwort');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should update email and password state on input change', () => {
    render(<LoginScreen />);
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passwordInput = screen.getByPlaceholderText('Passwort');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should navigate to the register screen when the register button is pressed', () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate });

    const { getByTestId } = render(<LoginScreen />);

    const registerButton = getByTestId('navigate-to-register');
    fireEvent.press(registerButton);

    expect(navigate).toHaveBeenCalledWith('Register');
  });
});

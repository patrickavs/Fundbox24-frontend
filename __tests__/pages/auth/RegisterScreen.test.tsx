import 'react-native';
import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import ProfileScreen from '../../../src/pages/profile/ProfileScreen.tsx';
import { User } from '../../../src/types/user.ts';
import RegisterScreen from '../../../src/components/auth/RegisterScreen.tsx';
import { useNavigation } from '@react-navigation/native';

const userData: User = {
    id: '1',
    email: 'wal@test.de',
    firstName: 'Walter',
    lastName: 'White',
    username: 'walterwhite',
}

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn((key: string) => {
        if (key === 'user-credentials') {
            return Promise.resolve(null);
        } else if (key === 'basicAuthCredentials') {
            return Promise.resolve(null);
        }
        return Promise.resolve(null);
    }),
    setItem: jest.fn((key: string, value: string) => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
}));

describe('RegisterScreen', () => {
    it('should display the input fields', async () => {
        const view = render(<RegisterScreen />, { wrapper: UserProvider });

        expect(view.getByTestId('input-email').props.value === "").toBeTruthy();
        expect(view.getByTestId('input-password').props.value === "").toBeTruthy();
        expect(view.getByTestId('input-password-repeat').props.value === "").toBeTruthy();
    });

    it('should register a user', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(userData),
                ok: true,
            }) as Promise<Response>
        )

        const view = render(<RegisterScreen />, { wrapper: UserProvider });

        await act(() => {
            view.getByTestId('input-email').props.value = userData.email;
            view.getByTestId('input-password').props.value = "password";
            view.getByTestId('input-password-repeat').props.value = "password";

            fireEvent.press(view.getByTestId('register-button'));
        })

        //TODO: Check if user state in useUser is set to the registered user
    });
})

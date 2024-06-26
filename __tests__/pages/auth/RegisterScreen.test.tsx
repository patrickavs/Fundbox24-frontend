import 'react-native';
import React from 'react';
import { render, screen, waitFor, act, fireEvent, renderHook } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider, useUser } from '../../../src/hooks/useUser.tsx';
import { User } from '../../../src/types/user.ts';
import RegisterScreen from '../../../src/components/auth/RegisterScreen.tsx';
import { useNavigation } from '@react-navigation/native';
import * as UserHook from "../../../src/hooks/useUser.tsx"

const registerUserData = {
    email: 'wal@test.de',
    firstName: 'Walter',
    lastName: 'White',
    username: 'walterwhite',
    password: '1234',
    passwordRepeat: '1234',
}
const receivedUserData: User = {
    ...registerUserData,
    id: '1',
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
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
    }),)
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
                json: () => Promise.resolve(receivedUserData),
                ok: true,
            }) as Promise<Response>
        )

        const { result } = renderHook(() => useUser(), {
            wrapper: UserProvider,
        });

        await act(() => {
            result.current.register(registerUserData)
        })

        expect(result.current.user).toEqual(receivedUserData);
    });

    it('should display an error message if the passwords do not match', async () => {

        jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
            isPending: false,
            user: null,
            editUser: jest.fn(async (userData: Partial<User>) => { }),
            isLoggedIn: false,
            login: jest.fn(async (email: string, password: string) => { }),
            logout: jest.fn(async () => { }),
            register: jest.fn(async (userData: any) => { })
        }
        ));

        const view = render(<RegisterScreen />, { wrapper: UserProvider });

        // Wait for useEffects
        await act(() => {
        });

        await act(() => {
            fireEvent.changeText(view.getByTestId('input-password'), '1234');
            fireEvent.changeText(view.getByTestId('input-password-repeat'), '12345');
        })

        await act(() => {
            fireEvent.press(view.getByTestId('button-register'));
        });

        // Check if register hook is called
        expect(view.getByText("Die Passwörter sind nicht gleich")).toBeTruthy();
    });
})

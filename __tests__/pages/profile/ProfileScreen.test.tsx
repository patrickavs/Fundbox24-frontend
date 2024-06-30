import 'react-native';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import * as UserHook from '../../../src/hooks/useUser.tsx';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import ProfileScreen from '../../../src/pages/profile/ProfileScreen.tsx';
import { User } from '../../../src/types/user.ts';
import { act } from 'react-test-renderer';


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
            return Promise.resolve(JSON.stringify(userData));
        } else if (key === 'basicAuthCredentials') {
            return Promise.resolve('dXNlcjpwYXNz');
        }
        return Promise.resolve(null);
    }),
    setItem: jest.fn((key: string, value: string) => Promise.resolve()),
}));

describe('ProfileScreen', () => {
    it('should display "wal@test.de"', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve('Jippi!'),
                ok: true,
            }) as Promise<Response>
        ).mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(userData),
            }) as Promise<Response>);

        await waitFor(() => render(
            <UserProvider>
                <ProfileScreen />
            </UserProvider>
        ));

        expect(screen.getByTestId('input-email').props.value === userData.email).toBeTruthy();
    });

    it('should change values of the switches', async () => {
        jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
            isPending: false,
            user: null,
            editUser: jest.fn(async (userData: Partial<User>) => { }),
            isLoggedIn: false,
            login: jest.fn(async (email: string, password: string) => { }),
            logout: jest.fn(async () => { }),
            register: jest.fn(async (userData: any) => { throw new Error("Fetch failed") })
        }
        ));

        const view = render(<ProfileScreen />);

        await act(() => {
            fireEvent(view.getByTestId('switch-vibration'), 'onValueChange', false);
        })

        expect(view.getByTestId('switch-vibration').props.value).toBeFalsy();

        await act(() => {
            fireEvent(view.getByTestId('switch-sound'), 'onValueChange', false);
        });

        expect(view.getByTestId('switch-sound').props.value).toBeFalsy();

        await act(() => {
            fireEvent(view.getByTestId('switch-location'), 'onValueChange', false);
        });

        expect(view.getByTestId('switch-location').props.value).toBeFalsy();
    })

    it('should logout', async () => {

        const logoutMock = jest.fn(async () => { });

        jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
            isPending: false,
            user: null,
            editUser: jest.fn(async (userData: Partial<User>) => { }),
            isLoggedIn: false,
            login: jest.fn(async (email: string, password: string) => { }),
            logout: logoutMock,
            register: jest.fn(async (userData: any) => { throw new Error("Fetch failed") })
        }
        ));

        const view = await waitFor(() => render(<ProfileScreen />));

        await act(() => {
            fireEvent.press(view.getByTestId('button-logout'));
        });

        expect(logoutMock).toHaveBeenCalled();
    })
        ;
});

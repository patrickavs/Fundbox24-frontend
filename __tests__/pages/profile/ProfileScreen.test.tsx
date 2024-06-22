import 'react-native';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import ProfileScreen from '../../../src/pages/profile/ProfileScreen.tsx';
import { User } from '../../../src/types/user.ts';

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
});

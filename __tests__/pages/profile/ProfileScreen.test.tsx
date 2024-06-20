import 'react-native';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import { LostReport } from '../../../src/types/report-lost.ts';
import ProfileScreen from '../../../src/pages/profile/ProfileScreen.tsx';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
}));

describe('ProfileScreen', () => {
    it('should display "wal@test.de"', () => {
        const fakeLostReports: LostReport[] = [
            {
                id: '1',
                title: 'Schlüssel',
                description: 'Ein Schlüsselbund mit 3 Schlüsseln',
                lastSeenDate: new Date(Date.now()).toLocaleTimeString(),
                lastSeenLocation: {
                    latitude: 53.551086,
                    longitude: 9.993682,
                },
                lostLocation: {
                    latitude: 53.551086,
                    longitude: 9.993682,
                },
                lostRadius: 100,
                category: {
                    id: '1',
                    value: '',
                    title: 'Schlüssel',
                    image: '',
                },
                placeOfDiscovery: 'Hamburg',
                placeOfDelivery: 'Hamburg',
                myChats: [],
            },
        ];

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeLostReports),
            }) as Promise<Response>
        );

        render(
            <UserProvider>
                <ProfileScreen />
            </UserProvider>
        );

        expect(screen.getByTestId('input-email').props.value === 'wal@test.de').toBeTruthy();
    });
});

import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import { useRoute } from '@react-navigation/native';
import {Location} from '../../../src/types/location';
import {Category} from '../../../src/types/category';
import {Chat} from '../../../src/types/chat';
import {describe, expect, it} from '@jest/globals';
import SingleFoundReportScreen from '../../../src/pages/found/SingleFoundReportScreen';
import {act} from 'react-test-renderer';
import {LostReport} from '../../../src/types/report-lost';

const fakeLostReport: LostReport = {
    id: '2',
    title: 'Test Lost Item',
    description: 'blablabla',
    lastSeenDate: '2024-06-19T13:13:01.905005',
    lostLocation: {latitude: 0, longitude: 0} as Location,
    lostRadius: 10,
    category: {id: 1, name: 'Test Category', image: 'test.jpg'} as Category,
    lastSeenLocation: {latitude: 0, longitude: 0} as Location,
    myChats: [] as Chat[],
    placeOfDiscovery: '',
};

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn(), setOptions: jest.fn() })),
}));

test('renders correctly with route params', () => {

    const navigation = {
        setOptions: jest.fn(),
    };

    const mockRouteParams = {
        item: {
            id: 2,
            title: 'Test Lost Item',
            description: 'blablabla',
            lastSeenDate: '2024-06-19T13:13:01.905005',
            lostLocation: {latitude: 0, longitude: 0} as Location,
            lostRadius: 10,
            category: {id: 1, name: 'Test Category', image: 'test.jpg'} as Category,
            lastSeenLocation: {latitude: 0, longitude: 0} as Location,
            myChats: [] as Chat[],
        },
    };

    (useRoute as jest.Mock).mockReturnValue({ params: mockRouteParams });

    const { getByText } = render(<SingleLostReportScreen navigation={navigation} />);

    expect(getByText('Test Lost Item')).toBeTruthy();
});

describe('SingleLostReportScreen', () => {
    it('should call navigateToChat when chat-buttons clicked', async () => {

        const navigation = {
            setOptions: jest.fn(),
            popToTop: jest.fn(),
        };

        const mockRouteParams = {
            item: {
                id: 2,
                title: 'Test Lost Item',
                description: 'blablabla',
                lastSeenDate: '2024-06-19T13:13:01.905005',
                lostLocation: {latitude: 0, longitude: 0} as Location,
                lostRadius: 10,
                category: {id: 1, name: 'Test Category', image: 'test.jpg'} as Category,
                lastSeenLocation: {latitude: 0, longitude: 0} as Location,
                myChats: [] as Chat[],
            },
        };

        (useRoute as jest.Mock).mockReturnValue({ params: mockRouteParams });

        const view = render(<SingleLostReportScreen navigation={navigation} />);

        await act(async () => {
            fireEvent.press(view.getByTestId('chat-button-1'));
        });

        // TODO: change after implementing navigate to chat
        expect(navigation.popToTop).toBeCalled();

        await act(async () => {
            fireEvent.press(view.getByTestId('chat-button-2'));
        });

        // TODO: change after implementing navigate to chat
        expect(navigation.popToTop).toBeCalledTimes(2);
    });
});




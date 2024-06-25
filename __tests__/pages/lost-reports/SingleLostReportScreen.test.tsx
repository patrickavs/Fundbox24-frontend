import React from 'react';
import { render } from '@testing-library/react-native';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import { useRoute } from '@react-navigation/native';
import {Location} from '../../../src/types/location';
import {Category} from '../../../src/types/category';
import {Chat} from '../../../src/types/chat';
import {expect} from '@jest/globals';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn(), setOptions: jest.fn() })),
}));

test('renders correctly with route params', () => {
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

    const { getByText } = render(<SingleLostReportScreen navigation={{}} />);

    expect(getByText('Test Lost Item')).toBeTruthy();
});





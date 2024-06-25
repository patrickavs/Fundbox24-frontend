import React from 'react';
import { render } from '@testing-library/react-native';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import { useRoute } from '@react-navigation/native';
import {Location} from '../../../src/types/location';
import {Category} from '../../../src/types/category';
import {Chat} from '../../../src/types/chat';
import {expect} from '@jest/globals';
import SingleFoundReportScreen from '../../../src/pages/found/SingleFoundReportScreen';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn(), setOptions: jest.fn() })),
}));

test('renders correctly with route params', () => {
    const mockRouteParams = {
        item: {
            id: 2,
            title: 'Test Found Item',
            description: 'blablabla',
            lastSeenDate: '2024-06-19T13:13:01.905005',
            foundLocation: {latitude: 0, longitude: 0} as Location,
            foundRadius: 10,
            category: {id: 1, name: 'Test Category', image: 'test.jpg'} as Category,
            currentLocation: {latitude: 0, longitude: 0} as Location,
            myChats: [] as Chat[],
        },
    };

    (useRoute as jest.Mock).mockReturnValue({ params: mockRouteParams });

    const { getByText } = render(<SingleFoundReportScreen navigation={{}} />);

    expect(getByText('Test Found Item')).toBeTruthy();
});

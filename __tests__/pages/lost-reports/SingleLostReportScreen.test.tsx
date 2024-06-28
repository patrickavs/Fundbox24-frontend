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


/*import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import {describe, expect} from '@jest/globals';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import {Location} from '../../../src/types/location';
import {Category} from '../../../src/types/category';
import {Chat} from '../../../src/types/chat';


describe('renders correctly with route params', () => {
    const routeParams = { item: { id: 2,
            title: 'Test Lost Item',
            description: 'blablabla',
            lastSeenDate: '2024-06-19T13:13:01.905005',
            lostLocation: {latitude: 0, longitude: 0} as Location,
            lostRadius: 10,
            category: {id: 1, name: 'Test Category', image: 'test.jpg'} as Category,
            placeOfDiscovery: 'Test Place',
            placeOfDelivery: {latitude: 0, longitude: 0} as Location,
            myChats: [] as Chat[],
        },
    };

    jest.spyOn(require('@react-navigation/native'), 'useRoute').mockReturnValue({
        params: routeParams,
    });

    const { getByText } = render(<SingleLostReportScreen />);

    expect(getByText('Test Lost Item')).toBeTruthy();
});

*/

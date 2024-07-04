import React from 'react';
import {describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import {Location} from '../../../src/types/location';
import {Category} from '../../../src/types/category';
import {Chat} from '../../../src/types/chat';
import {act} from 'react-test-renderer';
import { LostReport, NewLostReport } from '../../../src/types/report-lost';
import * as LostReportHook from '../../../src/hooks/useLostReports';

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
    isFinished: false,
    imagePath: '',
};

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
    useRoute: jest.fn(() => ({params: {item: fakeLostReport, key: '', name: ''}})),
}));

describe('SingleLostReportScreen',() => {
    it('renders correctly with route params',async () => {
        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReport],
            error: null,
            refresh: () => Promise.resolve(),
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null,
        }));

        const navigation = {
            setOptions: jest.fn(),
        };

        const { getByText } = render(<SingleLostReportScreen navigation={navigation} />);

        expect(getByText('Test Lost Item')).toBeTruthy();
    });

    it('should call navigateToChat when chat-buttons clicked', async () => {
        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReport],
            error: null,
            refresh: () => Promise.resolve(),
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null,
        }));

        const navigation = {
            setOptions: jest.fn(),
            popToTop: jest.fn(),
        };

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




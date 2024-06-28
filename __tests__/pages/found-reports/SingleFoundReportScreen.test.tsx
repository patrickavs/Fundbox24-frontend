import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import FoundReportScreen from '../../../src/pages/found/FoundReportScreen';
import { FoundReport, NewFoundReport } from '../../../src/types/report-found';
import FoundReportCard from '../../../src/pages/found/FoundReportCard';
import * as Route from '@react-navigation/native';
import SingleFoundReportScreen from '../../../src/pages/found/SingleFoundReportScreen';

const fakeFoundReport: FoundReport =
{
    id: '1',
    title: 'Dampfschifffahrtskapitänsausgehuniformsmütze',
    description: 'Ein Schlüsselbund mit 3 Schlüsseln',
    foundLocation: {
        latitude: 53.551086,
        longitude: 9.993682,
    },
    currentLocation: {
        latitude: 53.551086,
        longitude: 9.993682,
    },
    foundDate: new Date(Date.now()).toLocaleTimeString(),
    category: {
        id: '1',
        value: '',
        name: 'Schlüssel',
        image: '',
    },
    isFinished: false,
    myChats: [],
};

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
    useRoute: jest.fn(() => ({
        params: { id: '1' },
        key: "",
        name: ""
    })),
}));

describe('FoundReportScreen', () => {

    it('should render properly', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            createFoundReport: (userToken: string, report: NewFoundReport) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null
        }));

        const navigation = {
            setOptions: jest.fn(),
        }

        const view = render(<SingleFoundReportScreen navigation={navigation} />);

        expect(view.getByText(fakeFoundReport.title)).toBeTruthy();
    });

    it('should go back in navigation when back-buttons clicked', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            createFoundReport: (userToken: string, report: NewFoundReport) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null
        }));

        const navigation = {
            setOptions: jest.fn(),
            goBack: jest.fn(),
        }

        const view = render(<SingleFoundReportScreen navigation={navigation} />);

        await act(async () => {
            fireEvent.press(view.getByTestId('back-button-1'));
        });

        expect(navigation.goBack).toBeCalled();

        await act(async () => {
            fireEvent.press(view.getByTestId('back-button-2'));
        });

        expect(navigation.goBack).toBeCalledTimes(2);
    });

});

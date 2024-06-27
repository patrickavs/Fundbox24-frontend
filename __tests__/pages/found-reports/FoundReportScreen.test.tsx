import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import FoundReportScreen from '../../../src/pages/found/FoundReportScreen';
import { FoundReport, NewFoundReport } from '../../../src/types/report-found';

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
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
    }),)
}));

describe('FoundReportScreen', () => {

    it('should renders single LostReportCards', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            createFoundReport: (userToken: string, report: NewFoundReport) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null
        }));

        const view = render(<FoundReportScreen navigation={null} />);

        expect(view.getByText(fakeFoundReport.title)).toBeTruthy();
    });

    // it('should render the dropdowns', async () => {
    //     jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
    //         isPending: false,
    //         lostReports: [fakeLostReports],
    //         error: null,
    //         createLostReport: (userToken: string, report: NewLostReport) => null,
    //         editLostReport: (userToken: string, report: LostReport) => null
    //     }));

    //     const view = render(<LostReportScreen />);

    //     expect(view.getByTestId('sort-dropdown')).toBeTruthy();
    //     expect(view.getByTestId('filter-dropdown')).toBeTruthy();
    // });

});

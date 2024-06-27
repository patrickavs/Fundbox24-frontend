import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as LostReportHook from '../../../src/hooks/useLostReports';
import { LostReport, NewLostReport } from '../../../src/types/report-lost';
import LostReportScreen from '../../../src/pages/lost/LostReportScreen';
import LostReportCard from '../../../src/pages/lost/LostReportCard';

const fakeLostReports: LostReport =
{
    id: '1',
    title: 'Dampfschifffahrtskapitänsausgehuniformsmütze',
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
        name: 'Schlüssel',
        image: '',
    },
    placeOfDiscovery: 'Hamburg',
    placeOfDelivery: 'Hamburg',
    myChats: [],
};

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
    }),)
}));

describe('LostReportScreen', () => {
    it('renders correctly', () => {
        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReports],
            error: null,
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null
        }));

        const { getByTestId } = render(
            <LostReportScreen />
        );

        expect(getByTestId('lost-report-screen')).toBeTruthy();

        // check if the text is rendered correctly
        expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();
    });


    it('should renders single LostReportCards', async () => {
        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReports],
            error: null,
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null
        }));

        const view = render(<LostReportScreen />);

        expect(view.getByText(fakeLostReports.title)).toBeTruthy();
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

    it('should execute the onPress callback function', async () => {
        const pressCallback = jest.fn((id: string) => { })

        // @ts-ignore
        const view = render(<LostReportCard report={fakeLostReports} onPress={pressCallback} />);

        await act(() => {
            fireEvent.press(view.getByTestId('report-card-press'));
        });

        expect(pressCallback).toBeCalled();
    })

});

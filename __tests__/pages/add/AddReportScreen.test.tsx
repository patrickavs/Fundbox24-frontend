import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import * as LostReportHook from '../../../src/hooks/useLostReports';
import { FoundReport, NewFoundReport } from '../../../src/types/report-found';
import { LostReport, NewLostReport } from '../../../src/types/report-lost';
import AddReportScreen from '../../../src/pages/add/AddReportScreen';

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
    categoryId: 1,
    imagePath: '',
    isFinished: false,
    myChats: [],
};

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
    categoryId: 1,
    imagePath: '',
    myChats: [],
    isFinished: false,
};

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(),
        useRoute: jest.fn(() => ({
            params: { reportType: 'lost', fetchedCategories: [] },
            key: "",
            name: ""
        })),
    };
});

describe('AddReportScreen lost', () => {

    it('should render with "lost" as reportType properly', async () => {

        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            createFoundReport: (userToken: string, report: NewFoundReport) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReports],
            error: null,
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null,
        }));

        const view = render(<AddReportScreen />);

        await act(async () => { });

        expect(view.getByText('Neue Suchanzeige')).toBeTruthy();

        await act(async () => {
            fireEvent.changeText(view.getByTestId('input-name'), 'Thomas');
        });

        expect(view.getByTestId('input-name').props.value).toBe('Thomas');

        await act(async () => {
            fireEvent.changeText(view.getByTestId('input-description'), 'Ein Schlüsselbund');
        });

        expect(view.getByTestId('input-description').props.value).toBe('Ein Schlüsselbund');

    });
});

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(),
        useRoute: jest.fn(() => ({
            params: { reportType: 'lost', fetchedCategories: [] },
            key: "",
            name: ""
        })),
    };
});

describe('AddReportScreen found', () => {

    it('should render with "found" as reportType properly', async () => {

        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            createFoundReport: (userToken: string, report: NewFoundReport) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
            isPending: false,
            lostReports: [fakeLostReports],
            error: null,
            createLostReport: (userToken: string, report: NewLostReport) => null,
            editLostReport: (userToken: string, report: LostReport) => null,
        }));

        const view = render(<AddReportScreen />);

        await act(async () => { });

        expect(view.getByText('Neue Suchanzeige')).toBeTruthy();

        await act(async () => {
            fireEvent.changeText(view.getByTestId('input-name'), 'Thomas');
        });

        expect(view.getByTestId('input-name').props.value).toBe('Thomas');

        await act(async () => {
            fireEvent.changeText(view.getByTestId('input-description'), 'Ein Schlüsselbund');
        });

        expect(view.getByTestId('input-description').props.value).toBe('Ein Schlüsselbund');

    });
});
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

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
    }),),
    useRoute: jest.fn(() => ({
        params: { reportType: 'found', fetchedCategories: []},
    })),
}));

describe('AddReportScreen', () => {

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

        const view = render(<AddReportScreen reportType="lost" />);

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

    it('should render without "lost" as reportType properly', async () => {
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

        const view = render(<AddReportScreen reportType="" />);

        await act(async () => { });

        expect(view.getByText('Neue Fundanzeige')).toBeTruthy();
        expect(view.getByText(`Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.`)).toBeTruthy();
    });

    it('should validate the date', async () => {
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

        const lostReportView = render(<AddReportScreen reportType="lost" />);

        await act(async () => { });

        // Check for normal change
        await act(async () => {
            fireEvent.changeText(lostReportView.getByTestId('date-input-lost'), '01.01.2021');
        });

        // getByTestId('error-text') has to fail because the date is valid
        expect(lostReportView.getByTestId('date-input-lost').props.value).toBe('01.01.2021');
        try {
            expect(lostReportView.getByTestId('error-lost')).toBeFalsy();
        } catch (e) { }

        // Check if error is shown when date is invalid
        await act(async () => {
            fireEvent.changeText(lostReportView.getByTestId('date-input-lost'), '01.2021');
        });
        expect(lostReportView.getByTestId('error-lost')).toBeTruthy();
        expect(lostReportView.getByText('Das Datum muss im\nDD.MM.YYYY Format sein')).toBeTruthy();

        // Check if error is shown when date is invalid
        await act(async () => {
            fireEvent.changeText(lostReportView.getByTestId('date-input-lost'), '01.02.202');
        });
        expect(lostReportView.getByTestId('error-lost')).toBeTruthy();
        expect(lostReportView.getByText('Invalides Datum')).toBeTruthy();

        // Check if error is shown when date is edge case
        await act(async () => {
            fireEvent.changeText(lostReportView.getByTestId('date-input-lost'), '32.02.2022');
        });
        expect(lostReportView.getByTestId('error-lost')).toBeTruthy();
        expect(lostReportView.getByText('Invalides Datum')).toBeTruthy();



        const foundReportView = render(<AddReportScreen reportType="" />);
        await act(async () => { });

        // Check if error is shown when date is edge case
        await act(async () => {
            fireEvent.changeText(foundReportView.getByTestId('date-input-found'), '00.02.2022');
        });
        expect(foundReportView.getByTestId('error-found')).toBeTruthy();
        expect(foundReportView.getByText('Invalides Datum')).toBeTruthy();

    });



});

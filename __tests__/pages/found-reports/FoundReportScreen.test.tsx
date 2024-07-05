import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import FoundReportScreen from '../../../src/pages/found/FoundReportScreen';
import { FoundReport, NewFoundReport } from '../../../src/types/report-found';
import FoundReportCard from '../../../src/pages/found/FoundReportCard';
import { FoundReportRequest } from '../../../src/types/report-found-request.ts';

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
        id: 1,
        value: '',
        name: 'Schlüssel',
        image: '',
    },
    isFinished: false,
    imagePath: '',
    myChats: [],
};

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
    }),),
    useFocusEffect: jest.fn(() => ({
        useCallback: jest.fn(),
    })),
}));

describe('FoundReportScreen', () => {

    it('should renders single FoundReportCards', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
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

    it('should render the dropdowns', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        const view = render(<FoundReportScreen navigation={null} />);

        expect(view.getByTestId('sort-dropdown-found')).toBeTruthy();
        expect(view.getByTestId('filter-dropdown-found')).toBeTruthy();
        expect(screen.getByText('Gefunden in deinem Umkreis')).toBeTruthy();
        expect(screen.getByText('Sortieren')).toBeTruthy();
        expect(screen.getByText('Filtern')).toBeTruthy();
    });

    it('should execute the sort dropdown onChange callback', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        const view = render(<FoundReportScreen navigation={null} />);
        const sortDropdown = view.getByTestId('sort-dropdown-found');

        const logSpy = jest.spyOn(console, 'log');

        act(() => {
            fireEvent(sortDropdown, 'onChange', {value: 'alphabetical'});
        });

        expect(logSpy).toHaveBeenCalledWith('Benutzer hat sortiert nach: alphabetical');

        logSpy.mockRestore();
    });

    it('should execute the filter dropdown onChange callback', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        const view = render(<FoundReportScreen navigation={null} />);
        const filterDropdown = view.getByTestId('filter-dropdown-found');

        const logSpy = jest.spyOn(console, 'log');

        act(() => {
            fireEvent(filterDropdown, 'onChange', {value: 'in my region'});
        });

        expect(logSpy).toHaveBeenCalledWith('Benutzer hat gefiltert nach: in my region');

        logSpy.mockRestore();
    });

    it('should render the SearchBar component', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        const view = render(<FoundReportScreen navigation={null} />);

        expect(view.getByTestId('search-bar-found')).toBeTruthy();
    });

    it('should execute SearchBar onChangeText callback', async () => {
        jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
            isPending: false,
            foundReports: [fakeFoundReport],
            error: null,
            refresh: () => Promise.resolve(),
            createFoundReport: (userToken: string, report: FoundReportRequest) => null,
            editFoundReport: (userToken: string, report: FoundReport) => null,
        }));

        const searchText = 'Schlüssel';
        const view = render(<FoundReportScreen navigation={null} />);
        const searchBar = view.getByTestId('search-bar-found');

        const logSpy = jest.spyOn(console, 'log');

        act(() => {
            fireEvent.changeText(searchBar, searchText);
        });

        expect(logSpy).toHaveBeenCalledWith('Benutzer sucht nach: ' + searchText);

        logSpy.mockRestore();
    });

    it('should execute the onPress callback function', async () => {
        const pressCallback = jest.fn((id: string) => { });

        // @ts-ignore
        const view = render(<FoundReportCard report={fakeFoundReport} onPress={pressCallback} />);

        await act(() => {
            fireEvent.press(view.getByTestId('report-card-press'));
        });

        expect(pressCallback).toBeCalled();
    });

});

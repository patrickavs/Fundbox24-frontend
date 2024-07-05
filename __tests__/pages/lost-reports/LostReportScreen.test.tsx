import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react-native';
import {describe, expect, it, jest} from '@jest/globals';
import * as LostReportHook from '../../../src/hooks/useLostReports';
import {LostReport, NewLostReport} from '../../../src/types/report-lost';
import LostReportScreen from '../../../src/pages/lost/LostReportScreen';
import LostReportCard from '../../../src/pages/lost/LostReportCard';
import { LostReportRequest } from '../../../src/types/report-lost-request.ts';

const fakeLostReports: LostReport = {
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
  })),
  useFocusEffect: jest.fn(() => ({
    useCallback: jest.fn(),
  })),
}));

describe('LostReportScreen', () => {
  it('renders correctly', () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const {getByTestId} = render(<LostReportScreen />);

    expect(getByTestId('lost-report-screen')).toBeTruthy();

    // check if the text is rendered correctly
    expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();
  });

  it('should renders single LostReportCards', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const view = render(<LostReportScreen />);

    expect(view.getByText(fakeLostReports.title)).toBeTruthy();
  });

  it('should render the dropdowns', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const view = render(<LostReportScreen />);

    expect(view.getByTestId('sort-dropdown')).toBeTruthy();
    expect(view.getByTestId('filter-dropdown')).toBeTruthy();
    expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();
    expect(screen.getByText('Sortieren')).toBeTruthy();
    expect(screen.getByText('Filtern')).toBeTruthy();
  });

  it('should execute the sort dropdown onChange callback', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const view = render(<LostReportScreen />);
    const sortDropdown = view.getByTestId('sort-dropdown');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent(sortDropdown, 'onChange', {value: 'alphabetical'});
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat sortiert nach: alphabetical');

    logSpy.mockRestore();
  });

  it('should execute the filter dropdown onChange callback', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const view = render(<LostReportScreen />);
    const filterDropdown = view.getByTestId('filter-dropdown');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent(filterDropdown, 'onChange', {value: 'in my region'});
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat gefiltert nach: in my region');

    logSpy.mockRestore();
  });

  it('should render the SearchBar component', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const view = render(<LostReportScreen />);

    expect(view.getByTestId('search-bar')).toBeTruthy();
  });

  it('should execute SearchBar onChangeText callback', async () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    const searchText = 'Schlüssel';
    const view = render(<LostReportScreen />);
    const searchBar = view.getByTestId('search-bar');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent.changeText(searchBar, searchText);
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer sucht nach: ' + searchText);

    logSpy.mockRestore();
  });


  it('should execute the onPress callback function', async () => {
    const pressCallback = jest.fn((id: string) => {});

    // @ts-ignore
    const view = render(
      <LostReportCard report={fakeLostReports} onPress={pressCallback} image={0}/>,
    );

    await act(() => {
      fireEvent.press(view.getByTestId('report-card-press'));
    });

    expect(pressCallback).toBeCalled();
  });
});

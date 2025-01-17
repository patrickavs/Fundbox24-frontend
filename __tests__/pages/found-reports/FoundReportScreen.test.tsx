import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import FoundReportScreen from '../../../src/pages/found/FoundReportScreen';
import { FoundReport } from '../../../src/types/report-found';
import FoundReportCard from '../../../src/pages/found/FoundReportCard';
import { FoundReportRequest } from '../../../src/types/report-found-request.ts';
import { User } from '../../../src/types/user';
import { useNavigation } from '@react-navigation/native';

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

const userData: User = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Walter',
  lastName: 'White',
  username: 'walterwhite',
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => {
    if (key === 'user-credentials') {
      return Promise.resolve(JSON.stringify(userData));
    } else if (key === 'basicAuthCredentials') {
      return Promise.resolve('dXNlcjpwYXNz');
    }
    return Promise.resolve(null);
  }),
  setItem: jest.fn((key: string, value: string) => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  })),
  useFocusEffect: jest.fn(() => ({
    useCallback: jest.fn(),
  })),
}));

describe('FoundReportScreen', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
      isPending: false,
      foundReports: [fakeFoundReport],
      error: null,
      refresh: () => null,
      createFoundReport: (userToken: string, report: FoundReportRequest) => null,
      editFoundReport: (userToken: string, report: FoundReport) => null,
    }));

    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue([fakeFoundReport]),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
    const view = render(<FoundReportScreen />);

    expect(view.getByTestId('sort-dropdown-found')).toBeTruthy();
    expect(view.getByTestId('filter-dropdown-found')).toBeTruthy();
    expect(screen.getByText('Gefunden in deinem Umkreis')).toBeTruthy();
    expect(screen.getByText('Sortieren')).toBeTruthy();
    expect(screen.getByText('Kategorie')).toBeTruthy();
  });

  it('should execute the sort dropdown onChange callback', async () => {

    const view = render(<FoundReportScreen />);
    const sortDropdown = view.getByTestId('sort-dropdown-found');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent(sortDropdown, 'onChange', { value: 'alphabetical' });
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat sortiert nach: alphabetical');

    logSpy.mockRestore();
  });

  it('should execute the filter dropdown onChange callback', async () => {

    const view = render(<FoundReportScreen />);
    const filterDropdown = view.getByTestId('filter-dropdown-found');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent(filterDropdown, 'onChange', { value: 'Geldbörse' });
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat gefiltert nach: Geldbörse');

    logSpy.mockRestore();
  });

  it('should render the SearchBar component', async () => {

    const view = render(<FoundReportScreen />);

    expect(view.getByTestId('search-bar-found')).toBeTruthy();
  });

  it('should execute SearchBar onChangeText callback', async () => {

    const searchText = 'Schlüssel';
    const view = render(<FoundReportScreen />);
    const searchBar = view.getByTestId('search-bar-found');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent.changeText(searchBar, searchText);
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer sucht nach: ' + searchText);

    logSpy.mockRestore();
  });

  it('should execute the onPress callback function', async () => {
    const pressCallback = jest.fn((id: string) => {
    });

    // @ts-ignore
    const view = render(<FoundReportCard report={fakeFoundReport} onPress={pressCallback} image={0} />);

    await act(() => {
      fireEvent.press(view.getByTestId('report-card-press'));
    });

    expect(pressCallback).toBeCalled();
  });

  it('should render FoundReportCard in FlatList', async () => {
    render(<FoundReportScreen />);

    await waitFor(() => screen.getByText(fakeFoundReport.title));

    const foundReportCard = screen.getByText(fakeFoundReport.title);
    expect(foundReportCard).toBeTruthy();

    fireEvent.press(foundReportCard);
    expect(navigateMock).toHaveBeenCalledWith('SingleFoundReportScreen', { item: fakeFoundReport });
  });
});

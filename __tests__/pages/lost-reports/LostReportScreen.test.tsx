import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {act, fireEvent, render, screen} from '@testing-library/react-native';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import * as LostReportHook from '../../../src/hooks/useLostReports';
import { LostReport } from '../../../src/types/report-lost';
import LostReportScreen from '../../../src/pages/lost/LostReportScreen';
import LostReportCard from '../../../src/pages/lost/LostReportCard';
import { LostReportRequest } from '../../../src/types/report-lost-request.ts';
import { User } from '../../../src/types/user';

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
  })),
  useFocusEffect: jest.fn(() => ({
    useCallback: jest.fn(),
  })),
}));

beforeEach(() => {
  jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
    isPending: false,
    lostReports: [fakeLostReports],
    error: null,
    refresh: () => Promise.resolve(),
    createLostReport: (userToken: string, report: LostReportRequest) => Promise.resolve(),
    editLostReport: (userToken: string, report: LostReport) => Promise.resolve(),
  }));
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue([fakeLostReports]),
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LostReportScreen', () => {
  it('renders correctly', () => {
    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: (userToken: string, report: LostReportRequest) => Promise.resolve(),
      editLostReport: (userToken: string, report: LostReport) => Promise.resolve(),
    }));
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<LostReportScreen />);

    expect(getByTestId('lost-report-screen')).toBeTruthy();
    expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();
  });

  it('should render the SearchBar component', async () => {
    const view = render(<LostReportScreen />);

    expect(view.getByTestId('search-bar')).toBeTruthy();
  });

  it('should execute SearchBar onChangeText callback', async () => {
    const searchText = 'Schlüssel';
    const view = render(<LostReportScreen />);
    const searchBar = view.getByTestId('search-bar');

    const logSpy = jest.spyOn(console, 'log');

    await act(async () => {
      fireEvent.changeText(searchBar, searchText);
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer sucht nach: ' + searchText);

    logSpy.mockRestore();
  });

  it('should render the dropdowns', async () => {
    const view = render(<LostReportScreen />);

    expect(view.getByTestId('sort-dropdown')).toBeTruthy();
    expect(view.getByTestId('filter-dropdown')).toBeTruthy();
    expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();
    expect(screen.getByText('Sortieren')).toBeTruthy();
    expect(screen.getByText('Kategorie')).toBeTruthy();
  });

  it('should execute the sort dropdown onChange callback', async () => {
    const view = render(<LostReportScreen />);
    const sortDropdown = view.getByTestId('sort-dropdown');

    const logSpy = jest.spyOn(console, 'log');

    act(() => {
      fireEvent(sortDropdown, 'onChange', { value: 'alphabetical' });
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat sortiert nach: alphabetical');

    logSpy.mockRestore();
  });

  it('should execute the filter dropdown onChange callback', async () => {
    const view = render(<LostReportScreen />);
    const filterDropdown = view.getByTestId('filter-dropdown');

    const logSpy = jest.spyOn(console, 'log');

    await act(async () => {
      fireEvent(filterDropdown, 'onChange', { value: 'Geldbörse' });
    });

    expect(logSpy).toHaveBeenCalledWith('Benutzer hat gefiltert nach: Geldbörse');

    logSpy.mockRestore();
  });

  it('should execute the onPress callback function', async () => {
    const pressCallback = jest.fn();

    // @ts-ignore
    const view = render(
      <LostReportCard report={fakeLostReports} onPress={pressCallback} image={0} />
    );

    await act(async () => {
      fireEvent.press(view.getByTestId('report-card-press'));
    });

    expect(pressCallback).toBeCalled();
  });
});

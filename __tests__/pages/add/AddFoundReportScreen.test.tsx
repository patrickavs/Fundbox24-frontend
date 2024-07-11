import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import * as LostReportHook from '../../../src/hooks/useLostReports';
import { FoundReport } from '../../../src/types/report-found';
import { LostReport } from '../../../src/types/report-lost';
import AddReportScreen from '../../../src/pages/add/AddReportScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mapConstants from '../../../src/constants/map.ts';

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
    category: {
      id: 1,
      value: '',
      name: 'Schlüssel',
      image: '',
    },
    imagePath: '',
    myChats: [],
    isFinished: false,
  };

jest.mock('react-native-simple-toast', () => ({
  Toast: jest.fn(),
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: jest.fn(() => ({
      params: { reportType: 'found', fetchedCategories: [] },
      key: '',
      name: '',
    })),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('AddReportScreen found', () => {

  it('should add a found report correctly', async () => {
    const mockCreateLostReport = jest.fn();
    const mockCreateFoundReport = jest.fn();
    const mockRadius = jest.fn();

    jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
      isPending: false,
      foundReports: [fakeFoundReport],
      error: null,
      refresh: () => Promise.resolve(),
      createFoundReport: mockCreateFoundReport,
      editFoundReport: (userToken: string, report: FoundReport) => null,
    }));

    jest.spyOn(LostReportHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [fakeLostReports],
      error: null,
      refresh: () => Promise.resolve(),
      createLostReport: mockCreateLostReport,
      editLostReport: (userToken: string, report: LostReport) => null,
    }));

    AsyncStorage.getItem.mockResolvedValue('found-token');

    const view = render(<AddReportScreen />);

    await act(async () => { });

    expect(view.getByText('Neue Fundanzeige')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(view.getByTestId('input-name'), 'Hans');
    });

    expect(view.getByTestId('input-name').props.value).toBe('Hans');

    await act(async () => {
      fireEvent.changeText(view.getByTestId('input-description'), 'Ein Buch');
    });

    expect(view.getByTestId('input-description').props.value).toBe('Ein Buch');

    await act(async () => {
      fireEvent.press(view.getByText('Fundanzeige speichern'));
    });

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('basicAuthCredentials');
      expect(mockCreateFoundReport).toHaveBeenCalledWith(
        'found-token',
        expect.objectContaining({
          title: 'Hans',
          description: 'Ein Buch',
          isFinished: false,
        })
      );
    });

    const dropdown = view.getByTestId('dropdown');

    await act(async () => {
      fireEvent.press(dropdown);
    });

    await act(async () => {
      fireEvent.press(view.getByText('Schmuck'));
    });

    await waitFor(() => {
      expect(view.getByText('Schmuck')).toBeTruthy();
      expect(view.queryByText('Original Category')).toBeNull();
    });

    expect(view.getByText('Fundort des Gegenstands:')).toBeTruthy();
    expect(view.getByText('Ort der Abholung:')).toBeTruthy();

    await act(async () => {
      fireEvent.press(view.getByTestId('found'));
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Map', {foundPosition: undefined, foundRadius: mapConstants.minRadius});
    });

    await act(async () => {
      fireEvent.press(view.getByTestId('collect'));
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Map', {collectPosition: undefined, collectRadius: mapConstants.minRadius});
    });
  });
});

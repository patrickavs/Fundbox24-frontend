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
    lastSeenLocation: mapConstants.initialMapPosition,
    lostLocation: mapConstants.initialMapPosition,
    lostRadius: mapConstants.minRadius,
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
      params: { reportType: 'lost' },
      key: '',
      name: '',
    })),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('AddReportScreen lost', () => {

  it('should add a lost report correctly', async () => {
    const mockCreateLostReport = jest.fn();
    const mockCreateFoundReport = jest.fn();

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

    AsyncStorage.getItem.mockResolvedValue('lost-token');

    const view = render(<AddReportScreen />);

    await act(async () => {
    });

    expect(view.getByText('Neue Suchanzeige')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(view.getByTestId('input-name'), 'Thomas');
    });

    expect(view.getByTestId('input-name').props.value).toBe('Thomas');

    await act(async () => {
      fireEvent.changeText(view.getByTestId('input-description'), 'Ein Schlüsselbund');
    });

    expect(view.getByTestId('input-description').props.value).toBe('Ein Schlüsselbund');

    await act(async () => {
      fireEvent.press(view.getByText('Suchanzeige speichern'));
    });

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('basicAuthCredentials');
      expect(mockCreateLostReport).toHaveBeenCalledWith(
        'lost-token',
        expect.objectContaining({
          title: 'Thomas',
          description: 'Ein Schlüsselbund',
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


    expect(view.getByText('Letzte bekannte Position:')).toBeTruthy();

    await act(async () => {
      fireEvent.press(view.getByTestId('map'));
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Map', {
        lostPosition: mapConstants.initialMapPosition,
        lostRadius: mapConstants.minRadius,
        reportType: 'lost',
        type: 'lost',
      });
    });
  });
});

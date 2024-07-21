import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import * as FoundReportHook from '../../../src/hooks/useFoundReports';
import { FoundReport } from '../../../src/types/report-found';
import SingleFoundReportScreen from '../../../src/pages/found/SingleFoundReportScreen';
import { FoundReportRequest } from '../../../src/types/report-found-request.ts';
import { Chat } from '../../../src/types/chat.ts';

const fakeFoundReport: FoundReport =
  {
    id: '1',
    title: 'Dampfschifffahrtskapitänsausgehuniformsmütze',
    description: 'Ein Schlüsselbund mit 3 Schlüsseln',
    isFinished: false,
    imagePath: '',
    category: {
      id: 1,
      value: '',
      name: 'Schlüssel',
      image: '',
    },
    foundDate: new Date(Date.now()).toLocaleTimeString(),
    foundLocation: {
      latitude: 53.551086,
      longitude: 9.993682,
    },
    currentLocation: {
      latitude: 53.551086,
      longitude: 9.993682,
    },
    myChats: [] as Chat[],
  };

jest.mock('react-native-simple-toast', () => {
  jest.fn();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  navigate: jest.fn(),
  useRoute: jest.fn(() => ({
    params: {
      item: {
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
        myChats: [] as Chat[],
      }, key: '', name: '',
    },
  })),
}));

describe('FoundReportScreen', () => {
  it('renders correctly with route params', async () => {
    jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
      isPending: false,
      foundReports: [fakeFoundReport],
      error: null,
      refresh: () => Promise.resolve(),
      createFoundReport: (userToken: string, report: FoundReportRequest) => null,
      deleteFoundReport: (id: string) => null,
      editFoundReport: (id: number, report: FoundReportRequest) => null,
    }));

    const navigation = {
      setOptions: jest.fn(),
    };

    const { getByText } = render(<SingleFoundReportScreen navigation={navigation} />);

    expect(getByText(fakeFoundReport.title)).toBeTruthy();
  });

  it('should call navigateToChat when chat-buttons clicked', async () => {
    jest.spyOn(FoundReportHook, 'useFoundReports').mockImplementation(() => ({
      isPending: false,
      foundReports: [fakeFoundReport],
      error: null,
      refresh: () => Promise.resolve(),
      createFoundReport: (userToken: string, report: FoundReportRequest) => null,
      deleteFoundReport: (id: string) => null,
      editFoundReport: (id: number, report: FoundReportRequest) => null,
    }));

    const navigation = {
      setOptions: jest.fn(),
      popToTop: jest.fn(),
      navigate: jest.fn(),
    };

    const view = render(<SingleFoundReportScreen navigation={navigation} />);

    await act(async () => {
      fireEvent.press(view.getByTestId('chat-button-1'));
    });

    // TODO: change after implementing navigate to chat
    expect(navigation.navigate).toBeCalled();

    await act(async () => {
      fireEvent.press(view.getByTestId('chat-button-2'));
    });

    // TODO: change after implementing navigate to chat
    expect(navigation.navigate).toBeCalledTimes(2);
  });
});

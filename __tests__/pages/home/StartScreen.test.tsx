import 'react-native';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import StartScreen from '../../../src/pages/home/StartScreen.tsx';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import { LostReportProvider } from '../../../src/hooks/useLostReports.tsx';
import { FoundReportProvider } from '../../../src/hooks/useFoundReports.tsx';
import { ChatProvider } from '../../../src/hooks/useChat.tsx';
import { LostReport } from '../../../src/types/report-lost.ts';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}));

describe('StartScreen', () => {
  it('renders find text "Du bist nicht angemeldet"', () => {
    const fakeLostReports: LostReport[] = [
      {
        id: '1',
        title: 'Schlüssel',
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
          title: 'Schlüssel',
          image: '',
        },
        placeOfDiscovery: 'Hamburg',
        placeOfDelivery: 'Hamburg',
        myChats: [],
      },
    ];

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(fakeLostReports),
        }) as Promise<Response>,
    );

    render(
      <UserProvider>
        <LostReportProvider>
          <FoundReportProvider>
            <ChatProvider>
              <StartScreen navigation={null} />;
            </ChatProvider>
          </FoundReportProvider>
        </LostReportProvider>
      </UserProvider>,
    );

    expect(
      screen.getByText('Willkommen, blauerwal24').props.children,
    ).toBeTruthy();
  });
});

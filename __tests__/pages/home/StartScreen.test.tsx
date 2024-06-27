import 'react-native';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import StartScreen from '../../../src/pages/home/StartScreen.tsx';
import { UserProvider } from '../../../src/hooks/useUser.tsx';
import { LostReportProvider } from '../../../src/hooks/useLostReports.tsx';
import * as LostReportsHook from '../../../src/hooks/useLostReports.tsx';
import { FoundReportProvider } from '../../../src/hooks/useFoundReports.tsx';
import { ChatProvider } from '../../../src/hooks/useChat.tsx';
import * as ChatHook from '../../../src/hooks/useChat.tsx';
import { LostReport, NewLostReport } from '../../../src/types/report-lost.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../../src/types/user.ts';
import * as UserHook from '../../../src/hooks/useUser.tsx';
import { NewMessage } from '../../../src/types/message.ts';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}));

const userData: User = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Walter',
  lastName: 'White',
  username: 'walterwhite',
}

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

describe('StartScreen', () => {

  before

  it('should render "Du bist nicht angemeldet" because there is no userToken', async () => {

    jest.spyOn(ChatHook, 'useChat').mockImplementation(() => ({
      isPending: false,
      chats: [],
      error: undefined,
      createChat: (userToken: string, chat: any) => null,
      removeChat: (userToken: string, chatId: string) => null,
      addMessage: (userToken: string, chatId: string, message: NewMessage) => null,
    }));

    jest.spyOn(LostReportsHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [],
      error: null,
      createLostReport: (userToken: string, report: NewLostReport) => null,
      editLostReport: (userToken: string, report: LostReport) => null
    }));

    jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
      isPending: false,
      user: null,
      editUser: (u: Partial<User>) => Promise.resolve(),
      isLoggedIn: false,
      login: (email: string, password: string) => Promise.resolve(),
      logout: () => Promise.resolve(),
      register: (userData: any) => Promise.resolve()
    }));

    const view = render(<StartScreen navigation={null} />)

    await act(async () => { })

    expect(view.getByText('Du bist nicht angemeldet')).toBeTruthy();
  });

  it('should render `Willkommen, ${user?.username}`, which is only displayed if user is logged in', async () => {

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve('Jippi!'),
        ok: true,
      }) as Promise<Response>
    ).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(userData),
        status: 200
      }) as Promise<Response>);

    jest.spyOn(LostReportsHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: [],
      error: null,
      createLostReport: (userToken: string, report: NewLostReport) => null,
      editLostReport: (userToken: string, report: LostReport) => null
    }));

    jest.spyOn(ChatHook, 'useChat').mockImplementation(() => ({
      isPending: false,
      chats: [],
      error: undefined,
      createChat: (userToken: string, chat: any) => null,
      removeChat: (userToken: string, chatId: string) => null,
      addMessage: (userToken: string, chatId: string, message: NewMessage) => null,
    }));

    jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
      isPending: false,
      user: { username: 'walterwhite' } as User,
      editUser: (u: Partial<User>) => Promise.resolve(),
      isLoggedIn: true,
      login: (email: string, password: string) => Promise.resolve(),
      logout: () => Promise.resolve(),
      register: (userData: any) => Promise.resolve()
    }));

    const view = render(<StartScreen navigation={null} />)

    await act(async () => { })

    expect(view.getByText(`Willkommen, ${userData.username}`)).toBeTruthy();
  })
});

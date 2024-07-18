import 'react-native';
import React from 'react';
import { act, render } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import StartScreen from '../../../src/pages/home/StartScreen.tsx';
import * as LostReportsHook from '../../../src/hooks/useLostReports.tsx';
import * as ChatHook from '../../../src/hooks/useChat.tsx';
import { LostReport } from '../../../src/types/report-lost.ts';
import { User } from '../../../src/types/user.ts';
import * as UserHook from '../../../src/hooks/useUser.tsx';
import { NewMessage } from '../../../src/types/message.ts';
import { useUser } from '../../../src/hooks/useUser.tsx';
import { useLostReports } from '../../../src/hooks/useLostReports.tsx';
import { useChat } from '../../../src/hooks/useChat.tsx';
import { LostReportRequest } from '../../../src/types/report-lost-request.ts';

jest.setTimeout(10000);

const userData: User = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Walter',
  lastName: 'White',
  username: 'walterwhite',
};

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
      id: 1,
      value: '',
      name: 'Schlüssel',
      image: '',
    },
    myChats: [],
    isFinished: false,
    imagePath: '',
  },
];

jest.mock('@react-navigation/native', () => ({
  useEffect: jest.fn(),
  useUser: jest.fn(),
  useLostReports: jest.fn(),
  useChat: jest.fn(),
}));

describe('StartScreen', () => {
  it('should render "Du bist nicht angemeldet" because there is no userToken', async () => {
    jest.spyOn(ChatHook, 'useChat').mockImplementation(() => ({
      isPending: false,
      chats: [],
      error: undefined,
      createChat: (userToken: string, chat: any) => null,
      removeChat: (userToken: string, chatId: string) => null,
      addMessage: (userToken: string, chatId: string, message: NewMessage) =>
        null,
    }));

    jest.spyOn(LostReportsHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: fakeLostReports,
      error: null,
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (report: LostReport) => null,
      deleteLostReport: (reportId: string) => null,
      refresh: () => null,
    }));

    jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
      isPending: false,
      user: null,
      editUser: (u: Partial<User>) => Promise.resolve(),
      isLoggedIn: false,
      login: (email: string, password: string) => Promise.resolve(),
      refreshUser: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      register: (userData: any) => Promise.resolve(),
    }));

    const view = render(<StartScreen navigation={{ navigate: jest.fn() }} />);

    await act(async () => {
    });

    expect(view.getByText('Du bist nicht angemeldet')).toBeTruthy();
  });

  it('should render `Willkommen, ${user?.username}`, which is only displayed if user is logged in', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve('Jippi!'),
            ok: true,
          }) as Promise<Response>
      )
      .mockImplementation(
        () =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(userData),
            status: 200,
          }) as Promise<Response>
      );

    jest.spyOn(LostReportsHook, 'useLostReports').mockImplementation(() => ({
      isPending: false,
      lostReports: fakeLostReports,
      error: null,
      createLostReport: (userToken: string, report: LostReportRequest) => null,
      editLostReport: (report: LostReport) => null,
      deleteLostReport: (reportId: string) => null,
      refresh: () => null,
    }));

    jest.spyOn(ChatHook, 'useChat').mockImplementation(() => ({
      isPending: false,
      chats: [],
      refresh: () => null,
      error: undefined,
      createChat: (userToken: string, chat: any) => null,
      removeChat: (userToken: string, chatId: string) => null,
      addMessage: (userToken: string, chatId: string, message: NewMessage) =>
        null,
    }));

    jest.spyOn(UserHook, 'useUser').mockImplementation(() => ({
      isPending: false,
      user: { username: 'walterwhite' } as User,
      editUser: (u: Partial<User>) => Promise.resolve(),
      isLoggedIn: true,
      login: (email: string, password: string) => Promise.resolve(),
      refreshUser: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      register: (userData: any) => Promise.resolve(),
    }));

    const view = render(<StartScreen navigation={{ navigate: jest.fn() }} />);

    await act(async () => {
    });

    expect(view.getByText(`Willkommen, ${userData.username}`)).toBeTruthy();
  });

  it('should trigger refresh on focus', async () => {
    const refreshMock = jest.fn();

    (useUser as jest.Mock).mockReturnValue({
      isPending: false,
      user: { username: 'TestUser' },
      refreshUser: () => Promise.resolve(),
    });
    (useLostReports as jest.Mock).mockReturnValue({
      isPending: false,
      lostReports: fakeLostReports,
      refresh: refreshMock,
    });
    (useChat as jest.Mock).mockReturnValue({ isPending: false, chats: [] });

    render(<StartScreen navigation={{ navigate: jest.fn() }} />);

    expect(refreshMock).toHaveBeenCalled();
  });
});

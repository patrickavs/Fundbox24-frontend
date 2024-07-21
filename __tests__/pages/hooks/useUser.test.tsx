import 'react-native';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider, useUser } from '../../../src/hooks/useUser.tsx';
import { User } from '../../../src/types/user.ts';
import { LostReport } from '../../../src/types/report-lost.ts';
import { FoundReport } from '../../../src/types/report-found.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../../../src/types/chat.ts';

const userMockData: User = {
  firstName: 'Hans',
  lastName: 'Mueller',
  username: 'hansi',
  id: '1',
  email: 'test@example.com',
};

const lostReportMockData: LostReport = {
  id: '1',
  title: 'Lost Item',
  description: 'Description of lost item',
  lastSeenDate: new Date().toLocaleDateString(),
  lastSeenLocation: { longitude: 23, latitude: 34 },
  lostLocation: { longitude: 293, latitude: 34 },
  lostRadius: 20,
  category: { id: 1, value: '', name: 'Category', image: '' },
  myChats: [],
  isFinished: false,
  imagePath: '',
};

const foundReportMockData: FoundReport = {
  id: '1',
  title: 'Found Item',
  description: 'Description of found item',
  foundDate: new Date().toLocaleDateString(),
  foundLocation: { longitude: 23, latitude: 34 },
  currentLocation: { longitude: 293, latitude: 34 },
  category: { id: 1, value: '', name: 'Category', image: '' },
  myChats: [] as Chat[],
  isFinished: false,
  imagePath: '',
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => {
    if (key === 'basicAuthCredentials') {
      return Promise.resolve('dXNlcjpwYXNz');
    }
    return Promise.resolve(null);
  }),
  setItem: jest.fn((key: string, value: string) => Promise.resolve()),
  removeItem: jest.fn((key: string) => Promise.resolve(null)),
}));

describe('useUser Hook', () => {
  it('should log in a user and save credentials', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(userMockData),
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      result.current.login('test@example.com', 'password');
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toMatchObject(userMockData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'basicAuthCredentials',
      btoa('test@example.com:password')
    );
  });

  it('should log out a user and remove credentials', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(userMockData),
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      result.current.login('test@example.com', 'password');
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('basicAuthCredentials');
  });

  it('should register a new user and log them in', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(userMockData),
        }) as Promise<Response>
      );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      await result.current.register({
        email: userMockData.email,
        password: 'password',
      });
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toMatchObject(userMockData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'basicAuthCredentials',
      btoa(`${userMockData.email}:password`)
    );
  });

  /*
  it('should fetch and set user lost reports', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([lostReportMockData]),
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    act(() => {
      result.current.getAllLostReports();
    });

    await waitFor(() => {
      expect(result.current.userLostReports).toEqual([lostReportMockData]);
    });
  });

  it('should fetch and set user found reports', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([foundReportMockData]),
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      result.current.getAllFoundReports();
    });

    await waitFor(() => {
      expect(result.current.userFoundReports).toMatchObject([foundReportMockData]);
    });
  });*/

  it('should handle errors when fetching user lost reports', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      result.current.getAllLostReports();
    });

    expect(result.current.userLostReports).toHaveLength(0);
  });

  it('should handle errors when fetching user found reports', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      }) as Promise<Response>
    );

    const { result } = renderHook(useUser, {
      wrapper: UserProvider,
    });

    await act(async () => {
      result.current.getAllFoundReports();
    });

    expect(result.current.userFoundReports).toHaveLength(0);
  });
});

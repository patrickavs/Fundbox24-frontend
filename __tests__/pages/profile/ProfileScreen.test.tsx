import 'react-native';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { expect, it, jest, describe, beforeEach, afterEach } from '@jest/globals';
import { UserProvider, useUser } from '../../../src/hooks/useUser.tsx';
import useStorage from '../../../src/hooks/useStorage.ts';
import ProfileScreen from '../../../src/pages/profile/ProfileScreen.tsx';
import { User } from '../../../src/types/user.ts';
import { Settings } from '../../../src/types/settings.ts';
import mapConstants from '../../../src/constants/map.ts';
import { useNavigation } from '@react-navigation/native';

const userData: User = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Walter',
  lastName: 'White',
  username: 'walterwhite',
};

const defaultSettings: Settings = {
  sound: true,
  vibration: true,
  location: true,
  radius: 10,
  position: mapConstants.initialMapPosition,
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
  useNavigation: jest.fn(),
  useRoute: jest.fn(() => ({})),
}));

jest.mock('../../../src/hooks/useUser.tsx', () => ({
  useUser: jest.fn(() => ({
    user: userData,
    isPending: false,
    logout: jest.fn(() => Promise.resolve()),
  })),
  UserProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../src/hooks/useStorage.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ProfileScreen', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle sound switch', async () => {
    const setSettingsMock = jest.fn().mockImplementation((newSettings: any) => ({
      ...defaultSettings,
      sound: newSettings.sound,
    }));
    (useStorage as jest.Mock).mockReturnValue([defaultSettings, setSettingsMock]);

    await waitFor(() =>
      render(
        <UserProvider>
          <ProfileScreen navigation={null} />
        </UserProvider>
      )
    );

    const switchComponent = screen.getByTestId('switch-sound');

    await act(async () => {
      fireEvent(switchComponent, 'onValueChange', !defaultSettings.sound);
    });

    expect(setSettingsMock).toHaveBeenCalledWith({
      ...defaultSettings,
      sound: !defaultSettings.sound,
    });
  });

  it('should toggle vibration switch', async () => {
    const setSettingsMock = jest.fn().mockImplementation((newSettings: any) => ({
      ...defaultSettings,
      vibration: newSettings.vibration,
    }));
    (useStorage as jest.Mock).mockReturnValue([defaultSettings, setSettingsMock]);

    await waitFor(() =>
      render(
        <UserProvider>
          <ProfileScreen navigation={null} />
        </UserProvider>
      )
    );

    const vibrationSwitch = screen.getByTestId('switch-vibration');

    await act(async () => {
      fireEvent(vibrationSwitch, 'onValueChange', !defaultSettings.vibration);
    });

    expect(setSettingsMock).toHaveBeenCalledWith({
      ...defaultSettings,
      vibration: !defaultSettings.vibration,
    });
  });

  it('should toggle location switch', async () => {
    const setSettingsMock = jest.fn().mockImplementation((newSettings: any) => ({
      ...defaultSettings,
      location: newSettings.location,
    }));
    (useStorage as jest.Mock).mockReturnValue([defaultSettings, setSettingsMock]);

    await waitFor(() =>
      render(
        <UserProvider>
          <ProfileScreen navigation={null} />
        </UserProvider>
      )
    );

    const locationSwitch = screen.getByTestId('switch-location');

    await act(() => {
      fireEvent(locationSwitch, 'onValueChange', !defaultSettings.location);
    });

    expect(setSettingsMock).toHaveBeenCalledWith({
      ...defaultSettings,
      location: !defaultSettings.location,
    });
  });

  it('should handle logout', async () => {
    const logoutMock = jest.fn();
    (useUser as jest.Mock).mockReturnValue({
      user: userData,
      isPending: false,
      logout: logoutMock,
    });

    await waitFor(() =>
      render(
        <UserProvider>
          <ProfileScreen navigation={null} />
        </UserProvider>
      )
    );

    const logoutButton = screen.getByText('Logout');
    await act(async () => {
      fireEvent.press(logoutButton);
    });

    expect(logoutMock).toHaveBeenCalled();
  });

  it('should render icon buttons', async () => {
    await waitFor(() =>
      render(
        <UserProvider>
          <ProfileScreen navigation={null} />
        </UserProvider>
      )
    );

    expect(screen.getByText('Meine Chats')).toBeTruthy();
    expect(screen.getByText('Meine Anzeigen')).toBeTruthy();
  });

  it('should navigate to chat screen', async () => {
    render(
      <UserProvider>
        <ProfileScreen />
      </UserProvider>
    );

    const myChatsButton = screen.getByText('Meine Chats');
    fireEvent.press(myChatsButton);

    expect(navigateMock).toHaveBeenCalledWith('MyChats');
  });

  it('should navigate to newReport screen', async () => {
    render(
      <UserProvider>
        <ProfileScreen />
      </UserProvider>
    );

    const myChatsButton = screen.getByText('Meine Anzeigen');
    fireEvent.press(myChatsButton);

    expect(navigateMock).toHaveBeenCalledWith('MyReports');
  });
});

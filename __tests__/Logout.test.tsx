import 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { UserProvider, useUser } from '../src/hooks/useUser.tsx';
import { User } from '../src/types/user.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  removeItem: jest.fn((key: string) => Promise.resolve(null)),
}));

const userData: User = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Walter',
  lastName: 'White',
  username: 'walterwhite',
}

describe('UserProvider logout function', () => {
  it('should remove credentials, set isLoggedIn to false, and reset user state', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: UserProvider,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(userData),
        ok: true,
      }) as Promise<Response>
    );

    // Set initial state for testing
    await act(() => {
      result.current.login('lurchi@quakmail.de', 'lurch123');
    });

    await act(async () => {
      await result.current.logout();
    });

    // Check if removeItem was called with the correct key
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      'basicAuthCredentials',
    );

    // Check if isLoggedIn is set to false
    expect(result.current.isLoggedIn).toBe(false);

    // Check if user state is reset to null
    expect(result.current.user).toBeNull();
  });
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, act} from '@testing-library/react-native';
import {UserProvider, useUser} from '../src/hooks/useUser.tsx';
import {expect, it, describe} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('UserProvider logout function', () => {
  it('should remove credentials, set isLoggedIn to false, and reset user state', async () => {
    const {result} = renderHook(() => useUser(), {
      wrapper: UserProvider,
    });

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
            }) as Promise<Response>
        );

    // Set initial state for testing
    act(() => {
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

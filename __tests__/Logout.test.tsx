import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ProfileScreen from '../src/pages/profile/ProfileScreen.tsx';
import * as useUserModule from '../src/hooks/useUser';
import {jest, describe, it, expect} from '@jest/globals';

const mockUser = {
  id: '1',
  email: 'wal@test.de',
  firstName: 'Blauerwal',
  lastName: '24',
  username: 'blauerwal24',
};

const mockLogout = jest.fn();

jest.spyOn(useUserModule, 'useUser').mockReturnValue({
  user: mockUser,
  isPending: false,
  logout: mockLogout,
});

describe('ProfileScreen Logout', () => {
  it('calls logout function when logout button is pressed', async () => {
    const {getByText} = render(
      <useUserModule.UserProvider>
        <ProfileScreen />
      </useUserModule.UserProvider>,
    );

    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});

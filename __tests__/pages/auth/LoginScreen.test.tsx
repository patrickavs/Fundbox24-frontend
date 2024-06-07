import React from 'react';
import {describe, it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import LoginScreen from '../../../src/components/auth/LoginScreen.tsx';

describe('LoginScreen', () => {
  it('can login with correct credentials', () => {
    render(<LoginScreen />);
  });
});

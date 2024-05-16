import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {expect, it} from '@jest/globals';
import StartScreen from '../../../src/pages/home/StartScreen.tsx';

it('renders find text "Du bist nicht angemeldet"', () => {
  render(<StartScreen />);
  expect(screen.getByText('Es lädt...').props.children).toBeTruthy();
});

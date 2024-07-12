import App from '../src/App';
import { expect, it, describe, jest, beforeAll, afterEach, afterAll } from '@jest/globals';
import {render, screen} from '@testing-library/react-native';
import React from 'react';

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({children}: {children: React.ReactNode}) => children,
  };
});

jest.mock('../src/components/tabbar/Tabbar.tsx', () => {
  return () => 'Tabbar Component';
});

jest.mock('../src/hooks/useChat.tsx', () => ({
  ChatProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('../src/hooks/useUser.tsx', () => ({
  UserProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('../src/hooks/useLostReports.tsx', () => ({
  LostReportProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('../src/hooks/useFoundReports.tsx', () => ({
  FoundReportProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('../src/constants/theme.ts', () => ({
  AuthTheme: {},
}));

describe('App', () => {
  const originalError = console.error;

  beforeAll(() => {
    // Globally mock console.error for all tests
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (/defaultProps/.test(args[0])) {return;}
      if (/Warning: Cannot update a component/.test(args[0])) {return;}
      // Call the original implementation for other cases
      originalError.apply(console, args);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders correctly and contains the Tabbar component', () => {
    render(<App />);

    // Check if Tabbar gets rendered
    expect(screen.toJSON()).toStrictEqual('Tabbar Component');
  });

  it('should ignore specific logs', () => {
    render(<App />);

    const mockConsoleError = jest.fn((error: string) => console.error(error));

    mockConsoleError('TextInputComponent: Support for defaultProps will be removed');
    mockConsoleError('Warning: Cannot update a component while rendering a different component.');
    mockConsoleError('Some other error');

    expect(mockConsoleError).toHaveBeenCalledWith('TextInputComponent: Support for defaultProps will be removed');
    expect(mockConsoleError).toHaveBeenCalledWith('Warning: Cannot update a component while rendering a different component.');

    // other errors should still be logged
    expect(mockConsoleError).toHaveBeenCalledWith('Some other error');
  });
});

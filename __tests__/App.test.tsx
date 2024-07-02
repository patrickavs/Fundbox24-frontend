import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import {expect, it, describe, jest} from '@jest/globals';
import {render, screen} from '@testing-library/react-native';

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
  it('renders correctly and contains the Tabbar component', () => {
    render(<App />);

    // Check if Tabbar gets rendered
    expect(screen.toJSON()).toStrictEqual('Tabbar Component');
  });

  it('should ignore specific log warnings', () => {
    const logSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<App />);

    expect(logSpy).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'TextInputComponent: Support for defaultProps will be removed',
      ),
    );

    logSpy.mockRestore();
  });
});

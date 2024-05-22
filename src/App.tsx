import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabbar from './components/tabbar/Tabbar.tsx';
import { ChatProvider } from './hooks/useChat.tsx';
import { UserProvider } from './hooks/useUser.tsx';
import { LostReportProvider } from './hooks/useLostReports.tsx';
import { FoundReportProvider } from './hooks/useFoundReports.tsx';
import { AuthTheme } from './constants/theme.ts';
import { LogBox } from 'react-native';

function App(): React.JSX.Element {
  // ignore warning for React Native Dropdown
  LogBox.ignoreLogs([
    'TextInputComponent: Support for defaultProps will be removed',
  ]);

  return (
      <UserProvider>
        <LostReportProvider>
          <FoundReportProvider>
            <ChatProvider>
              <NavigationContainer theme={AuthTheme}>
                <Tabbar />
              </NavigationContainer>
            </ChatProvider>
          </FoundReportProvider>
        </LostReportProvider>
      </UserProvider>
  );
}

export default App;

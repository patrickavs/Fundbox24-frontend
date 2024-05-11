import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
import Tabbar from './components/tabbar/Tabbar.tsx';
import {ChatProvider} from './hooks/useChat.tsx';
import {UserProvider} from './hooks/useUser.tsx';
import {LostReportProvider} from './hooks/useLostReports.tsx';
import {FoundReportProvider} from './hooks/useFoundReports.tsx';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <UserProvider>
        <LostReportProvider>
          <FoundReportProvider>
            <ChatProvider>
              <NavigationContainer>
                <Tabbar />
              </NavigationContainer>
            </ChatProvider>
          </FoundReportProvider>
        </LostReportProvider>
      </UserProvider>
    </Provider>
  );
}

export default App;

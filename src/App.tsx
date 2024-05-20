import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
import Tabbar from './components/tabbar/Tabbar.tsx';
import {AuthTheme} from './constants/theme.ts';
import {LogBox} from 'react-native';

function App(): React.JSX.Element {
  // ignore warning for React Native Dropdown
  LogBox.ignoreLogs([
    'TextInputComponent: Support for defaultProps will be removed',
  ]);

  return (
    <Provider store={store}>
      <NavigationContainer theme={AuthTheme}>
        <Tabbar />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabbar from './components/tabbar/Tabbar.tsx';
import {AuthTheme} from './constants/theme.ts';
import {LogBox} from 'react-native';

function App(): React.JSX.Element {
  // ignore warning for React Native Dropdown
  LogBox.ignoreLogs([
    'TextInputComponent: Support for defaultProps will be removed',
  ]);

  return (
    <NavigationContainer theme={AuthTheme}>
      <Tabbar />
    </NavigationContainer>
  );
}

export default App;

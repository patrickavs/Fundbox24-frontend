import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
import Tabs from './components/tabs/Tabs.tsx';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
import Tabbar from './components/tabbar/Tabbar.tsx';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabbar />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

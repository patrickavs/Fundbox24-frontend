import React from 'react';
import SetPerimeterScreen from './map/SetPerimeterScreen.tsx';
import {Provider} from 'react-redux';
import store from './redux/store.ts';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SetPerimeterScreen />
    </Provider>
  );
}

export default App;

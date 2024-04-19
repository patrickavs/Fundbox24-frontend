import React from 'react';
import SetPerimeterScreen from './map/SetPerimeterScreen.tsx';
import {Provider} from 'react-redux';
import appStore from './redux/appStore.ts';

function App(): React.JSX.Element {
  return (
    <Provider store={appStore}>
      <SetPerimeterScreen />
    </Provider>
  );
}

export default App;

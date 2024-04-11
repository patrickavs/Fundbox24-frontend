import React from 'react';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  return <WebView source={{uri: 'https://reactnative.dev/'}} />;
}

export default App;

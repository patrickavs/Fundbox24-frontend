import React from 'react';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  return <WebView source={{html: '<p>Hallo Welt</p>'}} />;
}

export default App;

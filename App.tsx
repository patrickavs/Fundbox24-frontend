import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';

function App(): React.JSX.Element {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 50.3254386,
        longitude: 11.9384522,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;

import MapView, {Circle, LatLng} from 'react-native-maps';
import React from 'react';
import {StyleSheet} from 'react-native';

function MapComponent(): React.JSX.Element {
  const hofUniversityPosition: LatLng = {
    latitude: 50.3254386,
    longitude: 11.9384522,
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...hofUniversityPosition,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}>
      <Circle
        center={hofUniversityPosition}
        radius={700}
        fillColor="rgba(245, 39, 145, 0.3)"
        strokeWidth={0}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;

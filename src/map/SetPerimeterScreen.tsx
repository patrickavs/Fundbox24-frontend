import React from 'react';
import MapView, {LatLng} from 'react-native-maps';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Circle} from 'react-native-maps';
import {Slider} from '@miblanchard/react-native-slider';

function SetPerimeterScreen(): React.JSX.Element {
  const hofUniversityPosition: LatLng = {
    latitude: 50.3254386,
    longitude: 11.9384522,
  };

  return (
    <View style={styles.absoluteFill}>
      <MapView
        style={styles.absoluteFill}
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
      <View style={styles.controls}>
        <Slider />
        <Button title="Gegenstand melden" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    marginTop: 'auto',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default SetPerimeterScreen;

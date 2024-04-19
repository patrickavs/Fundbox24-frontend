import React from 'react';
import MapView, {LatLng} from 'react-native-maps';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Circle} from 'react-native-maps';
import {Slider} from '@miblanchard/react-native-slider';

const minRadius: number = 300;
const maxRadius: number = 3000;

function SetPerimeterScreen(): React.JSX.Element {
  const [radius, setRadius] = React.useState<number>(minRadius);

  const hofUniversityPosition: LatLng = {
    latitude: 50.3254386,
    longitude: 11.9384522,
  };

  function changeRadius(sliderValue: number) {
    const newRadius = minRadius + sliderValue * (maxRadius - minRadius);
    setRadius(newRadius);
  }

  function getFormattedDiameter(): string {
    return `${radius} m`;
  }

  return (
    // TODO: tap to change position of perimeter
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
          radius={radius}
          fillColor="rgba(245, 39, 145, 0.3)"
          strokeWidth={0}
        />
      </MapView>
      <View style={styles.controls}>
        <Text style={styles.diameterText}>{getFormattedDiameter()}</Text>
        <Slider value={0.5} onValueChange={value => changeRadius(value[0])} />
        <Button title="Gegenstand melden" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  diameterText: {
    textAlign: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    marginTop: 'auto',
    padding: 30,
    backgroundColor: 'white',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default SetPerimeterScreen;

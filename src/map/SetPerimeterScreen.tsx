import React from 'react';
import MapView, {Circle, LatLng} from 'react-native-maps';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

const minRadius: number = 300;
const maxRadius: number = 3000;

const initialPosition: LatLng = {
  latitude: 50.3254386,
  longitude: 11.9384522,
};

const numberFormat = Intl.NumberFormat('de-DE', {maximumFractionDigits: 1});

function SetPerimeterScreen(): React.JSX.Element {
  const [position, setPosition] = React.useState<LatLng>(initialPosition);
  const [radius, setRadius] = React.useState<number>(minRadius);

  function changeRadius(sliderValue: number) {
    const newRadius = minRadius + sliderValue * (maxRadius - minRadius);
    setRadius(newRadius);
  }

  function getFormattedDiameter(): string {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  }

  function changePosition(newPosition: LatLng) {
    setPosition(newPosition);
  }

  return (
    // TODO: tap to change position of perimeter
    <View style={styles.absoluteFill}>
      <MapView
        onPress={event => changePosition(event.nativeEvent.coordinate)}
        style={styles.absoluteFill}
        initialRegion={{
          ...position,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}>
        <Circle
          center={position}
          radius={radius}
          fillColor="rgba(245, 39, 145, 0.3)"
          strokeWidth={0}
        />
      </MapView>
      <View style={styles.controls}>
        <View>
          <Text style={styles.diameterText}>{getFormattedDiameter()}</Text>
          <Text style={styles.diameterLabel}>Umkreis</Text>
        </View>
        <Slider value={0.5} onValueChange={value => changeRadius(value[0])} />
        <Button title="Gegenstand melden" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  diameterLabel: {
    textAlign: 'center',
  },
  diameterText: {
    textAlign: 'center',
    fontSize: 20,
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

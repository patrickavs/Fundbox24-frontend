import React from 'react';
import MapView, {Circle, LatLng} from 'react-native-maps';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {useAppDispatch, useAppSelector} from '../redux/hooks.ts';
import constants from '../constants.ts';
import {
  changePosition,
  changeRadius,
  selectPosition,
  selectRadius,
} from './mapSlice.ts';

const numberFormat = Intl.NumberFormat('de-DE', {maximumFractionDigits: 1});

function SetPerimeterScreen(): React.JSX.Element {
  const position = useAppSelector(selectPosition);
  const radius = useAppSelector(selectRadius);

  const dispatch = useAppDispatch();

  function getFormattedDiameter(): string {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  }

  function onChangeRadius(sliderValue: number) {
    const newRadius =
      constants.minRadius +
      sliderValue * (constants.maxRadius - constants.minRadius);

    dispatch(changeRadius(newRadius));
  }

  function onChangePosition(newPosition: LatLng) {
    dispatch(changePosition(newPosition));
  }

  return (
    // TODO: tap to change position of perimeter
    <View style={styles.absoluteFill}>
      <MapView
        onPress={event => onChangePosition(event.nativeEvent.coordinate)}
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
        <Slider value={0.5} onValueChange={value => onChangeRadius(value[0])} />
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

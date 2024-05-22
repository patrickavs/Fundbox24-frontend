import React from 'react';
import MapView, {Circle, LatLng} from 'react-native-maps';
import {Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import mapConstants from '../../constants/map.ts';
import styles from './styles.ts';

const numberFormat = Intl.NumberFormat('de-DE', {maximumFractionDigits: 1});

export default function SetPerimeterScreen(): React.JSX.Element {
  const [position, setPosition] = React.useState<LatLng>(
    mapConstants.initialMapPosition,
  );

  const [radius, setRadius] = React.useState<number>(mapConstants.minRadius);

  function getFormattedDiameter(): string {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  }

  function onChangeRadius(sliderValue: number) {
    const newRadius =
      mapConstants.minRadius +
      sliderValue * (mapConstants.maxRadius - mapConstants.minRadius);

    setRadius(newRadius);
  }

  function onChangePosition(newPosition: LatLng) {
    setPosition(newPosition);
  }

  return (
    // TODO: tap to change position of perimeter
    <View style={[styles.absoluteFill, styles.marginToTabBar]}>
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
      </View>
    </View>
  );
}

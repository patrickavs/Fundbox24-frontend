import React from 'react';
import MapView, { Circle, LatLng } from 'react-native-maps';
import {Text, TouchableOpacity, View} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import mapConstants from '../../constants/map.ts';
import styles from './styles.ts';
import eventEmitter from '../eventEmitter.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const numberFormat = Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

export default function SetPerimeterScreen({navigation}): React.JSX.Element {
  const [position, setPosition] = React.useState<LatLng>(
    mapConstants.initialMapPosition,
  );

  const [radius, setRadius] = React.useState<number>(mapConstants.minRadius);
  //const [locationName, setLocationName] = React.useState<string>('');

  function getFormattedDiameter(): string {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  }

  function onChangeRadius(sliderValue: number) {
    const newRadius =
      mapConstants.minRadius +
      sliderValue * (mapConstants.maxRadius - mapConstants.minRadius);

    setRadius(newRadius);
    eventEmitter.emit('reportRadiusChange', newRadius);
  }

  async function onChangePosition(newPosition: LatLng) {
    setPosition(newPosition);
    eventEmitter.emit('reportPositionChange', newPosition);

    /*try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${newPosition.latitude}&lon=${newPosition.longitude}&format=json`);
      const data = await response.json();

      if (data && data.address) {
        const { city, town, village, hamlet, locality } = data.address;
        const name = city || town || village || hamlet || locality || 'Kein Ort gefunden';
        setLocationName(name);
        eventEmitter.emit('reportLocationNameChange', locationName);
      } else {
        setLocationName('Kein Ort gefunden');
      }
    } catch (error) {
      console.error(error);
      setLocationName('Fehler beim Abrufen des Ortsnamens');
    }*/
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
        <Slider value={0} onValueChange={value => onChangeRadius(value[0])} />
          <TouchableOpacity
              style={styles.iconButtonContainer}
              onPress={() =>
                  //@ts-ignore
                  navigation.goBack()
              } >
              <Ionicons name={'checkmark-outline'} style={styles.iconButton} />
          </TouchableOpacity>
      </View>
    </View>
  );
}

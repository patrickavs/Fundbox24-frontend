import React from 'react';
import MapView, {Circle, LatLng} from 'react-native-maps';
import {Text, TouchableOpacity, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import mapConstants from '../../constants/map.ts';
import styles from './styles.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

const numberFormat = Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

export default function SetHomePerimeterScreen({navigation}): React.JSX.Element {

  const route = useRoute();

  const [position, setPosition] = React.useState<LatLng>(
    route.params && route.params.homeLocation ? route.params.homeLocation : mapConstants.initialMapPosition,
  );

  const [radius, setRadius] = React.useState<number>(route.params && route.params.homeRadius ? route.params.homeRadius : mapConstants.minRadius,);
  //const [locationName, setLocationName] = React.useState<string>('');

  React.useEffect(() => {
        if (route.params) {
            const { homeLocation, homeRadius } = route.params;
            if(homeRadius != null) {setRadius(homeRadius);}
            if(homeLocation != null) {setPosition(homeLocation);}
        }
  }, [route.params]);

  function getFormattedDiameter(): string {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  }

  function onChangeRadius(sliderValue: number) {
      setRadius(sliderValue);
  }

  async function onChangePosition(newPosition: LatLng) {
    setPosition(newPosition);
  }

  return (
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
        <Slider
            minimumValue={mapConstants.minRadius}
            maximumValue={mapConstants.maxRadius}
            value={radius}
            step={1}
            onValueChange={value => onChangeRadius(value[0])} />
          <TouchableOpacity
              style={styles.iconButtonContainer}
              onPress={() =>
                  //@ts-ignore
                  navigation.navigate('Profile', { radius: radius, position: position })
              } >
              <Ionicons name={'checkmark-outline'} style={styles.iconButton} />
          </TouchableOpacity>
      </View>
    </View>
  );
}

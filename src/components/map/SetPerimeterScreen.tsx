import React, { useEffect, useCallback } from 'react';
import MapView, { Circle, LatLng } from 'react-native-maps';
import { Text, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import mapConstants from '../../constants/map';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const numberFormat = Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

export default function SetPerimeterScreen({ navigation }: { navigation: any }) {
  const route = useRoute<any>();
  const {
    lostPosition,
    foundPosition,
    collectPosition,
    lostRadius,
    collectRadius,
    reportType,
    type,
  } = route.params;

  const [location, setLocation] = React.useState<LatLng>(
    lostPosition || foundPosition || collectPosition || mapConstants.initialMapPosition
  );
  const [radius, setRadius] = React.useState<number>(
    lostRadius || mapConstants.minRadius
  );

  useEffect(() => {
    if (route.params) {
      if (lostPosition) {
        setLocation(lostPosition);
      }
      if (foundPosition) {
        setLocation(foundPosition);
      }
      if (collectPosition) {
        setLocation(collectPosition);
      }
      if (lostRadius) {
        setRadius(lostRadius);
      }
      if (collectRadius) {
        setRadius(collectRadius);
      }
    }
  }, [route.params]);

  const getFormattedDiameter = () => {
    const radiusInKM = radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  };

  const onChangeRadius = useCallback((sliderValue: number) => {
    const newRadius = mapConstants.minRadius + sliderValue * (mapConstants.maxRadius - mapConstants.minRadius);
    setRadius(newRadius);
  }, []);

  const onChangePosition = useCallback((newPosition: LatLng) => {
    setLocation(newPosition);
  }, []);

  const handleSave = () => {
    if (reportType === 'lost') {
      navigation.navigate('NewReport', {
        lostLocation: location,
        lostRadius: radius,
        reportType,
      });
    } else {
      if (type === 'found') {
        navigation.navigate('NewReport', {
          foundLocation: location,
          reportType,
          type,
        });
      } else {
        navigation.navigate('NewReport', {
          collectLocation: location,
          reportType,
          type,
        });
      }
    }
  };

  return (
    <View style={[styles.absoluteFill, styles.marginToTabBar]}>
      <MapView
        onPress={event => onChangePosition(event.nativeEvent.coordinate)}
        style={styles.absoluteFill}
        initialRegion={{
          ...location,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Circle
          center={location}
          radius={radius}
          fillColor="rgba(245, 39, 145, 0.3)"
          strokeWidth={0}
        />
      </MapView>
      <View style={styles.controls}>
        {reportType === 'lost' ? <View>
          <Text style={styles.diameterText}>{getFormattedDiameter()}</Text>
          <Text style={styles.diameterLabel}>Umkreis</Text>
        </View> : null}
        {reportType === 'lost' ? <Slider value={0} onValueChange={value => onChangeRadius(value[0])} /> :
          <View style={{ paddingBottom: 50 }} />}
        <TouchableOpacity style={styles.iconButtonContainer} onPress={handleSave}>
          <Ionicons name={'checkmark-outline'} style={styles.iconButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

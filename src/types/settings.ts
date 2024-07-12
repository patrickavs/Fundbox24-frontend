import {LatLng} from 'react-native-maps';

export type Settings = {
  sound: boolean;
  vibration: boolean;
  location: boolean;
  radius: number;
  position: LatLng | null;
};

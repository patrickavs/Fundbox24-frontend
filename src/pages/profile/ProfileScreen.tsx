import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import IconButton from '../../components/IconButton.tsx';
import CustomHeader from '../../components/CustomHeader.tsx';
import { Switch } from 'react-native';
import { useUser } from '../../hooks/useUser.tsx';
import useStorage from '../../hooks/useStorage.ts';
import { Settings } from '../../types/settings.ts';
import CustomButton from '../../components/CustomButton.tsx';
import {AuthTheme, LostReportTheme} from '../../constants/theme.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Slider} from '@miblanchard/react-native-slider';
import mapConstants from '../../constants/map';
import { useRoute } from '@react-navigation/native';
import {LatLng} from 'react-native-maps';

const defaultSettings: Settings = {
  sound: true,
  vibration: true,
  location: true,
  radius: mapConstants.minRadius,
  position: null,
};

const ProfileStyleSheet = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  inputIOS: {
    paddingVertical: 8,
  },
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  label: {
    color: 'black',
  },
  labelInputNonEditable: {
    marginBottom: 5,
    marginTop: 10,
  },
  container: {
    paddingHorizontal: 25,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  heading: {
    fontSize: 17,
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    textAlign: 'left',
  },
  notEditable: {
    color: 'darkgray',
    backgroundColor: '#eaeaea',
  },
  scrollView: {
    height: '100%',
  },
  iconButton: {
    margin: 5,
    padding: 8,
    color: 'white',
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: LostReportTheme.colors.button,
    borderRadius: 10,
    color: 'white',
    width: 50,
  },
    gray: {
        color: 'gray',
    },
    grayButton: {
        backgroundColor: 'lightgray',
    },
    sliderDisabled: {
        opacity: 0.5,
    },
});

function ProfileScreen({navigation}: {navigation: any}): React.JSX.Element {
  const { user, isPending, logout } = useUser(); //TODO: Implement a edit user function
  const [settings, setSettings] = useStorage('settings', defaultSettings);
  const [homeLocation, setHomeLocation] = React.useState<LatLng | null>(settings.position);
  const [homeRadius, setHomeRadius] = React.useState<number | null>(settings.radius);

  const route = useRoute<any>();

  React.useEffect(() => {
        if (route.params) {
        const { position, radius } = route.params;
        setHomeLocation(position);
        setHomeRadius(radius);
        setSettings({ ...settings, radius: radius, position: position });
        }
  }, [route.params]);

  React.useEffect(() => {
    if (settings.position) {
      setHomeLocation(settings.position);
    }
    if (settings.radius) {
      setHomeRadius(settings.radius);
    }
  }, [settings]);

  const onLogout = async () => {
    await logout();
  };

  const numberFormat = Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

  const getFormattedDiameter = () => {
    const radiusInKM = settings.radius / 1000;
    return `${numberFormat.format(radiusInKM)} km`;
  };

  return (
    <View>
      <CustomHeader title={'Mein Konto'} />
      <ScrollView style={ProfileStyleSheet.scrollView}>
      <View style={ProfileStyleSheet.container}>
        <Text style={ProfileStyleSheet.heading}>Persönliche Daten</Text>
        <View>
          <Text style={[ProfileStyleSheet.label, ProfileStyleSheet.labelInputNonEditable]}>Email</Text>
          <TextInput
            testID="input-email"
            placeholder={'max.mustermann@gmx.com'}
            value={user?.email}
            style={[ProfileStyleSheet.input, ProfileStyleSheet.notEditable, Platform.OS === 'android' ? null : ProfileStyleSheet.inputIOS]}
            editable={false}
          />
        </View>
        <View>
          <Text style={[ProfileStyleSheet.label, ProfileStyleSheet.labelInputNonEditable]}>Username</Text>
          <TextInput
            testID="input-username"
            placeholder={'lilakuh55'}
            value={user?.username}
            style={[ProfileStyleSheet.input, ProfileStyleSheet.notEditable, Platform.OS === 'android' ? null : ProfileStyleSheet.inputIOS]}
            editable={false}
          />
        </View>
        <View style={ProfileStyleSheet.buttonContainer}>
          <IconButton title={'Meine Chats'} />
          <IconButton title={'Meine Anzeigen'} />
        </View>
        <Text style={ProfileStyleSheet.heading}>Benachrichtigungen</Text>
        <View style={ProfileStyleSheet.input}>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Ton</Text>
            <Switch
              testID="switch-sound"
              value={settings.sound}
              onValueChange={value =>
                setSettings({ ...settings, sound: value })
              }
            />
          </View>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Vibration</Text>
            <Switch
              testID="switch-vibration"
              value={settings.vibration}
              onValueChange={value =>
                setSettings({ ...settings, vibration: value })
              }
            />
          </View>
        </View>
        <Text style={ProfileStyleSheet.heading}>Heimatumkreis</Text>
        <View style={ProfileStyleSheet.input}>
          <View style={[ProfileStyleSheet.horizontalContainer]}>
            <Text style={ProfileStyleSheet.label}>Standort verwenden</Text>
            <Switch
              style={ProfileStyleSheet.switch}
              testID="switch-location"
              value={settings.location}
              onValueChange={value =>{
                setSettings({ ...settings, location: value });}
              }
            />
          </View>
          <View style={[ProfileStyleSheet.horizontalContainer]}>
            <Text style={[ProfileStyleSheet.label, !settings.location ? ProfileStyleSheet.gray : null]}>Standort-Radius:</Text>
            <Text style={[ProfileStyleSheet.label, !settings.location ? ProfileStyleSheet.gray : null]}>{getFormattedDiameter()}</Text>
          </View>
          <Slider
              minimumValue={mapConstants.minRadius}
              maximumValue={mapConstants.maxRadius}
              value={settings.radius}
              step={1}
              disabled={!settings.location}
              thumbTintColor={settings.location ? '#000000' : '#9d9d9d'}
              minimumTrackTintColor={settings.location ? '#000000' : '#9f9f9f'}
              onValueChange={
                  value =>
                  {
                    setSettings(
                        { ...settings, radius: value[0] } );
                    }
              } />
          <View style={[ProfileStyleSheet.horizontalContainer]}>
            <Text style={[ProfileStyleSheet.label, settings.location ? ProfileStyleSheet.gray : null]}>Heimatumkreis einstellen:</Text>
            <TouchableOpacity
                style={[ProfileStyleSheet.button2, settings.location ? ProfileStyleSheet.grayButton : null]}
                disabled={settings.location}
                onPress={ !settings.location ? () =>
                    //@ts-ignore
                    navigation.navigate('Map', {homeRadius: homeRadius, homeLocation: homeLocation}) : () => {}
                } >
              <Ionicons name={'map'} style={ProfileStyleSheet.iconButton} testID={'map'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <CustomButton
            label={'Logout'}
            testID="button-logout"
            onPress={onLogout}
            backgroundColor={AuthTheme.colors.secondaryBackground}
            fontSize={17}
          />
        </View>
      </View>
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

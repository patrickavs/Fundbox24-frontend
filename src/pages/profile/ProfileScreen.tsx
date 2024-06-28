import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import IconButton from '../../components/IconButton.tsx';
import CustomHeader from '../../components/CustomHeader.tsx';
import { Switch } from 'react-native';
import { useUser } from '../../hooks/useUser.tsx';
import useStorage from '../../hooks/useStorage.ts';
import { Settings } from '../../types/settings.ts';
import CustomButton from '../../components/CustomButton.tsx';
import { AuthTheme } from '../../constants/theme.ts';

const defaultSettings: Settings = {
  sound: true,
  vibration: true,
  location: true,
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
    fontSize: 16,
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
});

function ProfileScreen(): React.JSX.Element {
  const { user, isPending, logout } = useUser(); //TODO: Implement a edit user function
  const [settings, setSettings] = useStorage('settings', defaultSettings);

  const onLogout = async () => {
    await logout();
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
              testID='switch-sound'
              value={settings.sound}
              onValueChange={value =>
                setSettings({ ...settings, sound: value })
              }
            />
          </View>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Vibration</Text>
            <Switch
              testID='switch-vibration'
              value={settings.vibration}
              onValueChange={value =>
                setSettings({ ...settings, vibration: value })
              }
            />
          </View>
        </View>
        <View style={[ProfileStyleSheet.input, ProfileStyleSheet.horizontalContainer]}>
          <Text style={ProfileStyleSheet.label}>Standort verwenden</Text>
          <Switch
            style={ProfileStyleSheet.switch}
            testID='switch-location'
            value={settings.location}
            onValueChange={value =>
              setSettings({ ...settings, location: value })
            }
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <CustomButton
            label={'Logout'}
            testID='button-logout'
            onPress={onLogout}
            backgroundColor={AuthTheme.colors.secondaryBackground}
            fontSize={17}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

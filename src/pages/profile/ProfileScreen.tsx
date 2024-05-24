import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import {Switch} from 'react-native';
import {useUser} from '../../hooks/useUser.tsx';
import useStorage from '../../hooks/useStorage.ts';
import {Settings} from '../../types/settings.ts';

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
    paddingHorizontal: 14
  },
  label: {
    color: "black"
  },
  container: {
    paddingHorizontal: 25,
    marginTop: 20
  },
  heading: {
    fontSize: 16
  },
  switch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 5,
  }
})

function ProfileScreen(): React.JSX.Element {
  const {user, isPending} = useUser(); //TODO: Implement a edit user function
  const [settings, setSettings] = useStorage('settings', defaultSettings);

  return (
    <View>
      <CustomHeader title={'Mein Konto'} />
      <View style={ProfileStyleSheet.container}>
        <Text style={ProfileStyleSheet.heading}>Persönliche Daten</Text>
        <View>
          <Text style={ProfileStyleSheet.label}>Email</Text>
          <TextInput
            placeholder={'max.mustermann@gmx.com'}
            value={user?.email}
            style={ProfileStyleSheet.input}
            editable={false}
          />
        </View>
        <View>
          <Text style={ProfileStyleSheet.label}>Username</Text>
          <TextInput
            placeholder={'lilakuh55'}
            value={user?.username}
            style={ProfileStyleSheet.input}
            editable={false}
          />
        </View>
        <View>
          <Button title={'Meine Chats'} />
          <Button title={'Meine Anzeigen'} />
        </View>
        <Text>Benachrichtigungen</Text>
        <View style={ProfileStyleSheet.input}>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Ton</Text>
            <Switch
              value={settings.sound}
              onChange={event =>
                setSettings({...settings, sound: !settings.sound})
              }
            />
          </View>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Vibration</Text>
            <Switch
              value={settings.vibration}
              onChange={event =>
                setSettings({...settings, vibration: !settings.vibration})
              }
            />
          </View>
        </View>
        <View style={ProfileStyleSheet.input}>
          <Text style={ProfileStyleSheet.label}>Standort verwenden</Text>
          <Switch
            value={settings.location}
            onChange={event =>
              setSettings({...settings, location: !settings.location})
            }
          />
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

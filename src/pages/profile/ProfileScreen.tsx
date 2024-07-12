import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import IconButton from '../../components/IconButton.tsx';
import CustomHeader from '../../components/CustomHeader.tsx';
import { Switch } from 'react-native';
import { useUser } from '../../hooks/useUser.tsx';
import useStorage from '../../hooks/useStorage.ts';
import { Settings } from '../../types/settings.ts';
import CustomButton from '../../components/CustomButton.tsx';
import { AuthTheme } from '../../constants/theme.ts';
import { useNavigation } from '@react-navigation/native';

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
  label: {
    color: 'black',
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
});

function ProfileScreen(): React.JSX.Element {
  const { user, isPending, logout } = useUser(); //TODO: Implement a edit user function
  const [settings, setSettings] = useStorage('settings', defaultSettings);

  const navigation = useNavigation();

  const onLogout = async () => {
    await logout();
  };

  return (
    <View>
      <CustomHeader title={'Mein Konto'} />
      <View style={ProfileStyleSheet.container}>
        <Text style={ProfileStyleSheet.heading}>Persönliche Daten</Text>
        <View>
          <Text style={ProfileStyleSheet.label}>Email</Text>
          <TextInput
            testID="input-email"
            placeholder={'max.mustermann@gmx.com'}
            value={user?.email}
            style={ProfileStyleSheet.input}
            editable={false}
          />
        </View>
        <View>
          <Text style={ProfileStyleSheet.label}>Username</Text>
          <TextInput
            testID="input-username"
            placeholder={'lilakuh55'}
            value={user?.username}
            style={ProfileStyleSheet.input}
            editable={false}
          />
        </View>
        <View style={ProfileStyleSheet.buttonContainer}>
          <IconButton title={'Meine Chats'} onPress={() => {
            navigation.navigate('Chat');
          }} />
          <IconButton title={'Meine Anzeigen'} />
        </View>
        <Text style={ProfileStyleSheet.heading}>Benachrichtigungen</Text>
        <View style={ProfileStyleSheet.input}>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Ton</Text>
            <Switch
              value={settings.sound}
              onChange={event =>
                setSettings({ ...settings, sound: !settings.sound })
              }
            />
          </View>
          <View style={ProfileStyleSheet.switch}>
            <Text style={ProfileStyleSheet.label}>Vibration</Text>
            <Switch
              value={settings.vibration}
              onChange={event =>
                setSettings({ ...settings, vibration: !settings.vibration })
              }
            />
          </View>
        </View>
        <View style={ProfileStyleSheet.input}>
          <Text style={ProfileStyleSheet.label}>Standort verwenden</Text>
          <Switch
            value={settings.location}
            onChange={event =>
              setSettings({ ...settings, location: !settings.location })
            }
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <CustomButton
            label={'Logout'}
            onPress={onLogout}
            backgroundColor={AuthTheme.colors.secondaryBackground}
            fontSize={17}
          />
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

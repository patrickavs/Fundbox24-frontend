import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import CustomHeader from "../../components/CustomHeader.tsx";
import {Switch} from "react-native";
import {useUser} from "../../hooks/useUser.tsx";
import useStorage from "../../hooks/useStorage.ts";
import {Settings} from "../../types/settings.ts";

const defaultSettings: Settings = {
    sound: true,
    vibration: true,
    location: true
}

// TODO: Do not use the ReactNative Checkbox. Use a community version instead.
function ProfileScreen(): React.JSX.Element {
    const {user, editUser, isPending} = useUser(); //TODO: Implement a edit user function
    const [settings, setSettings] = useStorage("settings", defaultSettings)

    return (
        <View>
          <CustomHeader title={"Mein Konto"}/>
            <Text>Persönliche Daten</Text>
            <View>
                <Text>Email</Text>
                <TextInput
                    placeholder={"max.mustermann@gmx.com"}
                    value={user?.email}
                    editable={isPending}
                    onSubmitEditing={(event) => editUser({email: event.nativeEvent.text})}
                />
            </View>
            <View>
                <Text>Username</Text>
                <TextInput
                    placeholder={"lilakuh55"}
                    value={user?.username}
                    editable={isPending}
                    onSubmitEditing={(event) => editUser({username: event.nativeEvent.text})}
                />
            </View>
            <View>
                <Button title={"Meine Chats"}/>
                <Button title={"Meine Anzeigen"}/>
            </View>
            <Text>Benachrichtigungen</Text>
            <View>
                <View>
                    <Text>Ton</Text>
                    <Switch
                        value={settings.sound}
                        onChange={event => setSettings(prev => ({...prev, sound: !prev.sound}))}
                    />
                </View>
                <View>
                    <Text>Vibration</Text>
                    <Switch
                        value={settings.vibration}
                        onChange={event => setSettings(prev => ({...prev, vibration: !prev.vibration}))}
                    />
                </View>
            </View>
            <View>
                <Text>Standort verwenden</Text>
                <Switch
                    value={settings.location}
                    onChange={event => setSettings(prev => ({...prev, location: !prev.location}))}
                />
            </View>
        </View>
    );
}

export default ProfileScreen;

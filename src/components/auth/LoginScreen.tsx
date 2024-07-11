import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert, StyleSheet, TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import '../../assets/images/login.png';

import CustomButton from '../CustomButton.tsx';
import InputField from '../InputField.tsx';
import {useNavigation} from '@react-navigation/native';
import {AuthTheme} from '../../constants/theme.ts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useUser} from '../../hooks/useUser.tsx';
import Config from 'react-native-config';

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();

  const [email, setEmail] = useState(Config.INITIAL_EMAIL ?? '');
  const [password, setPassword] = useState(Config.INITIAL_PASSWORD ?? '');

  const {login} = useUser();

  function onLogin() {
    if (email === '' || password === '') {
      Alert.alert('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    login(email, password);

    setEmail('');
    setPassword('');
  }

  const handleRegisterPress = () => {
    // TODO: Define screen names!
    // @ts-ignore
    navigation.navigate('Register');
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/login.png')}
            style={{width: 330, height: 250, bottom: 60, borderRadius: 10}}
          />
        </View>

          <View style={styles.container}>
              <View>
                  <Text
                      style={{
                          fontSize: 28,
                          textAlign: 'center',
                          color: '#333',
                          marginBottom: 70,
                          marginTop: -30,
                      }}>
                      Login
                  </Text>
                  <View style={styles.containerIcon}>
                      <Ionicons name="at-outline" size={20} color="#666" marginTop={10} marginRight={8}/>
                      <TextInput
                          style={styles.input}
                          placeholder={'E-Mail                            '}
                          keyboardType="email-address"
                          fieldButtonLabel={''}
                          value={email}
                          onChangeText={text => {
                              setEmail(text);
                          }}
                      />
                  </View>
                  <View style={styles.containerIcon}>
                      <Icon
                          name="lock"
                          size={20}
                          color="#666"
                          style={{marginTop: 38, marginRight: 14}}
                      />
                      <TextInput
                          style={styles.input2}
                          placeholder={'Passwort'}
                          inputType="password"
                          keyboardType={'visible-password'}
                          fieldButtonLabel={''}
                          value={password}
                          onChangeText={text => {
                              setPassword(text);}}
                          fieldButtonFunction={() => {}}
                      />
                  </View>
              </View>
          </View>

        <CustomButton
          testID="LoginButton"
          label={'Einloggen'}
          onPress={onLogin}
          backgroundColor={AuthTheme.colors.secondaryBackground}
          fontSize={16}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Noch keinen Account bei uns?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={{color: 'blue', fontWeight: '700'}}>
              {' '}
              Registriere dich hier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 180,
    },
    input2: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 245,
        marginTop: 30,
    },
    containerIcon:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -25,
    },
    label: {
        color: 'black',
            padding: 8,
    },
        container: {
            paddingHorizontal: 25,
            marginBottom: 20,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        heading: {
            fontSize: 17,
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

export default LoginScreen;

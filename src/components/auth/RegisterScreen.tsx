import React, {useCallback, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image, TextInput, StyleSheet,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';

import '../../assets/images/login.png';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';
import {AuthTheme} from '../../constants/theme.ts';
import {useUser} from '../../hooks/useUser.tsx';
import {RegisterUserCredentials} from '../../types/user.ts';
import Icon from "react-native-vector-icons/FontAwesome";

const defaultRegisterCredentials: RegisterUserCredentials = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
};

type RegistrationErrorMap = {
  password?: Error;
  fetch?: Error;
};

// TODO: Zeige dem Benutzer alle Fehler mit registerErrorMap an
function RegisterScreen() {
  const navigation = useNavigation();
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [registerUserData, setRegisterUserData] =
    useState<RegisterUserCredentials>(defaultRegisterCredentials);
  const [registerErrorMap, setRegisterErrorMap] =
    useState<RegistrationErrorMap>({});
  const {register} = useUser();

  const registerCallback = useCallback(
    (userCredentials: RegisterUserCredentials) => {
      const {password, passwordRepeat} = userCredentials;

      if (password !== passwordRepeat) {
        setRegisterErrorMap(prev => ({
          ...prev,
          password: new Error('Die Passwörter sind nicht gleich'),
        }));
        return;
      }

      register(userCredentials).catch(error =>
        setRegisterErrorMap(prev => ({...prev, fetch: error})),
      );
    },
    [],
  );

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25, marginBottom: 50}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/register.png')}
            style={{
              width: 300,
              height: 250,
              bottom: 30,
              marginTop: 20,
              borderRadius: 10,
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            textAlign: 'center',
          }}>
          Registrieren
        </Text>

        <View>
          {registerErrorMap.password && (
            <Text>{registerErrorMap.password?.message}</Text>
          )}
          {registerErrorMap.fetch && (
            <Text>{registerErrorMap.fetch?.message}</Text>
          )}
        </View>

          <View style={styles.containerIcon}>
              <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{marginTop: 38, marginRight: 14}}
              />

              <TextInput
                  style={styles.input}
                  testID="input-name"
                  placeholder={'Name'}
                  inputType="name"
                  fieldButtonLabel={''}
                  value={registerUserData.name}
                  onChangeText={name => setRegisterUserData(prev => ({...prev, name}))}
              />
          </View>
          <View style={styles.containerIcon}>
              <Ionicons
                  name="at-outline"
                  size={20}
                  color="#666"
                  style={{marginTop: 38, marginRight: 14}}
              />

              <TextInput
                  style={styles.input2}
                  testID="input-email"
                  placeholder={'E-Mail'}
                  inputType="name"
                  keyboardType="email-address"
                  fieldButtonLabel={''}
                  value={registerUserData.email}
                  onChangeText={email =>
                      setRegisterUserData(prev => ({...prev, email}))
                  }
              />
          </View>
          <View style={styles.containerIcon}>
              <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{marginTop: 38, marginRight: 14}}
              />

              <TextInput
                  style={styles.input4}
                  testID="input-password"
                  placeholder={'Passwort'}
                  inputType="password"
                  keyboardType="email-address"
                  fieldButtonLabel={''}
                  value={registerUserData.password}
                  onChangeText={password =>
                      setRegisterUserData(prev => ({...prev, password}))
                  }
              />
          </View>
          <View style={styles.containerIcon}>
              <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{marginTop: 38, marginRight: 14}}
              />

              <TextInput
                  style={styles.input3}
                  testID="input-password-repeat"
                  placeholder={'Bestätige dein Passwort'}
                  inputType="password"
                  keyboardType="email-address"
                  fieldButtonLabel={''}
                  value={registerUserData.passwordRepeat}
                  onChangeText={passwordRepeat =>
                      setRegisterUserData(prev => ({...prev, passwordRepeat}))
                  }
              />
          </View>


        <CustomButton
          label={'Registrieren'}
          testID="button-register"
          onPress={() => registerCallback(registerUserData)}
          backgroundColor={AuthTheme.colors.secondaryBackground}
          fontSize={16}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Schon registriert?</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            testID="back-button">
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Einloggen </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 245,
        marginTop: 30,
        marginBottom: -10,
    },
    input2: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 245,
        marginTop: 30,
        marginBottom: -10,
    },
    input3: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 130,
        marginTop: 30,
        marginBottom: 30,
    },
    input4: {
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 4,
        paddingLeft: 30,
        paddingRight: 225,
        marginTop: 30,
        marginBottom: -10,
    },
    containerIcon:{
        display: 'flex',
        flexDirection: 'row',
    },
});

export default RegisterScreen;

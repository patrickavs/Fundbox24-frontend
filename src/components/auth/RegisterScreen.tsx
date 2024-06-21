import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';

import '../../assets/images/login.png';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AuthTheme } from '../../constants/theme.ts';
import { useUser } from '../../hooks/useUser.tsx';
import { RegisterUserCredentials } from '../../types/user.ts';

const defaultRegisterCredentials: RegisterUserCredentials = {
  name: "",
  email: "",
  password: "",
  passwordRepeat: ""
}

// TODO: Zeige dem Benutzer alle Fehler mit registerErrorMap an
function RegisterScreen() {
  const navigation = useNavigation();
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [registerUserData, setRegisterUserData] = useState<RegisterUserCredentials>(defaultRegisterCredentials)
  const [registerErrorMap, setRegisterErrorMap] = useState<Map<string, Error>>(new Map())
  const { register } = useUser();

  const registerCallback = useCallback((userCredentials: RegisterUserCredentials) => {
    const { password, passwordRepeat } = userCredentials;

    if (password !== passwordRepeat) {
      setRegisterErrorMap(prev => ({ ...prev, password: new Error("Die Passwörter sind nicht gleich") }))
      return;
    }

    register(userCredentials).catch(error => setRegisterErrorMap(prev => ({ ...prev, "fetch": error })))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginBottom: 50 }}>
        <View style={{ alignItems: 'center' }}>
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
          }}>
          Registrieren
        </Text>

        <InputField
          placeholder={'Name'}
          icon={<Ionicons name="person-outline" size={20} color="#666" />}
          value={registerUserData.name}
          onChangeText={(name) => setRegisterUserData(prev => ({ ...prev, name }))}
        />

        <InputField
          testID='input-email'
          placeholder={'E-Mail'}
          icon={<Ionicons name="at-outline" size={20} color="#666" />}
          keyboardType="email-address"
          value={registerUserData.email}
          onChangeText={(email) => setRegisterUserData(prev => ({ ...prev, email }))}
        />

        <InputField
          testID='input-password'
          placeholder={'Passwort'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginLeft: -5 }}
            />
          }
          inputType="password"
          value={registerUserData.password}
          onChangeText={(password) => setRegisterUserData(prev => ({ ...prev, password }))}
        />

        <InputField
          placeholder={'Bestätige dein Passwort'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginLeft: -5 }}
            />
          }
          testID='input-password-repeat'
          inputType="password"
          value={registerUserData.passwordRepeat}
          onChangeText={(passwordRepeat) => setRegisterUserData(prev => ({ ...prev, passwordRepeat }))}
        />

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginLeft: 2 }}
          />
          <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
            <Text style={{ color: '#666', marginLeft: 5, marginTop: 4 }}>
              {registerUserData.date?.toLocaleDateString() ?? new Date().toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={datePickerOpen}
          date={registerUserData.date ?? new Date()}
          mode={'date'}
          onConfirm={date => {
            setDatePickerOpen(false);
            setRegisterUserData(prev => ({ ...prev, date }))
          }}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
        />

        <CustomButton
          label={'Register'}
          testID='register-button'
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

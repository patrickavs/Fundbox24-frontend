import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
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

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          placeholder={'E-Mail'}
          icon={<Ionicons name="at-outline" size={20} color="#666" />}
          keyboardType="email-address"
          fieldButtonLabel={''}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />

        <InputField
          placeholder={'Passwort'}
          icon={
            <Icon
              name="lock"
              size={20}
              color="#666"
              style={{marginLeft: -5, marginRight: 8}}
            />
          }
          inputType="password"
          keyboardType={'visible-password'}
          fieldButtonFunction={() => {}}
          fieldButtonLabel={''}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />

        <CustomButton
          testID="LoginButton"
          label={'Login'}
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
            <Text style={{color: '#AD40FF', fontWeight: '700'}}>
              {' '}
              Registriere dich hier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

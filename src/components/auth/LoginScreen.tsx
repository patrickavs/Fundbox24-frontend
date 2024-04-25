import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import '../../assets/images/login.png';

import CustomButton from '../CustomButton.tsx';
import InputField from '../InputField.tsx';
import {useNavigation} from '@react-navigation/native';

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
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
          label={'E-Mail'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          fieldButtonLabel={'E-Mail'}
          inputType={'email-address'}
        />

        <InputField
          label={'Passwort'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          keyboardType={'visible-password'}
          fieldButtonLabel={'Vergessen?'}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={'Login'} onPress={() => {}} />

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

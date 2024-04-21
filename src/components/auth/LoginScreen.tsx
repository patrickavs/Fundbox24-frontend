import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import '../../assets/images/login.jpg';

import CustomButton from '../CustomButton.tsx';
import InputField from '../InputField.tsx';
import {useNavigation} from '@react-navigation/native';

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/login.jpg')}
            style={{width: 250, height: 200, bottom: 60, borderRadius: 25}}
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
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={'Login'} onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Doesn't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StartScreen')}>
            <Text style={{color: '#AD40FF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

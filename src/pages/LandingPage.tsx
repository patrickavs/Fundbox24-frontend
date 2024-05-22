import React from 'react';
import {View, Image} from 'react-native';
import CustomHeader from '../components/CustomHeader.tsx';
import CustomButton from '../components/CustomButton.tsx';
import {useNavigation} from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomHeader title="Noch kein Konto?" />
      <Image
        style={{width: 350, height: 350, marginHorizontal: 30}}
        source={require('../assets/images/landingPage.jpg')}
      />
      <View>
        <CustomButton
          label="Anmelden"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        />
        <CustomButton
          label="Registrieren"
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}
        />
      </View>
    </View>
  );
};


export default LandingPage;

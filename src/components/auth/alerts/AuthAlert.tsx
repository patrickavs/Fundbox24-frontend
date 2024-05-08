import React from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import CustomHeader from '../../CustomHeader.tsx';
import CustomButton from '../../CustomButton.tsx';
import InputField from '../../InputField.tsx';

function AuthAlert(
  headerTitle: string = 'HeaderTitle',
  text: string = 'Whats up',
  buttonTitle: string = 'Click me',
  textField: boolean,
) {
  return (
    <View style={styles.container}>
      <CustomHeader title={headerTitle} />
      {text}
      {textField ? (
        <InputField
          label={''}
          icon={undefined}
          inputType={'text'}
          keyboardType={'default'}
          fieldButtonLabel={''}
        />
      ) : (
        <></>
      )}
      <CustomButton label={buttonTitle} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthAlert;

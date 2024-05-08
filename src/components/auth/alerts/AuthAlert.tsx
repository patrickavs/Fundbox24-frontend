import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Header from '../../Header.tsx';
import CustomButton from '../../CustomButton.tsx';

function AuthAlert(
  headerTitle: string = 'HeaderTitle',
  text: string = 'Whats up',
  buttonTitle: string = 'Click me',
  textField?: boolean,
): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Header title={headerTitle} />
      <Text>{text}</Text>
      <TextInput style={{opacity: textField ? 1 : 0}} />
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

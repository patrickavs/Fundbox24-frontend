import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../CustomHeader.tsx';
import CustomButton from '../../CustomButton.tsx';
import {AuthTheme, PopUpTheme} from '../../../constants/theme.ts';

function AuthAlert({
  headerTitle = 'Vielen Dank!',
  text = 'Ajskdakdshajshdajkd hsuienfjdnvsdjvnsaiun sdjknvsvsdc sjkcnjdcnjsnj dashdioefnwenfjnfwkefwejfoiwemkemfwkfemweklfmwklfmwkf',
  buttonTitle = 'Alles klar!',
  textField,
  textInputPlaceholder,
  linkTitle,
}: {
  headerTitle: string;
  text: string;
  buttonTitle: string;
  textField?: boolean;
  textInputPlaceholder?: string;
  linkTitle?: string;
}) {
  return (
    <View style={styles.container}>
      <CustomHeader title={headerTitle} />
      <Text style={styles.text}>{text}</Text>
      {textField !== undefined ? (
        <TextInput
          style={styles.textInput}
          placeholder={textInputPlaceholder}
        />
      ) : (
        <></>
      )}
      <View style={styles.button}>
        <CustomButton
          label={buttonTitle}
          onPress={() => {
            console.log('pressed button!');
          }}
          backgroundColor={AuthTheme.colors.secondaryBackground}
          fontSize={16}
        />
      </View>
      {linkTitle !== undefined ? (
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.linkText}>{linkTitle}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    color: 'black',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: AuthTheme.colors.accentPrimary,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 4,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  linkText: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default AuthAlert;

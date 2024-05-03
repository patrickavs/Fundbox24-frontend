import React from 'react';
import {Button, TextInput, Text} from 'react-native';

// TODO: change to real header
function AuthAlert(
  header: any,
  text: Text,
  buttonTitle: string,
  textField?: TextInput,
): React.JSX.Element {
  return (
    <>
      {header}
      {text}
      {textField}
      <Button title={buttonTitle} />
    </>
  );
}

export default AuthAlert;

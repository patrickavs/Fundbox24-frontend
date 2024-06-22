import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextInputProps,
  GestureResponderEvent,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  inputType?: "text" | "email-address" | "password",
  icon?: any,
  fieldButtonFunction?: ((event: GestureResponderEvent) => void),
  fieldButtonLabel?: string
}

function InputField(props: InputFieldProps) {
  const {inputType, icon, fieldButtonFunction, fieldButtonLabel} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        paddingHorizontal: inputType === 'password' ? 5 : 0,
      }}>
      {icon}
      <TextInput
        {...props}
        style={{flex: 1, paddingVertical: 0}}
        secureTextEntry={inputType === 'password'}
      />
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40FF', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default InputField;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
}: {
  label: string;
  icon: any;
  inputType?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  value: string;
  onChangeText?: (text: string) => void;
}) {
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
        value={value}
        placeholder={label}
        keyboardType={keyboardType}
        style={{flex: 1, paddingVertical: 0}}
        secureTextEntry={inputType === 'password'}
        onChangeText={onChangeText}
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

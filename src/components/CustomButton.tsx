import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AuthTheme} from '../constants/theme';

export default function CustomButton({
  label,
  onPress,
  backgroundColor,
  fontSize,
  disabled = false,
  testID,
}: {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  fontSize: number;
  disabled?: boolean;
  testID?: string;
}) {
  return (
    <TouchableOpacity
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor:
          backgroundColor || AuthTheme.colors.secondaryBackground,
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 30,
        minWidth: 140,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: fontSize,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

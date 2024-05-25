import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AuthTheme} from '../constants/theme';

export default function CustomButton({
  label,
  onPress,
  backgroundColor,
  fontSize,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  fontSize: number;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor:
          backgroundColor || AuthTheme.colors.secondaryBackground,
        padding: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginBottom: 30,
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

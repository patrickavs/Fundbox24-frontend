import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AuthTheme} from '../constants/theme.ts';

export default function CustomButton({
  label,
  onPress, color,
}: {
  label: string;
  onPress: () => void;
  color?: string;
}) {
  return (

    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color || AuthTheme.colors.secondaryBackground,
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 30,
        minWidth: 140,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '400',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

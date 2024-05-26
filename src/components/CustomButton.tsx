import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({
  label,
  onPress,
  backgroundColor,
  fontSize,
}: {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  fontSize: number;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        padding: 20,
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

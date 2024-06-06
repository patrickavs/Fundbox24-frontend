import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps extends TouchableOpacityProps {
    title: string;
};

export default function IconButton(props: IconButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 14,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 14,
          color: 'black',
        }}>
        {props.title}
      </Text>
      <Ionicons
        name='chevron-forward-outline'
        size={16}
      />
    </TouchableOpacity>
  );
}

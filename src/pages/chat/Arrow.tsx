import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string;
  pointingLeft: boolean,
}

export default function Arrow(props: Props) {
  const leftArrowStyle = {
    borderLeftColor: 'transparent',
    borderRightColor: props.color,
    transform: [
      { translateX: 5 },
    ],
  };

  const rightArrowStyle = {
    borderRightColor: 'transparent',
    borderLeftColor: props.color,
    transform: [
      { translateX: -5 },
    ],
  };

  return (
    <View style={[styles.arrow, props.pointingLeft ? leftArrowStyle : rightArrowStyle]} />
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 0,
    height: 0,
    borderWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

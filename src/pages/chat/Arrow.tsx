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
      { translateX: 3 },
    ],
  };

  const rightArrowStyle = {
    borderRightColor: 'transparent',
    borderLeftColor: props.color,
    transform: [
      { translateX: -3 },
    ],
  };

  return (
    <View style={[styles.arrow, props.pointingLeft ? leftArrowStyle : rightArrowStyle]} />
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 20,
    width: 0,
    height: 0,
    borderWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

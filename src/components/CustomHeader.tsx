import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthTheme} from '../constants/theme.ts';

function CustomHeader({
  title = 'dajsdhajds',
  backgroundColor = AuthTheme.colors.accentSecondary,
  isSmall = false,
}: {
  title: string;
  backgroundColor?: string;
  isSmall?: boolean;
}): React.JSX.Element {
  return (
    <>
      <View style={[styles.container, isSmall ? styles.smallStyle : null, {backgroundColor}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    elevation: 5,
  },
  smallStyle: {
    height: 30,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  title: {
    fontSize: 20,
  },
});

export default CustomHeader;

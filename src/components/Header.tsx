import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyTheme} from '../constants/theme.ts';

function Header({title = 'dajsdhajds'}: {title: string}): React.JSX.Element {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.colors.secondary,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default Header;

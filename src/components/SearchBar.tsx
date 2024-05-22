import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
import {AuthTheme} from '../constants/theme.ts';
import Icon from 'react-native-vector-icons/FontAwesome';

type SearchBarProps = {
  onChangeText?: (text: string) => void;
  style?: any;
};

export default function SearchBar(props: SearchBarProps) {
  return (
    <View style={[props.style, styles.container]}>
      <TextInput style={styles.textInput} onChangeText={props.onChangeText} />
      <Icon name="search" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: AuthTheme.colors.accentPrimary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 3,
  },
});

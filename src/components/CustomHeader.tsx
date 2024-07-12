import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LostReportTheme } from '../constants/theme.ts';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  title?: string;
  backgroundColor?: string;
  isSmall?: boolean;
  onGoBack?: () => void;
}

export default function CustomHeader(props: Props): React.JSX.Element {
  return (
      <View style={[
        styles.container,
        { backgroundColor: props.backgroundColor ?? LostReportTheme.colors.secondaryAccent },
      ]}>
        {props.onGoBack ?
          <Icon name="arrow-left" size={30} style={styles.backButton} onPress={props.onGoBack}/>
          : null
        }
        <Text style={styles.title}>{props.title ?? 'Ohne Titel'}</Text>
      </View>
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
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    color: LostReportTheme.colors.button,
  },
  title: {
    fontSize: 20,
  },
});

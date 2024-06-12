import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import {useNavigation} from '@react-navigation/native';
import CustomDivider from '../../components/CustomDivider.tsx';
import {FoundReportTheme, LostReportTheme} from '../../constants/theme.ts';

const AddFoundOrLostReport = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neuen Gegenstand anlegen</Text>
      <CustomDivider width={'90%'} height={1} />
      <Text style={styles.text}>
        {'Wähle die Art der Anzeige die du erstellen\n möchtest'}
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          label={'Fundanzeige'}
          onPress={() =>
            // @ts-ignore
            navigation.navigate('NewReport', {reportType: 'found'})
          }
          fontSize={17}
          backgroundColor={FoundReportTheme.colors.button2}
        />
        <CustomButton
          label={'Suchanzeige'}
          // @ts-ignore
          onPress={() => navigation.navigate('NewReport', {reportType: 'lost'})}
          fontSize={17}
          backgroundColor={LostReportTheme.colors.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  header: {
    fontSize: 18,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 5,
  },
});

export default AddFoundOrLostReport;

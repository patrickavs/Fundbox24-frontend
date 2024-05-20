import React from 'react';

import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLostReports} from '../../hooks/useLostReports';
import CustomHeader from '../../components/CustomHeader.tsx';
import {LostReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import ReportCard from './ReportCard.tsx';

function LostReportScreen(): React.JSX.Element {
  const {lostReports} = useLostReports();

  return (
    <View>
      <CustomHeader
        backgroundColor={LostReportTheme.colors.secondaryAccent}
        title={'Suchanzeigen'}
      />
      <ScrollView style={styles.scrollContainer}>
        <SearchBar
          onChangeText={text => {
            console.log('Benutzer sucht nach: ' + text);
          }}
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Sortieren"
            items={[
              {label: 'Alphabetisch', value: 'alphabetical'},
              {label: 'Zuletzt gesehen', value: 'last seen'},
              {label: 'Entfernung', value: 'distance'},
            ]}
            onChange={item => {
              console.log('Benutzer hat sortiert nach: ' + item.value);
            }}
          />
          <Dropdown
            placeholder="Filtern"
            items={[
              {label: 'Nur mein Heimatumkreis', value: 'in my region'},
              {label: 'Nur heute', value: 'only today'},
            ]}
            onChange={item => {
              console.log('Benutzer hat gefiltert nach: ' + item.value);
            }}
          />
        </View>

        <Text style={styles.subtitle}>Gesucht in deinem Umkreis</Text>

        <FlatList
          style={styles.list}
          data={lostReports}
          renderItem={({item}) => (
            <ReportCard
              key={item.id}
              report={item}
              image={require('../../assets/images/winter_hat.png')}
              backgroundColor={LostReportTheme.colors.secondaryAccent}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

export default LostReportScreen;

const styles = StyleSheet.create({
  list: {
    marginBottom: 200,
  },
  subtitle: {
    color: 'black',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 17,
  },
  scrollContainer: {
    padding: 20,
  },
  dropdownContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
});

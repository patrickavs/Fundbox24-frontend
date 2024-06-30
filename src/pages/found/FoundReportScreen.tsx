import React from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFoundReports} from '../../hooks/useFoundReports';
import CustomHeader from '../../components/CustomHeader.tsx';
import {FoundReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import FoundReportCard from './FoundReportCard.tsx';
import {category} from '../../data/categories';

function FoundReportScreen({navigation}): React.JSX.Element {
  const {foundReports} = useFoundReports();

  return (
    <View>
      <CustomHeader
        backgroundColor={FoundReportTheme.colors.button1}
        title={'Fundanzeigen'}
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

        <Text style={styles.text}>Gefunden in deinem Umkreis</Text>

        <FlatList
          style={styles.list}
          data={foundReports}
          renderItem={({item}) => (
            <FoundReportCard
              key={item.id}
              report={item}
              onPress={(id) => navigation.navigate('SingleFoundReportScreen', {id: id})}
              image={category.find((it) => it.name === item.category.name)?.image ?? category[category.length - 1].image }
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

export default FoundReportScreen;

const styles = StyleSheet.create({
  list: {
    marginBottom: 200,
  },
  text: {
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

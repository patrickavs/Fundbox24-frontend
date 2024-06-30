import React from 'react';

import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLostReports} from '../../hooks/useLostReports';
import CustomHeader from '../../components/CustomHeader.tsx';
import {LostReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import LostReportCard from './LostReportCard.tsx';
import {category} from '../../data/categories';
import {useNavigation} from '@react-navigation/native';

function LostReportScreen(): React.JSX.Element {
  const {lostReports} = useLostReports();
  const navigation = useNavigation();

  return (
    <View testID={'lost-report-screen'}>
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

        <Text style={styles.text}>Gesucht in deinem Umkreis</Text>

        <FlatList
          style={styles.list}
          data={lostReports}
          renderItem={({item}) => (
            <LostReportCard
              key={item.id}
              report={item}
              onPress={() =>
                navigation.navigate('SingleLostReportScreen', {item: item})
              }
              image={
                category.find(it => it.name === item.category.name)?.image ??
                category[category.length - 1].image
              }
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

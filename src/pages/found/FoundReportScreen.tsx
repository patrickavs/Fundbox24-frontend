import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import {FoundReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import FoundReportCard from './FoundReportCard.tsx';
import {categoriesWithImage} from '../../data/categoriesWithImage.ts';
import { useFocusEffect } from '@react-navigation/native';
import {ALL_FOUND_REPORTS_URL} from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoundReport } from '../../types/report-found.ts';

function FoundReportScreen({navigation}: {navigation: any}): React.JSX.Element {

  const [foundReports, setFoundReports] = useState<FoundReport[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');


  const getItems = () => {
    let items = [{label: 'Alle', value: ''}];
    category.forEach((element) => {
      items.push({label: element.name, value: element.id.toString()});
    });
    return items;
  };

  const fetchURL = async (queryString:string, sortString:string, categoryString:string):Promise<void> => {
      let auth = await AsyncStorage?.getItem('basicAuthCredentials');
      if (!auth) {throw 'No Basic Auth Credentials! Please login.';}

      const response:Response = await fetch(ALL_FOUND_REPORTS_URL + '?q=' + queryString + '&category=' + categoryString + '&sort=' + sortString, {
          method: 'GET',
          headers: {
              Authorization: `Basic ${auth}`,
          },
      });

      let data;
      try{
          data = await response.json();
          if (response.status === 200) {setFoundReports(data);}
          else {throw 'Error fetching found reports: ' + data + ' with status code ' + response.status + '!';}
      } catch(error) {
          console.log(error);
      }
  };

  useEffect(() => {
      fetchURL(query, sort, categoryFilter);
  }, [query, sort, categoryFilter]);


  useFocusEffect(
    useCallback(() => {
      fetchURL(query, sort, categoryFilter);
    }, [query, sort, categoryFilter]),
  );



  return (
    <View>
      <CustomHeader
        backgroundColor={FoundReportTheme.colors.button1}
        title={'Fundanzeigen'}
      />
      <ScrollView style={styles.scrollContainer}>
        <SearchBar
          testID={'search-bar-found'}
          onChangeText={text => {
            setQuery(text);
            console.log('Benutzer sucht nach: ' + text);
          }}
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            testID={'sort-dropdown-found'}
            placeholder="Sortieren"
            items={[
              {label: 'Alphabetisch', value: 'alphabetical'},
              {label: 'Funddatum', value: 'found-date'},
            ]}
            onChange={item => {
              setSort(item.value);
              console.log('Benutzer hat sortiert nach: ' + item.value);
            }}
          />
          <Dropdown
            testID={'filter-dropdown-found'}
            placeholder="Kategorie"
            items={getItems()}
            onChange={item => {
              setCategoryFilter(item.value);
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
              onPress={() => navigation.navigate('SingleFoundReportScreen', {item: item})}
              image={categoriesWithImage.find((it) => it.name === item.category.name)?.image ?? categoriesWithImage[categoriesWithImage.length - 1].image }
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
      color: '#152238',
      marginTop: 40,
      marginBottom: 20,
      marginLeft: 15,
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

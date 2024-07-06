import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import {FoundReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import FoundReportCard from './FoundReportCard.tsx';
import {category} from '../../data/categories';
import { useFocusEffect } from '@react-navigation/native';
import {ALL_FOUND_REPORTS_URL} from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FoundReportScreen({navigation}): React.JSX.Element {

  const [foundReports, setFoundReports] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  //const [foundReports, setFoundReports] = useState([]);

  const fetchURL = async (queryString:string, sortString:string):Promise<void> => {
      let auth = await AsyncStorage?.getItem('basicAuthCredentials');
      if (!auth) {throw 'No Basic Auth Credentials! Please login.';}

      const response:Response = await fetch(ALL_FOUND_REPORTS_URL + '?q=' + queryString + '&sort=' + sortString, {
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
      fetchURL(query, sort);
  }, [query, sort]);


  useFocusEffect(
    useCallback(() => {
      fetchURL(query, sort);
    }, [query, sort]),
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
            }}
          />
          <Dropdown
            testID={'filter-dropdown-found'}
            placeholder="Kategorie"
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
              onPress={() => navigation.navigate('SingleFoundReportScreen', {item: item})}
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

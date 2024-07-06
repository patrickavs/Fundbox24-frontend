import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import {LostReportTheme} from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import LostReportCard from './LostReportCard.tsx';
import {category} from '../../data/categories';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALL_LOST_REPORTS_URL} from '../../routes';

function LostReportScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const [lostReports, setLostReports] = useState([]);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('');
    //const [categoryFilter, setCategoryFilter] = useState(');

    const fetchURL = async (queryString:string, sortString:string):Promise<void> => {
        let auth = await AsyncStorage?.getItem('basicAuthCredentials');
        if (!auth) {throw 'No Basic Auth Credentials! Please login.';}

        const response:Response = await fetch(ALL_LOST_REPORTS_URL + '?q=' + queryString + '&sort=' + sortString, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        let data;
        try{
            data = await response.json();
            if (response.status === 200) {setLostReports(data);}
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
    <View testID={'lost-report-screen'}>
      <CustomHeader
        backgroundColor={LostReportTheme.colors.secondaryAccent}
        title={'Suchanzeigen'}
      />
      <ScrollView style={styles.scrollContainer}>
        <SearchBar
          onChangeText={text => {
            setQuery(text);
          }}
          testID="search-bar"
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Sortieren"
            testID="sort-dropdown"
            items={[
              {label: 'Alphabetisch', value: 'alphabetical'},
              {label: 'Zuletzt gesehen', value: 'last-seen'},
            ]}
            onChange={item => {
              setSort(item.value);
            }}
          />
          <Dropdown
            placeholder="Filtern"
            testID="filter-dropdown"
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

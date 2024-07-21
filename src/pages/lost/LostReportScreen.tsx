import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { LostReportTheme } from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import LostReportCard from './LostReportCard.tsx';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_LOST_REPORTS_URL } from '../../routes';
import { LostReport } from '../../types/report-lost.ts';

function LostReportScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [lostReports, setLostReports] = useState<LostReport[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const getItems = () => {
    let items = [{ label: 'Alle', value: '' }];
    categoriesWithImage.forEach((element) => {
      items.push({ label: element.name, value: element.id.toString() });
    });
    return items;
  };


  const fetchURL = async (queryString: string, sortString: string, categoryString: string): Promise<void> => {
    let auth = await AsyncStorage?.getItem('basicAuthCredentials');
    if (!auth) {
      throw 'No Basic Auth Credentials! Please login.';
    }


    const response: Response = await fetch(ALL_LOST_REPORTS_URL + '?q=' + queryString + '&category=' + categoryString + '&sort=' + sortString, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    let data;
    try {
      data = await response.json();
      if (response.status === 200) {
        setLostReports(data);
      } else {
        throw 'Error fetching found reports: ' + data + ' with status code ' + response.status + '!';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchURL(query, sort, categoryFilter);
  }, [query, sort, categoryFilter]);


  useFocusEffect(
    useCallback(() => {
      fetchURL(query, sort, categoryFilter);
    }, [query, sort, categoryFilter])
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
            console.log('Benutzer sucht nach: ' + text);
          }}
          testID="search-bar"
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Sortieren"
            testID="sort-dropdown"
            items={[
              { label: 'Alphabetisch', value: 'alphabetical' },
              { label: 'Zuletzt gesehen', value: 'last-seen' },
            ]}
            onChange={item => {
              setSort(item.value);
              console.log('Benutzer hat sortiert nach: ' + item.value);
            }}
          />
          <Dropdown
            testID="filter-dropdown"
            placeholder="Kategorie"
            items={getItems()}
            onChange={item => {
              setCategoryFilter(item.value);
              console.log('Benutzer hat gefiltert nach: ' + item.value);
            }}
          />
        </View>

        <Text style={styles.text}>Gesucht in deinem Umkreis</Text>

        <FlatList
          style={styles.list}
          data={lostReports}
          renderItem={({ item }) => (
            <LostReportCard
              isMasterViewCard={true}
              key={item.id}
              report={item}
              onPress={() =>
                //@ts-ignore
                navigation.navigate('SingleLostReportScreen', { item: item })
              }
              image={
                categoriesWithImage.find(it => it.name === item.category.name)?.image ??
                categoriesWithImage[categoriesWithImage.length - 1].image
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
    paddingHorizontal: 5,
  },
  text: {
    color: '#152238',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 15,
    fontSize: 17,
  },
  scrollContainer: {
    padding: 10,
    paddingTop: 20,
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

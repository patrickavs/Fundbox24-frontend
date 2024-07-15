import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useUser } from '../../hooks/useUser.tsx';
import FoundReportCard from '../found/FoundReportCard.tsx';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import LostReportCard from '../lost/LostReportCard.tsx';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyReports = () => {
  const navigation = useNavigation();
  const { getAllLostReports, getAllFoundReports, userLostReports, userFoundReports } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const segmentedValues = ['Suchanzeigen', 'Fundanzeigen'];

  const handleSegmentChange = (event: any) => {
    console.log('SegmentIndex', event.nativeEvent.selectedSegmentIndex);
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  useEffect(() => {
    const fetchLostReports = async () => {
      await getAllLostReports();
    };
    const fetchFoundReports = async () => {
      await getAllFoundReports();
    };

    fetchLostReports();
    fetchFoundReports();
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
      <CustomHeader title={'Meine Anzeigen'}
                    backgroundColor={'white'} />
      <SegmentedControl
        values={segmentedValues}
        selectedIndex={selectedIndex}
        onChange={handleSegmentChange}
        style={styles.switch}
        activeFontStyle={{ color: selectedIndex === 1 ? FoundReportTheme.colors.button2 : LostReportTheme.colors.secondaryBackground }}
      />

      <ScrollView>
        <View style={styles.listContainer}>
          {selectedIndex === 0 ?
            <FlatList data={userLostReports} renderItem={({ item }) => (
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
            )} numColumns={2} keyExtractor={item => item.id} scrollEnabled={false} />
            :
            <FlatList data={userFoundReports} renderItem={({ item }) => (
              <FoundReportCard
                key={item.id}
                report={item}
                //@ts-ignore
                onPress={() => navigation.navigate('SingleFoundReportScreen', { item: item })}
                image={categoriesWithImage.find((it) => it.name === item.category.name)?.image ?? categoriesWithImage[categoriesWithImage.length - 1].image}
              />
            )} numColumns={2} keyExtractor={item => item.id} scrollEnabled={false} />}
        </View>

        <View style={!isExpanded ? styles.space : null}>
          <TouchableOpacity style={styles.collapseHeader} onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.headerText}>Erledigte Anzeigen</Text>
            <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} />
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <View style={styles.dropdown}>
            {selectedIndex === 1 ? (
              <FlatList
                data={userFoundReports.filter(report => report.isFinished)}
                renderItem={({ item }) => (
                  <FoundReportCard
                    key={item.id}
                    report={item}
                    //@ts-ignore
                    onPress={() => navigation.navigate('SingleFoundReportScreen', { item: item })}
                    image={
                      categoriesWithImage.find((it) => it.name === item.category.name)?.image ?? categoriesWithImage[categoriesWithImage.length - 1].image
                    }
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={userLostReports.filter(report => report.isFinished)}
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
                      categoriesWithImage.find(it => it.name === item.category.name)?.image ?? categoriesWithImage[categoriesWithImage.length - 1].image
                    }
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  switch: {
    marginTop: 20,
    marginHorizontal: 40,
    height: 40,
  },
  listContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  dropdown: {
    marginBottom: 200,
    marginTop: 10,
    marginHorizontal: 20,
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 16,
  },
  space: {
    marginBottom: 200,
  },
});

export default MyReports;

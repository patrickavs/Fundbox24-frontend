import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import CustomHeader from '../../components/CustomHeader.tsx';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import { useLostReports } from '../../hooks/useLostReports.tsx';
import { useFoundReports } from '../../hooks/useFoundReports.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import { Category } from '../../types/category.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import mapConstants from '../../constants/map.ts';
import eventEmitter from '../../components/eventEmitter.ts';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LostReportRequest } from '../../types/report-lost-request.ts';
import { FoundReportRequest } from '../../types/report-found-request.ts';
import CategoryDropdown from './CategoryDropdown.tsx';

function AddReportScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { reportType, lostLocation, foundLocation, collectLocation, lostRadius, type } = route.params;
  const { createLostReport } = useLostReports();
  const { createFoundReport } = useFoundReports();
  const [lostReportPosition, setLostReportPosition] = useState<LatLng>(mapConstants.initialMapPosition);
  const [foundReportPosition, setFoundReportPosition] = useState<LatLng>(mapConstants.initialMapPosition);
  const [collectReportPosition, setCollectReportPosition] = React.useState<LatLng>(mapConstants.initialMapPosition);
  const [lostReportRadius, setLostReportRadius] = useState<number>(mapConstants.minRadius);
  const [foundReportRadius, setFoundReportRadius] = useState<number>(mapConstants.minRadius);
  const [collectReportRadius, setCollectReportRadius] = useState<number>(mapConstants.minRadius);
  //const [locationName, setLocationName] = React.useState<string>('');
  const [reportImage, setReportImage] = useState<string>(categoriesWithImage[0].image);
  const [reportName, setReportName] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  //const [error, setError] = useState<string | null>(null);
  const [reportCategory, setReportCategory] = useState<Category>(categoriesWithImage[0]);
  //const [report, setReport] = useState<NewLostReport | NewFoundReport>();
  const categories: any = category.map((c: Category) => ({ label: c.name, value: c.value }));
  const today = useMemo(() => new Date(), []);
  /*useEffect(() => {
    const foundPositionListener = eventEmitter.addListener('foundReportPositionChange', function (position: LatLng) {
      //console.log('Found Report position changed:', position);
      setFoundReportPosition(position);
    });

    const collectPositionListener = eventEmitter.addListener('collectReportPositionChange', function (position: LatLng) {
      //console.log('Collect Report position changed:', position);
      setCollectReportPosition(position);
    });

    const lostPositionListener = eventEmitter.addListener('lostReportPositionChange', function (position: LatLng) {
      console.log('Lost Report position changed:', position);
      setLostReportPosition(position);
    });

    const radiusListener = eventEmitter.addListener('reportRadiusChange', function (radius: number) {
      //console.log('Report radius changed:', radius);
      setReportRadius(radius);
    });

    /*const locationNameListener = eventEmitter.addListener('reportLocationNameChange', function(location: string) {
      console.log('Location changed:', location);
      setLocationName(location);
    });

    return () => {
      lostPositionListener.remove();
      foundPositionListener.remove();
      collectPositionListener.remove();
      radiusListener.remove();
      //locationNameListener.remove();
    };
  }, []);*/

  React.useEffect(() => {
    //const { lostLocation, foundLocation, collectLocation, radius } = route.params;
    if (reportType === 'lost') {
      setLostReportPosition(lostLocation || mapConstants.initialMapPosition);
      setLostReportRadius(lostRadius || mapConstants.minRadius);
    } else {
      if (type === 'found') {
        setFoundReportPosition(foundLocation || mapConstants.initialMapPosition);
      } else {
        setCollectReportPosition(collectLocation || mapConstants.initialMapPosition);
      }
    }
  }, [reportType, route.params]);

  const getImage = (imagePath: number) => {
    const images: any = {
      9: '../../assets/images/categories/schmuck.png',
      10: '../../assets/images/categories/gerate.png',
      11: '../../assets/images/categories/rucksack.png',
      12: '../../assets/images/categories/pajamas.png',
      13: '../../assets/images/categories/key-chain.png',
      14: '../../assets/images/categories/wallet.png',
      15: '../../assets/images/categories/teddy-bear.png',
      16: '../../assets/images/categories/mystery.png',
    };
    return images[imagePath] || images[9];
  };

  const handleSubmit = async () => {
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const isoDate = utcDate.toISOString();
    console.log(isoDate);

    const newReport: LostReportRequest | FoundReportRequest = {
      title: reportName,
      description: reportDescription,
      categoryId: reportCategory.id,
      imagePath: getImage(Number(reportImage)) || '',
      isFinished: false,
      myChats: [],
      ...(reportType === 'lost'
        ? {
          lastSeenDate: isoDate,
          lastSeenLocation: lostReportPosition,
          lostLocation: lostReportPosition,
          lostRadius: lostReportRadius,
        }
        : {
          foundDate: isoDate,
          foundLocation: foundReportPosition,
          currentLocation: collectReportPosition,
        }),
    };

    console.log('New Report: ', newReport);

    try {
      const token = await AsyncStorage.getItem('basicAuthCredentials');
      if (token) {
        if (!newReport.title || !newReport.description) {
          Toast.show('Ein Titel und eine Beschreibung für den Gegenstand wird benötigt', Toast.SHORT);
          return;
        }
        reportType === 'lost'
          ? createLostReport(token, newReport as LostReportRequest)
          : createFoundReport(token, newReport as FoundReportRequest);
        navigation.popToTop();
      }
    } catch (sendError) {
      console.error('Error creating report:', sendError);
    }
  };

  return (
    <ScrollView>
      <>
        <CustomHeader
          title={
            reportType === 'lost' ? 'Neue Suchanzeige' : 'Neue Fundanzeige'
          }
          backgroundColor={
            reportType === 'lost'
              ? LostReportTheme.colors.secondaryAccent
              : FoundReportTheme.colors.button1
          }
        />
        <View style={styles.imageContainer}>
          <Image
          borderRadius={15}
          resizeMethod={'scale'}
          source={reportImage}
          style={styles.image}
        />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Kategorie</Text>
          <View style={{ paddingBottom: 20 }}>
            <CategoryDropdown placeholder={categoriesWithImage[0].name}
                              onChange={
              category => {
                setReportCategory(category);
                setReportImage(category.image);
              }
            }/>
          </View>
          <Text style={styles.textStyle}>Beschreibung</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder={'Bezeichnung des Gegenstandes'}
            placeholderTextColor={'gray'}
            onChangeText={(text: string) => {
              setReportName(text);
            }}
            testID="input-name"
            value={reportName}
          />
          <TextInput
            style={[styles.textInputStyle, styles.textInputMultiline]}
            multiline={true}
            numberOfLines={7}
            placeholderTextColor={'gray'}
            placeholder={'Beschreibung des Gegenstandes'}
            onChangeText={(text: string) => {
              setReportDescription(text);
            }}
            testID="input-description"
            value={reportDescription}
          />
          {reportType === 'lost' ? (
            <View>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.textStyle}>Zuletzt gesehen am:</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  gap: 15,
                }}>
                <View style={{ gap: 5 }}>
                  <DatePicker
                    is24hourSource={'locale'}
                    locale={'de'}
                    date={date}
                    onDateChange={setDate}
                    mode="datetime"
                    maximumDate={today}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'static',
              }}>
              <View>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.textStyle}>Gefunden am:</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <View style={{ gap: 5 }}>
                  <DatePicker
                    is24hourSource={'locale'}
                    locale={'de'}
                    date={date}
                    onDateChange={setDate}
                    mode="datetime"
                    maximumDate={today}
                  />
                </View>
              </View>
            </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            {reportType === 'lost' ? (
              <>
                <View style={styles.positionButtonContainer}>
                  <Text style={styles.textStyle}>Letzte bekannte Position:</Text>
                  <TouchableOpacity
                      style={styles.button2}
                      onPress={() =>
                      //@ts-ignore
                      navigation.navigate('Map', {lostPosition: lostReportPosition, lostRadius: lostReportRadius, reportType, type: 'found'})
                  } >
                    <Ionicons name={'map'} style={styles.iconButton} testID={'map'} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  label={'Suchanzeige speichern'}
                  onPress={handleSubmit}
                  backgroundColor={
                    LostReportTheme.colors.button
                  }
                  fontSize={16}
                />
              </>
            ) : (
              <View style={{ gap: 20 }}>
                  <View style={styles.positionButtonContainer}>
                    <Text style={styles.textStyle}>Fundort des Gegenstands:</Text>
                    <TouchableOpacity
                        style={[styles.button2, { backgroundColor: FoundReportTheme.colors.button2 }]}
                        onPress={() =>
                            //@ts-ignore
                            navigation.navigate('Map', {foundPosition: foundReportPosition, foundRadius: foundReportRadius, reportType, type: 'collect'})
                        } >
                      <Ionicons name={'map'} style={styles.iconButton} testID={'found'} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.positionButtonContainer}>
                    <Text style={styles.textStyle}>Ort der Abholung:</Text>
                    <TouchableOpacity
                        style={[styles.button2, { backgroundColor: FoundReportTheme.colors.button2 }]}
                        onPress={() =>
                            //@ts-ignore
                            navigation.navigate('Map', {collectPosition: collectReportPosition, collectRadius: collectReportRadius, reportType})
                        } >
                      <Ionicons name={'map'} style={styles.iconButton} testID={'collect'} />
                    </TouchableOpacity>
                  </View>
                <Text style={{ textAlign: 'center'}}>
                  Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.
                </Text>
                <CustomButton
                  label={'Fundanzeige speichern'}
                  onPress={handleSubmit}
                  backgroundColor={
                    FoundReportTheme.colors.button2
                  }
                  fontSize={16}
                />
              </View>
            )}
          </View>
        </View>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: LostReportTheme.colors.primaryBackground,
    padding: 50,
    marginHorizontal: 60,
    borderRadius: 7,
    elevation: 4,
  },
  imageContainer: {
    marginTop: 50,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 1,
    borderColor: 'lightgray',
    borderWidth: 0.5,
  },
  image: {
    height: 200,
    aspectRatio: 1,
  },
  inputContainer: {
    paddingTop: 40,
    paddingHorizontal: 40,
    gap: 15,
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 100,
  },
  textStyle: {
    fontSize: 17,
    color: 'black',
  },
  textInputStyle: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'lightgray',
    paddingHorizontal: 20,
    textAlign: 'left',
    fontSize: 16,
  },
  textInputMultiline: {
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  iconButton: {
    margin: 5,
    padding: 8,
    color: 'white',
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: LostReportTheme.colors.button,
    borderRadius: 10,
    color: 'white',
    width: 50,
    marginTop: 20,
  },
  positionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});

export default AddReportScreen;

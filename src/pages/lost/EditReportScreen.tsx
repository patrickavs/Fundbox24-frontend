import React, { useEffect, useMemo, useState } from 'react';
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
import { Category } from '../../types/category.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import mapConstants from '../../constants/map.ts';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LostReportRequest } from '../../types/report-lost-request.ts';
import { FoundReportRequest } from '../../types/report-found-request.ts';
import CategoryDropdown from '../add/CategoryDropdown.tsx';

function EditReportScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { item } = route.params;
  const { editLostReport } = useLostReports();
  const { editFoundReport } = useFoundReports();

  const [reportImage, setReportImage] = useState<string>(item.imagePath || categoriesWithImage[0].image);
  const [reportName, setReportName] = useState<string>(item.title);
  const [reportDescription, setReportDescription] = useState<string>(item.description);
  const [date, setDate] = useState<Date>(new Date(item.lastSeenDate || item.foundDate));
  const [reportCategory, setReportCategory] = useState<Category>(categoriesWithImage.find(c => c.name === item.category.name) || categoriesWithImage[0]);
  const [position, setPosition] = useState<LatLng>(item.lostLocation || item.foundLocation || mapConstants.initialMapPosition);
  const [radius, setRadius] = useState<number>(item.lostRadius || mapConstants.minRadius);
  const today = useMemo(() => new Date(), []);
  const reportType = item.hasOwnProperty('foundDate') ? 'found' : 'lost';

  useEffect(() => {
    console.log(item.imagePath);
  }, []);

  const getImage = (imagePath: number) => {
    const images: any = {
      9: categoriesWithImage[0].image,
      10: categoriesWithImage[1].image,
      11: categoriesWithImage[2].image,
      12: categoriesWithImage[3].image,
      13: categoriesWithImage[4].image,
      14: categoriesWithImage[5].image,
      15: categoriesWithImage[6].image,
      16: categoriesWithImage[7].image,
    };
    return images[imagePath] || images[9];
  };

  const displayImage = (imagePath: string) => {
    const images: any = {
      '../../assets/images/categories/schmuck.png': categoriesWithImage[0].image,
      '../../assets/images/categories/gerate.png': categoriesWithImage[1].image,
      '../../assets/images/categories/rucksack.png': categoriesWithImage[2].image,
      '../../assets/images/categories/pajamas.png': categoriesWithImage[3].image,
      '../../assets/images/categories/key-chain.png': categoriesWithImage[4].image,
      '../../assets/images/categories/wallet.png': categoriesWithImage[5].image,
      '../../assets/images/categories/teddy-bear.png': categoriesWithImage[6].image,
      '../../assets/images/categories/mystery.png': categoriesWithImage[7].image,
    };

    return images[imagePath] || images[0];
  };

  const handleSubmit = async () => {
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const isoDate = utcDate.toISOString();

    const updatedReport: LostReportRequest | FoundReportRequest = {
      title: reportName,
      description: reportDescription,
      categoryId: reportCategory.id,
      imagePath: getImage(Number(reportImage)) || '',
      isFinished: item.isFinished,
      myChats: item.myChats,
      ...(reportType === 'lost'
        ? {
          lastSeenDate: isoDate,
          lastSeenLocation: position,
          lostLocation: position,
          lostRadius: radius,
        }
        : {
          foundDate: isoDate,
          foundLocation: position,
          currentLocation: item.currentLocation || position,
        }),
    };

    try {
      const token = await AsyncStorage.getItem('basicAuthCredentials');
      if (token) {
        if (!updatedReport.title || !updatedReport.description) {
          Toast.show('Ein Titel und eine Beschreibung für den Gegenstand wird benötigt', Toast.SHORT);
          return;
        }
        reportType === 'lost'
          ? editLostReport(updatedReport as LostReportRequest)
          : editFoundReport(token, updatedReport as FoundReportRequest);
        navigation.popToTop();
      }
    } catch (sendError) {
      console.error('Error updating report:', sendError);
    }
  };

  return (
    <ScrollView>
      <>
        <CustomHeader
          title={reportType === 'lost' ? 'Suchanzeige bearbeiten' : 'Fundanzeige bearbeiten'}
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
            source={displayImage(reportImage) || getImage(Number(reportImage))}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Kategorie</Text>
          <View style={{ paddingBottom: 20 }}>
            <CategoryDropdown placeholder={reportCategory.name}
                              onChange={
                                category => {
                                  setReportCategory(category);
                                  setReportImage(category.image);
                                  console.log(category.image);
                                }
                              } />
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
              <View style={{ alignItems: 'center', gap: 15 }}>
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
            <View style={{
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
                      navigation.navigate('Map', {
                        lostPosition: position,
                        lostRadius: radius,
                        reportType,
                        type: 'lost',
                      })
                    }>
                    <Ionicons name={'map'} style={styles.iconButton} testID={'map'} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  label={'Suchanzeige speichern'}
                  onPress={handleSubmit}
                  backgroundColor={LostReportTheme.colors.button}
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
                      navigation.navigate('Map', {
                        foundPosition: position,
                        reportType,
                        type: 'found',
                      })
                    }>
                    <Ionicons name={'map'} style={styles.iconButton} testID={'found'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.positionButtonContainer}>
                  <Text style={styles.textStyle}>Ort der Abholung:</Text>
                  <TouchableOpacity
                    style={[styles.button2, { backgroundColor: FoundReportTheme.colors.button2 }]}
                    onPress={() =>
                      navigation.navigate('Map', {
                        collectPosition: item.currentLocation || position,
                        reportType,
                        type: 'collect',
                      })
                    }>
                    <Ionicons name={'map'} style={styles.iconButton} testID={'collect'} />
                  </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center' }}>
                  Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.
                </Text>
                <CustomButton
                  label={'Fundanzeige speichern'}
                  onPress={handleSubmit}
                  backgroundColor={FoundReportTheme.colors.button2}
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

export default EditReportScreen;

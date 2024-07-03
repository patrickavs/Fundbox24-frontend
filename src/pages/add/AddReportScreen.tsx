import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import { useLostReports } from '../../hooks/useLostReports.tsx';
import { useFoundReports } from '../../hooks/useFoundReports.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import { NewLostReport } from '../../types/report-lost.ts';
import { NewFoundReport } from '../../types/report-found.ts';
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
import { category } from '../../data/categories.ts';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import VectorImage from 'react-native-vector-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddReportScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { reportType, fetchedCategories } = route.params;
  const { createLostReport } = useLostReports();
  const { createFoundReport } = useFoundReports();
  const [reportPosition, setReportPosition] = useState<LatLng>(mapConstants.initialMapPosition);
  const [reportRadius, setReportRadius] = useState<number>(mapConstants.minRadius);
  //const [locationName, setLocationName] = React.useState<string>('');
  const [reportImage, setReportImage] = useState<string>(category[0].image);
  const [reportName, setReportName] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  //const [error, setError] = useState<string | null>(null);
  const [reportCategory, setReportCategory] = useState<Category>(category[0]);
  //const [report, setReport] = useState<NewLostReport | NewFoundReport>();
  const categories: any = fetchedCategories.map((c: Category) => ({ label: c.name, value: c.value }));

  useEffect(() => {
    const positionListener = eventEmitter.addListener('reportPositionChange', function (position: LatLng) {
      console.log('Report position changed:', position);
      setReportPosition(position);
    });

    const radiusListener = eventEmitter.addListener('reportRadiusChange', function (radius: number) {
      console.log('Report radius changed:', radius);
      setReportRadius(radius);
    });

    /*const locationNameListener = eventEmitter.addListener('reportLocationNameChange', function(location: string) {
      console.log('Location changed:', location);
      setLocationName(location);
    });*/

    return () => {
      positionListener.remove();
      radiusListener.remove();
      //locationNameListener.remove();
    };
  }, []);

  const getImage = (imagePath: number) => {
    switch (imagePath) {
      case 10:
        return '../../assets/images/categories/schmuck.png';
      case 11:
        return '../../assets/images/categories/gerate.png';
      case 12:
        return '../../assets/images/categories/rucksack.png';
      case 13:
        return '../../assets/images/categories/pajamas.png';
      case 14:
        return '../../assets/images/categories/key-chain.png';
      case 15:
        return '../../assets/images/categories/wallet.png';
      case 16:
        return '../../assets/images/categories/teddy-bear.png';
      case 17:
        return '../../assets/images/categories/mystery.png';
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const isoDate = utcDate.toISOString();
    console.log(isoDate);

    const newReport: NewLostReport | NewFoundReport = {
      title: reportName || 'Default',
      description: reportDescription || 'default',
      categoryId: reportCategory.id,
      imagePath: getImage(Number(reportImage)) || '',
      isFinished: false,
      myChats: [],
      ...(reportType === 'lost'
        ? {
          lastSeenDate: isoDate,
          lastSeenLocation: reportPosition,
          lostLocation: reportPosition,
          lostRadius: reportRadius,
        }
        : {
          foundDate: isoDate,
          foundLocation: reportPosition,
          currentLocation: mapConstants.initialMapPosition,
        }),
    };

    //console.log('New Report: ', newReport);

    try {
      const token = await AsyncStorage.getItem('basicAuthCredentials');
      if (token) {
        reportType === 'lost'
          ? createLostReport(token, newReport as NewLostReport)
          : createFoundReport(token, newReport as NewFoundReport);
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
          <View style={{ paddingBottom: 30 }}>
            <Dropdown
              items={categories}
              placeholder={category[0].name}
              onChange={item => {
                const categoryDrop = category.find(
                  (c: Category) => c.name === item.label
                );
                if (categoryDrop) {
                  setReportCategory({
                    id: categoryDrop.id,
                    image: categoryDrop.image,
                    name: categoryDrop.name,
                    value: categoryDrop.value,
                  });
                  setReportImage(categoryDrop.image);
                }
                console.log(categoryDrop?.id);
                console.log('Image: ', typeof categoryDrop?.image);
                console.log(`Category: ${reportCategory.name}`);
              }}
              testID={'dropdown'}
            />
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
              <View style={{ alignItems: 'left' }}>
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
                <View style={{ alignItems: 'left' }}>
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
                      navigation.navigate('Map')
                  } >
                    <Ionicons name={'map'} style={styles.iconButton} />
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
                            navigation.navigate('Map')
                        } >
                      <Ionicons name={'map'} style={styles.iconButton} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.positionButtonContainer}>
                    <Text style={styles.textStyle}>Ort der Abholung:</Text>
                    <TouchableOpacity
                        style={[styles.button2, { backgroundColor: FoundReportTheme.colors.button2 }]}
                        onPress={() =>
                            //@ts-ignore
                            navigation.navigate('Map')
                        } >
                      <Ionicons name={'map'} style={styles.iconButton} />
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
  },
  textInputStyle: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 3,
    borderRadius: 8,
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
  },
  positionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default AddReportScreen;

import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import {FoundReportTheme, LostReportTheme} from '../../constants/theme.ts';
import {useLostReports} from '../../hooks/useLostReports.tsx';
import {useFoundReports} from '../../hooks/useFoundReports.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton.tsx';
import {NewLostReport} from '../../types/report-lost.ts';
import {NewFoundReport} from '../../types/report-found.ts';
import Dropdown from '../../components/Dropdown.tsx';
import {Category} from '../../types/category.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

function AddReportScreen() {
  const route = useRoute<any>();
  const {reportType, categories} = route.params;
  const navigation = useNavigation();
  const {createLostReport} = useLostReports();
  const {createFoundReport} = useFoundReports();
  const [reportImage, setReportImage] = useState<string>('');
  const [reportName, setReportName] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [reportCategory, setReportCategory] = useState<Category>(categories[0]);
  const [report, setReport] = useState<NewLostReport | NewFoundReport>();

  useEffect(() => {
    const validateDate = (text: string) => {
      const trimmedText = text.trim();
      const dateParts = trimmedText.split('.');
      if (dateParts.length !== 3) {
        setError('Das Datum muss im\nDD.MM.YYYY Format sein');
        return;
      }

      const [day, month, year] = dateParts.map(Number);
      const dateObject = new Date(year, month - 1, day);

      if (year.toString().length !== 4) {
        setError('Invalides Datum');
        return;
      }

      if (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day
      ) {
        setError(null);
        setDate(text);
      } else {
        setError('Invalides Datum');
      }
    };
    validateDate(date);
  }, [date]);

  const handleSubmit = async () => {
    const newReport: NewLostReport | NewFoundReport = {
      title: reportName,
      description: reportDescription,
      category: reportCategory,
      myChats: [],
      ...(reportType === 'lost'
        ? {
            lastSeenDate: date,
            lastSeenLocation: {
              latitude: 12345,
              longitude: 5564646,
            },
            lostLocation: {
              latitude: 12345,
              longitude: 5564646,
            },
            lostRadius: 0,
            placeOfDiscovery: 'Uga',
            placeOfDelivery: 'Uga-uga',
          }
        : {
            isFinished: false,
            foundDate: date,
            foundLocation: {
              latitude: 12345,
              longitude: 5564646,
            },
            currentLocation: {
              latitude: 12345,
              longitude: 5564646,
            },
          }),
    };

    setReport(newReport);

    try {
      const token = await AsyncStorage.getItem('basicAuthCredentials');
      if (token) {
        reportType === 'lost'
          ? createLostReport(token, report as NewLostReport)
          : createFoundReport(token, report as NewFoundReport);
      }

      console.error('Invalid token');
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
        {reportImage !== '' ? (
          <Image
            borderRadius={15}
            resizeMethod={'scale'}
            source={require('../../assets/images/winter_hat.png')}
            style={styles.imageContainer}
          />
        ) : (
          <Ionicons
            name="camera-outline"
            size={100}
            color="#333"
            style={styles.iconContainer}
          />
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Kategorie</Text>
          <View style={{paddingBottom: 30}}>
            <Dropdown
              items={categories.map((c: Category) => ({
                label: c.name,
                value: c.value,
              }))}
              placeholder={categories[0].name}
              onChange={item => {
                const category = categories.find(
                  (c: Category) => c.name === item.label,
                );
                setReportCategory({
                  id: category.id,
                  image: category.image,
                  name: category.name,
                  value: category.value,
                });
                console.log(reportCategory);
              }}
            />
          </View>
          <TextInput
            style={styles.textInputStyle}
            placeholder={'Bezeichnung des Gegenstandes'}
            onChangeText={(text: string) => {
              setReportName(text);
            }}
          />
          <TextInput
            style={styles.textInputStyle}
            multiline={true}
            placeholder={'Beschreibung des Gegenstandes'}
            onChangeText={(text: string) => {
              setReportDescription(text);
            }}
          />
          {reportType === 'lost' ? (
            <View
              style={{
                alignItems: 'center',
                gap: 15,
              }}>
              <Text style={{fontSize: 16}}>Zuletzt gesehen am:</Text>
              <View style={{gap: 5}}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'DD.MM.YYYY'}
                  onChangeText={(text: string) => setDate(text)}
                  value={date}
                />
                {error ? (
                  <Text style={{color: 'red', textAlign: 'center'}}>
                    {error}
                  </Text>
                ) : null}
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
              <Text style={{fontSize: 16}}>Gefunden am:</Text>
              <View style={{gap: 5}}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'DD.MM.YYYY'}
                  onChangeText={(text: string) => setDate(text)}
                  value={date}
                />
                {error ? (
                  <Text style={{color: 'red', textAlign: 'center'}}>
                    {error}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            {reportType === 'lost' ? (
              <>
                <CustomButton
                  label={'Letzte bekannte Position angeben'}
                  //@ts-ignore
                  onPress={() => navigation.navigate('Map')}
                  backgroundColor={LostReportTheme.colors.secondaryBackground}
                  fontSize={14}
                />
                <CustomButton
                  label={'Suchanzeige speichern'}
                  disabled={error !== null}
                  onPress={handleSubmit}
                  backgroundColor={
                    !error
                      ? LostReportTheme.colors.secondaryBackground
                      : LostReportTheme.colors.secondaryAccent
                  }
                  fontSize={14}
                />
              </>
            ) : (
              <View style={{gap: 20}}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <CustomButton
                    label={'Fundort angeben'}
                    //@ts-ignore
                    onPress={() => navigation.navigate('Map')}
                    backgroundColor={FoundReportTheme.colors.button1}
                    fontSize={14}
                  />
                  <CustomButton
                    label={'Abholort angeben'}
                    //@ts-ignore
                    onPress={() => navigation.navigate('Map')}
                    backgroundColor={FoundReportTheme.colors.button1}
                    fontSize={14}
                  />
                </View>
                <Text style={{textAlign: 'center'}}>
                  Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.
                </Text>
                <CustomButton
                  label={'Fundanzeige erstellen'}
                  disabled={error !== null}
                  onPress={handleSubmit}
                  backgroundColor={
                    !error
                      ? FoundReportTheme.colors.button1
                      : FoundReportTheme.colors.button2
                  }
                  fontSize={14}
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
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 60,
  },
});

export default AddReportScreen;

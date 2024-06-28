import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import { useLostReports } from '../../hooks/useLostReports.tsx';
import { useFoundReports } from '../../hooks/useFoundReports.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../../components/CustomButton.tsx';
import { NewLostReport } from '../../types/report-lost.ts';
import { NewFoundReport } from '../../types/report-found.ts';

function AddReportScreen({ reportType }: { reportType: string }) {

  // TODO: All states relevant to the added data in only one state object
  const { lostReports } = useLostReports();
  const { foundReports } = useFoundReports();
  const [reportImage, setReportImage] = useState<string>('');
  const [checkedMiddle, setCheckedMiddle] = useState<boolean>(false);
  const [checkedHigh, setCheckedHigh] = useState<boolean>(false);
  const [reportName, setReportName] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
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
          <Text style={styles.textStyle}>
            Geschätzter Wert des Gegenstandes
          </Text>
          <BouncyCheckbox
            size={25}
            fillColor="lightgray"
            unFillColor="#FFFFFF"
            text="Mittel"
            iconStyle={{ borderColor: 'lightgray', borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
            }}
            onPress={(isCheckedMiddle: boolean) => {
              setCheckedMiddle(isCheckedMiddle);
            }}
          />
          <BouncyCheckbox
            style={{ paddingBottom: 20 }}
            size={25}
            fillColor="lightgray"
            unFillColor="#FFFFFF"
            text="High"
            iconStyle={{ borderColor: 'lightgray', borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
            }}
            onPress={(isCheckedHigh: boolean) => {
              setCheckedHigh(isCheckedHigh);
            }}
          />
          <TextInput
            style={styles.textInputStyle}
            testID='input-name'
            placeholder={'Bezeichnung des Gegenstandes'}
            onChangeText={(text: string) => {
              setReportName(text);
            }}
            value={reportName}
          />
          <TextInput
            style={styles.textInputStyle}
            testID='input-description'
            multiline={true}
            placeholder={'Beschreibung des Gegenstandes'}
            onChangeText={(text: string) => {
              setReportDescription(text);
            }}
            value={reportDescription}
          />
          {reportType === 'lost' ? (
            <View
              style={{
                alignItems: 'center',
                gap: 15,
              }}>
              <Text style={{ fontSize: 16 }}>Zuletzt gesehen am:</Text>
              <View style={{ gap: 5 }}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'DD.MM.YYYY'}
                  testID='date-input-lost'
                  onChangeText={(text: string) => setDate(text)}
                  value={date}
                />
                {error ? (
                  <Text style={{ color: 'red', textAlign: 'center' }} testID='error-lost'>
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
              <Text style={{ fontSize: 16 }}>Gefunden am:</Text>
              <View style={{ gap: 5 }}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'DD.MM.YYYY'}
                  testID='date-input-found'
                  onChangeText={(text: string) => setDate(text)}
                  value={date}
                />
                {error ? (
                  <Text style={{ color: 'red', textAlign: 'center' }} testID='error-found'>
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
                  onPress={() => console.log('pressed button!')}
                  backgroundColor={LostReportTheme.colors.secondaryBackground}
                  fontSize={14}
                />
                <CustomButton
                  label={'Suchanzeige speichern'}
                  disabled={error !== null}
                  onPress={() => console.log('pressed button 2!')}
                  backgroundColor={LostReportTheme.colors.secondaryBackground}
                  fontSize={14}
                />
              </>
            ) : (
              <View style={{ gap: 20 }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <CustomButton
                    label={'Fundort angeben'}
                    onPress={() => console.log('pressed button!')}
                    backgroundColor={FoundReportTheme.colors.button1}
                    fontSize={14}
                  />
                  <CustomButton
                    label={'Abholort angeben'}
                    onPress={() => console.log('pressed button 2!')}
                    backgroundColor={FoundReportTheme.colors.button1}
                    fontSize={14}
                  />
                </View>
                <Text style={{ textAlign: 'center' }}>
                  Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.
                </Text>
                <CustomButton
                  label={'Fundanzeige erstellen'}
                  disabled={error !== null}
                  onPress={() => console.log('pressed button! 3')}
                  backgroundColor={FoundReportTheme.colors.button1}
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

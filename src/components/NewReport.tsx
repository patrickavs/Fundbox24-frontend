import React, {useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomHeader from './CustomHeader.tsx';
import {FoundReportTheme, LostReportTheme} from '../constants/theme.ts';
import {useLostReports} from '../hooks/useLostReports.tsx';
import {useFoundReports} from '../hooks/useFoundReports.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from './CustomButton.tsx';

function NewReport({reportType}: {reportType: string}) {
  const {lostReports} = useLostReports();
  const {foundReports} = useFoundReports();
  const [reportImage, setReportImage] = useState<string>('');
  const [checkedMiddle, setCheckedMiddle] = useState<boolean>(false);
  const [checkedHigh, setCheckedHigh] = useState<boolean>(false);

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
            source={require('../assets/images/winter_hat.png')}
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
            iconStyle={{borderColor: 'lightgray', borderRadius: 0}}
            innerIconStyle={{borderRadius: 0}}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
            }}
            onPress={(isCheckedMiddle: boolean) => {
              setCheckedMiddle(isCheckedMiddle);
            }}
          />
          <BouncyCheckbox
            style={{paddingBottom: 20}}
            size={25}
            fillColor="lightgray"
            unFillColor="#FFFFFF"
            text="High"
            iconStyle={{borderColor: 'lightgray', borderRadius: 0}}
            innerIconStyle={{borderRadius: 0}}
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
            placeholder={'Bezeichnung des Gegenstandes'}
          />
          <TextInput
            style={styles.textInputStyle}
            multiline={true}
            placeholder={'Beschreibung des Gegenstandes'}
          />
          {reportType === 'lost' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {reportType === 'lost' ? (
                <Text style={{paddingTop: 5}}>Gefunden am:</Text>
              ) : (
                <Text style={{paddingTop: 5}}>Zuletzt gesehen am:</Text>
              )}
              <TextInput
                style={styles.textInputStyle}
                placeholder={'DD.MM.YYYY'}
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                gap: 15,
              }}>
              {reportType === 'lost' ? (
                <Text style={{paddingTop: 5}}>Gefunden am:</Text>
              ) : (
                <Text style={{paddingTop: 5}}>Zuletzt gesehen am:</Text>
              )}
              <TextInput
                style={styles.textInputStyle}
                placeholder={'DD.MM.YYYY'}
              />
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
                  onPress={() => console.log('pressed button! 2')}
                  backgroundColor={LostReportTheme.colors.secondaryBackground}
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

                <Text style={{textAlign: 'center'}}>
                  Nur der Umkreis des Fundortes ist in der Anzeige sichtbar.
                  Abhol- und Fundort können im Chat mit einem anfragenden Nutzer
                  freigegeben werden.
                </Text>
                <CustomButton
                  label={'Fundanzeige erstellen'}
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

export default NewReport;

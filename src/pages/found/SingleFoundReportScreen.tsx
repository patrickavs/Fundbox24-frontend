import React, { useEffect } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoundReportTheme } from '../../constants/theme';
import MapView, { Circle, LatLng } from 'react-native-maps';
import SpacerVertical from './SpacerVertical';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import { useRoute } from '@react-navigation/native';
import { FoundReport } from '../../types/report-found';
import CustomHeader from '../../components/CustomHeader';
import Toast from 'react-native-simple-toast';
import { useFoundReports } from '../../hooks/useFoundReports.tsx';


function SingleFoundReportScreen({ navigation }: { navigation: any }): React.JSX.Element {
  const { deleteFoundReport } = useFoundReports();

  useEffect(() => {
    navigation.setOptions({
      ...navigation.options,
      headerLeft: () => (
        <TouchableOpacity testID={'back-button'} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={navigateToEdit} style={styles.editButton}>
          <Ionicons name={'pencil'} size={30} color={'black'} />
        </TouchableOpacity>
      ),
    });
  });

  const mapRefFound = React.useRef(null);


  const route = useRoute();
  const { item } = route.params as { item: FoundReport };

  const [position, setPosition] = React.useState<LatLng>({
    latitude: item.foundLocation.latitude,
    longitude: item.foundLocation.longitude,
  });

  useEffect(() => {
    setPosition(item.foundLocation as LatLng);
  }, []);

  const [radius] = React.useState<number>(1000);

  const navigateToChat = () => {
    console.log('navigate to chat');
    navigation.navigate('ChatConversation');
  };

  const navigateToEdit = () => {
    navigation.navigate('EditReportScreen', { item });
  };

  const handleDelete = () => {
    Alert.alert(
      'Anzeige Löschen',
      'Bist Du sicher, dass Du diese Anzeige löschen möchtest?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Löschen',
          onPress: async () => {
            try {
              deleteFoundReport(item.id);
              navigation.navigate('FoundReportScreen');
            } catch (error) {
              Toast.show('Error deleting found report', Toast.SHORT);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.screenContainer} testID={'single-lost-report-screen'}>
      {Platform.OS === 'ios' ? <CustomHeader backgroundColor={'white'} title={''} isSmall /> : <></>}
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image style={styles.image}
                 source={categoriesWithImage.find((it) => it.name === item.category?.name)?.image ?? categoriesWithImage[categoriesWithImage.length - 1].image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item?.title ?? 'Titel'}</Text>
          <Text style={styles.text}>{item?.description ?? 'Beschreibung'}</Text>
          <View style={styles.textIconContainer}>
            <Ionicons name={'time'} style={styles.icon} />
            <Text style={styles.text}>Gefunden
              am {moment(item?.foundDate).format('DD.MM.YYYY, HH:mm') ?? 'Datum'}</Text>
          </View>
          <View style={styles.textIconContainer}>
            <Ionicons name={'location'} style={styles.icon} />
            <Text style={styles.text}>Umkreis des Fundortes:</Text>
          </View>
        </View>
        <View>
          <MapView
            ref={mapRefFound}
            scrollEnabled={true}
            style={styles.map}
            initialRegion={{
              ...position,
              latitudeDelta: 0.035,
              longitudeDelta: 0.035,
            }}>
            <Circle
              center={position}
              radius={radius}
              fillColor="rgba(245, 39, 145, 0.3)"
              strokeWidth={0}
              strokeColor="rgba(0, 0, 0, 0)" />
          </MapView>
          <TouchableOpacity style={styles.button2} onPress={() => {
            setPosition(item.foundLocation as LatLng);
            mapRefFound.current?.animateToRegion({
              ...item.foundLocation,
              latitudeDelta: 0.035,
              longitudeDelta: 0.035,
            }, 1);
          }}>
            <Ionicons name={'location-sharp'} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
        <SpacerVertical size={10} />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Frage stellen"
                          onPress={navigateToChat} testID="chat-button-1" />
          </View>
          <View style={styles.button}>
            <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Gehört mir!" onPress={navigateToChat}
                          testID="chat-button-2" />
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Anzeige löschen</Text>
        </TouchableOpacity>
        <SpacerVertical size={150} />
      </ScrollView>
    </View>
  );
}

export default SingleFoundReportScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    height: 100,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: FoundReportTheme.colors.button2,
    borderRadius: 10,
    color: 'white',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  screenContainer: {
    backgroundColor: FoundReportTheme.colors.button1,
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    height: 300,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    height: '50%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    marginBottom: 20,
    fontSize: 15,
  },
  map: {
    height: 300,
    width: '100%',
  },
  textIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  icon: {
    color: 'black',
    fontSize: 15,
    paddingTop: 2,
    paddingRight: 6,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  editButton: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  iconButton: {
    margin: 5,
    padding: 8,
    color: 'white',
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: -10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

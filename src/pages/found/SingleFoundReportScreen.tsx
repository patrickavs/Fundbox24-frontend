import React, {useEffect} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FoundReportTheme} from '../../constants/theme';
import MapView, {Circle, LatLng} from 'react-native-maps';
import SpacerVertical from './SpacerVertical';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import { category } from '../../data/categories';
import { useRoute } from '@react-navigation/native';
import {FoundReport} from '../../types/report-found';
import CustomHeader from '../../components/CustomHeader';


function SingleFoundReportScreen({ navigation }): React.JSX.Element {

    useEffect(() => {
        navigation.setOptions({
            ...navigation.options,
            headerLeft: () => (
                <TouchableOpacity testID={'back-button'} onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name={'arrow-back'} size={30} color={'black'} />
                </TouchableOpacity>
            ),
        });
    });

    const mapRefFound = React.useRef(null);


    const route = useRoute();
    const { item } = route.params as { item: FoundReport };

    const matchedCategory = category.find(c => c.id === item.categoryId);

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
        navigation.goBack();
        // TODO: navigate to chat
    };

    return (
        <View style={styles.screenContainer} testID={'single-lost-report-screen'}>
            {Platform.OS === 'ios' ? <CustomHeader backgroundColor={'white'} title={''} isSmall/> : <></>}
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.find((it) => it.id === matchedCategory?.id)?.image ?? category[category.length - 1].image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item?.title ?? 'Titel'}</Text>
                    <Text style={styles.text}>{item?.description ?? 'Beschreibung'}</Text>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'time'} style={styles.icon} />
                        <Text style={styles.text}>Gefunden am {moment(item?.foundDate).format('DD.MM.YYYY, HH:mm') ?? 'Datum'}</Text>
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
                            longitudeDelta: 0.035}}>
                        <Circle
                            center={position}
                            radius={radius}
                            fillColor="rgba(245, 39, 145, 0.3)"
                            strokeWidth={0}
                            strokeColor="rgba(0, 0, 0, 0)" />
                    </MapView>
                    <TouchableOpacity style={styles.button2} onPress={() => {setPosition(item.foundLocation as LatLng);
                        mapRefFound.current?.animateToRegion({
                            ...item.foundLocation,
                            latitudeDelta: 0.035,
                            longitudeDelta: 0.035,
                        }, 1);}} >
                        <Ionicons name={'location-sharp'} style={styles.iconButton} />
                    </TouchableOpacity>
                </View>
                <SpacerVertical size={10} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Frage stellen" onPress={navigateToChat} testID="chat-button-1" />
                    </View>
                    <View style={styles.button}>
                        <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Gehört mir!" onPress={navigateToChat} testID="chat-button-2" />
                    </View>
                </View>
                <SpacerVertical size={80}/>
            </ScrollView>
        </View>
    );
}

export default SingleFoundReportScreen;

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
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
    iconButton: {
        margin: 5,
        padding: 8,
        color: 'white',
        borderRadius: 10,
        fontSize: 20,
        alignSelf: 'center',
    },
});

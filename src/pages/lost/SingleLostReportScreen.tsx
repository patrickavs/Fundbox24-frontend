import React, {useEffect} from 'react';
import {BackHandler, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LostReportTheme} from '../../constants/theme';
import MapView, {Circle, LatLng} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import SpacerVertical from '../found/SpacerVertical';
import {category} from '../../data/categories';
import {useRoute} from '@react-navigation/native';
import {LostReport} from '../../types/report-lost';


function SingleLostReportScreen( {navigation} ): React.JSX.Element {

    const route = useRoute();
    const { item } = route.params as { item: LostReport };

    const [position, setPosition] = React.useState<LatLng>((item.lostLocation as LatLng));

    useEffect(() => {
        const backAction = () => {
            navigation.replace('LostReportScreen');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);


    useEffect(() => {
        setPosition(item.lostLocation as LatLng);
    }, [item, position]);

    const [radius] = React.useState<number>(1000);

    const navigateToChat = () => {
        console.log('navigate to chat');
        // TODO: navigate to chat
    };

    return (
        <View style={styles.screenContainer} testID="single-lost-report-screen">
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.find((it) => it.name === item?.category.name)?.image ?? category[category.length - 1].image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item?.title ?? 'Titel'}</Text>
                    <Text style={styles.text}>{item?.description ?? 'Beschreibung'}</Text>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'time'} style={styles.icon}/>
                        <Text style={styles.text}>Zuletzt gesehen am {moment(item?.lastSeenDate).format('DD.MM.YYYY, HH:mm') ?? 'Datum'}</Text>
                    </View>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'location'} style={styles.icon}/>
                        <Text style={styles.text}>Letzter bekannter Standort:</Text>
                    </View>
                </View>
                <MapView
                    scrollEnabled={false}
                    style={styles.map}
                    initialRegion={{
                        ...position,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.035,
                    }} >
                    <Circle
                        center={position}
                        radius={radius}
                        fillColor="rgba(245, 39, 145, 0.3)"
                        strokeWidth={0}/>
                </MapView>
                <SpacerVertical size={20}/>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <CustomButton color={LostReportTheme.colors.button} label="Frage stellen" onPress={navigateToChat} />
                    </View>
                    <View style={styles.button}>
                        <CustomButton color={LostReportTheme.colors.button} label="Gefunden!" onPress={navigateToChat} />
                    </View>
                </View>
                <SpacerVertical size={80}/>
            </ScrollView>
        </View>
    );
}

export default SingleLostReportScreen;

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        width: '40%',
        height: 100,
        alignSelf: 'center',
    },
    screenContainer: {
        backgroundColor: LostReportTheme.colors.secondaryAccent,
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
});



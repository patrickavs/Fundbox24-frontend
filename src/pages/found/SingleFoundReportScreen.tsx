import React, {useEffect} from 'react';
import {BackHandler, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFoundReports} from '../../hooks/useFoundReports';
import {FoundReportTheme} from '../../constants/theme';
import MapView, {Circle, LatLng} from 'react-native-maps';
import SpacerVertical from './SpacerVertical';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import {category} from '../../data/categories';
import {useRoute} from '@react-navigation/native';


function SingleFoundReportScreen( {navigation} ): React.JSX.Element {

    const {foundReports} = useFoundReports();
    useEffect(() => {
        navigation.setOptions({
            ...navigation.options,
        });
    }, [navigation]);

    const route = useRoute();
    const { id } = route.params;
    const [foundReport] = React.useState(foundReports.find((report) => report.id === id));


    const [position] = React.useState<LatLng>(foundReport?.foundLocation ?? null);

    const [radius] = React.useState<number>(1000);

    return (
        <View style={styles.screenContainer} testID={'single-lost-report-screen'}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.find((item) => item.name === foundReport?.category.name)?.image ?? category[category.length - 1].image } />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{foundReport?.title ?? 'Titel'}</Text>
                    <Text style={styles.text}>{foundReport?.description ?? 'Beschreibung'}</Text>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'time'} style={styles.icon}/>
                        <Text style={styles.text}>Gefunden am {moment(foundReport?.foundDate).format('DD.MM.YYYY, HH:mm') ?? 'Datum'}</Text>
                    </View>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'location'} style={styles.icon}/>
                        <Text style={styles.text}>Umkreis des Fundortes:</Text>
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
                        <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Frage stellen" onPress={() => navigation.goBack()} />
                    </View>
                    <View style={styles.button}>
                        <CustomButton backgroundColor={FoundReportTheme.colors.button2} label="Gehört mir!" onPress={() => navigation.goBack()} />
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        width: '40%',
        height: 100,
        alignSelf: 'center',
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
});

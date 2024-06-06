import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LostReportTheme} from '../../constants/theme';
import MapView, {Circle, LatLng} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import SpacerVertical from '../found/SpacerVertical';
import {useLostReports} from '../../hooks/useLostReports';
import {category} from '../../data/categories';


function SingleLostReportScreen( {navigation} ): React.JSX.Element {

    const {lostReports} = useLostReports();
    useEffect(() => {
        navigation.setOptions({
            ...navigation.options,
        });
    }, [navigation]);

    //const route = useRoute();
    //const { id } = route.params ?? {id: foundReports.at(0).id};

    const [position] = React.useState<LatLng>(
        lostReports[0].lostLocation
    );

    const [radius] = React.useState<number>(1000);

    return (
        <View style={styles.screenContainer}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.find((item) => item.name === lostReports[0].category.name)?.image ?? category[category.length - 1].image } />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{lostReports[0].title}</Text>
                    <Text style={styles.text}>{lostReports[0].description}</Text>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'time'} style={styles.icon}/>
                        <Text style={styles.text}>Zuletzt gesehen am {moment(lostReports[0].lastSeenDate).format('DD.MM.YYYY, HH:mm')}</Text>
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
                        <CustomButton color={LostReportTheme.colors.button} label="Frage stellen" onPress={() => navigation.goBack()} />
                    </View>
                    <View style={styles.button}>
                        <CustomButton color={LostReportTheme.colors.button} label="Gefunden!" onPress={() => navigation.goBack()} />
                    </View>
                </View>
                <SpacerVertical size={20}/>
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
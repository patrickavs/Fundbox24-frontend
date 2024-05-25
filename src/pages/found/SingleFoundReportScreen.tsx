import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFoundReports} from '../../hooks/useFoundReports';
import {FoundReportTheme} from '../../constants/theme';
import MapView, {Circle, LatLng} from 'react-native-maps';
import SpacerVertical from './SpacerVertical';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';


function SingleFoundReportScreen( {navigation} ): React.JSX.Element {

    const {foundReports} = useFoundReports();
    useEffect(() => {
        navigation.setOptions({
            ...navigation.options,
        });
    }, [navigation]);

    //const route = useRoute();
    //const { id } = route.params ?? {id: foundReports.at(0).id};

    const [position] = React.useState<LatLng>(
        foundReports[0].foundLocation
    );

    const [radius] = React.useState<number>(1000);

    return (
        <View style={styles.screenContainer}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/images/wallet.png')} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{foundReports[0].title}</Text>
                    <Text style={styles.text}>{foundReports[0].description}</Text>
                    <View style={styles.textIconContainer}>
                        <Ionicons name={'time'} style={styles.icon}/>
                        <Text style={styles.text}>Gefunden am {moment(foundReports[0].foundDate).format('DD.MM.YYYY, HH:mm')}</Text>
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
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }} >
                    <Circle
                        center={position}
                        radius={radius}
                        fillColor="rgba(245, 39, 145, 0.3)"
                        strokeWidth={0}/>
                </MapView>
                <SpacerVertical size={20}/>
                <View style={styles.button}>
                    <CustomButton color={FoundReportTheme.colors.button2} label="Finder kontaktieren" onPress={() => navigation.goBack()} />
                </View>
                <SpacerVertical size={20}/>
            </ScrollView>
        </View>
    );
}

export default SingleFoundReportScreen;

const styles = StyleSheet.create({
    button: {
        width: '80%',
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

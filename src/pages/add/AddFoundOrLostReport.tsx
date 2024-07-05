import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import { useNavigation } from '@react-navigation/native';
import CustomDivider from '../../components/CustomDivider.tsx';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_CATEGORIES_URL } from '../../routes';
import { Category } from '../../types/category.ts';

const AddFoundOrLostReport = () => {
    const navigation = useNavigation();
    const [allCategories, setAllCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const token = await AsyncStorage.getItem('basicAuthCredentials');
            const response = await fetch(ALL_CATEGORIES_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${token}`,
                },
            });

            const categories = response.json();

            if (categories === undefined) {
                ToastAndroid.show('Error fetching categories', ToastAndroid.SHORT);
            }
            setAllCategories(await categories);
        };

        fetchAllCategories();
    }, []);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>Neuen Gegenstand anlegen</Text>
                <Image style={styles.img} source={require('../../assets/images/givingBack.jpg')} />
                <Text style={styles.text}>
                    {'Wähle die Art der Anzeige die\n du erstellen möchtest'}
                </Text>
                <CustomDivider width={'90%'} height={1} />
                <View style={styles.buttonContainer}>
                    <CustomButton
                        label={'Suchanzeige'}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('NewReport', {
                                reportType: 'lost',
                                fetchedCategories: allCategories,
                            })
                        }
                        fontSize={17}
                        backgroundColor={LostReportTheme.colors.button}
                    />
                    <CustomButton
                        label={'Fundanzeige'}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('NewReport', {
                                reportType: 'found',
                                fetchedCategories: allCategories,
                            })
                        }
                        fontSize={17}
                        backgroundColor={FoundReportTheme.colors.button2}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        padding: 20,
    },
    container: {
        width: '100%',
        padding: 40,
        marginTop: -30,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: '#fbfbfb',
        borderColor: 'lightgray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 30,
    },
    img: {
        width: 300,
        height: 250,
        borderRadius: 15,
    },
    header: {
        fontSize: 18,
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#152238',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        paddingBottom: 5,
    },
});

export default AddFoundOrLostReport;

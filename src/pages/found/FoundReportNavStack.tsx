import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoundReportScreen from './FoundReportScreen';
import SingleFoundReportScreen from './SingleFoundReportScreen';

const Stack = createNativeStackNavigator();

const FoundReportNavStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="FoundReportScreen"
                    component={FoundReportScreen}
                    options={{title: 'Fundanzeigen'}}
                />
                <Stack.Screen
                    name="SingleFoundReportScreen"
                    component={SingleFoundReportScreen}
                    options={{title: 'Fundanzeige'}}
                />
            </Stack.Navigator>
);
};

export default FoundReportNavStack;

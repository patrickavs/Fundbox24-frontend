import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LostReportScreen from './LostReportScreen';
import SingleLostReportScreen from './SingleLostReportScreen';

const Stack = createNativeStackNavigator();

const LostReportNavStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="LostReportScreen"
                    component={LostReportScreen}
                    options={{headerShown: false}}

                />
                <Stack.Screen
                    name="SingleLostReportScreen"
                    component={SingleLostReportScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
);
};

export default LostReportNavStack;

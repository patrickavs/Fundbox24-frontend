import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoundReportScreen from './FoundReportScreen';
import SingleFoundReportScreen from './SingleFoundReportScreen';
import EditReportScreen from '../lost/EditReportScreen.tsx';

const Stack = createNativeStackNavigator();

const FoundReportNavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoundReportScreen"
        component={FoundReportScreen}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="SingleFoundReportScreen"
        component={SingleFoundReportScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="EditReportScreen"
        component={EditReportScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default FoundReportNavStack;

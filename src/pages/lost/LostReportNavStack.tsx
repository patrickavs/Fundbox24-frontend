import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LostReportScreen from './LostReportScreen';
import SingleLostReportScreen from './SingleLostReportScreen';
import EditReportScreen from './EditReportScreen.tsx';

const Stack = createNativeStackNavigator();

const LostReportNavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LostReportScreen"
        component={LostReportScreen}
        options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen
        name="SingleLostReportScreen"
        component={SingleLostReportScreen}
        options={{
          headerTitle: '',
          maxHeaderSize: 20,
          headerTransparent: true,
          headerShadowVisible: false,
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: false,
          headerLargeTitleHideShadow: true,
          headerLargeTitleStyle: { fontSize: 2 },
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

export default LostReportNavStack;

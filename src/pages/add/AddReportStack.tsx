import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetPerimeterScreen from '../../components/map/SetPerimeterScreen.tsx';
import React from 'react';
import AddReportScreen from './AddReportScreen.tsx';
import AddFoundOrLostReport from './AddFoundOrLostReport.tsx';

const NewReportStack = createNativeStackNavigator();

export const AddReportStack = () => (
  <NewReportStack.Navigator>
    <NewReportStack.Screen
      name="AddFoundOrLostReportScreen"
      component={AddFoundOrLostReport}
      options={{headerShown: false}}
    />
    <NewReportStack.Screen
      name="NewReport"
      component={AddReportScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
      }}
    />
    <NewReportStack.Screen
      name="Map"
      component={SetPerimeterScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
      }}
    />
  </NewReportStack.Navigator>
);

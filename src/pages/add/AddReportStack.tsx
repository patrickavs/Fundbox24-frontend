import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetPerimeterScreen from '../../components/map/SetPerimeterScreen.tsx';
import React from 'react';
import AddReportScreen from './AddReportScreen.tsx';

const NewReportStack = createNativeStackNavigator();

const NewReportView = () => {
  return <AddReportScreen reportType={'lost'} />;
};

export const AddReportStack = () => (
  <NewReportStack.Navigator>
    <NewReportStack.Screen
      name="NewReport"
      component={NewReportView}
      options={{headerShown: false}}
    />
    <NewReportStack.Screen
      name="Map"
      component={SetPerimeterScreen}
      options={{headerShown: false}}
    />
  </NewReportStack.Navigator>
);

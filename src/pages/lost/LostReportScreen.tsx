import React from 'react';

import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {useLostReports} from '../../hooks/useLostReports';
import {LostReport} from '../../types/report-lost';
import CustomDropdown from '../../components/CustomDropdown.tsx';
import CustomHeader from '../../components/CustomHeader.tsx';
import {FoundReportTheme, LostReportTheme} from '../../constants/theme.ts';

function ListItem({report}: {report: LostReport}): React.JSX.Element {
  return (
    <View>
      <Text>{report.object}</Text>
      <Text>{report.description}</Text>
      <Text>{report.status}</Text>
      <Text>{report.placeOfDiscovery}</Text>
      <Text>{report.category.title}</Text>
      <Button title="Details" onPress={() => {}} />
    </View>
  );
}

function LostReportScreen(): React.JSX.Element {
  const {lostReports} = useLostReports();

  return (
    <ScrollView>
      <CustomHeader
        backgroundColor={LostReportTheme.colors.secondaryAccent}
        title={'Suchanzeigen'}
      />
      <TextInput />

      <View>
        <CustomDropdown />
        <Button title="Sortierung" />
        <Button title="Filter" />
      </View>
      <View>
        {lostReports.map((report, idx) => {
          // Problem, aktuell wird kein key verwendet
          if (idx % 2 === 0) {
            return (
              <>
                <ListItem report={report} />
                <Text>Wusstest du schon, dass...</Text>
              </>
            );
          }
          return <ListItem key={report.id} report={report} />;
        })}
      </View>
    </ScrollView>
  );
}

export default LostReportScreen;

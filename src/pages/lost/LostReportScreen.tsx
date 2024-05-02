import React from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useLostReports } from '../../hooks/useLostReports';
import { LostReport } from '../../types/report-lost';

function ListItem({ report }: { report: LostReport }): React.JSX.Element {
  return (
    <View>
      <Text>{report.object}</Text>
      <Text>{report.description}</Text>
      <Text>{report.status}</Text>
      <Text>{report.placeOfDiscovery}</Text>
      <Text>{report.category.title}</Text>
      <Button title='Details' onPress={() => { }} />
    </View>
  );
}

function LostReportScreen(): React.JSX.Element {
  const { lostReports } = useLostReports();

  return (
    <ScrollView>
      <Text>Suchanzeigen</Text>
      <TextInput />
      <View>
        <Button title='Sortierung' />
        <Button title='Filter' />
      </View>
      <View>
        {
          lostReports.map((report, idx) => {
            // Problem, aktuell wird kein key verwendet
            if (idx % 2 === 0) {
              return (
                <>
                  <ListItem report={report} />
                  <Text>Wusstest du schon, dass...</Text>
                </>
              );
            }
            return (
              <ListItem key={report.id} report={report} />
            );
          })
        }
      </View>
    </ScrollView>
  );
}

export default LostReportScreen;

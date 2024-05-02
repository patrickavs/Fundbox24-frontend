import React, { useMemo } from 'react';
import { Button, ScrollView, SectionList, Text, TextInput, View } from 'react-native';
import { useFoundReports } from '../../hooks/useFoundReports';
import { FoundReport } from '../../types/report-found';

function DropDown({ title, selections }: { title: string, selections: string[] }): React.JSX.Element {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

function ListItem({ report }: { report: FoundReport }): React.JSX.Element {
  return (
    <View>
      <Text>{report.object}</Text>
      <Text>{report.description}</Text>
      <Text>{report.status}</Text>
      <Text>{report.placeOfDelivery}</Text>
      <Text>{report.placeOfDiscovery}</Text>
      <Text>{report.category.title}</Text>
      <Button title="Details" onPress={() => { }} />
    </View>
  );
}

function FoundReportScreen(): React.JSX.Element {
  const { foundReports } = useFoundReports();

  return (
    <ScrollView>
      <Text>Fundanzeigen</Text>
      <TextInput />
      <View>
        <DropDown title="Sortierung" selections={[""]} />
        <DropDown title="Filter" selections={[""]} />
      </View>
      {
        foundReports.map((report, idx) => {
          // Jedes Mal, wenn der Index gerade ist, wird zusätzlich ein Tipp mit gerendert
          if (idx % 2 === 0) {
            return (
              <View key={idx}>
                <ListItem report={report} />
                <Text>Wusstest du schon, dass...</Text>
              </View>
            );
          }
          return (
            <ListItem key={idx} report={report} />
          );
        })
      }
    </ScrollView>
  );
}

export default FoundReportScreen;

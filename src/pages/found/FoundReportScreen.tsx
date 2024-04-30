import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

function DropDown({ title, selections }: { title: string, selections: string[] }): React.JSX.Element {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

function FoundReportScreen(): React.JSX.Element {
  return (
    <View>
      <TextInput>Suche</TextInput>
      <Button title="Sortierung" onPress={() => { }} />
      <DropDown title="Filter" selections={["Geld", "Schlüssel", "Handy"]} />
    </View>
  );
}

export default FoundReportScreen;

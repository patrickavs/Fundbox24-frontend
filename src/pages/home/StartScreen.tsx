import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { useLostReport } from '../../hooks/useLostReports';

function StartScreen(): React.JSX.Element {
  const { isPending: isPendingUser, user } = useUser();
  const { isPending: isPendingLostReport, lostReport } = useLostReport();

  const isPending = isPendingUser || isPendingLostReport;

  if (!isPending && !user) {
    return <View><Text>Du bist nicht angemeldet</Text></View>
  }

  return (
    <View>
      {isPending && <Text>Es lädt...</Text>}
      {!isPending && <>
        <Text>Willkommen, {user?.username}</Text>
        <SectionList sections={[]} horizontal>

        </SectionList>
        <SectionList sections={[]}>

        </SectionList>
      </>}
    </View>
  );
}

export default StartScreen;

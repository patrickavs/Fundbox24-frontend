import React from 'react';
import { SectionList, Text, View } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { useLostReport } from '../../hooks/useLostReports';
import { useChat } from '../../hooks/useChat';

function StartScreen(): React.JSX.Element {
  const { isPending: isPendingUser, user } = useUser();
  const { isPending: isPendingLostReport, lostReport } = useLostReport();
  const { isPending: isPendingChat, chats } = useChat();

  const isPending = isPendingUser || isPendingLostReport || isPendingChat;

  if (!isPending && !user) {
    return <View><Text>Du bist nicht angemeldet</Text></View>
  }

  return (
    <View>
      {isPending && <Text>Es lädt...</Text>}
      {!isPending && <>
        <Text>Willkommen, {user?.username}</Text>
        {/* TODO: List lostreports here */}
        <SectionList sections={[]} horizontal>

        </SectionList>
        {/* TODO: List all open chats */}
        <SectionList sections={[]}>

        </SectionList>
      </>}
    </View>
  );
}

export default StartScreen;

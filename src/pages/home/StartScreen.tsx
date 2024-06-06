import React, {useMemo} from 'react';
import {SectionList, Text, View} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {useLostReports} from '../../hooks/useLostReports';
import {useChat} from '../../hooks/useChat';

function StartScreen(): React.JSX.Element {
  const {isPending: isPendingUser, user} = useUser();
  const {isPending: isPendingLostReport, lostReports} = useLostReports();
  const {isPending: isPendingChat, chats} = useChat(''); // TODO: Pass userToken here

  const isPending = isPendingUser || isPendingLostReport || isPendingChat;

  if (!isPending && !user) {
    return (
      <View>
        <Text>Du bist nicht angemeldet</Text>
      </View>
    );
  }

  return (
    <View>
      {isPending && <Text>Es lädt...</Text>}
      {!isPending && (
        <>
          <Text>Willkommen, {user?.username}</Text>
          {/* TODO: List lostreports here */}
          <SectionList sections={[]} horizontal />
          {/* TODO: List all open chats */}
          <SectionList sections={[]} />
        </>
      )}
    </View>
  );
}

export default StartScreen;

import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { ChatConversation } from '../../types/chat-conversation.ts';
import ChatMessage from './ChatMessage.tsx';
import { useChat } from '../../hooks/useChat.tsx';
import { useUser } from '../../hooks/useUser.tsx';
import useStorage from '../../hooks/useStorage.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ChatConversationScreen() {
  // TODO: reportId in params
  const {user} = useUser();
  const [basicAuthCredentials, setBasicAuthCredentials] = useState<string | null>();
  const {chat, addMessage} = useChat(basicAuthCredentials ?? "do not do this", user, 1);

  useEffect(() => {
    AsyncStorage.getItem("basicAuthCredentials").then(setBasicAuthCredentials);
  })

  return (
    <View testID={'chat-conversation-screen'}>
      <CustomHeader
        title={chat?.reportTitle ?? "Chat"}
      />
      <FlatList
        data={chat?.messages ?? []}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatMessage message={item} user={user}/>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
    paddingBottom: 300,
    gap: 20,
  },
});

import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { ChatConversation } from '../../types/chat-conversation.ts';
import ChatMessage from './ChatMessage.tsx';

export default function ChatConversationScreen() {
  const dummyConversation: ChatConversation = {
    id: '2',
    otherUser: 'Rick',
    messages: [
      {
        id: '1',
        chatId: '1',
        userId: '1',
        content: 'Hey Rick, was geht ab?',
        type: 'message',
        createdAt: new Date('2023-07-18T10:00:00Z'),
      },
      {
        id: '2',
        chatId: '1',
        userId: '1',
        content: 'Ich habe dir etwas wichtiges zu sagen!',
        type: 'message',
        createdAt: new Date('2023-07-18T10:01:00Z'),
      },
      {
        id: '3',
        chatId: '1',
        userId: '2',
        content: "Hi Bobo, was gibt's?",
        type: 'message',
        createdAt: new Date('2023-07-18T10:05:00Z'),
      },
      {
        id: '4',
        chatId: '1',
        userId: '1',
        content: 'Ich habe deine Cola gefunden. Sie war bei mir im Kofferraum.',
        type: 'message',
        createdAt: new Date('2023-07-18T10:07:30Z'),
      },
      {
        id: '5',
        chatId: '1',
        userId: '2',
        content: 'Krass, du hast meine Cola gefunden! Wo kann ich sie holen?',
        type: 'message',
        createdAt: new Date('2023-07-18T10:10:00Z'),
      },
      {
        id: '6',
        chatId: '1',
        userId: '1',
        content: 'Komm einfach morgen bei mir in der Königstraße vorbei',
        type: 'message',
        createdAt: new Date('2023-07-18T10:15:00Z'),
      },
      {
        id: '7',
        chatId: '1',
        userId: '2',
        content: 'Alles klar, ich komme morgen rum.',
        type: 'message',
        createdAt: new Date('2023-07-18T10:16:00Z'),
      },
      {
        id: '8',
        chatId: '1',
        userId: '2',
        content: 'Vielen Dank, dass du meine Cola gerettet hast!',
        type: 'message',
        createdAt: new Date('2023-07-18T10:17:00Z'),
      },
      {
        id: '9',
        chatId: '1',
        userId: '1',
        content: 'Kein Problem Rick, dafür bin ich doch da 😉',
        type: 'message',
        createdAt: new Date('2023-07-18T10:20:00Z'),
      },
    ],
  };

  return (
    <View testID={'chat-conversation-screen'}>
      <CustomHeader
        title="Chat mit Rick"
      />
      <FlatList
        data={dummyConversation.messages}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatMessage message={item} />
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

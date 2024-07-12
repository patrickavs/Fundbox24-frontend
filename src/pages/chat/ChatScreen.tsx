import { FlatList, StyleSheet, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ChatCard from './ChatCard.tsx';
import { ChatCardInfo } from '../../types/chat-card-info.ts';

const chats: ChatCardInfo[] = [
  {
    categoryName: 'Gerät',
    nameOfObject: 'Handy',
    lastMessage: 'Ich habe dein Handy gefunden. Können wir uns im Café am Platz treffen?',
    timeOfLastMessage: new Date('2023-07-10T14:30:00'),
  },
  {
    categoryName: 'Schlüssel',
    nameOfObject: 'Schlüsselbund',
    lastMessage: 'Ich habe die Schlüssel beim Fundbüro abgegeben.',
    timeOfLastMessage: new Date('2023-07-11T09:15:00'),
  },
  {
    categoryName: 'Tasche',
    nameOfObject: 'Rucksack',
    lastMessage: 'Dein Rucksack wurde im Park gefunden. Wann passt es dir, ihn abzuholen?',
    timeOfLastMessage: new Date('2023-07-11T17:45:00'),
  },
  {
    categoryName: 'Schmuck',
    nameOfObject: 'Brille',
    lastMessage: 'Deine Brille ist bei mir. Ich kann sie dir morgen bringen.',
    timeOfLastMessage: new Date('2023-07-12T08:00:00'),
  },
  {
    categoryName: 'Sonstiges',
    nameOfObject: 'Buch',
    lastMessage: 'Ich habe dein Buch in der Bibliothek gefunden. Soll ich es dort lassen?',
    timeOfLastMessage: new Date('2023-07-12T13:20:00'),
  },
];

export default function ChatScreen() {
  const navigation = useNavigation();

  return (
    <View testID={'my-chats-screen'}>
      <CustomHeader
        title="Meine Chats"
        onGoBack={() => navigation.goBack()}
      />
      <FlatList
        data={chats}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatCard info={item} />
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    gap: 10,
  },
});

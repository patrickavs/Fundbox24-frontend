import React from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { ChatConversation } from '../../types/chat-conversation.ts';
import ChatMessage from './ChatMessage.tsx';
import { LostReportTheme } from '../../constants/theme.ts';

export default function ChatConversationScreen() {
  const [inputIsShown, setInputIsShown] = React.useState(false);

  const listRef = React.useRef<FlatList>(null);

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

  function onSendMessage(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    setInputIsShown(false);
    listRef.current?.scrollToEnd();

    // read the text from the input
    console.log(event.nativeEvent.text);
  }

  return (
    <View testID={'chat-conversation-screen'}>
      <CustomHeader
        title="Chat mit Rick"
      />
      <FlatList
        ref={listRef}
        data={dummyConversation.messages}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatMessage message={item} />
        )} />
      {inputIsShown ?
        <TextInput
          autoFocus={true}
          onSubmitEditing={onSendMessage}
          onEndEditing={() => setInputIsShown(false)}
          style={[styles.input, styles.shadow]}
          placeholder={`Deine Nachricht an ${dummyConversation.otherUser}`}
          returnKeyType="send"
        /> : null}
      {inputIsShown ? null :
      <View style={styles.sendButtonContainer}>
        <Pressable style={[styles.sendButton, styles.shadow]} onPress={() => setInputIsShown(true)}>
          <Text style={styles.sendButtonText}>Nachricht senden</Text>
        </Pressable>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  sendButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 220,
  },
  sendButtonText: {
    fontWeight: 'bold',
  },
  sendButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffb77d',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  list: {
    paddingVertical: 20,
    paddingBottom: 300,
    gap: 20,
  },
  input: {
    bottom: 110,
    left: 0,
    right: 0,
    position: 'absolute',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: LostReportTheme.colors.secondaryAccent,
  },
});

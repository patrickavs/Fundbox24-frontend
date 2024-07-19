import React, { useEffect, useState } from 'react';
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
import ChatMessage from './ChatMessage.tsx';
import { useChat } from '../../hooks/useChat.tsx';
import { useUser } from '../../hooks/useUser.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LostReportTheme } from '../../constants/theme.ts';
import { Message } from '../../types/message.ts';

export default function ChatConversationScreen() {
  // TODO: reportId in params
  const {user} = useUser();
  const [basicAuthCredentials, setBasicAuthCredentials] = useState<string | null>();
  const {chat, addMessage} = useChat(basicAuthCredentials ?? 'do not do this', user, 1);

  useEffect(() => {
    AsyncStorage.getItem('basicAuthCredentials').then(setBasicAuthCredentials);
  }, []);

  const [inputIsShown, setInputIsShown] = React.useState(false);

  const listRef = React.useRef<FlatList>(null);

  function onSendMessage(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
    setInputIsShown(false);
    listRef.current?.scrollToEnd();

    const message: Message = {
      id: 1,
      isImage: false,
      sender: {
        id: +(user?.id ?? ''),
        username: user?.username ?? 'Rick',
      },
      content: event.nativeEvent.text,
      sentAt: new Date().toLocaleDateString(),
    };

    addMessage(message);
  }

  return (
    <View testID={'chat-conversation-screen'}>
      <CustomHeader
        title={chat?.reportTitle ?? 'Chat'}
      />
      <FlatList
        data={chat?.messages ?? []}
        ref={listRef}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatMessage message={item} user={user}/>
        )} />
      {inputIsShown ?
        <TextInput
          autoFocus={true}
          onSubmitEditing={onSendMessage}
          onEndEditing={() => setInputIsShown(false)}
          style={[styles.input, styles.shadow]}
          placeholder="Deine Nachricht"
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

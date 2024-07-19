import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../../types/message.ts';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import Arrow from './Arrow.tsx';
import { User } from '../../types/user.ts';

type ChatMessageProps = {
  message: Message,
  user: User | null
}

export default function ChatMessage(props: ChatMessageProps) {
  const messageIsFromLoggedInUser = props.message.sender.id === +(props.user?.id ?? "");

  return (
    <View style={[styles.container, messageIsFromLoggedInUser ? styles.alignMessageRight : styles.alignMessageLeft]}>
      {messageIsFromLoggedInUser ? null : <Arrow color={FoundReportTheme.colors.button2} pointingLeft={true} />}
      <View
        style={[styles.message, messageIsFromLoggedInUser ? styles.messageFromLoggedInUser : styles.messageFromOtherUser]}>
        <Text
          style={[styles.text, messageIsFromLoggedInUser ? styles.whiteText : styles.blackText]}>{props.message.content}</Text>
      </View>
      {messageIsFromLoggedInUser ? <Arrow color={LostReportTheme.colors.button} pointingLeft={false} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  alignMessageLeft: {
    justifyContent: 'flex-start',
  },
  alignMessageRight: {
    justifyContent: 'flex-end',
  },
  message: {
    width: '75 %',
    padding: 20,
    borderRadius: 10,
  },
  messageFromLoggedInUser: {
    backgroundColor: LostReportTheme.colors.button,
  },
  messageFromOtherUser: {
    backgroundColor: FoundReportTheme.colors.button2,
  },
  text: {
    fontSize: 15,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../../types/message.ts';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';

type Props = {
  message: Message
}

export default function ChatMessage(props: Props) {
  const messageIsFromLoggedInUser = props.message.userId === '1';

  return (
    <View style={[styles.container, messageIsFromLoggedInUser ? styles.alignMessageRight : styles.alignMessageLeft]}>
      <View
        style={[styles.message, messageIsFromLoggedInUser ? styles.messageFromLoggedInUser : styles.messageFromOtherUser]}>
        <Text
          style={[styles.text, messageIsFromLoggedInUser ? styles.whiteText : styles.blackText]}>{props.message.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../../types/message.ts';

type Props = {
  message: Message
}

export default function ChatMessage(props: Props) {
  return (
    <View style={styles.container}>
      <Text>{props.message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'yellow',
  },
});

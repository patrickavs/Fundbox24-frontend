import React from 'react';
import { Text, View } from 'react-native';
import { ChatCardInfo } from '../../types/chat-card-info.ts';

type Props = {
  info: ChatCardInfo;
}

export default function ChatCard(props: Props) {
  return (
    <View>
      <Text>{props.info.nameOfObject}</Text>
    </View>
  );
}

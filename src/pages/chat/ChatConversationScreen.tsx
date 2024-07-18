import React from 'react';
import { View } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';

export default function ChatConversationScreen() {

  return (
    <View testID={'chat-conversation-screen'} >
      <CustomHeader
        title="Chat mit Rick"
      />
    </View>
  );
}

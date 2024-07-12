import { ScrollView } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import React from 'react';

export default function ChatScreen() {
  return <ScrollView>
    <CustomHeader title="Meine Chats" />
  </ScrollView>;
}

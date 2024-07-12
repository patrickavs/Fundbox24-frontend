import { ScrollView } from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <CustomHeader
        title="Meine Chats"
        onGoBack={() => navigation.goBack()}
      />
    </ScrollView>
  );
}

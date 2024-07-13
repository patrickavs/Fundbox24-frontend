import React, {useState} from 'react';
import {FlatList, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ChatListItem, {ChatItemProps} from './ChatListItem';

function ChatList({isStartPage}) {
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'Toby Matthews',
      avatarUri: 'example.com/avatar2.jpg',
      lastMessage:
        'Super, vielen Dank! Ich bin so froh, dass er gefunden wurde.',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      name: 'Beth Smith',
      avatarUri: 'example.com/avatar2.jpg',
      lastMessage: 'Die Farbe ist etwas ausgewaschen. Es sieht fast aus wie Pink.',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      name: 'Rick Sanchez',
      avatarUri: 'hiahe',
      lastMessage: 'Hey, ich glaube, ich habe deine Tasche gefunden. Kannst du mal schauen?',
      timestamp: '2 days ago',
    },
    {
      id: '4',
      name: 'John Doe',
      avatarUri: '',
      lastMessage:
        'Bild',
      timestamp: '10:00 AM',
    },
    {
      id: '5',
      name: 'Melissa Edwards',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Hat die Tasche einen Reißverschluss?',
      timestamp: 'Yesterday',
    },
    {
      id: '6',
      name: 'Timothy Johnson',
      avatarUri: 'hiahe',
      lastMessage: 'Wow, das ist großartig! Vielen Dank für deine Hilfe.',
      timestamp: '2 days ago',
    },
    {
      id: '7',
      name: 'Rick Sanchez',
      avatarUri: '',
      lastMessage:
        'Du kannst es bei mir abholen. Ich wohne in der Nähe des Parks.',
      timestamp: '10:00 AM',
    },
    {
      id: '8',
      name: 'Ursula Thompson',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Vielen Dank! Ich werde es morgen abholen.',
      timestamp: 'Yesterday',
    },
    {
      id: '9',
      name: 'Katie Johnson',
      avatarUri: 'hiahe',
      lastMessage: 'Gern geschehen! Ich bin froh, dass ich helfen konnte.',
      timestamp: '2 days ago',
    },
    {
      id: '10',
      name: 'John Jenkins',
      avatarUri: 'example.com/avatar2.jpg',
      lastMessage:
        'Kannst du mir bitte sagen, welcher Name auf dem Ausweis steht?',
      timestamp: '10:00 AM',
    },
    {
      id: '11',
      name: 'Thomas Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Hey, ist das dein Schlüsselbund?',
      timestamp: 'Yesterday',
    },
    {
      id: '12',
      name: 'Alice James',
      avatarUri: 'hiahe',
      lastMessage: 'Ich bin froh, dass du sie gefunden hast!',
      timestamp: '2 days ago',
    },
  ]);

  const renderItem = ({item}: {item: ChatItemProps}) => {
    return <ChatListItem {...item} />;
  };

  return (
    <View style={styles.chatListContainer}>
      <FlatList
        style={styles.list}
        data={isStartPage ? chats.filter((_, index) => index < 3) : chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        windowSize={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
  },
  chatListContainer: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
});

export default ChatList;

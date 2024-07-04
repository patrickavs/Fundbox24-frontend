import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ChatListItem, {ChatItemProps} from './ChatListItem';

function ChatList() {
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'Toby Matthews',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Super, vielen Dank! Ich bin so froh, dass er gefunden wurde.',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      name: 'Beth Smith',
      avatarUri: 'exame.com/avatar2.jpg',
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
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Great! I will be there in 10 minutes. Can you please wait for me?',
      timestamp: '10:00 AM',
    },
    {
      id: '5',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Does the bag have a red stripe on the side?',
      timestamp: 'Yesterday',
    },
    {
      id: '6',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'Yes, that is mine! Thank you so much for finding it!',
      timestamp: '2 days ago',
    },
    {
      id: '7',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'You can pick it up at the post office at this address. I will leave it there for you.',
      timestamp: '10:00 AM',
    },
    {
      id: '8',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Great! I will pick it up tomorrow. Thank you so much!',
      timestamp: 'Yesterday',
    },
    {
      id: '9',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'My pleasure! Have a great day!',
      timestamp: '2 days ago',
    },
    {
      id: '10',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Can you tell me the name on the credit card inside the wallet?',
      timestamp: '10:00 AM',
    },
    {
      id: '11',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Just checking in!',
      timestamp: 'Yesterday',
    },
    {
      id: '12',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'New message from Alice!',
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
        data={chats.filter((_, index) => index < 3)}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        windowSize={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  chatListContainer: {
    marginHorizontal: 15,
    marginBottom: 100,
  },
});

export default ChatList;

import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ChatListItem, {ChatItemProps} from './ChatListItem';

function ChatList() {
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Hey, how are you? I was in Istanbul last week and wanted to show you some great pics',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Just checking in!',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'New message from Alice!',
      timestamp: '2 days ago',
    },
    {
      id: '4',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Hey, how are you? I was in Istanbul last week and wanted to show you some great pics',
      timestamp: '10:00 AM',
    },
    {
      id: '5',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Just checking in!',
      timestamp: 'Yesterday',
    },
    {
      id: '6',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'New message from Alice!',
      timestamp: '2 days ago',
    },
    {
      id: '7',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Hey, how are you? I was in Istanbul last week and wanted to show you some great pics',
      timestamp: '10:00 AM',
    },
    {
      id: '8',
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Just checking in!',
      timestamp: 'Yesterday',
    },
    {
      id: '9',
      name: 'Group Chat',
      avatarUri: 'hiahe',
      lastMessage: 'New message from Alice!',
      timestamp: '2 days ago',
    },
    {
      id: '10',
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Hey, how are you? I was in Istanbul last week and wanted to show you some great pics',
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
    return <ChatListItem {...item}   />;
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

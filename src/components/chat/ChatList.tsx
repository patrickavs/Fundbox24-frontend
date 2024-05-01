import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ChatListItem, {ChatItemProps} from './ChatListItem';

function ChatList() {
  const [chats, setChats] = useState([
    {
      name: 'John Doe',
      avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
      lastMessage:
        'Hey, how are you? I was in Istanbul last week and wanted to show you some great pics',
      timestamp: '10:00 AM',
    },
    {
      name: 'Jane Smith',
      avatarUri: 'exame.com/avatar2.jpg',
      lastMessage: 'Just checking in!',
      timestamp: 'Yesterday',
    },
    {
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
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatListContainer: {
    marginHorizontal: 15,
  },
});

export default ChatList;

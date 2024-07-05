import React from 'react';
import {Avatar, ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type ChatItemProps = {
  name: string;
  avatarUri?: string;
  lastMessage: string;
  timestamp: string;
  onPress?: () => void;
};

function ChatListItem({
  name,
  avatarUri = '',
  lastMessage,
  timestamp,
  onPress = () => {},
}: ChatItemProps) {
  const isValidAvatarUri = isUrl(avatarUri);
  return (
    <ListItem
      key={name}
      onPress={onPress}
      containerStyle={styles.listItem}
      underlayColor="transparent">
      {!isValidAvatarUri ? (
        <Ionicons
          name={'person-circle-outline'}
          size={50}
          style={{color: 'black'}}
        />
      ) : (
        <Avatar
          rounded
          title={name}
          source={{uri: avatarUri}}
          size={'medium'}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={styles.name}>{name}</ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.lastMessage}>
          {lastMessage}
        </ListItem.Subtitle>
        {timestamp && (
          <ListItem.Subtitle style={styles.timestamp}>
            {timestamp}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

export default ChatListItem;

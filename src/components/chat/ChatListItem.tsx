import React from 'react';
import {Avatar, ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';

export type ChatItemProps = {
  name: string;
  avatarUri?: string;
  lastMessage: string;
  timestamp: string;
  onPress?: () => void;
};

function ChatListItem({
  name,
  avatarUri,
  lastMessage,
  timestamp,
  onPress,
}: ChatItemProps) {
  const isValidAvatarUri = isUrl(avatarUri || '');
  return (
    <ListItem key={name} onPress={onPress} containerStyle={styles.listItem}>
      {isValidAvatarUri ? (
        <Avatar rounded source={{uri: avatarUri}} size={'medium'} />
      ) : (
        <Avatar
          rounded
          icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
          }}
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
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
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

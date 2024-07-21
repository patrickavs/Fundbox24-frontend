import React  from 'react';
import {StyleSheet, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader.tsx';
import { LostReportTheme } from '../../constants/theme.ts';
import SearchBar from '../../components/SearchBar.tsx';
import ChatList from '../../components/chat/ChatList';

function MyChatsScreen({navigation}): React.JSX.Element {

  return (
    <View testID={'lost-report-screen'}>
      <CustomHeader
        backgroundColor={LostReportTheme.colors.secondaryAccent}
        title={'Meine Chats'}
      />
      <View style={styles.scrollContainer}>
        <SearchBar
          onChangeText={text => {
            console.log('Benutzer sucht nach: ' + text);
          }}
        />
      </View>
      <View style={styles.scrollContainer2}>
        <ChatList />
      </View>
    </View>
  );
}

export default MyChatsScreen;

const styles = StyleSheet.create({
    scrollContainer2: {
        height: '78%',
    },
  text: {
    color: '#152238',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 15,
    fontSize: 17,
  },
  scrollContainer: {
    padding: 10,
    marginTop: 10,
      marginBottom: 10,
  },
});

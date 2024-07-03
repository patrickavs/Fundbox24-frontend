import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {useLostReports} from '../../hooks/useLostReports';
import {useChat} from '../../hooks/useChat';
import CustomHeader from '../../components/CustomHeader.tsx';
import LostReportCard from '../lost/LostReportCard.tsx';
import {category} from '../../data/categories.ts';
import ChatList from '../../components/chat/ChatList.tsx';

export default function StartScreen({navigation}): React.JSX.Element {
  const {isPending: isPendingUser, refreshUser, user} = useUser();
  const {
    isPending: isPendingLostReport,
    lostReports,
    refresh,
  } = useLostReports();
  const {isPending: isPendingChat, chats} = useChat(''); // TODO: Pass userToken here

  const isPending = isPendingUser || isPendingLostReport || isPendingChat;

  useEffect(() => {
    refreshUser();
  }, []);

  if (!isPending && !user) {
    return (
      <View style={{alignItems: 'center', marginTop: '50%'}}>
        <Text>Du bist nicht angemeldet</Text>
      </View>
    );
  }

  // const latestChats = useMemo(() =>
  //   chats
  //     .filter(({ isOpen }) => isOpen)
  //     .sort((chat1, chat2) => chat1.updatedAt.getTime() - chat2.updatedAt.getTime()),
  //   [chats]
  // );

  // const latestChats = useMemo(
  //   () =>
  //     chats
  //       .filter(({isOpen}) => isOpen)
  //       .sort(
  //         (chat1, chat2) =>
  //           chat1.updatedAt.getTime() - chat2.updatedAt.getTime(),
  //       )
  //       .slice(0, 4),
  //   [chats],
  // );
  if (isPending && !user) {
    return <Text>Lade ...</Text>;
  }
  refresh();

  return (
    <FlatList
      refreshing
      key={'vertical'}
      data={chats}
      renderItem={null}
      style={styles.outer}
      ListHeaderComponent={
        <>
          <View style={styles.container}>
            {isPending && <Text>Es lädt...</Text>}
            {!isPending && (
              <>
                <CustomHeader title={`Willkommen, ${user?.username}`} />
                <View style={styles.titleContainer}>
                  <Text style={styles.text}>Gesucht in deinem Umkreis</Text>
                  <Text
                    style={styles.text2}
                    onPress={() =>
                      navigation.navigate('Verloren', {
                        screen: 'LostReportScreen',
                      })
                    }>
                    mehr anzeigen
                  </Text>
                </View>
                <FlatList
                  key={'horizontal'}
                  horizontal
                  style={styles.list}
                  data={lostReports}
                  renderItem={({item, index}) => (
                    <LostReportCard
                      key={index}
                      report={item}
                      onPress={() =>
                        navigation.navigate('Verloren', {
                          screen: 'SingleLostReportScreen',
                          params: {item: item},
                        })
                      }
                      image={
                        category.find(it => it.name === item.category.name)
                          ?.image ?? category[category.length - 1].image
                      }
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
            )}
          </View>
          <View style={styles.titleContainer3}>
            <View style={styles.titleContainer2}>
              <Text style={styles.text}>Deine letzten Nachrichten</Text>
              <Text style={styles.text2}>mehr anzeigen</Text>
            </View>
            <ChatList />
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#87B9DD',
  },
  container: {
    flex: 1,
    height: 480,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    zIndex: -1,
    elevation: 0.25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 30,
    zIndex: 1,
  },
  titleContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    zIndex: 1,
  },
  titleContainer3: {
    flexDirection: 'column',
  },
  list: {
    flexGrow: 0,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  text2: {
    textDecorationLine: 'underline',
    padding: 3,
  },
  scroll: {
    height: 450,
    marginBottom: 200,
    paddingLeft: 10,
    paddingRight: 10,
  },
  big: {
    height: 600,
  },
});

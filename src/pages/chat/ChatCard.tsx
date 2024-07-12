import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ChatCardInfo } from '../../types/chat-card-info.ts';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';

type Props = {
  info: ChatCardInfo;
}

export default function ChatCard(props: Props) {
  const category = categoriesWithImage.find(
    categoryWithImage => categoryWithImage.name === props.info.categoryName
  );

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.imageContainer}>
        {category ?
          // @ts-ignore
          <Image style={styles.image} source={category.image} />
          : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.info.nameOfObject}</Text>
        <Text style={styles.textWrap}>{props.info.lastMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontWeight: 'bold',
  },
  textWrap: {
    flexShrink: 1,
  },
  imageContainer: {
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 5,
    borderRadius: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    gap: 3,
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    objectFit: 'contain',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

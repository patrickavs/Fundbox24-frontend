import React from 'react';

import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import { FoundReport } from '../../types/report-found.ts';
import moment from 'moment';

type ReportCardProps = {
  report: FoundReport;
  image: ImageSourcePropType;
  onPress: (id: string) => void;
};

export default function FoundReportCard(props: ReportCardProps): React.JSX.Element {
  return (
    <View key={props.report.id} style={styles.container}>
      <TouchableOpacity onPress={() => props.onPress(props.report.id)} testID='report-card-press'>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={props.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{props.report.title}</Text>
          <Text style={styles.text} numberOfLines={1}>{props.report.category.name}</Text>
          <Text style={styles.text}>{moment(props.report.foundDate).format('DD.MM.YYYY, HH:mm')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    padding: 10,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 3,
    padding: 20,
  },
  lostReportBackgroundColor: {
    backgroundColor: LostReportTheme.colors.secondaryAccent,
  },
  foundReportBackgroundColor: {
    backgroundColor: FoundReportTheme.colors.button1,
  },
  textContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    backgroundColor: FoundReportTheme.colors.button1,
  },
  title: {
    color: FoundReportTheme.colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    paddingTop: 5,
    color: FoundReportTheme.colors.text,
    fontSize: 15,
  },
  image: {
    height: 100,
    aspectRatio: 1,
  },
});

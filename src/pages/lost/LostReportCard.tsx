import React from 'react';

import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LostReport } from '../../types/report-lost.ts';
import { FoundReportTheme, LostReportTheme } from '../../constants/theme.ts';
import moment from 'moment';

type ReportCardProps = {
  report: LostReport;
  image: ImageSourcePropType;
  onPress: (id: string) => void;
};

export default function LostReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id} style={styles.container}>
      <TouchableOpacity onPress={() => props.onPress(props.report.id)} testID="report-card-press">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={props.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{props.report.title}</Text>
          <Text style={styles.text} numberOfLines={1}>{props.report.category?.name || 'Default'}</Text>
          <Text style={styles.text} numberOfLines={1}>{moment(props.report.lastSeenDate).format('DD.MM.YYYY, HH:mm')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    padding: 10,
    width: 175,
    marginLeft: 2,
    marginTop: 0,
    margin: 1,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'white',
    elevation: 6,
    padding: 20,
  },
  lostReportBackgroundColor: {
    backgroundColor: LostReportTheme.colors.secondaryAccent,
  },
  foundReportBackgroundColor: {
    backgroundColor: LostReportTheme.colors.primaryBackground,
  },
  textContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    backgroundColor: LostReportTheme.colors.secondaryAccent,
    elevation: 4,
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

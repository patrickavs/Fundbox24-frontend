import React from 'react';

import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {FoundReportTheme, LostReportTheme} from '../../constants/theme.ts';
import {FoundReport} from '../../types/report-found.ts';

type ReportCardProps = {
  report: FoundReport;
  image: ImageSourcePropType;
};

export default function FoundReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={props.image} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1}>{props.report.title}</Text>
        <Text numberOfLines={1}>{props.report.description}</Text>
        <Text>Gefunden am</Text>
        <Text numberOfLines={1}>{props.report.foundDate}</Text>
      </View>
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
    borderRadius: 8,
    padding: 5,
    backgroundColor: FoundReportTheme.colors.button1,
  },
});

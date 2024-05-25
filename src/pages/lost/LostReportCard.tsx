import React from 'react';

import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LostReport} from '../../types/report-lost.ts';
import {LostReportTheme} from '../../constants/theme.ts';

type ReportCardProps = {
  report: LostReport;
  image: ImageSourcePropType;
  onPress: (id: string) => void;
};

export default function LostReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id} style={styles.container}>
      <TouchableOpacity onPress={() => props.onPress(props.report.id)}>
        <View style={styles.imageContainer}>
          <Image source={props.image} />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1}>{props.report.title}</Text>
          <Text numberOfLines={1}>{props.report.description}</Text>
          <Text>Zuletzt gesehen am</Text>
          <Text numberOfLines={1}>{props.report.lastSeenDate}</Text>
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
    backgroundColor: LostReportTheme.colors.primaryBackground,
  },
  textContainer: {
    borderRadius: 8,
    padding: 5,
    backgroundColor: LostReportTheme.colors.secondaryAccent,
  },
});

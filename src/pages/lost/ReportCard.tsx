import React from 'react';

import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {LostReport} from '../../types/report-lost.ts';
import {FoundReportTheme, LostReportTheme} from '../../constants/theme.ts';
import {FoundReport} from '../../types/report-found.ts';

type ReportCardProps = {
  report: LostReport | FoundReport;
  backgroundColor: string;
  image: ImageSourcePropType;
};

export default function ReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={props.image} />
      </View>
      <View
        style={[
          styles.textContainer,
          {backgroundColor: props.backgroundColor},
        ]}>
        <Text numberOfLines={1}>{props.report.title}</Text>
        {/*TODO: replace placeOfDiscoery with city*/}
        <Text numberOfLines={1}>{props.report.placeOfDiscovery}</Text>
        <Text>Zuletzt gesehen am</Text>
        <Text numberOfLines={1}>
          {new Date(props.report.timeOfDiscovery).toDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});

import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {LostReport} from '../../types/report-lost.ts';
import {LostReportTheme} from '../../constants/theme.ts';

type ReportCardProps = {
  report: LostReport;
};

export default function ReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/winter_hat.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1}>{props.report.object}</Text>
        {/*TODO: replace placeOfDiscoery with city*/}
        <Text numberOfLines={1}>{props.report.placeOfDiscovery}</Text>
        <Text>Zuletzt gesehen am</Text>
        <Text numberOfLines={1}>
          {props.report.timeOfDiscovery.toDateString()}
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
  textContainer: {
    borderRadius: 8,
    backgroundColor: LostReportTheme.colors.secondaryAccent,
    padding: 5,
  },
});

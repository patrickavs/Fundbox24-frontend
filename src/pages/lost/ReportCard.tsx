import React from 'react';

import {Image, Text, View} from 'react-native';
import {LostReport} from '../../types/report-lost.ts';

type ReportCardProps = {
  report: LostReport;
};

export default function ReportCard(props: ReportCardProps) {
  return (
    <View key={props.report.id}>
      <View>
        <Image source={require('../../assets/images/winter_hat.png')} />
      </View>
      <View>
        <Text>{props.report.object}</Text>
        {/*TODO: replace placeOfDiscoery with city*/}
        <Text>{props.report.placeOfDiscovery}</Text>
        <Text>
          {'Zuletzt gesehen am ' + props.report.timeOfDiscovery.toDateString()}
        </Text>
      </View>
    </View>
  );
}

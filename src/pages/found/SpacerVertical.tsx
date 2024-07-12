import React from 'react';
import {View} from 'react-native';

export default function SpacerVertical({size}: {size: number}) {
    return (
        <View style={{height: size}} />
);
}

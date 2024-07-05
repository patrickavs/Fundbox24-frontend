import React from 'react';
import {View} from 'react-native';

interface DividerProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  dividerStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
  width = '100%',
  height = '100%',
  color = '#a5aeba',
  dividerStyle,
}) => {
  const dividerStyles = [
    {width: width},
    {height: height},
    {backgroundColor: color},
    dividerStyle,
  ];

  return <View style={dividerStyles} />;
};

export default Divider;

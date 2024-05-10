import {DefaultTheme} from '@react-navigation/native';

const baseFont = {
  interRegular: require('../assets/fonts/inter/Inter-Regular.ttf'),
};

export const AuthTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    headline: '#547892',
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#3082BF', // Button
    accentPrimary: '#EBF0F2', // Eingabefelder
    accentSecondary: '#DFF1FF', // Header
  },
  fonts: {
    regular: baseFont.interRegular,
    fontSize: 15,
  },
};

export const PopUpTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    background: '#FFFFFF',
  },
};

export const LostReportTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export const FoundReportTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

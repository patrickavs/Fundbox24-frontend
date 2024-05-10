import {DefaultTheme} from '@react-navigation/native';

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  fonts: {
    inter: 'Inter',
  },
};
export const AuthTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    headline: '#547892',
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#3082BF',
    accentSecondary: '#DFF1FF',
    accentPrimary: '#EBF0F2',
  },
  fonts: {
    regular: 'Regular, 14px',
  },
};

export const PopUpTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    headline: '#547892',
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#3082BF',
    accentSecondary: '#DFF1FF',
    accentPrimary: '#EBF0F2',
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

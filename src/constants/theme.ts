const baseFontFamily = {
  interRegular: require('../assets/fonts/inter/Inter-Regular.ttf'),
};

const baseFontSize = 15;

const dropShadow = {
  x: 4,
  y: 4,
};

const borderRadius = {
  small: 6,
  medium: 12,
  large: 20,
};

const commonFonts = {
  regular: {
    fontFamily: baseFontFamily.interRegular,
    fontSize: baseFontSize,
  },
  reportDescription: {
    fontFamily: baseFontFamily.interRegular,
    fontSize: 10,
  },
  text: {
    fontFamily: baseFontFamily.interRegular,
    fontSize: baseFontSize,
  },
  headline: {
    fontFamily: baseFontFamily.interRegular,
    fontSize: 20,
    fontWeight: 'semi-bold',
  },
};

export const AuthTheme = {
  colors: {
    text: '#000000',
    headline: '#547892',
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#3082BF', // Button
    accentPrimary: '#EBF0F2', // Eingabefelder
    accentSecondary: '#DFF1FF', // Header
  },
  fonts: commonFonts,
  header: {
    borderRadius: borderRadius.large,
    dropShadow: {
      ...dropShadow,
      y: 1,
    },
    width: 390,
    height: 48,
  },
  button: {
    borderRadius: borderRadius.small,
    dropShadow: dropShadow,
    width: 160,
    height: 35,
  },
  backgroundWhite: {
    borderRadius: borderRadius.large,
    dropShadow: dropShadow,
    register: {
      width: 333,
      height: 310,
    },
    login: {
      width: 333,
      height: 275,
    },
  },
  inputField: {
    borderRadius: borderRadius.medium,
    dropShadow: {
      ...dropShadow,
      y: 2,
    },
    width: 293,
    height: 43,
  },
};

export const PopUpTheme = {
  colors: {
    primaryText: '#000000',
    secondaryText: '#9F9E9E',
    background: '#FFFFFF',
    primaryAccent: '#EBF0F2',
    secondaryAccent: '#3082BF',
    tertiaryAccent: '#4DAD7E',
  },
  fonts: commonFonts.regular,
  button: {
    width: 160,
    height: 35,
    borderRadius: borderRadius.small,
    dropShadow: dropShadow,
  },
};

export const LostReportTheme = {
  colors: {
    text: '#000000',
    headerHeadline: '#547892',
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#87B9DD',
    primaryAccent: '#F2F2F2',
    secondaryAccent: '#DFF1FF',
    button: '#3082BF',
  },
  fonts: commonFonts,
};

export const FoundReportTheme = {
  colors: {
    text: '#000000',
    background: '#FEF1ED',
    button1: '#C8FAD8',
    button2: '#4DAD7E',
  },
  fonts: commonFonts,
};

export const FurtherPagesTheme = {
  reportTile: {
    image: {
      width: 130,
      height: 108,
      dropShadow: {
        ...dropShadow,
        y: 1,
      },
      borderRadius: borderRadius.small,
    },
    text: {
      width: 166,
      height: 130,
      borderRadius: borderRadius.small,
    },
  },
  chatTile: {
    width: 300,
    height: 60,
    borderRadius: borderRadius.small,
    dropShadow: {
      ...dropShadow,
      y: 2,
    },
  },
  search: {
    width: 337,
    height: 40,
    borderRadius: borderRadius.small,
    dropShadow: {
      ...dropShadow,
      y: 1,
    },
  },
  filter_sort: {
    width: 165,
    height: 35,
    borderRadius: borderRadius.small,
    dropShadow: {
      ...dropShadow,
      y: 1,
    },
  },
  header: {
    borderRadius: borderRadius.large,
  },
  myAccInputField: {
    width: 322,
    height: 38,
    borderRadius: borderRadius.small,
    dropShadow: {
      ...dropShadow,
      y: 1,
    },
  },
  flipMenu: {
    width: 138,
    height: 35,
    borderRadius: borderRadius.small,
    dropShadow: {
      ...dropShadow,
      y: 2,
    },
  },
};

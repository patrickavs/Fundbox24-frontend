module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/template',
    'Libraries/Renderer',
    'RNTester/e2e',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@expo-modules-core|expo-modules-core|expo|@expo|@react-navigation|react-navigation|@babel|babel|@jest|jest|react-redux|@react-redux)',
  ],
  fakeTimers: {
    enableGlobally: true,
  },
  verbose: true,
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  diameterLabel: {
    textAlign: 'center',
  },
  diameterText: {
    textAlign: 'center',
    fontSize: 20,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    marginTop: 'auto',
    padding: 30,
    backgroundColor: 'white',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default styles;

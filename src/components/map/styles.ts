import {StyleSheet} from 'react-native';
import {LostReportTheme} from '../../constants/theme';

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
    backgroundColor: '#F2F2F2',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  marginToTabBar: {
    marginBottom: 80,
  },
  iconButton: {
    margin: 5,
    padding: 4,
    color: 'black',
    borderRadius: 10,
    fontSize: 30,
    fontWeight: 'bolder',
    alignSelf: 'center',
  },
  iconButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'white',
    width: 50,
    zIndex: 5,
    position: 'absolute',
    top: 30,
    right: 30,
    elevation: 2,
  },
});

export default styles;

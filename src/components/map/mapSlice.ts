import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import MapState from './mapState.ts';
import mapConstants from '../../constants/map.ts';
import {LatLng} from 'react-native-maps';
import {RootState} from '../../redux/store.ts';

const initialState: MapState = {
  position: mapConstants.initialMapPosition,
  radius: (mapConstants.maxRadius - mapConstants.minRadius) / 2,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    changePosition: changePositionReducer,
    changeRadius: changeRadiusReducer,
  },
});

function changePositionReducer(state: MapState, action: PayloadAction<LatLng>) {
  state.position = action.payload;
}

function changeRadiusReducer(state: MapState, action: PayloadAction<number>) {
  state.radius = action.payload;
}

const selectPosition = (state: RootState) => state.map.position;
const selectRadius = (state: RootState) => state.map.radius;

export {selectPosition, selectRadius};
export const {changePosition, changeRadius} = mapSlice.actions;

export default mapSlice.reducer;
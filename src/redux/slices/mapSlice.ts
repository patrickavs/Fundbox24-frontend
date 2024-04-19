import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import MapState from '../types/mapState.ts';
import constants from '../../constants.ts';
import {LatLng} from 'react-native-maps';

const initialState: MapState = {
  position: constants.initialMapPosition,
  radius: constants.minRadius,
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

export const {changePosition, changeRadius} = mapSlice.actions;

export default mapSlice.reducer;

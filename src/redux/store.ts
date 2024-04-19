import {configureStore} from '@reduxjs/toolkit';
import mapReducer from '../components/map/mapSlice.ts';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {RootState, AppDispatch};
export default store;

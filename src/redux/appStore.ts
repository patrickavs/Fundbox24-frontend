import {configureStore} from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice.ts';

const appStore = configureStore({
  reducer: {
    map: mapReducer,
  },
});

type RootState = ReturnType<typeof appStore.getState>;
type AppDispatch = typeof appStore.dispatch;

export type {RootState, AppDispatch};
export default appStore;

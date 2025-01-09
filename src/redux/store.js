// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import subGraphReducer from './slices/subGraphSlice';

export const store = configureStore({
  reducer: {
    subGraphs: subGraphReducer,
  },
});
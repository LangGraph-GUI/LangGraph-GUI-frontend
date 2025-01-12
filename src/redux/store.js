// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import subGraphReducer from '../Graph/subGraphSlice.store';


export const store = configureStore({
  reducer: {
    subGraphs: subGraphReducer,
  },
});
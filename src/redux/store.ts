// redux/store.ts

import { configureStore, } from '@reduxjs/toolkit';
import subGraphReducer from './slices/subGraphSlice';

export const store = configureStore(
    {
        reducer: {
            subGraphs: subGraphReducer,
        },

    },

);

// Optional: Attach store to the window object for debugging (use conditionally)
if (process.env.NODE_ENV === 'DEBUG') {
    (window as any).store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
// redux/store.ts

import { configureStore, } from '@reduxjs/toolkit';
import subGraphReducer from '../Graph/subGraphs.store';
import userInfoReducer from './userInfo.store';

export const store = configureStore(
    {
        reducer: {
            subGraphs: subGraphReducer,
            userInfo: userInfoReducer,
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
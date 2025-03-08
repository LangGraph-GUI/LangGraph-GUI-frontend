// userInfo.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
    username: string;
    llmModel: string;
    apiKey: string;
}

const initialState: UserInfoState = {
    username: 'unknown',
    llmModel: '<empty>',
    apiKey: '<empty>',
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
          state.username = action.payload;
        },
        setConfigs: (state, action: PayloadAction<{ llmModel: string; apiKey: string }>) => {
            state.llmModel = action.payload.llmModel;
            state.apiKey = action.payload.apiKey;
        },
        loadInitialState: (state, action: PayloadAction<{ llmModel: string; apiKey: string }>) => {
            state.llmModel = action.payload.llmModel;
            state.apiKey = action.payload.apiKey;
        }
    },
});

export const { setUsername, setConfigs, loadInitialState } = userInfoSlice.actions;
export default userInfoSlice.reducer;
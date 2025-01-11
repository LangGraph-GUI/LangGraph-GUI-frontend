// redux/userInfo.store.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
    user_id: string;
    llmModel: string;
    apiKey: string;    
}

const initialState: UserInfoState = {
    user_id: localStorage.getItem('user_id') || '',
    llmModel: localStorage.getItem('llmModel') || '',
    apiKey: localStorage.getItem('apiKey') || '',    
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<{ newLlmModel: string; newapiKey: string; newUserId: string }>) => {
            const { newLlmModel, newapiKey, newUserId } = action.payload;
            state.llmModel = newLlmModel;
            state.apiKey = newapiKey;
            state.user_id = newUserId;

            localStorage.setItem('llmModel', newLlmModel);
            localStorage.setItem('apiKey', newapiKey);
            localStorage.setItem('user_id', newUserId);
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.user_id = action.payload;
            localStorage.setItem('user_id', action.payload);
        }
    },
});

export const { setSettings, setUserId } = userInfoSlice.actions;
export default userInfoSlice.reducer;
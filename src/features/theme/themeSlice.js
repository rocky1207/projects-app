import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDark: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeMode: (state, action) => {
            state.isDark = action.payload;
        },
    },
});

export const { themeMode } = themeSlice.actions;

export default themeSlice.reducer;

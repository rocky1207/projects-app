import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noteId: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteInfo: (state, action) => {
            state.noteId = action.payload;
        },
    },
});

export const { noteInfo } = notesSlice.actions;

export default notesSlice.reducer;

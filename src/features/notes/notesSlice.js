import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noteId: null,
    note: {
        noteTitle: '',
        noteDescription: '',
        imageState: null,
        categoryId: '',
    },
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteInfo: (state, action) => {
            state.noteId = action.payload;
        },
        noteEdit: (state, action) => {
            state.noteTitle = action.payload.noteTitle;
            state.noteDescription = action.payload.noteDescription;
            state.imageState = action.payload.imageState;
            state.categoryId = action.payload.categoryId;
        },
    },
});

export const { noteInfo, noteEdit } = notesSlice.actions;

export default notesSlice.reducer;

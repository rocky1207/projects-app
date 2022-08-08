import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: null,
};

const projectsAuthorSlice = createSlice({
    name: 'projectsAuthor',
    initialState,
    reducers: {
        projectsAuthor: (state, action) => {
            console.log(action);
            state.avatar = action.payload;
        },
    },
});

export const { projectsAuthor } = projectsAuthorSlice.actions;

export default projectsAuthorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: null,
    members: [],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectsAuthor: (state, action) => {
            state.avatar = action.payload;
        },
        addProjectMembers: (state, action) => {
            state.members = [...state.members, action.payload];
        },
        removeProjectMember: (state, action) => {
            state.members = state.members.filter(
                (member) => member !== action.payload
            );
        },
        deleteAllProjectMembers: (state, action) => {
            state.members = action.payload;
        },
    },
});

export const {
    projectsAuthor,
    addProjectMembers,
    removeProjectMember,
    deleteAllProjectMembers,
} = projectsSlice.actions;

export default projectsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterParams: '',
};

const searchProjectsSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchProjects: (state, action) => {
            console.log(action.payload);
            state.filterParams = action.payload;
        },
    },
});

export const { searchProjects } = searchProjectsSlice.actions;

export default searchProjectsSlice.reducer;

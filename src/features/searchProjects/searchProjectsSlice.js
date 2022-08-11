import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterParams: '',
    pageNumber: 1,
};

const searchProjectsSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchProjects: (state, action) => {
            console.log(action);

            state.filterParams = action.payload;
        },
        getPageNumber: (state, action) => {
            console.log(action);
            state.pageNumber = parseInt(action.payload);
        },
    },
});

export const { searchProjects, getPageNumber } = searchProjectsSlice.actions;

export default searchProjectsSlice.reducer;

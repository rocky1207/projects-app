import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterParams: '',
    pageNumber: null,
    maxPageNumber: null,
};

const searchProjectsSlice = createSlice({
    name: 'search',
    initialState,

    reducers: {
        searchProjects: (state, action) => {
            state.filterParams = action.payload;
        },
        getPageNumber: (state, action) => {
            const sentNumber = parseInt(action.payload);

            state.pageNumber = sentNumber;
        },
        incPageNumber: (state, action) => {
            const payload = parseInt(action.payload);
            state.pageNumber += payload;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = parseInt(action.payload);
        },
        setMaxPageNumber: (state, action) => {
            state.maxPageNumber = parseInt(action.payload);
        },
    },
});

export const {
    searchProjects,
    getPageNumber,
    setPageNumber,
    setMaxPageNumber,
    incPageNumber,
} = searchProjectsSlice.actions;

export default searchProjectsSlice.reducer;

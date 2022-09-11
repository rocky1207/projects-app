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

            /*
            const number = parseInt(action.payload);

            const maxPages = state.maxPageNumber;

            let niz1 = [];
            for (let i = 1; i <= maxPages; i++) {
                niz1.push(i);
            }

            let niz2 = niz1.reverse();

            const pagintionPage = niz2.indexOf(number);
            //const pagintionPage = niz1.indexOf(number);
            state.pageNumber = pagintionPage + 1;
            */
        },
        incPageNumber: (state, action) => {
            const payload = parseInt(action.payload);
            //console.log(payload);
            state.pageNumber += payload;
            console.log(state.pageNumber);
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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categorieId: null,
    categorieName: '',
    categories: [],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryInfo: (state, action) => {
            state.categorieId = action.payload.categorieId;
            state.categorieName = action.payload.categorieName;
        },
    },
});

export const { categoryInfo, setCategoriesArray } = categorySlice.actions;

export default categorySlice.reducer;

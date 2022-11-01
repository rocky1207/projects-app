import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: null,
    categorieName: '',
    categories: [],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryInfo: (state, action) => {
            state.categoryId = action.payload.categorieId;
            state.categorieName = action.payload.categorieName;
        },
    },
});

export const { categoryInfo, setCategoriesArray } = categorySlice.actions;

export default categorySlice.reducer;

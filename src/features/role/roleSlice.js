import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        roleOn: (state, action) => {
            console.log(action.payload);
            state.role = action.payload;
        },
    },
});
export const { roleOn } = roleSlice.actions;

export default roleSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employeeAvatarPath: '',
};

const employeeAvatarSlice = createSlice({
    name: 'employeeAvatar',
    initialState,
    reducers: {
        employeeAvatar: (state, action) => {
            state.employeeAvatarPath = action.payload;
        },
    },
});
export const { employeeAvatar } = employeeAvatarSlice.actions;

export default employeeAvatarSlice.reducer;

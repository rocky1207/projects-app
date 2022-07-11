import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUserId: null,
    currentUser: '',
    isLogged: false,
    token: null,
    isLoading: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginCredentials: (state, action) => {
            console.log(state, action);
            state.currentUserId = action.payload.user.id;
            state.currentUser = action.payload.user.username;
            state.token = action.payload.jwt;
            state.isLogged = true;
        },
    },
});
export const { loginCredentials } = authSlice.actions;

export default authSlice.reducer;

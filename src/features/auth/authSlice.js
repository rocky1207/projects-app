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
            state.currentUserId = action.payload.user.id;
            state.currentUser = action.payload.user.username;
            state.token = action.payload.jwt;
            state.isLogged = true;
        },
        logOut: (state) => {
            state.currentUserId = null;
            state.currentUser = '';
            state.token = null;
            state.isLogged = false;
            state.isLoading = false;
            state.error = '';
            localStorage.removeItem('token');
        },
    },
});
export const { loginCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

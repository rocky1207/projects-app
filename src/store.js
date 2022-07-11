import { configureStore } from '@reduxjs/toolkit';
//import registerReducer from './features/registerUser/registerUserSlice';
//import uploadReducer from './features/uplaodImage/uploadImageSlice';
//import loginReducer from './features/loginUser/loginUserSlice';
import authReducer from './features/auth/authSlice';
//import roleReducer from './features/auth/userRoleSlice';
//import { apiSlice } from './features/api/apiSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        // register: registerReducer,
        auth: authReducer,
        //upload: uploadReducer,
        //login: loginReducer,
        //role: roleReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

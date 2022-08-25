import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/searchProjects/searchProjectsSlice';
import projectsReducer from './features/projects/projectsSlice';

import { apiSlice } from './api/apiSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    authReducer,
    projectsReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        search: searchReducer,
        projects: projectsReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(apiSlice.middleware),
});

let Persistor = persistStore(store);

export { Persistor };

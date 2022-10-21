import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/searchProjects/searchProjectsSlice';
import projectsReducer from './features/projects/projectsSlice';
import categoryReducer from './features/categories/categoriesSlice';
import notesReducer from './features/notes/notesSlice';

import { combineReducers } from '@reduxjs/toolkit';
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
    blacklist: [apiSlice.reducerPath],
};

const reducer = combineReducers({
    projects: projectsReducer,
    auth: authReducer,
    search: searchReducer,
    categories: categoryReducer,
    notes: notesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(
    persistConfig,
    reducer
    //authReducer
    //projectsReducer
);

export const store = configureStore({
    /*
    reducer: {
        auth: persistedReducer,
        search: searchReducer,
        projects: projectsReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
    },
*/
    reducer: persistedReducer,
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

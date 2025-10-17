import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';

const reducer = combineReducers({
    auth: authReducer
});

const store = configureStore({
    reducer
});

export * from './slices/authSlice';
export default store;
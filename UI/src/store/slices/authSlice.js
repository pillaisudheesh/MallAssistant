import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const name = 'auth';
const createInitialState = () => {
    return {
        token: null,
        user: null,
        isAuthenticated: false,
        error: null
    }
}

const createReducers = () => {
    return {
        setCredentials(state, action) {
            console.log(action.payload);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    }
}
const initialState = createInitialState();
const reducers = createReducers();

const slice = createSlice({name, initialState, reducers});
export const authActions = {...slice.actions};
export const authReducer = slice.reducer;
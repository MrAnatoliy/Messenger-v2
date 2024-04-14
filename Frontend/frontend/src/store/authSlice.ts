import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import Cookies from "universal-cookie";

export interface IAuthSlice {
    user: {
        username : string,
        email : string,
        token : string,
        authorities : Array<string>,
    } | null;
    isLoggedIn : boolean;
    loading : 'idle' | 'pending' | 'failed' | 'succeeded' ;
    message : string | null;
}

export interface IAuthResponse {
    token : string,
    message : string,
    roles : string[],
}

export interface IAuthRequest {
    email : string,
    password : string,
}

const initialState : IAuthSlice = {
    user: null,
    isLoggedIn: false,
    loading: 'idle',
    message: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        authentication: (state) => {
            state.loading = 'pending'
        },
        logout: (state) => {
            state.loading = 'idle'
            state.user = null
        },
        authSuccess: (state, action : PayloadAction<IAuthResponse>) => {
            state.loading = 'succeeded';
            state.isLoggedIn = true;
            state.user = {
                username: "username",
                email: "email",
                token: action.payload.token,
                authorities: action.payload.roles,
            }
            state.message = action.payload.message;
        },
        authFail: (state, action : PayloadAction<IAuthResponse>) => {
            state.loading = 'failed'
            state.isLoggedIn = false
            state.message = action.payload.message
        },
        clearMessage: (state) => {
            state.message = ''
        },
        resetLoading: (state) => {
            state.loading = 'idle'
        },
    }
})

export const {
    authentication,
    logout,
    authSuccess,
    authFail,
    clearMessage,
    resetLoading,
} = authSlice.actions

export const selectUser = (state : RootState) => state.auth.user
export const selectIsLogged = (state : RootState) => state.auth.isLoggedIn
export const selectLoading = (state : RootState) => state.auth.loading
export const selectMessage = (state : RootState) => state.auth.message

export default authSlice.reducer

const API_URL = process.env.REACT_APP_API_URL

export const authenticate = createAsyncThunk(
    'auth/authenticate',
    async (
        userData : IAuthRequest,
        { dispatch, rejectWithValue }
    ) => {
        dispatch(authentication())
        try {
            const response = await axios.post(API_URL + 'auth/login', userData);
            const data: IAuthResponse = response.data;
            if (data.token) {
                dispatch(authSuccess(data));
                const cookies = new Cookies()
                cookies.set("token",data.token)
                cookies.set("authorities",data.roles)
            } else {
                dispatch(authFail(data));
            }
        } catch (err: any) {
            dispatch(authFail(err.message));
            return rejectWithValue(err.message);
        }
    }
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "./Api/axios";

export interface IinitialState {
    $id?: string;
    email: string;
    userName: string;
    token: string;
    message: string | null;
    isAuthenticated: boolean;
    roles: {
        $id: string;
        $values: []
    };
    authState: "idle" | "success" | "loading" | "failed";
    authError: string | null;
}

export interface ICredentials {
    email: string;
    password: string;
}

const initialState: IinitialState = {
    $id: "",
    email: "",
    userName: "",
    token: "",
    message: null,
    isAuthenticated: false,
    roles: {
        $id: "",
        $values: []
    },
    authState: "idle",
    authError: null,
}

export const getToken = createAsyncThunk(
    "auth/getToken",
    async (credentials: ICredentials, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post(`api/user/token`, {
                email: credentials.email,
                password: credentials.password
            }, {
                withCredentials: true
            });
            console.log(response.data);

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error(err.response.data || err.message);
                return rejectWithValue(err.response?.data);
            } else {
                console.error('Unexpected error:', err);
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IinitialState>) => {
            if (action.payload) {
                state.email = action.payload.email;
                state.userName = action.payload.userName;
                state.token = action.payload.token;
                state.message = action.payload.message;
                state.roles = action.payload.roles;
                state.isAuthenticated = action.payload.isAuthenticated;
            }
        }
    },
    extraReducers: (builder) => {
        // get token
        builder
            .addCase(getToken.pending, (state) => {
                state.authState = "loading";
            })
            .addCase(getToken.fulfilled, (state, action: PayloadAction<IinitialState>) => {
                return {
                    ...state,
                    authState: "success",
                    message: action.payload.message,
                    isAuthenticated: action.payload.isAuthenticated,
                    userName: action.payload.userName,
                    email: action.payload.email,
                    roles: action.payload.roles,
                    token: action.payload.token,
                    authError: null,
                };
            })
            .addCase(getToken.rejected, (state, action) => {
                return {
                    ...state,
                    authState: "failed",
                    authError: action.payload as string
                }
            });
    }
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
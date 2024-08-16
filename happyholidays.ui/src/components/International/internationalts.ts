import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInternationalPackage = createAsyncThunk(
    "packageSlice/fetchInternationalPackage",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://localhost:7246/Package/international");
            return response.data.$values;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error(err.response.data || err.message);
                return rejectWithValue(err.response?.data);
            }
            else {
                console.error('Unexpected error:', err);
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPackages = createAsyncThunk(
    "packageSlice/getAllPackages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://localhost:7246/Package/GetPackages");
            return response.data.$values;
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

export const deletePackage = createAsyncThunk(
    "packageSlice/deletePackage",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://localhost:7246/Package/DeletePackage/${id}`);
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
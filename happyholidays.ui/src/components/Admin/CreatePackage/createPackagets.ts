import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PackagePost } from "./createPackageModels";

export const createPackage = createAsyncThunk(
    "packageSlice/createPackage",
    async (value: PackagePost, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://localhost:7246/Package/CreatePackage`, value);
            // return response.status
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
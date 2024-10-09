import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PackageGet, PackagePost } from "./createOrEditPackageModels";

export const createPackage = createAsyncThunk(
    "packageSlice/createPackage",
    async (value: PackagePost, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://localhost:7246/Package/CreatePackage`, value, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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

export const editPackage = createAsyncThunk(
    "packageSlice/editPackage",
    async (value: PackageGet, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://localhost:7246/Package/EditPackage/${value.packageId}`, value);
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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQueries } from "../../components/Admin/Queries/queriests";

export interface PackageState {
    contactData: any;
    contactDataStatus: "idle" | "success" | "loading" | "failed";
    constactDataError: string | null;
}


const initialState: PackageState = {
    contactData: {} as any,
    contactDataStatus: "idle",
    constactDataError: null
}

export const contactSlice = createSlice({
    name: "packageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get contact data
        builder
            .addCase(getQueries.pending, (state) => {
                state.contactDataStatus = "loading";
            })
            .addCase(getQueries.fulfilled, (state, action: PayloadAction<any[]>) => {
                return {
                    ...state,
                    contactDataStatus: "success",
                    contactData: action.payload,
                    constactDataError: null
                }
            })
            .addCase(getQueries.rejected, (state, action) => {
                return {
                    ...state,
                    contactDataStatus: "failed",
                    constactDataError: action.payload as string
                }
            });
    }
});

export const { } = contactSlice.actions;
export default contactSlice.reducer;
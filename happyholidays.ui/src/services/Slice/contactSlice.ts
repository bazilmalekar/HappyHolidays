import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ContactFrom } from "../../components/Home/ContactUsForm/contactFormInterface";

export interface PackageState {
    contactData: ContactFrom[];
    contactDataStatus: "idle" | "success" | "loading" | "failed";
    constactDataError: string | null;
    exitingContactData: ContactFrom | null;
    existingContactDataStatus: "idle" | "success" | "loading" | "failed";
    exitingConstactDataError: string | null;
    postContactData: any;
    postContactDataStatus: "idle" | "success" | "loading" | "failed";
    postConstactDataError: string | null;
    updatedContactData: ContactFrom;
    updatedContactStatus: "idle" | "success" | "loading" | "failed";
    updateContactError: string | null;
    deleteContactStatus: "idle" | "success" | "loading" | "failed";
    deleteContactError: string | null;
}


const initialState: PackageState = {
    contactData: [],
    contactDataStatus: "idle",
    constactDataError: null,
    exitingContactData: {} as ContactFrom,
    existingContactDataStatus: "idle",
    exitingConstactDataError: null,
    postContactData: {} as ContactFrom,
    postContactDataStatus: "idle",
    postConstactDataError: null,
    updatedContactData: {} as ContactFrom,
    updatedContactStatus: "idle",
    updateContactError: null,
    deleteContactStatus: "idle",
    deleteContactError: null
}

export const postQuery = createAsyncThunk(
    "contactSlice/postQuery",
    async (value: ContactFrom, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://localhost:7246/ContactUs`, value);
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

export const getExistingQuery = createAsyncThunk(
    "contactSlice/getExistingQuery",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://localhost:7246/ContactUs/GetMessage/${id}`);
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

export const getQueries = createAsyncThunk(
    "contactSlice/getQueries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://localhost:7246/ContactUs/GetAllMessages");
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
    },
);

export const updateQuery = createAsyncThunk(
    "contactSlice/updateQuery",
    async (value: ContactFrom, { rejectWithValue }) => {
        try {
            if (value) {
                const response = await axios.put(`https://localhost:7246/ContactUs/EditContact/${value.contactUsId}`, value);
                return response.data;
            }
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

export const deleteQuery = createAsyncThunk(
    "contactSlice/deleteQuery",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://localhost:7246/ContactUs/DeleteContact/${id}`);
            return response.status;
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

export const contactSlice = createSlice({
    name: "contactSlice",
    initialState,
    reducers: {
        handleExistingQueryStatusChange: (state, action: PayloadAction<{ value: number, id: number }>) => {
            const { value, id } = action.payload;
            // Update the specific contact's status without mutating the original array
            state.contactData = state.contactData.map((contact: ContactFrom) =>
                contact.contactUsId === id
                    ? { ...contact, status: value }
                    : contact
            );
        },
        handleExistingQueryRemarksChange: (state, action: PayloadAction<{ value: string, id: number }>) => {
            const { value, id } = action.payload;
            state.contactData = state.contactData.map((contact: ContactFrom) =>
                contact.contactUsId === id
                    ? { ...contact, remarks: value }
                    : contact
            );
        },
        setUpdateStateIdel: (state) => {
            state.updatedContactStatus = "idle";
        },
        setDeleteStateIdel: (state) => {
            state.deleteContactStatus = "idle";
        }
    },
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

        // Get individual contact data
        builder
            .addCase(getExistingQuery.pending, (state) => {
                state.existingContactDataStatus = 'loading';
                state.exitingContactData = null; // Clear previous data
                state.exitingConstactDataError = null; // Clear previous errors
            })
            .addCase(getExistingQuery.fulfilled, (state, action: PayloadAction<any>) => {
                state.existingContactDataStatus = 'success';
                state.exitingContactData = action.payload;
                state.exitingConstactDataError = null;
            })
            .addCase(getExistingQuery.rejected, (state, action) => {
                state.existingContactDataStatus = 'failed';
                state.exitingContactData = null; // Ensure data is cleared on error
                state.exitingConstactDataError = action.error.message || 'Failed to fetch data'; // Use error message
            });


        // Post contact
        builder
            .addCase(postQuery.pending, (state) => {
                state.postContactDataStatus = "loading";
            })
            .addCase(postQuery.fulfilled, (state, action: PayloadAction<ContactFrom>) => {
                return {
                    ...state,
                    postContactDataStatus: "success",
                    postContactData: action.payload,
                    postConstactDataError: null
                }
            })
            .addCase(postQuery.rejected, (state, action) => {
                return {
                    ...state,
                    postContactDataStatus: "failed",
                    postConstactDataError: action.payload as string
                }
            });

        // Update Query
        builder
            .addCase(updateQuery.pending, (state) => {
                state.updatedContactStatus = "loading";
            })
            .addCase(updateQuery.fulfilled, (state, action: PayloadAction<ContactFrom>) => {
                return {
                    ...state,
                    updatedContactStatus: "success",
                    updatedContactData: action.payload,
                    updateContactError: null
                }
            })
            .addCase(updateQuery.rejected, (state, action) => {
                return {
                    ...state,
                    updatedContactStatus: "failed",
                    updateContactError: action.payload as string
                }
            });

        // Delete Query
        builder
            .addCase(deleteQuery.pending, (state) => {
                state.deleteContactStatus = "loading";
            })
            .addCase(deleteQuery.fulfilled, (state) => {
                return {
                    ...state,
                    deleteContactStatus: "success",
                    deleteContactError: null
                }
            })
            .addCase(deleteQuery.rejected, (state, action) => {
                return {
                    ...state,
                    deleteContactStatus: "failed",
                    deleteContactError: action.payload as string
                }
            });
    }
});

export const { handleExistingQueryStatusChange, handleExistingQueryRemarksChange, setUpdateStateIdel, setDeleteStateIdel } = contactSlice.actions;
export default contactSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePackage, getAllPackages } from "../../components/Admin/AllPackages/allpackagests";
import { createPackage, editPackage } from "../../components/Admin/CreateOrEditPackage/createOrEditPackagets";
import { PackageGet, PackagePost } from "../../components/Admin/CreateOrEditPackage/createOrEditPackageModels";
import axios from "axios";

export interface PackageState {
    internationalPackages: any[];
    internationalPackageStatus: "idle" | "success" | "loading" | "failed";
    internationalPackageError: string | null;
    domesticPackages: any[];
    domesticPackageStatus: "idle" | "success" | "loading" | "failed";
    domesticPackageError: string | null;
    honeymoonPackages: any[];
    honeymoonPackageStatus: "idle" | "success" | "loading" | "failed";
    honeymoonPackageError: string | null;
    packageDetails: any;
    packageDetailsStatus: "idle" | "success" | "loading" | "failed";
    packageDetailsError: string | null;
    allPackages: any;
    allPackagesStatus: "idle" | "success" | "loading" | "failed";
    allPackagesError: string | null;
    deletePackageStatus: "idle" | "success" | "loading" | "failed";
    deletePackageError: string | null;
    createPackageDetails: PackagePost;
    createPackageStatus: "idle" | "success" | "loading" | "failed";
    createPackageError: string | null;
    editPackageDetails: PackageGet;
    editPackagePackageStatus: "idle" | "success" | "loading" | "failed";
    editPackageError: string | null;
}


const initialState: PackageState = {
    internationalPackages: [],
    internationalPackageStatus: "idle",
    internationalPackageError: null,
    domesticPackages: [],
    domesticPackageStatus: "idle",
    domesticPackageError: null,
    honeymoonPackages: [],
    honeymoonPackageStatus: "idle",
    honeymoonPackageError: null,
    packageDetails: {},
    packageDetailsStatus: "idle",
    packageDetailsError: null,
    allPackages: [],
    allPackagesStatus: "idle",
    allPackagesError: null,
    deletePackageStatus: "idle",
    deletePackageError: null,
    createPackageDetails: {} as PackagePost,
    createPackageStatus: "idle",
    createPackageError: null,
    editPackageDetails: {} as PackageGet,
    editPackagePackageStatus: "idle",
    editPackageError: null
}

// get domestic packages
export const fetchDomesticPackages = createAsyncThunk(
    "packageSlice/fetchDomesticPackages",
    async ({ axiosPrivate }: { axiosPrivate: any }, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get("/Package/domestic");
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
    },
);

// get international packages
export const fetchInternationalPackage = createAsyncThunk(
    "packageSlice/fetchInternationalPackage",
    async ({ axiosPrivate }: { axiosPrivate: any }, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get("https://localhost:7246/Package/international");
            return response.data;
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

// get honeymoon packages
export const fetchHoneymoonPackages = createAsyncThunk(
    "packageSlice/fetchHoneymoonPackages",
    async ({ axiosPrivate }: { axiosPrivate: any }, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get("https://localhost:7246/Package/honeymoon");
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

export const fetchPackageDetails = createAsyncThunk(
    "packageSlice/fetchPackageDetails",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://localhost:7246/Package/details/${id}`);
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

export const packageSlice = createSlice({
    name: "packageSlice",
    initialState,
    reducers: {
        resetCreatePackageStatus: (state) => {
            state.createPackageStatus = "idle";
            state.createPackageDetails = {} as PackagePost
        },
        resetEditPackageStatus: (state) => {
            return {
                ...state,
                editPackagePackageStatus: "idle",
                editPackageDetails: {} as PackageGet
            }
        },
        handleIsActiveChange: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            state.allPackages = state.allPackages.map((elem: PackageGet) =>
                elem.packageId === id
                    ? { ...elem, isActive: !elem.isActive }
                    : elem
            );
        }
    },
    extraReducers: (builder) => {
        // International Packages
        builder
            .addCase(fetchInternationalPackage.pending, (state) => {
                state.internationalPackageStatus = "loading";
            })
            .addCase(fetchInternationalPackage.fulfilled, (state, action: PayloadAction<any[]>) => {
                return {
                    ...state,
                    internationalPackageStatus: "success",
                    internationalPackages: action.payload,
                    internationalPackageError: null

                }
            })
            .addCase(fetchInternationalPackage.rejected, (state, action) => {
                return {
                    ...state,
                    internationalPackageStatus: "failed",
                    internationalPackageError: action.payload as string
                }
            });
        // Domestic Packages
        builder
            .addCase(fetchDomesticPackages.pending, (state) => {
                state.domesticPackageStatus = "loading";
            })
            .addCase(fetchDomesticPackages.fulfilled, (state, action: PayloadAction<any[]>) => {
                return {
                    ...state,
                    domesticPackageStatus: "success",
                    domesticPackages: action.payload,
                    domesticPackageError: null
                }
            })
            .addCase(fetchDomesticPackages.rejected, (state, action) => {
                return {
                    ...state,
                    domesticPackageStatus: "failed",
                    domesticPackageError: action.payload as string
                }
            });

        //Honeymoon packages
        builder
            .addCase(fetchHoneymoonPackages.pending, (state) => {
                state.honeymoonPackageStatus = "loading";
            })
            .addCase(fetchHoneymoonPackages.fulfilled, (state, action: PayloadAction<any[]>) => {
                return {
                    ...state,
                    honeymoonPackageStatus: "success",
                    honeymoonPackages: action.payload,
                    honeymoonPackageError: null
                }
            })
            .addCase(fetchHoneymoonPackages.rejected, (state, action) => {
                return {
                    ...state,
                    honeymoonPackageStatus: "failed",
                    honeymoonPackageError: action.payload as string
                }
            })

            // Get package details
            .addCase(fetchPackageDetails.pending, (state) => {
                state.packageDetailsStatus = "loading";
            })
            .addCase(fetchPackageDetails.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    packageDetailsStatus: "success",
                    packageDetails: action.payload,
                    packageDetailsError: null
                }
            })
            .addCase(fetchPackageDetails.rejected, (state, action) => {
                return {
                    ...state,
                    packageDetailsStatus: "failed",
                    packageDetailsError: action.payload as string
                }
            })

        // Get all packages
        builder
            .addCase(getAllPackages.pending, (state) => {
                state.allPackagesStatus = "loading";
            })
            .addCase(getAllPackages.fulfilled, (state, action: PayloadAction<any[]>) => {
                return {
                    ...state,
                    allPackagesStatus: "success",
                    allPackages: action.payload,
                    allPackagesError: null
                }
            })
            .addCase(getAllPackages.rejected, (state, action) => {
                return {
                    ...state,
                    allPackagesStatus: "failed",
                    allPackagesError: action.payload as string
                }
            })

        // Delete Package
        builder
            .addCase(deletePackage.pending, (state) => {
                state.deletePackageStatus = "loading";
            })
            .addCase(deletePackage.fulfilled, (state) => {
                return {
                    ...state,
                    deletePackageStatus: "success",
                    deletePackageError: null
                }
            })
            .addCase(deletePackage.rejected, (state, action) => {
                return {
                    ...state,
                    deletePackageStatus: "failed",
                    deletePackageError: action.payload as string
                }
            })

        // Add Package
        builder
            .addCase(createPackage.pending, (state) => {
                state.createPackageStatus = "loading";
            })
            .addCase(createPackage.fulfilled, (state, action: PayloadAction<PackagePost>) => {
                return {
                    ...state,
                    createPackageStatus: "success",
                    createPackageDetails: action.payload,
                    createPackageError: null
                }
            })
            .addCase(createPackage.rejected, (state, action) => {
                return {
                    ...state,
                    createPackageStatus: "failed",
                    createPackageError: action.payload as string
                }
            })


        // Edit package
        builder
            .addCase(editPackage.pending, (state) => {
                state.editPackagePackageStatus = "loading";
            })
            .addCase(editPackage.fulfilled, (state, action: PayloadAction<PackageGet>) => {
                return {
                    ...state,
                    editPackagePackageStatus: "success",
                    editPackageDetails: action.payload,
                    editPackageError: null
                }
            })
            .addCase(editPackage.rejected, (state, action) => {
                return {
                    ...state,
                    editPackagePackageStatus: "failed",
                    editPackageError: action.payload as string
                }
            })
    }
});

export const { resetCreatePackageStatus, resetEditPackageStatus, handleIsActiveChange } = packageSlice.actions;
export default packageSlice.reducer;
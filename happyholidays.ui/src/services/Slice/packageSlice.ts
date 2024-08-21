import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInternationalPackage } from "../../components/International/internationalts";
import { fetchDomesticPackages } from "../../components/Domestic/domesticts";
import { fetchHoneymoonPackages } from "../../components/Honeymoon/honeymoonts";
import { fetchPackageDetails } from "../../components/PackageDetails/packageDetailsts";
import { getAllPackages } from "../../components/Admin/AllPackages/allpackagests";

export interface PackageState {
    internationalPackages: any[];
    internationalPackageStatus: "idle" | "success" | "loading" | "failed";
    internationalPackageError: string | null;
    domesticPackages: any[];
    domesticPackageStatus: "idle" | "success" | "loading" | "failed";
    domesticPackageError: string | null;
    honeymoonPackages: any[],
    honeymoonPackageStatus: "idle" | "success" | "loading" | "failed";
    honeymoonPackageError: string | null,
    packageDetails: any,
    packageDetailsStatus: "idle" | "success" | "loading" | "failed";
    packageDetailsError: string | null,
    allPackages: any,
    allPackagesStatus: "idle" | "success" | "loading" | "failed";
    allPackagesError: string | null,
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
    allPackagesError: null
}

export const packageSlice = createSlice({
    name: "packageSlice",
    initialState,
    reducers: {},
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
    }
});

export const { } = packageSlice.actions;
export default packageSlice.reducer;
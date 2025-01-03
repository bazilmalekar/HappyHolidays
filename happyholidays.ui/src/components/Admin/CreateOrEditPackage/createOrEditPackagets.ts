import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PackageEdit, PackageGet, PackagePost } from "./createOrEditPackageModels";

// export const createPackage = createAsyncThunk(
//     "packageSlice/createPackage",
//     async (value: PackagePost, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`https://localhost:7246/Package/CreatePackage`, value, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             // return response.status
//             return response.data;
//         } catch (err) {
//             if (axios.isAxiosError(err) && err.response) {
//                 console.error(err.response.data || err.message);
//                 return rejectWithValue(err.response?.data);
//             } else {
//                 console.error('Unexpected error:', err);
//                 return rejectWithValue('An unexpected error occurred');
//             }
//         }
//     }
// );

export const createPackage = createAsyncThunk(
    "packageSlice/createPackage",
    async (value: PackagePost, { rejectWithValue }) => {
        try {
            // Convert the value (PackagePost object) into FormData
            const formData = new FormData();

            // since we are consuming multipart/form-data in the backend wer are using "append"
            // Append non-file fields
            formData.append("PackageName", value.packageName);
            formData.append("PackageLocation", value.packageLocation);
            formData.append("PackageType", value.packageType.toString());
            formData.append("IsActive", value.isActive.toString());
            formData.append("IsFixedDeparture", value.isFixedDeparture.toString());

            // Append the thumbnail image if it exists
            if (value.cardThumbNailImage) {
                formData.append("CardThumbNailImage", value.cardThumbNailImage);
            }

            // Append package description
            formData.append("PackageDetails.PackageDescription", value.packageDetails.packageDescription);

            // Append each package image
            value.packageDetails.packageImages.forEach((image) => {
                formData.append("PackageDetails.PackageImages", image);
            });

            // Append itinerary details
            value.packageDetails.itineraryDetails.forEach((itinerary, iIndex) => {
                formData.append(`PackageDetails.ItineraryDetails[${iIndex}].ItineraryTitle`, itinerary.itineraryTitle);
                itinerary.itineraryDescriptions.forEach((desc, dIndex) => {
                    formData.append(`PackageDetails.ItineraryDetails[${iIndex}].ItineraryDescriptions[${dIndex}].ItenaryPoints`, desc.itenaryPoints);
                });
            });

            // Send the FormData
            const response = await axios.post(`https://localhost:7246/Package/CreatePackage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

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


// export const editPackage = createAsyncThunk(
//     "packageSlice/editPackage",
//     async (value: PackageGet, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(`https://localhost:7246/Package/EditPackage/${value.packageId}`, value);
//             return response.data;
//         } catch (err) {
//             if (axios.isAxiosError(err) && err.response) {
//                 console.error(err.response.data || err.message);
//                 return rejectWithValue(err.response?.data);
//             } else {
//                 console.error('Unexpected error:', err);
//                 return rejectWithValue('An unexpected error occurred');
//             }
//         }
//     }
// );

export const editPackage = createAsyncThunk(
    "packageSlice/editPackage",
    async (value: PackageEdit, { rejectWithValue }) => {
        console.log("slice value", value);

        try {
            // Convert the value (PackageEdit object) into FormData
            const formData = new FormData();

            // Append non-file fields
            formData.append("PackageId", value.packageId.toString());
            formData.append("PackageName", value.packageName);
            formData.append("PackageLocation", value.packageLocation);
            formData.append("PackageType", value.packageType.toString());
            formData.append("IsActive", value.isActive.toString());
            formData.append("OriginalPrice", value.originalPrice.toString());
            formData.append("ActualPrice", value.actualPrice.toString());
            formData.append("Days", value.days.toString());
            formData.append("Nights", value.nights.toString());
            formData.append("IsFixedDeparture", value.isFixedDeparture.toString());
            formData.append("PackageDetails.PackageDescription", value.packageDetails.packageDescription);

            // Append the thumbnail image if it exists (check for File type or null)
            if (value.cardThumbNailImage && typeof value.cardThumbNailImage !== 'string') {
                formData.append("CardThumbNailImage", value.cardThumbNailImage);
            }


            // Append each package image if it's a File
            if (value.packageDetails?.packageImages?.$values?.length) {
                value.packageDetails?.packageImages?.$values.forEach((image) => {
                    if (image && typeof image !== 'string') {
                        formData.append("PackageDetails.PackageImages", image);
                    }
                });
            };

            // Append itinerary details safely
            if (value.packageDetails.itineraryDetails && value.packageDetails.itineraryDetails.$values) {
                value.packageDetails.itineraryDetails.$values.forEach((itinerary, iIndex) => {
                    formData.append(`PackageDetails.ItineraryDetails[${iIndex}].ItineraryTitle`, itinerary.itineraryTitle);

                    if (itinerary.itineraryDescriptions && itinerary.itineraryDescriptions.$values) {
                        itinerary.itineraryDescriptions.$values.forEach((desc, dIndex) => {
                            formData.append(`PackageDetails.ItineraryDetails[${iIndex}].ItineraryDescriptions[${dIndex}].ItenaryPoints`, desc.itenaryPoints);
                        });
                    }
                });
            }

            // Debugging form data
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]); // Logs the key and value of each form data entry
            }

            // Send the FormData for the PUT request
            const response = await axios.put(`https://localhost:7246/Package/EditPackage/${value.packageId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

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

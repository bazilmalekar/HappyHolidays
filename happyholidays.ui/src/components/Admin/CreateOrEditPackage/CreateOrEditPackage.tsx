import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItineraryDetails, ItineraryPoint, PackageGet, PackagePost } from "./createOrEditPackageModels";
import { createPackage, editPackage } from "./createOrEditPackagets";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { RootState } from "../../../services/store";
import EditForm from "./EditForm";
import CreateForm from "./CreateForm";
import { fetchPackageDetails } from "../../../services/Slice/packageSlice";
import { useNavigate } from "react-router-dom";
import { resetCreatePackageStatus, resetEditPackageStatus } from "../../../services/Slice/packageSlice";

const CreatePackage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { createPackageDetails, createPackageStatus, createPackageError } = useAppSelector((state: RootState) => state.packageSlice);
    const { packageDetails, packageDetailsStatus, packageDetailsError } = useAppSelector((state: any) => state.packageSlice);
    const { editPackageDetails, editPackagePackageStatus, editPackageError } = useAppSelector((state: any) => state.packageSlice);

    const [formData, setFormData] = useState<PackagePost>({
        packageName: "",
        packageLocation: "",
        packageType: -1,
        isActive: true,
        originalPrice: null,
        actualPrice: null,
        days: null,
        nights: null,
        isFixedDeparture: false,
        cardThumbNailImage: null,
        packageDetails: {
            packageDescription: "",
            packageImages: [],
            itineraryDetails: [
                {
                    itineraryTitle: "",
                    itineraryDescriptions: [
                        {
                            itenaryPoints: ""
                        }
                    ]
                }
            ]
        }
    });
    
    const [editFormData, setEditFormData] = useState<PackageGet>({
        $id: "",
        packageId: 0,
        packageName: "",
        packageLocation: "",
        packageType: -1,
        isActive: true,
        originalPrice: 0,
        actualPrice: 0,
        days: 0,
        nights: 0,
        isFixedDeparture: false,
        cardThumbNailImage: "", 
        packageDetails: {
            $id: "",
            packageDetailsId: 0,
            packageId: 0,
            packageImages: [], 
            package: {
                $ref: "" 
            },
            packageDescription: "",
            itineraryDetails: {
                $id: "",
                $values: [
                    {
                        $id: "",
                        itineraryDetailsId: 0,
                        packageDetailsId: 0,
                        packageDetails: {
                            $ref: "" 
                        },
                        itineraryTitle: "",
                        itineraryDescriptions: {
                            $id: "",
                            $values: [
                                {
                                    $id: "",
                                    itineraryDescriptionId: 0,
                                    itineraryDetailsId: 0,
                                    itineraryDetails: {
                                        $ref: "" 
                                    },
                                    itenaryPoints: "" 
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        setFormData(prev => ({
            ...prev,
            packageDetails: {
                ...prev.packageDetails,
                packageDescription: value
            }
        }));
    }

    const handleEditTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;

        setEditFormData(prev => {
            // Ensureing packageDetails is initialized
            const packageDetails = prev.packageDetails || {
                packageDetailsId: 0,
                packageId: prev.packageId || 0,
                package: "",
                packageDescription: value,
                itineraryDetails: []
            };

            return {
                ...prev,
                packageDetails: {
                    ...packageDetails,
                    packageDescription: value
                }
            };
        });
    };


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;

        setFormData(prev => ({
            ...prev,
            [name]: name === "isActive" || name === "isFixedDeparture" ? value === "true" : Number(value)
        }));
    }

    const handleEditSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;

        setEditFormData(prev => ({
            ...prev,
            [name]: name === "isActive" || name === "isFixedDeparture" ? value === "true" : Number(value)
        }));
    };


    const addItineraryDetail = () => {
        setFormData(prev => ({
            ...prev,
            packageDetails: {
                ...prev.packageDetails,
                itineraryDetails: [
                    ...prev.packageDetails.itineraryDetails,
                    {
                        itineraryTitle: "",
                        itineraryDescriptions: [
                            { itenaryPoints: "" }
                        ]
                    }
                ]
            }
        }));
    };

    const addEditItineraryDetail = () => {
        setEditFormData(prev => {
            // Ensure packageDetails is initialized
            const packageDetails = prev.packageDetails || {
                $id: "",
                packageDetailsId: 0,
                packageId: prev.packageId || 0,
                package: { $ref: "" },
                packageDescription: "",
                itineraryDetails: {
                    $id: "",
                    $values: []
                }
            };

            // Create a new ItineraryDetails object
            const newItineraryDetail: ItineraryDetails = {
                $id: "", // Assign a unique ID as needed
                itineraryDetailsId: packageDetails.itineraryDetails.$values.length + 1,
                packageDetailsId: packageDetails.packageDetailsId,
                packageDetails: { $ref: "" },
                itineraryTitle: "",
                itineraryDescriptions: {
                    $id: "", // Assign a unique ID as needed
                    $values: []
                }
            };

            return {
                ...prev,
                packageDetails: {
                    ...packageDetails,
                    itineraryDetails: {
                        ...packageDetails.itineraryDetails,
                        $id: packageDetails.itineraryDetails.$id, // Maintain existing $id or generate a new one
                        $values: [
                            ...packageDetails.itineraryDetails.$values,
                            newItineraryDetail
                        ]
                    }
                }
            };
        });
    };


    const addItineraryPoint = (index: number) => {
        setFormData(prev => {
            const updatedItineraryDetails = [...prev.packageDetails.itineraryDetails];
            const currentDay = updatedItineraryDetails[index];
            updatedItineraryDetails[index] = {
                ...currentDay,
                itineraryDescriptions: [
                    ...currentDay.itineraryDescriptions,
                    { itenaryPoints: "" }
                ]
            };
            return {
                ...prev,
                packageDetails: {
                    ...prev.packageDetails,
                    itineraryDetails: updatedItineraryDetails
                }
            };
        });
    };

    const addEditItineraryPoint = (index: number) => {
        setEditFormData(prev => {
            // Ensure packageDetails is initialized
            const packageDetails = prev.packageDetails || {
                $id: "",
                packageDetailsId: 0,
                packageId: prev.packageId || 0,
                package: { $ref: "" },
                packageDescription: "",
                itineraryDetails: {
                    $id: "",
                    $values: []
                }
            };

            // Ensure itineraryDetails is initialized
            const itineraryDetails = packageDetails.itineraryDetails || {
                $id: "",
                $values: []
            };

            // Extend the itineraryDetails array if index is out of bounds
            while (index >= itineraryDetails.$values.length) {
                itineraryDetails.$values.push({
                    $id: "",
                    itineraryDetailsId: 0,
                    packageDetailsId: packageDetails.packageDetailsId,
                    packageDetails: { $ref: "" },
                    itineraryTitle: "",
                    itineraryDescriptions: {
                        $id: "",
                        $values: []
                    }
                });
            }

            // Ensure itineraryDescriptions is initialized for the specific itinerary
            const itineraryDay = itineraryDetails.$values[index] || {
                $id: "",
                itineraryDetailsId: 0,
                packageDetailsId: packageDetails.packageDetailsId,
                packageDetails: { $ref: "" },
                itineraryTitle: "",
                itineraryDescriptions: {
                    $id: "",
                    $values: []
                }
            };

            // Add a new itinerary point
            const newDescription: ItineraryPoint = {
                $id: "", // Assign a unique ID as needed
                itineraryDescriptionId: itineraryDay.itineraryDescriptions.$values.length + 1,
                itineraryDetailsId: itineraryDay.itineraryDetailsId,
                itineraryDetails: { $ref: "" },
                itenaryPoints: ""
            };

            // Update itineraryDescriptions array
            const updatedDescriptions = [
                ...itineraryDay.itineraryDescriptions.$values,
                newDescription
            ];
            const updatedDay = {
                ...itineraryDay,
                itineraryDescriptions: {
                    ...itineraryDay.itineraryDescriptions,
                    $id: itineraryDay.itineraryDescriptions.$id, // Maintain existing $id or generate a new one
                    $values: updatedDescriptions
                }
            };

            // Update itineraryDetails with the new array
            const updatedItineraryDetails = [...itineraryDetails.$values];
            updatedItineraryDetails[index] = updatedDay;

            return {
                ...prev,
                packageDetails: {
                    ...packageDetails,
                    itineraryDetails: {
                        ...itineraryDetails,
                        $id: itineraryDetails.$id, // Maintain existing $id or generate a new one
                        $values: updatedItineraryDetails
                    }
                }
            };
        });
    };


    const handleDayTitleChange = (dayIndex: number, title: string) => {
        setFormData(prev => {
            const updatedItineraryDetails = [...prev.packageDetails.itineraryDetails];
            updatedItineraryDetails[dayIndex] = {
                ...updatedItineraryDetails[dayIndex],
                itineraryTitle: title
            };
            return {
                ...prev,
                packageDetails: {
                    ...prev.packageDetails,
                    itineraryDetails: updatedItineraryDetails
                }
            };
        });
    };

    const handleEditDayTitleChange = (dayIndex: number, title: string) => {
        setEditFormData(prev => {
            // Ensure packageDetails is initialized
            const packageDetails = prev.packageDetails || {
                $id: "",
                packageDetailsId: 0,
                packageId: prev.packageId || 0,
                package: { $ref: "" }, // Initialize with a valid reference
                packageDescription: "",
                itineraryDetails: {
                    $id: "",
                    $values: []
                }
            };

            // Ensure itineraryDetails is initialized
            const itineraryDetails = packageDetails.itineraryDetails || {
                $id: "",
                $values: []
            };

            // Extend the itineraryDetails array if dayIndex is out of bounds
            while (dayIndex >= itineraryDetails.$values.length) {
                itineraryDetails.$values.push({
                    $id: "",
                    itineraryDetailsId: 0,
                    packageDetailsId: packageDetails.packageDetailsId,
                    packageDetails: { $ref: "" }, // Initialize with a valid reference
                    itineraryTitle: "",
                    itineraryDescriptions: {
                        $id: "",
                        $values: []
                    }
                });
            }

            // Update the relevant itinerary detail
            itineraryDetails.$values[dayIndex] = {
                ...itineraryDetails.$values[dayIndex],
                itineraryTitle: title
            };

            return {
                ...prev,
                packageDetails: {
                    ...packageDetails,
                    itineraryDetails: {
                        ...itineraryDetails
                    }
                }
            };
        });
    };




    const handleItineraryPointChange = (dayIndex: number, pointIndex: number, value: string) => {
        setFormData(prev => {
            const updatedItineraryDetails = [...prev.packageDetails.itineraryDetails];
            const updatedDay = updatedItineraryDetails[dayIndex];
            updatedDay.itineraryDescriptions[pointIndex] = {
                ...updatedDay.itineraryDescriptions[pointIndex],
                itenaryPoints: value
            };
            updatedItineraryDetails[dayIndex] = updatedDay;
            return {
                ...prev,
                packageDetails: {
                    ...prev.packageDetails,
                    itineraryDetails: updatedItineraryDetails
                }
            };
        });
    };

    const handleEditItineraryPointChange = (dayIndex: number, pointIndex: number, value: string) => {
        setEditFormData(prev => {
            // Ensure packageDetails is initialized
            const packageDetails = prev.packageDetails || {
                $id: "",
                packageDetailsId: 0,
                packageId: prev.packageId || 0,
                package: { $ref: "" }, // Initialize with a valid reference
                packageDescription: "",
                itineraryDetails: {
                    $id: "",
                    $values: []
                }
            };

            // Initialize itineraryDetails if it's undefined
            const itineraryDetails = packageDetails.itineraryDetails || {
                $id: "",
                $values: []
            };

            // Ensure the dayIndex is within bounds
            while (dayIndex >= itineraryDetails.$values.length) {
                itineraryDetails.$values.push({
                    $id: "",
                    itineraryDetailsId: 0,
                    packageDetailsId: packageDetails.packageDetailsId,
                    packageDetails: { $ref: "" }, // Initialize with a valid reference
                    itineraryTitle: "",
                    itineraryDescriptions: {
                        $id: "",
                        $values: []
                    }
                });
            }

            // Ensure itineraryDescriptions is initialized for the specific day
            const updatedDay = itineraryDetails.$values[dayIndex] || {
                $id: "",
                itineraryDetailsId: 0,
                packageDetailsId: packageDetails.packageDetailsId,
                packageDetails: { $ref: "" }, // Initialize with a valid reference
                itineraryTitle: "",
                itineraryDescriptions: {
                    $id: "",
                    $values: []
                }
            };

            const updatedDescriptions = [...(updatedDay.itineraryDescriptions.$values || [])];

            // Ensure the pointIndex is within bounds
            while (pointIndex >= updatedDescriptions.length) {
                updatedDescriptions.push({
                    $id: "",
                    itineraryDescriptionId: 0,
                    itineraryDetailsId: updatedDay.itineraryDetailsId,
                    itineraryDetails: { $ref: "" }, // Initialize with a valid reference
                    itenaryPoints: ""
                });
            }

            // Update the relevant itinerary point
            updatedDescriptions[pointIndex] = {
                ...updatedDescriptions[pointIndex],
                itenaryPoints: value
            };

            updatedDay.itineraryDescriptions = {
                $id: updatedDay.itineraryDescriptions.$id,
                $values: updatedDescriptions
            };

            itineraryDetails.$values[dayIndex] = updatedDay;

            return {
                ...prev,
                packageDetails: {
                    ...packageDetails,
                    itineraryDetails: {
                        ...itineraryDetails
                    }
                }
            };
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const imageName = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file); // Read file as Data URL (base64)

            reader.onload = () => {
                if (reader.result && typeof reader.result === "string") {
                    const img = new Image();
                    img.src = reader.result; // Set image src to the base64 string

                    img.onload = () => {
                        const canvas = document.createElement("canvas");

                        // Seting desired resolution
                        const targetWidth = 400;
                        const targetHeight = 290;
                        canvas.width = targetWidth;
                        canvas.height = targetHeight;

                        const ctx = canvas.getContext("2d");

                        // Center the image on the canvas/ If you want to apply ratio
                        //                     ctx?.drawImage(
                        //                         img,
                        //                         (maxSize - img.width) / 2,
                        //                         (maxSize - img.height) / 2
                        //                     );

                        // Drawing the image with required dimention
                        ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

                        //Converting canvas to blob
                        canvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    const resizedFile = new File([blob], imageName, {
                                        type: "image/png",
                                        lastModified: Date.now(),
                                    });

                                    console.log(resizedFile);

                                    // Update formData state with the new resized file
                                    setFormData((prev) => ({
                                        ...prev,
                                        cardThumbNailImage: resizedFile,
                                    }));
                                }
                            },
                            "image/jpeg",
                            0.8 // Quality of JPEG compression (0-1)
                        );
                    };
                }
            };
        }
    };

    const handlePackageImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            let packageImagesArray: File[] = [];

            // Create an array of promises for each file
            const fileProcessingPromises = files.map((file) => {
                return new Promise<void>((resolve, reject) => {
                    const imageName = file.name;
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = () => {
                        if (reader.result && typeof reader.result === "string") {
                            const img = new Image();
                            img.src = reader.result;

                            img.onload = () => {
                                const canvas = document.createElement("canvas");
                                const targetWidth = 600;
                                const targetHeight = 250;
                                canvas.width = targetWidth;
                                canvas.height = targetHeight;

                                const ctx = canvas.getContext("2d");
                                ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

                                canvas.toBlob((blob) => {
                                    if (blob) {
                                        const resizedFile = new File([blob], imageName, {
                                            type: "image/png",
                                            lastModified: Date.now(),
                                        });
                                        packageImagesArray.push(resizedFile);
                                        resolve(); // Resolveing the promise after the file is processed
                                    } else {
                                        reject(new Error("Failed to create blob"));
                                    }
                                });
                            };
                        }
                    };

                    reader.onerror = () => {
                        reject(new Error("File reading has failed."));
                    };
                });
            });

            // Waiting for all file processing to complete before updating the form data
            Promise.all(fileProcessingPromises)
                .then(() => {
                    // All files have been processed
                    console.log("All files have been processed!");

                    // updating form data
                    setFormData((prev) => {
                        const updatedFormData = {
                            ...prev,
                            packageDetails: {
                                ...prev.packageDetails,
                                packageImages: [...prev.packageDetails.packageImages, ...packageImagesArray], // Append resized files
                            },
                        };
                        return updatedFormData; // To return updated formdata to state
                    });
                })
                .catch((error) => {
                    console.error("Error processing files:", error);
                });
            console.log("final", formData);

        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createPackage(formData));
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editPackage(editFormData));
    };

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
        } else {
            setIsEditMode(false)
        }
    }, [id]);

    useEffect(() => {
        if (createPackageStatus === "success" && createPackageDetails) {
            setFormData({
                packageName: "",
                packageLocation: "",
                packageType: -1,
                isActive: true,
                originalPrice: null,
                actualPrice: null,
                days: null,
                nights: null,
                isFixedDeparture: false,
                cardThumbNailImage: null,
                packageDetails: {
                    packageDescription: "",
                    packageImages: [],
                    itineraryDetails: [
                        {
                            itineraryTitle: "",
                            itineraryDescriptions: [
                                {
                                    itenaryPoints: ""
                                }
                            ]
                        }
                    ]
                }
            });
            dispatch(resetCreatePackageStatus());
            navigate("/admin", { replace: true });
        }

        if (editPackagePackageStatus === "success" && editPackageDetails) {
            navigate("/admin", { replace: true });
            dispatch(resetEditPackageStatus())
        }
    }, [createPackageStatus, editPackagePackageStatus]);

    useEffect(() => {
        if (id) {
            dispatch(fetchPackageDetails(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        setEditFormData(packageDetails);
    }, [packageDetails]);

    return (
        <section className="admin_create_package">

            <div className="admin_create_package_header">
                <h2>{isEditMode ? "Edit Package" : "Create Package"}</h2>
            </div>
            {
                isEditMode ?
                    <EditForm
                        editFormData={editFormData}
                        handleEditSubmit={handleEditSubmit}
                        handleEditInputChange={handleEditInputChange}
                        handleEditSelectChange={handleEditSelectChange}
                        handleEditTextareaChange={handleEditTextareaChange}
                        handleEditDayTitleChange={handleEditDayTitleChange}
                        handleEditItineraryPointChange={handleEditItineraryPointChange}
                        addEditItineraryDetail={addEditItineraryDetail}
                        addEditItineraryPoint={addEditItineraryPoint}
                    /> :
                    <CreateForm
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        handleTextareaChange={handleTextareaChange}
                        handleDayTitleChange={handleDayTitleChange}
                        handleItineraryPointChange={handleItineraryPointChange}
                        addItineraryDetail={addItineraryDetail}
                        addItineraryPoint={addItineraryPoint}
                        handleImageUpload={handleImageUpload}
                        handlePackageImageUpload={handlePackageImageUpload}
                    />
            }
        </section>
    );
}

export default CreatePackage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PackagePost } from "./createOrEditPackageModels";
import { createPackage } from "./createOrEditPackagets";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { RootState } from "../../../services/store";
import EditForm from "./EditForm";
import CreateForm from "./CreateForm";

const CreatePackage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { createPackageDetails, createPackageStatus, createPackageError } = useAppSelector((state: RootState) => state.packageSlice);

    const [formData, setFormData] = useState<PackagePost>({
        packageName: "",
        packageLocation: "",
        packageType: -1,
        isActive: true,
        originalPrice: null,
        actualPrice: null,
        days: null,
        nights: null,
        packageDetails: {
            packageDescription: "",
            itineraryDetails: [
                {
                    itineraryTitle: "",
                    itineraryDescriptions: [
                        {
                            itineraryPoints: ""
                        }
                    ]
                }
            ]
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setFormData(prev => ({
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setFormData(prev => ({
            ...prev,
            [name]: name === "isActive" ? value === "true" : Number(value)
        }));
    }

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
                            { itineraryPoints: "" }
                        ]
                    }
                ]
            }
        }));
    };

    const addItineraryPoint = (index: number) => {
        setFormData(prev => {
            const updatedItineraryDetails = [...prev.packageDetails.itineraryDetails];
            const currentDay = updatedItineraryDetails[index];
            updatedItineraryDetails[index] = {
                ...currentDay,
                itineraryDescriptions: [
                    ...currentDay.itineraryDescriptions,
                    { itineraryPoints: "" }
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

    const handleItineraryPointChange = (dayIndex: number, pointIndex: number, value: string) => {
        setFormData(prev => {
            const updatedItineraryDetails = [...prev.packageDetails.itineraryDetails];
            const updatedDay = updatedItineraryDetails[dayIndex];
            updatedDay.itineraryDescriptions[pointIndex] = {
                ...updatedDay.itineraryDescriptions[pointIndex],
                itineraryPoints: value
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createPackage(formData));
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
                packageDetails: {
                    packageDescription: "",
                    itineraryDetails: [
                        {
                            itineraryTitle: "",
                            itineraryDescriptions: [
                                {
                                    itineraryPoints: ""
                                }
                            ]
                        }
                    ]
                }
            })
        }
    }, [createPackageStatus]);

    return (
        <section className="admin_create_package">

            <div className="admin_create_package_header">
                <h2>{isEditMode ? "Edit Package" : "Create Package"}</h2>
            </div>
            {
                isEditMode ?
                    <EditForm /> :
                    <CreateForm
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        handleTextareaChange={handleTextareaChange}
                        handleDayTitleChange={handleDayTitleChange}
                        handleItineraryPointChange={handleItineraryPointChange}
                        addItineraryPoint={addItineraryPoint}
                        addItineraryDetail={addItineraryDetail}
                    />
            }
        </section>
    );
}

export default CreatePackage;


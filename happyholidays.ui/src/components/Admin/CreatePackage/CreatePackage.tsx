import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PackagePost } from "./createPackageModels";
import { createPackage } from "./createPackagets";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";

const CreatePackage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { createPackageDetails, createPackageStatus, createPackageError } = useAppSelector((state: any) => state.packageSlice);
    console.log(createPackageStatus);

    // const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
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
                            itenaryPoints: ""
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
                            { itenaryPoints: "" }
                        ]
                    }
                ]
            }
        }));
        // setCurrentDayIndex(prev => prev + 1); // Move to the newly added day
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
                                    itenaryPoints: ""
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
            <form className="admin_create_package_form" onSubmit={handleSubmit}>
                <div className="form_group">
                    <label htmlFor="packagename" className="form_label">Package Name</label>
                    <input id="packagename" className="form_input" onChange={handleInputChange} name="packageName" value={formData.packageName} type="text" placeholder="Package name" />
                </div>
                <div className="form_group">
                    <label htmlFor="packageLocation" className="form_label">Package Location</label>
                    <input id="packageLocation" className="form_input" onChange={handleInputChange} name="packageLocation" value={formData.packageLocation} type="text" placeholder="Package location" />
                </div>
                <div className="form_group">
                    <label htmlFor="packageType" className="form_label">Package Type</label>
                    {/* add validation for empty string */}
                    <select id="packageType" name="packageType" value={formData.packageType} onChange={handleSelectChange} >
                        <option value={-1}>Select...</option>
                        <option value={0}>International</option>
                        <option value={1}>Domestic</option>
                        <option value={2}>Honeymoon</option>
                    </select>
                </div>
                <div className="form_group">
                    <label htmlFor="isActive" className="form_label">Is Active</label>
                    <select id="isActive" name="isActive" value={formData.isActive.toString()} onChange={handleSelectChange}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="form_group">
                    <label htmlFor="originalPrice" className="form_label">Original Price</label>
                    <input id="originalPrice" className="form_input" type="number" onChange={handleInputChange} name="originalPrice" value={formData.originalPrice?.toString()} placeholder="0.0" />
                </div>
                <div className="form_group">
                    <label htmlFor="actualPrice" className="form_label">Actual Price</label>
                    <input id="actualPrice" className="form_input" type="number" onChange={handleInputChange} name="actualPrice" value={formData.actualPrice?.toString()} placeholder="0.0" />
                </div>
                <div className="form_group">
                    <label htmlFor="days" className="form_label">Days</label>
                    <input id="days" className="form_input" type="number" onChange={handleInputChange} name="days" value={formData.days?.toString()} placeholder="Number of days" />
                </div>
                <div className="form_group">
                    <label htmlFor="nights" className="form_label">Nights</label>
                    <input id="nights" className="form_input" type="number" onChange={handleInputChange} name="nights" value={formData.nights?.toString()} placeholder="Number of nights" />
                </div>
                <div className="form_group">
                    <label htmlFor="packageDescription" className="form_label">Package Description</label>
                    <textarea id="packageDescription" className="form_input" rows={4} onChange={handleTextareaChange} name="packageDescription" value={formData.packageDetails?.packageDescription} />
                </div>

                <div className="hr"></div>

                <div className="form_group">
                    <h3>Itinerary Details</h3>
                </div>

                <div className="form_group itinerary_details">
                    {formData.packageDetails?.itineraryDetails?.map((details, index) => (
                        <div key={index} className="form_group">
                            <label>Day {index + 1}: </label>
                            <input
                                placeholder={`Day ${index + 1} Title`}
                                value={details.itineraryTitle}
                                onChange={(e) => handleDayTitleChange(index, e.target.value)}
                            />
                            {details.itineraryDescriptions?.map((desc, descIndex) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder={`Event ${descIndex + 1}`}
                                        value={desc.itenaryPoints}
                                        onChange={(e) => handleItineraryPointChange(index, descIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={() => addItineraryPoint(index)} >Add Event</button>
                        </div>
                    ))}
                    <button type="button" onClick={addItineraryDetail}>Add Day</button>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default CreatePackage;


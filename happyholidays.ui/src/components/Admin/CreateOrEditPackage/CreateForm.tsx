import React from "react";
import { PackagePost } from "./createOrEditPackageModels";

interface Props {
    formData: PackagePost;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleDayTitleChange: (dayIndex: number, title: string) => void;
    handleItineraryPointChange: (dayIndex: number, pointIndex: number, value: string) => void;
    addItineraryDetail: () => void;
    addItineraryPoint: (index: number) => void;
}

const CreateForm: React.FC<Props> = ({
    formData,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleTextareaChange,
    handleDayTitleChange,
    handleItineraryPointChange,
    addItineraryDetail,
    addItineraryPoint
}) => {
    return (
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
                    {/* add validation for {select} */}
                    <option value={-1}>Select...</option>
                    <option value={0}>International</option>
                    <option value={1}>Domestic</option>
                    <option value={2}>Honeymoon</option>
                </select>
            </div>
            <div className="form_group">
                <label htmlFor="isActive" className="form_label">Is Active</label>
                <select id="isActive" name="isActive" value={formData.isActive ? "true" : "false"} onChange={handleSelectChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="form_group">
                <label htmlFor="originalPrice" className="form_label">Original Price</label>
                <input id="originalPrice" className="form_input" type="number" onChange={handleInputChange} name="originalPrice" value={formData.originalPrice ?? ''} placeholder="0.0" />
            </div>
            <div className="form_group">
                <label htmlFor="actualPrice" className="form_label">Actual Price</label>
                <input id="actualPrice" className="form_input" type="number" onChange={handleInputChange} name="actualPrice" value={formData.actualPrice ?? ''} placeholder="0.0" />
            </div>
            <div className="form_group">
                <label htmlFor="days" className="form_label">Days</label>
                <input id="days" className="form_input" type="number" onChange={handleInputChange} name="days" value={formData.days ?? ''} placeholder="Number of days" />
            </div>
            <div className="form_group">
                <label htmlFor="nights" className="form_label">Nights</label>
                <input id="nights" className="form_input" type="number" onChange={handleInputChange} name="nights" value={formData.nights ?? ''} placeholder="Number of nights" />
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
                            <div key={descIndex}>
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
    );
}

export default CreateForm;
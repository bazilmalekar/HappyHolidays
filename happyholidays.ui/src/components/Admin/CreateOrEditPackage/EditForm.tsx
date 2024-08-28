import React from "react";
import { PackageGet } from "./createOrEditPackageModels";

interface Props {
    editFormData: PackageGet
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleEditSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleEditTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleEditDayTitleChange: (dayIndex: number, title: string) => void;
    handleEditItineraryPointChange: (dayIndex: number, pointIndex: number, value: string) => void;
    addEditItineraryDetail: () => void;
    addEditItineraryPoint: (index: number) => void;
}

const EditForm: React.FC<Props> = ({
    editFormData,
    handleEditSubmit,
    handleEditInputChange,
    handleEditSelectChange,
    handleEditTextareaChange,
    handleEditDayTitleChange,
    handleEditItineraryPointChange,
    addEditItineraryDetail,
    addEditItineraryPoint
}) => {
    console.log(editFormData);
    return (
        <form className="admin_create_package_form" onSubmit={handleEditSubmit}>
            <div className="form_group">
                <label htmlFor="packagename" className="form_label">Package Name</label>
                <input id="packagename" className="form_input" onChange={handleEditInputChange} name="packageName" value={editFormData.packageName} type="text" placeholder="Package name" />
            </div>
            <div className="form_group">
                <label htmlFor="packageLocation" className="form_label">Package Location</label>
                <input id="packageLocation" className="form_input" onChange={handleEditInputChange} name="packageLocation" value={editFormData.packageLocation} type="text" placeholder="Package location" />
            </div>
            <div className="form_group">
                <label htmlFor="packageType" className="form_label">Package Type</label>
                {/* add validation for empty string */}
                <select id="packageType" name="packageType" value={editFormData.packageType} onChange={handleEditSelectChange} >
                    {/* add validation for {select} */}
                    <option value={-1}>Select...</option>
                    <option value={0}>International</option>
                    <option value={1}>Domestic</option>
                    <option value={2}>Honeymoon</option>
                </select>
            </div>
            <div className="form_group">
                <label htmlFor="isActive" className="form_label">Is Active</label>
                <select id="isActive" name="isActive" value={editFormData.isActive ? "true" : "false"} onChange={handleEditSelectChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="form_group">
                <label htmlFor="originalPrice" className="form_label">Original Price</label>
                <input id="originalPrice" className="form_input" type="number" onChange={handleEditInputChange} name="originalPrice" value={editFormData.originalPrice ?? ''} placeholder="0.0" />
            </div>
            <div className="form_group">
                <label htmlFor="actualPrice" className="form_label">Actual Price</label>
                <input id="actualPrice" className="form_input" type="number" onChange={handleEditInputChange} name="actualPrice" value={editFormData.actualPrice ?? ''} placeholder="0.0" />
            </div>
            <div className="form_group">
                <label htmlFor="days" className="form_label">Days</label>
                <input id="days" className="form_input" type="number" onChange={handleEditInputChange} name="days" value={editFormData.days ?? ''} placeholder="Number of days" />
            </div>
            <div className="form_group">
                <label htmlFor="nights" className="form_label">Nights</label>
                <input id="nights" className="form_input" type="number" onChange={handleEditInputChange} name="nights" value={editFormData.nights ?? ''} placeholder="Number of nights" />
            </div>
            <div className="form_group">
                <label htmlFor="packageDescription" className="form_label">Package Description</label>
                <textarea id="packageDescription" className="form_input" rows={4} onChange={handleEditTextareaChange} name="packageDescription" value={editFormData.packageDetails?.packageDescription} />
            </div>

            <div className="hr"></div>

            <div className="form_group">
                <h3>Itinerary Details</h3>
            </div>

            <div className="form_group itinerary_details">
                {(editFormData.packageDetails?.itineraryDetails?.$values || []).map((details, index) => (
                    <div key={index} className="form_group">
                        <label>Day {index + 1}: </label>
                        <input
                            placeholder={`Day ${index + 1} Title`}
                            value={details.itineraryTitle}
                            onChange={(e) => handleEditDayTitleChange(index, e.target.value)}
                        />
                        {details.itineraryDescriptions?.$values.map((desc, descIndex) => (
                            <div key={descIndex}>
                                <input
                                    type="text"
                                    placeholder={`Event ${descIndex + 1}`}
                                    value={desc.itenaryPoints}
                                    onChange={(e) => handleEditItineraryPointChange(index, descIndex, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => addEditItineraryPoint(index)}>Add Event</button>
                    </div>
                ))}
                <button type="button" onClick={addEditItineraryDetail}>Add Day</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditForm;
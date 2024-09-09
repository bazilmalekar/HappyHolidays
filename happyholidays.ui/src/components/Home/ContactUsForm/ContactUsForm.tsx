import React, { FormEvent, useEffect, useState } from "react";
import { ContactFrom } from "./contactFormInterface";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { RootState } from "../../../services/store";
import { postQuery } from "../../../services/Slice/contactSlice";
import { popUpToggle } from "../../../services/Slice/appSlice";
import { toast } from "react-toastify";

interface Props {
    formType: string;
    mountFlag: boolean;
}

const ContactUsForm: React.FC<Props> = ({ formType, mountFlag }) => {
    const dispatch = useAppDispatch();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { postContactData,
        postContactDataStatus,
        postConstactDataError } = useAppSelector((state: RootState) => state.contactSlice);

    const [contactUsFormData, setContactUsFormData] = useState<ContactFrom>({
        contactUsId: 0,
        name: "",
        email: "",
        phoneNumber: "",
        travelDestination: "",
        noOfPeople: null,
        queryDate: new Date().toISOString(),
        dateOfTravle: new Date().toISOString().split("T")[0], // current date with dd-mm-yyyy format
        message: "",
        remarks: "",
        status: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactUsFormData({
            ...contactUsFormData,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(postQuery(contactUsFormData));
    }

    useEffect(() => {
        if (postContactData && postContactDataStatus == "success" && formType == "popup" && mountFlag) {
            setContactUsFormData({
                contactUsId: 0,
                name: "",
                email: "",
                phoneNumber: "",
                travelDestination: "",
                noOfPeople: null,
                queryDate: new Date().toISOString(),
                dateOfTravle: new Date().toISOString().split("T")[0], // current date with yyyy-mm-dd format
                message: "",
                remarks: "",
                status: 0
            });
            dispatch(popUpToggle(false));
            toast.success("Thank you for your query. We will get back to you at the earliest.", {
                position: "top-center"
            });
        }

    }, [postContactDataStatus]);

    return (
        <form className="form_body" onSubmit={handleSubmit}>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label required">Name</label>
                <input type="text" className="contact_form_input" onChange={handleChange} name="name" value={contactUsFormData.name} placeholder="Your Name" />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label required">Email</label>
                <input type="text" className="contact_form_input" onChange={handleChange} name="email" value={contactUsFormData.email} placeholder="example@gmail.com" />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label required">Phone Number</label>
                <input type="text" className="contact_form_input" onChange={handleChange} name="phoneNumber" value={contactUsFormData.phoneNumber} placeholder="+(xx) - xxx-xxx-xxxx" />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label">Travel Destination</label>
                <input type="text" className="contact_form_input" onChange={handleChange} name="travelDestination" value={contactUsFormData.travelDestination} placeholder="Destination" />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label">Number of People</label>
                <input type="number" className="contact_form_input" onChange={handleChange} name="noOfPeople" value={contactUsFormData.noOfPeople ?? ""} placeholder="No of People" />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label">Travel Date</label>
                <input type="date" className="contact_form_input" onChange={handleChange} name="dateOfTravle" value={contactUsFormData.dateOfTravle} />
            </div>
            <div className="contact_form_group">
                <label htmlFor="" className="contact_form_label required">Message</label>
                <textarea rows={3} className="contact_form_input" onChange={handleChange} name="message" value={contactUsFormData.message} />
            </div>
            <button type="submit" className="custom_success_btn">Submit</button>
        </form>
    );
}

export default ContactUsForm;
import React, { useEffect, useState } from "react";
import ContactUsForm from "../Home/ContactUsForm/ContactUsForm";
import { useRef } from "react";
import { useAppDispatch } from "../../services/hooks";
import { popUpToggle } from "../../services/Slice/appSlice";

const ContactUsPopUpForm: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [mountFlag, setMountFlag] = useState<boolean>(false);
    const formType: string = "popup";
    const handleFormModal = (e: MouseEvent) => {
        if (!formRef.current?.contains(e.target as Node)) {
            if (mountFlag) {
                dispatch(popUpToggle(false));
            }
        }
    }

    useEffect(() => {
        setMountFlag(true); //To Check if the component is mounted.
        document.addEventListener("click", handleFormModal)

        return () =>
            document.removeEventListener("click", handleFormModal)
    }, [mountFlag]);
    return (
        <div className="contact_us_popup_form">
            <div ref={formRef} className="popup_form_content">
                <div className="popup_form_content_header">
                    <h4>Enquire Now</h4>
                    <div className="close_icon" onClick={() => dispatch(popUpToggle(false))}>
                        <img alt="close" src="/src/assets/images/close.png" />
                    </div>
                </div>
                <ContactUsForm formType={formType} mountFlag={mountFlag} setMountFlag={setMountFlag} />
            </div>
        </div>
    );
}

export default ContactUsPopUpForm;
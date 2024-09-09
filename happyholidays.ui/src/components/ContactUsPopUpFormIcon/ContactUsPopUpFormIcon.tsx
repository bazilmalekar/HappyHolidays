import React from "react";
import { useAppDispatch } from "../../services/hooks";
import { popUpToggle } from "../../services/Slice/appSlice";

const ContactUsPopUpFormIcon: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="contact_popup_icon" onClick={() => dispatch(popUpToggle(true))}>
            <div className="enquire_wrapper">
                <h6>Enquire Now</h6>
            </div>
            <div className="popup_icon_wrapper">
                <img alt="PopUp Icon" src="/src/assets/images/telephone.png" />
            </div>
        </div>
    );
}

export default ContactUsPopUpFormIcon;
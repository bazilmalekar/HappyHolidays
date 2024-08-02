import React, { useEffect } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { handleCopyClick } from "./topbarts";

const Topbar: React.FC = () => {
    useEffect(() => {
        const coppiedInfoText = document.querySelectorAll(".info_text_p");

        coppiedInfoText.forEach(elem => {
            elem.addEventListener("click", handleCopyClick);
        });

        return () => {
            coppiedInfoText.forEach(elem => {
                elem.removeEventListener("click", handleCopyClick)
            });
        }

    }, []);
    return (
        <section className="top_bar">
            <div className="contact_us_text">
                <p>Reach out to us anytime via Email or Phone :</p>
            </div>
            <div className="toolbar_info_text" title="Click to copy">
                <MailOutlineIcon style={{ transform: "scale(0.8)", margin: "0 0.15rem" }} />
                <i className="info_text_p">info@happyholidaysdharwad.com</i>
            </div> |
            <div className="toolbar_info_text" title="Click to copy">
                {/* <MailOutlineIcon style={{ transform: "scale(0.8)", margin: "0 0.15rem" }} /> */}
                <PhoneEnabledIcon style={{ transform: "scale(0.8)", margin: "0 0.15rem" }} />
                <i className="info_text_p">+91-8660594295</i>
            </div>
        </section>
    );
}

export default Topbar;
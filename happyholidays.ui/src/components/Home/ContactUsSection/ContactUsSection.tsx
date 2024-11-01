import React from "react";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const ContactUsSection: React.FC = () => {
    const formType = "contactSection";
    return (
        <section className="contact_section" id="contact_section">
            {/* <h1>Contact Us</h1> */}
            <div className="contact_div_wrapper">
                <div className="contact_div">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d404.2212725384444!2d74.9940194576298!3d15.450912549208157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d36e1696ffcf%3A0x254699bf73ffd8f!2sHAPPY%20HOLIDAYS%20DHARWAD!5e0!3m2!1sen!2sin!4v1726211317485!5m2!1sen!2sin"
                        width="95%" height="550" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="contact_div contact_info_text">
                    <p className="header_text">Contact Us At</p>
                    <div className="contact_info_text_wrapper">
                        <div className="contact_info_text_icon_wrapper">
                            <PhoneEnabledIcon className="contact_icon" />
                        </div>
                        <i>+91-8660594295</i>
                    </div>
                    <div className="contact_info_text_wrapper">
                        <div className="contact_info_text_icon_wrapper">
                            <MailOutlineIcon className="contact_icon" />
                        </div>
                        <i>info@happyholidaysdharwad.com</i>
                    </div>
                </div>
                <div className="contact_div">
                    <div className="form_wrapper">
                        <ContactUsForm formType={formType} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUsSection;
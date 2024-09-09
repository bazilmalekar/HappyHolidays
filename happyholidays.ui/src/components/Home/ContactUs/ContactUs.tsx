import React from "react";
import ContactUsForm from "../ContactUsForm/ContactUsForm";

const ContactUs: React.FC = () => {
    return(
        <section className="contact_section">
            <h1>Contact us</h1>
            <ContactUsForm />
        </section>
    );
}

export default ContactUs;
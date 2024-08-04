import React from "react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <section className="footer">
            <p>Copyright © {currentYear} <span className="footer_highlight">Happy Holidays</span> | All rights reserved.</p>
        </section>
    );
}

export default Footer;
import React from "react";

const AboutUs: React.FC = () => {
    return (
        <section className="about_us">
            <div className="aboutUs_hero">
                <h2>About Us</h2>
            </div>
            <div className="aboutUs_description">
                <div className="discription_group">
                    <h4>Discover Your Perfect Journey</h4>
                    <p>
                        Welcome to Happy Holidays, your trusted partner in crafting unforgettable travel experiences.
                        We believe that every journey should be extraordinary, which is why we offer a diverse range of expertly designed travel packages tailored to suit every type of traveler.
                        Whether you're seeking thrilling adventures, serene getaways,
                        or immersive cultural experiences, we have something for everyone—all while accommodating your budget and preferences.
                    </p>
                </div>

                <div className="discription_group">
                    <h4>Simplifying Travel Documentation</h4>
                    <p>
                        Navigating the complexities of travel can be daunting, but our dedicated team is here to simplify the process. From hassle-free visa services to efficient passport assistance,
                        we guide you through every step, ensuring you have all the necessary documentation for a smooth journey.
                    </p>
                </div>

                <div className="discription_group">
                    <h4>Your Adventure Awaits!</h4>
                    <p>
                        At Happy Holidays, we are passionate about helping you create lasting memories.
                        Let us take care of the details while you focus on discovering the world. Your adventure awaits!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
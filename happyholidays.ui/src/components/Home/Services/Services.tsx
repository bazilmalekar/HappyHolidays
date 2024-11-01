import React from "react"

const Services: React.FC = () => {
    return (
        <section id="services" className="services">
            <h1 className="service_header">Services</h1>
            <div className="service_container">
                <div className="service_aside_image">
                    <img src="/src/assets/services/holidays.png" alt="Package Icon" />
                </div>
                <div className="service_description">
                    <h5>Travel Packages Tailored for You</h5>
                    <p>Discover a variety of expertly crafted travel packages designed to suit every type of traveler.
                        From thrilling adventures to relaxing getaways, our offerings ensure unforgettable experiences, all while accommodating your budget and preferences.
                    </p>
                </div>
            </div>
            <div className="service_container">
                <div className="service_aside_image">
                    <img src="/src/assets/services/travel.png" alt="Visa Icon" />
                </div>
                <div className="service_description">
                    <h5>Hassle-Free Visa Services</h5>
                    <p>Navigating visa requirements can be overwhelming, but we make it easy.
                        Our dedicated team provides comprehensive visa services, guiding you through the application process to ensure you have all the necessary documentation for your journey.
                    </p>
                </div>
            </div>
            <div className="service_container">
                <div className="service_aside_image">
                    <img src="/src/assets/services/passport.png" alt="Passport Icon" />
                </div>
                <div className="service_description">
                    <h5>Efficient Passport Services</h5>
                    <p>Need a new passport or renewal? Our streamlined passport services take the stress out of the process.
                        We assist you with the paperwork and provide guidance every step of the way, so you can focus on your upcoming travels.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Services;
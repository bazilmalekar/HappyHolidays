import React from "react";
import Hero from "./Hero/Hero";
import Packages from "./Packages/Packages";
import ContactUsSection from "./ContactUsSection/ContactUsSection";
import Services from "./Services/Services";

const Home: React.FC = () => {
    return (
        <section className="home">
            <Hero />
            <Packages />
            <Services />
            <ContactUsSection />
        </section>
    );
}

export default Home;
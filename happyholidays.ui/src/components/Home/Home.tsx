import React from "react";
import Hero from "./Hero/Hero";
import Packages from "./Packages/Packages";
import ContactUsSection from "./ContactUsSection/ContactUsSection";

const Home: React.FC = () => {
    return (
        <section className="home">
            <Hero />
            <Packages />
            <ContactUsSection />
        </section>
    );
}

export default Home;
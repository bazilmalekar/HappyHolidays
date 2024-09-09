import React from "react";
import Hero from "./Hero/Hero";
import Packages from "./Packages/Packages";
import ContactUs from "./ContactUs/ContactUs";

const Home: React.FC = () => {
    return (
        <section className="home">
            <Hero />
            <Packages />
            <ContactUs />
        </section>
    );
}

export default Home;
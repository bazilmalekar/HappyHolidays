import React from "react";
import Hero from "./Hero/Hero";
import Packages from "./Packages/Packages";

const Home: React.FC = () => {
    return (
        <section className="home">
            <Hero />
            <Packages />
        </section>
    );
}

export default Home;
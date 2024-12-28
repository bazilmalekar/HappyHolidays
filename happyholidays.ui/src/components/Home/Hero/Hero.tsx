import React from "react";
import CarouselSlider from "./Carousel/CarouselSlider";
import WelcomeSlide from "./Carousel/WelcomeSlide";
import InternaitonalSlide from "./Carousel/InternaitonalSlide";
import DomesticSlide from "./Carousel/DomesticSlide";
import ServicesSlide from "./Carousel/ServicesSlide";

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero_text_welcome">
                <h1 className="welcome_text">Happy Holidays</h1>
                <p>Discover the World, One Destination at a Time</p>
            </div>
            <CarouselSlider />
        </div>
    );
}

export default Hero;
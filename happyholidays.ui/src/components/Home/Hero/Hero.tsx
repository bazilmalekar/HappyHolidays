import React from "react";
import CarouselSlider from "./Carousel/CarouselSlider";
import WelcomeSlide from "./Carousel/WelcomeSlide";
import InternaitonalSlide from "./Carousel/InternaitonalSlide";
import DomesticSlide from "./Carousel/DomesticSlide";
import ServicesSlide from "./Carousel/ServicesSlide";

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <CarouselSlider />       
        </div>
    );
}

export default Hero;
import React, { useEffect } from "react";
import CarouselSlider from "./Carousel/CarouselSlider";
import WelcomeSlide from "./Carousel/WelcomeSlide";
import InternaitonalSlide from "./Carousel/InternaitonalSlide";
import DomesticSlide from "./Carousel/DomesticSlide";
import ServicesSlide from "./Carousel/ServicesSlide";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero: React.FC = () => {
    useEffect(() => {
        AOS.init({
            once: false
        });
    }, []);
    return (
        <div className="hero">
            <div className="hero_text_welcome">
                <h1 className="welcome_text">Happy Holidays</h1>
                <p data-aos="fade-up" data-aos-duration="1500">Discover the World, One Destination at a Time !</p>
            </div>
            <CarouselSlider />
        </div>
    );
}

export default Hero;
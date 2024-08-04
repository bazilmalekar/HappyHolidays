import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import WelcomeSlide from "./WelcomeSlide";
import InternaitonalSlide from "./InternaitonalSlide";
import DomesticSlide from "./DomesticSlide";
import ServicesSlide from "./ServicesSlide";
import { useState } from "react";

const CarouselSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    var items = [
        {
            id: "1",
            sliderItem: <WelcomeSlide active={activeIndex === 0} />
        },
        {
            id: "2",
            sliderItem: <InternaitonalSlide active={activeIndex === 1} />
        },
        {
            id: "3",
            sliderItem: <DomesticSlide active={activeIndex === 2}/>
        },
        {
            id: "4",
            sliderItem: <ServicesSlide/>
        }
    ]

    const handleChange = (index: any) => {
        setActiveIndex(index);
    }

    return (
        <Carousel
            className="custom_carousal"
            IndicatorIcon
            // navButtonsAlwaysVisible
            stopAutoPlayOnHover={false}
            animation="fade"
            interval={5000}
            height="calc(83.3vh + 3.5rem)"
            onChange={handleChange}>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props: any) {
    return (
        <Paper>
            {props.item.sliderItem}
        </Paper>
    )
}

export default CarouselSlider;

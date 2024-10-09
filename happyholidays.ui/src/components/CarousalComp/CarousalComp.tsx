import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";

interface carousalElem {
    id: string;
    backgroundUrl: string;
}

interface Props {
    items: carousalElem[];
}

const CarousalComp: React.FC<Props> = ({ items }) => {
    // Create an array of refs for the video elements
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [activeId, setActiveId] = useState<number>(0);

    useEffect(() => {
        const videoItem = videoRefs.current[activeId];

        if (videoItem) {
            videoItem.currentTime = 0;
            videoItem.play();
        }
    }, [activeId]);

    return (
        <Carousel
            className="package_carousal"
            stopAutoPlayOnHover={false}
            animation="fade"
            interval={5000}
            height="100%"
            onChange={(currentIndex) => setActiveId(currentIndex!)}
        >
            {
                items.map((item, i) => (
                    <Item
                        key={i}
                        item={item}
                        ref={(el: HTMLVideoElement) => videoRefs.current[i] = el} // Assign ref to each video
                    />
                ))
            }
        </Carousel>
    );
}

// The Item component accepts forwarded ref using React.forwardRef. This allows the CarousalComp component to pass the ref down to the video element.
const Item = React.forwardRef<HTMLVideoElement, { item: carousalElem }>((props, ref) => {
    return (
        <Paper>
            <video
                className="video_item"
                ref={ref}
                src={props.item.backgroundUrl}
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            ></video>
        </Paper>
    )
});

export default CarousalComp;

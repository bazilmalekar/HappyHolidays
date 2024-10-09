import React from "react";
import ImageGallery from "react-image-gallery";

const images = [
    {
        original: "https://picsum.photos/id/1019/600/350/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
        // thumbnailHeight: "1000"
    },
    {
        original: "https://picsum.photos/id/600/600/350/",
        thumbnail: "https://picsum.photos/id/600/250/150/",
    },
    {
        original: "https://picsum.photos/id/1029/600/350/",
        thumbnail: "https://picsum.photos/id/1029/250/150/",
    }
];


const Gallery: React.FC = () => {
    return <ImageGallery
        items={images}
        thumbnailPosition="bottom" 
        />
}

export default Gallery ;
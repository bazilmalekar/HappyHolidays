// import React from "react";
// import ImageGallery from "react-image-gallery";
// import { useAppSelector } from "../../services/hooks";

// const Gallery: React.FC = () => {
//     const images = [
//         {
//             original: "https://picsum.photos/id/1019/600/350/",
//             thumbnail: "https://picsum.photos/id/1019/250/150/",
//             // thumbnailHeight: "1000"
//         },
//         {
//             original: "https://picsum.photos/id/600/600/350/",
//             thumbnail: "https://picsum.photos/id/600/250/150/",
//         },
//         {
//             original: "https://picsum.photos/id/1029/600/350/",
//             thumbnail: "https://picsum.photos/id/1029/250/150/",
//         }
//     ];
//     const { packageDetails, packageDetailsStatus, packageDetailsError } = useAppSelector((state: any) => state.packageSlice);
//     console.log(packageDetails?.packageDetails?.packageImages.$values);

//     const testArray: any = [];
//     console.log("testarray", testArray);

//     packageDetails?.packageDetails?.packageImages.$values.forEach((image: string) => {
//         testArray.push({
//             original: image,
//             thumbnail: image,
//         });
//     });

//     return <ImageGallery
//         items={testArray}
//         thumbnailPosition="bottom"
//     />
// }

// export default Gallery;


import React from "react";
import ImageGallery from "react-image-gallery";
import { useAppSelector } from "../../services/hooks";

const Gallery: React.FC = () => {
    const { packageDetails } = useAppSelector((state: any) => state.packageSlice);
    const images = packageDetails?.packageDetails?.packageImages?.$values || [];

    // Check if there are images and prepare the gallery items
    const galleryItems = images.length > 0
        ? images.map((image: string) => ({
            original: image,
            thumbnail: image,
            // originalHeight: "500",
            // originalWidth: "100",
            thumbnailHeight: "100",
            // thumbnailWidth: "450",
            originalClass: "original_class",
            thumbnailClass: "thumbnail_class"
        }))
        : []; 

    return (
        <div>
            {galleryItems.length > 0 ? (
                <ImageGallery
                    items={galleryItems}
                    thumbnailPosition="bottom"
                />
            ) : (
                <p>No images available for this package.</p> // Placeholder message
            )}
        </div>
    );
};

export default Gallery;

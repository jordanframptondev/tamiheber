"use client";

import {ImageGallery} from "react-image-grid-gallery";

export function ClientGallery({ images }) {
    const imagesArray = images?.map((image) => {
        return {
            alt: "",
            caption: "",
            src: image,
        };
    });
    return (
        <ImageGallery
            imagesInfoArray={imagesArray}
            columnCount={"3"}
            columnWidth={300}
            gapSize={22}
        />
    );
}

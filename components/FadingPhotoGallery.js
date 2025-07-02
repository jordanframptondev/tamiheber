"use client";
import "@/styles/page-loader.css";
import "@/styles/fading-photo-gallery.css";
import Image from "next/image";
import {useEffect, useState} from "react";

export function FadingPhotoGallery({imageURLs}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadTimes, setLoadTimes] = useState({});
    const [loadedCount, setLoadedCount] = useState(0);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const numberOfImages = imageURLs.length;

    useEffect(() => {
        if (loadedCount === numberOfImages && numberOfImages > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % imageURLs.length);
            }, 3500);

            return () => clearInterval(interval);
        }
    }, [loadedCount, imageURLs.length, numberOfImages]);

    function handleImageLoad(index, startTime) {
        const loadTime = Date.now() - startTime;
        console.log(`Image ${index} loaded in ${loadTime} ms`);
        if (index === 0) {
            setFirstImageLoaded(true);
        }
        setLoadTimes((prevLoadTimes) => ({
            ...prevLoadTimes,
            [index]: loadTime,
        }));
        setLoadedCount((prevCount) => prevCount + 1);
    }

    const startTime = Date.now();

    return (
        <>
            {!(firstImageLoaded) &&
                <div className="absolute inset-0 m-auto text-[#262a1cbd]">
                    <div className="loader absolute inset-0 m-auto"></div>
                    <div className="text-center top-[100px] font-light absolute inset-0 m-auto w-40 h-20">
                        Loading Visuals
                    </div>
                </div>
            }
            <div className={`image-container`}>
                {
                    <div
                        key={0}
                        className={`image-slide ${0 === currentIndex ? "active" : ""}`}
                    >
                        <Image
                            src={imageURLs[0]}
                            width={1920}
                            height={1080}
                            alt={`Image ${0}`}
                            className="full-screen-image image-top"
                            priority={true}
                            onLoad={() => handleImageLoad(0, startTime)}
                        />
                    </div>
                }
                {imageURLs.map((image, index) => {
                    if (index !== 0) {
                        return (
                            <div
                                key={index}
                                className={`image-slide ${index === currentIndex ? "active" : ""}`}
                            >
                                <Image
                                    src={image}
                                    width={1920}
                                    height={1080}
                                    alt={`Image ${index}`}
                                    className={`full-screen-image ${index === 1 ? "image-top" : ""}`}
                                    priority={true}
                                    onLoad={() => handleImageLoad(index, startTime)}
                                />
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
}

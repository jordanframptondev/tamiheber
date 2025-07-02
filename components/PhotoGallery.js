"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowSize } from '../app/hooks/useWindowSize';

function getColumns(width) {
  if (width > 1280) return 3;
  if (width > 600) return 2;
  return 1;
}

export function PhotoGallery({ photos }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { width } = useWindowSize();
  const [columns, setColumns] = useState(getColumns(width));
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setColumns(getColumns(width));
  }, [width]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  }, [closeLightbox]);

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, handleKeyDown]);

  const photosInColumns = Array.from({ length: columns }, (_, colIndex) => 
    photos.filter((_, i) => i % columns === colIndex)
  );

  if (!photos?.length) {
    return <div>No photos to display</div>;
  }

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="flex gap-4">
        {photosInColumns.map((columnPhotos, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col gap-4">
            {columnPhotos.map((photo, photoIndex) => (
              <div 
                key={photo.id || photoIndex}
                className="relative cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                aria-label={`Open ${photo.alt || `Photo ${photoIndex + 1}`} in lightbox`}
                onClick={() => openLightbox(photo)}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt || `Photo ${photoIndex + 1}`}
                  width={photo.width || 1000}
                  height={photo.height || 1000}
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="lightbox fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={selectedImage.width}
            height={selectedImage.height}
            className="lightboxImage max-h-[90vh] max-w-[90vw] object-contain"
            priority
          />
        </div>
      )}
    </>
  );
}

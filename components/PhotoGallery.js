"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useWindowSize } from '../app/hooks/useWindowSize';

function getColumns(width) {
  if (width > 1280) return 3;
  if (width > 600) return 2;
  return 1;
}

// Generate consistent heights based on photo index for deterministic layout
function generateConsistentHeights(photoCount) {
  const heights = [
    'h-64', 'h-72', 'h-80', 'h-96', 'h-[28rem]', 'h-[32rem]',
    'h-[36rem]', 'h-[40rem]', 'h-[44rem]', 'h-[20rem]', 'h-[24rem]'
  ];

  // Use a simple hash function based on index for consistent results
  return Array.from({ length: photoCount }, (_, index) => {
    // Simple deterministic "random" based on index
    const seed = (index * 2654435761) % 2147483647; // Use large prime for better distribution
    const heightIndex = seed % heights.length;
    return heights[heightIndex];
  });
}

export function PhotoGallery({ photos }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { width } = useWindowSize();
  const [columns, setColumns] = useState(getColumns(width));
  const [isClient, setIsClient] = useState(false);
  
  // Generate consistent heights once and memoize them
  const consistentHeights = useMemo(() => generateConsistentHeights(photos?.length || 0), [photos?.length]);

  useEffect(() => {
    setColumns(getColumns(width));
  }, [width]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openLightbox = useCallback((index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [selectedImageIndex, photos.length]);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
    }
  }, [selectedImageIndex, photos.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    }
  }, [closeLightbox, goToNext, goToPrevious]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, handleKeyDown]);

  const photosInColumns = Array.from({ length: columns }, (_, colIndex) => 
    photos.filter((_, i) => i % columns === colIndex)
  );

  if (!photos?.length) {
    return <div>No photos to display</div>;
  }

  if (!isClient) {
    return null;
  }

  const selectedImage = selectedImageIndex !== null ? photos[selectedImageIndex] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header spacing */}
      <div className="h-16 lg:h-24 flex-shrink-0"></div>

      {/* Gallery Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-4">
          {photosInColumns.map((columnPhotos, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-4">
              {columnPhotos.map((photo, photoIndex) => {
                // Calculate the actual index in the original photos array
                const actualIndex = photos.findIndex(p => p === photo);
                const consistentHeight = consistentHeights[actualIndex] || 'h-80';

                return (
                  <div
                    key={photo.id || photoIndex}
                    className={`relative cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group rounded ${consistentHeight}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${photo.alt || `Photo ${actualIndex + 1}`} in lightbox`}
                    onClick={() => openLightbox(actualIndex)}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(actualIndex)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt || `Photo ${actualIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && selectedImageIndex !== null && (
        <div
          className="lightbox fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 z-10"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 z-10"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
            {selectedImageIndex + 1} / {photos.length}
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          />
        </div>
      )}
    </div>
  );
}

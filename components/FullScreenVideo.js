"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function FullScreenVideo({ posterImage = null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Auto-hide controls after 3 seconds of inactivity
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  // Auto-play when video is loaded
  const attemptAutoplay = async () => {
    if (videoRef.current && !hasPlayed) {
      try {
        setIsLoading(false);
        setShowPoster(false); // Hide poster when video starts
        await videoRef.current.play();
        setHasPlayed(true);
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay failed:', error);
        setIsLoading(false);
        // Keep poster visible if autoplay fails
      }
    }
  };

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setShowPoster(false); // Hide poster when video plays
      setIsLooping(false); // Clear looping state when playing
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsLooping(true); // Set looping state
      // Loop the video - restart it when it ends
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    };
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (!hasPlayed) {
        attemptAutoplay();
      }
    };
    const handleLoadedData = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      // Don't show loading during loop restart
      if (!isLooping) {
        setIsLoading(true);
      }
    };
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setShowPoster(false); // Hide poster when video is playing
      setIsLooping(false); // Clear looping state when playing
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    // Try autoplay when component mounts
    if (video.readyState >= 3) {
      setIsLoading(false);
      attemptAutoplay();
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [hasPlayed, isLooping]);

  // Additional effect to handle initial autoplay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && isLoading) {
        setIsLoading(false);
        attemptAutoplay();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-dvh overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onTouchStart={resetControlsTimeout}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted={isMuted}
        playsInline
        preload="auto"
        poster={posterImage} // Native poster attribute as fallback
      >
        <source src="/Evangeline.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Poster/Thumbnail Image with Next.js Image optimization */}
      {showPoster && posterImage && (
        <div className="absolute inset-0 z-5">
          <Image
            src={posterImage}
            alt="Video thumbnail"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
      )}

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left side controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                // Muted Icon
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                // Unmuted Icon
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Right side - Full screen button (optional) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current) {
                if (videoRef.current.requestFullscreen) {
                  videoRef.current.requestFullscreen();
                }
              }
            }}
            className="text-white hover:text-gray-300 transition-colors hidden md:block"
            aria-label="Enter fullscreen"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

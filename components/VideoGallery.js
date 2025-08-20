"use client";
import {useState, useCallback} from 'react';
import Image from 'next/image';

/**
 * VideoGallery component
 * Props: videos: [{id, title, src, thumbnail, thumbnailLqip, width, height}]
 * Renders a responsive grid of video thumbnails. Clicking a thumbnail swaps it for an inline video player.
 */
export function VideoGallery({videos = []}) {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const onThumbnailClick = useCallback((id) => {
    setActiveVideoId(prev => prev === id ? null : id);
  }, []);

  if (!videos.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map(video => {
          const isActive = activeVideoId === video.id;
          return (
            <div key={video.id} className="group relative rounded-lg overflow-hidden bg-black/5 border border-black/10">
              {isActive ? (
                <div className="aspect-video w-full bg-black">
                  <video
                    src={video.src}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    poster={video.thumbnail}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="relative block w-full focus:outline-none"
                  onClick={() => onThumbnailClick(video.id)}
                  aria-label={`Play video: ${video.title}`}
                >
                  <div className="aspect-video w-full relative">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title || 'Project video'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder={video.thumbnailLqip ? 'blur' : undefined}
                        blurDataURL={video.thumbnailLqip || undefined}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
                        <span className="text-sm">No thumbnail</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/60 group-hover:bg-black/70 transition-colors p-4">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/*<div className="p-3 text-left">*/}
                  {/*  <p className="text-sm font-medium line-clamp-2">{video.title}</p>*/}
                  {/*</div>*/}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


import React, { useState } from "react"
import { useInView } from "react-intersection-observer"

export interface VideoSource {
  src: string
  type: string
}

interface AutoPlayVideoProps {
  sources: VideoSource[]
  poster?: string
  className?: string
  aspectRatio?: string // e.g. 'aspect-video', 'aspect-[4/3]'
}

export const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({
  sources,
  poster,
  className = "",
  aspectRatio = "aspect-video",
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div ref={ref} className={`relative w-full overflow-hidden rounded-2xl bg-black ${aspectRatio} ${className}`}>
      <video
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        poster={poster}
        preload={inView ? "auto" : "none"}
        autoPlay={inView}
        loop={inView}
        muted
        playsInline
        controls={false}
        onCanPlayThrough={() => {
          setIsLoaded(true)
        }}
        onLoadStart={() => {
          setIsLoaded(false)
        }}
        onError={() => {
          console.warn('Video failed to load')
          setIsLoaded(true) // Show poster/fallback instead of staying invisible
        }}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      
      {/* Loading state indicator */}
      {inView && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
} 
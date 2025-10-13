import React from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  posterSrc?: string
  children: React.ReactNode
  className?: string
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  children,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className='absolute inset-0 w-full h-full object-cover'
        >
          <source src={videoSrc} type='video/mp4' />
        </video>
      )}

      {/* Fallback Image Background */}
      {!videoSrc && (
        <div
          className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center')`,
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10'></div>
      <div className='absolute inset-0 bg-black/20 z-20'></div>

      {/* Content */}
      <div className='relative z-30'>{children}</div>
    </div>
  )
}

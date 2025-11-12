import { useState } from 'react';
import { Play, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Video Player component
 * Supports YouTube embeds and direct video URLs
 *
 * @param {string} videoUrl - YouTube URL or direct video file URL
 * @param {string} title - Video title
 * @param {string} thumbnail - Thumbnail image URL (optional)
 * @param {boolean} autoplay - Auto play video (default: false)
 * @param {string} placeholder - Placeholder text when no video
 */
export default function VideoPlayer({
  videoUrl,
  title = 'Video',
  thumbnail,
  autoplay = false,
  placeholder = 'Video Coming Soon',
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Determine video type
  const getVideoType = () => {
    if (!videoUrl) return null;

    // YouTube patterns
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      return 'youtube';
    }

    // Direct video file patterns
    if (videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
      return 'direct';
    }

    return null;
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }

    return null;
  };

  const videoType = getVideoType();
  const youtubeId = videoType === 'youtube' ? getYouTubeId(videoUrl) : null;

  const handlePlay = () => {
    setLoading(true);
    setIsPlaying(true);
    // Loading will be handled by iframe/video onLoad
    setTimeout(() => setLoading(false), 1000);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // No video URL - show placeholder
  if (!videoUrl) {
    return (
      <div className={`aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-gray-600 font-medium">{placeholder}</p>
          <p className="text-gray-500 text-sm mt-2">
            Check back soon for video content
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`aspect-video bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200 ${className}`}>
        <div className="text-center px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load video</p>
          <p className="text-red-600 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  // YouTube video
  if (videoType === 'youtube' && youtubeId) {
    if (!isPlaying && thumbnail) {
      // Show thumbnail with play button
      return (
        <div className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer ${className}`}>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group hover:bg-black/40 transition-colors">
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-700 transition-colors"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </motion.button>
          </div>
        </div>
      );
    }

    // Show YouTube iframe
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
        {loading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoading(false)}
          onError={handleError}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Direct video file
  if (videoType === 'direct') {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden bg-black ${className}`}>
        <video
          src={videoUrl}
          controls
          autoPlay={autoplay}
          onError={handleError}
          className="w-full h-full"
          poster={thumbnail}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Invalid video URL
  return (
    <div className={`aspect-video bg-yellow-50 rounded-lg flex items-center justify-center border-2 border-yellow-200 ${className}`}>
      <div className="text-center px-4">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
        <p className="text-yellow-700 font-medium">Invalid video URL</p>
        <p className="text-yellow-600 text-sm mt-1">
          Please provide a valid YouTube or video file URL
        </p>
      </div>
    </div>
  );
}

/**
 * Example usage:
 *
 * // YouTube video
 * <VideoPlayer
 *   videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   title="My Video"
 *   thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
 * />
 *
 * // Direct video file
 * <VideoPlayer
 *   videoUrl="https://example.com/video.mp4"
 *   title="My Video"
 * />
 *
 * // Placeholder (no video)
 * <VideoPlayer
 *   placeholder="Video Coming Soon"
 * />
 */

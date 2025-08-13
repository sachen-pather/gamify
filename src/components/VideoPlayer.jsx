import React, { useState } from "react";
import { Play } from "lucide-react";

const VideoPlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="mb-6">
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-discovery-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading video...</p>
            </div>
          </div>
        )}

        <iframe
          src={videoUrl}
          width="100%"
          height="400"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full transition-opacity duration-300"
          onLoad={handleIframeLoad}
          style={{ opacity: isLoading ? 0 : 1 }}
        />

        {/* Video Overlay Controls (Optional Enhancement) */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            HD Quality
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Play className="w-4 h-4 mr-1 text-discovery-gold" />
            Video Lesson
          </span>
          <span>•</span>
          <span>HD Quality</span>
        </div>
        <div className="text-discovery-gold font-medium">
          Interactive Content
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

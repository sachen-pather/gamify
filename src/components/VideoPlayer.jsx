import React, { useState } from "react";
import { Play } from "lucide-react";

const VideoPlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    // This container is now a fully responsive box that the iframe will fill.
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <div className="w-12 h-12 border-4 border-discovery-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* --- FIX APPLIED HERE --- */}
      {/* The iframe is now absolutely positioned to perfectly fill its parent. */}
      {/* Removed fixed height and width attributes. */}
      <iframe
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full transition-opacity duration-300"
        onLoad={handleIframeLoad}
        style={{ opacity: isLoading ? 0 : 1 }}
        title="Lesson Video"
      />
    </div>
  );
};

export default VideoPlayer;

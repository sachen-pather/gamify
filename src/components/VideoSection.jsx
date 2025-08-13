import React from "react";
import { Play, Brain, Clock, Zap, Maximize2, Minimize2 } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const VideoSection = ({
  videoUrl,
  expanded,
  onToggleExpanded,
  onQuizStart,
  lessonData,
  isMobile,
}) => {
  return (
    <div className="mb-6">
      {/* Video Player Container */}
      <div
        className="bg-black rounded-xl overflow-hidden shadow-2xl relative"
        style={{
          // --- FIX APPLIED HERE ---
          // Changed default mobile aspect ratio to 16/9 for a more standard video feel.
          aspectRatio: isMobile ? "16/9" : expanded ? "16/9" : "28/9",
        }}
      >
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <Play className={`w-16 h-16 mx-auto mb-4 opacity-80`} />
              <p className="text-lg">Video Player</p>
              <p className="text-sm opacity-60 mt-2">Loading lesson video...</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls Bar */}
      <div className="bg-white rounded-b-xl border border-gray-200 border-t-0 p-4 shadow-lg">
        {isMobile ? (
          // Mobile Layout - Stacked
          <div className="space-y-4">
            <button
              onClick={onQuizStart}
              className="w-full bg-discovery-gold text-white py-3 rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Brain className="w-5 h-5" />
              <span>Take Quiz</span>
            </button>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">
                    {lessonData?.duration || "15 min"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-discovery-gold/10 text-discovery-gold px-3 py-1 rounded-lg font-bold flex items-center space-x-1 text-sm">
                  <Zap className="w-3 h-3" />
                  <span>+45 VP</span>
                </div>
                <button
                  onClick={onToggleExpanded}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  {expanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop Layout - Side by side
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={onQuizStart}
                className="bg-discovery-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Brain className="w-5 h-5" />
                <span>Take Quiz</span>
              </button>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">
                    {lessonData?.duration || "15 min"}
                  </span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-sm">HD Quality</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-discovery-gold/10 text-discovery-gold px-4 py-2 rounded-lg font-bold flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>+45 VP Available</span>
              </div>
              <button
                onClick={onToggleExpanded}
                className="text-gray-400 hover:text-gray-600"
              >
                {expanded ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;

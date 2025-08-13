import React from "react";
import { Trophy, Star } from "lucide-react";

const ProgressBar = ({ completed, total, percentage }) => {
  // Calculate bonus indicators
  const isHalfway = completed >= Math.floor(total / 2);
  const isNearComplete = completed >= total - 1;
  const isComplete = completed === total;

  return (
    <div className="text-right">
      <div className="text-sm text-gray-500 mb-1 flex items-center justify-end">
        <span className="mr-2">Course Progress</span>
        {isComplete && <Trophy className="w-4 h-4 text-discovery-gold" />}
        {isNearComplete && !isComplete && (
          <Star className="w-4 h-4 text-discovery-gold" />
        )}
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full progress-bar transition-all duration-700 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            {/* Animated shine effect */}
            {percentage > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* Milestone markers */}
          <div className="absolute inset-0 flex justify-between items-center px-1">
            {[25, 50, 75].map((milestone) => (
              <div
                key={milestone}
                className={`w-1 h-1 rounded-full ${
                  percentage >= milestone ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <span className="text-sm font-semibold text-gray-700 min-w-max flex items-center">
          {completed}/{total}
          {isComplete && <span className="ml-1 text-discovery-gold">✓</span>}
        </span>
      </div>

      <div className="text-xs text-gray-400 mt-1 flex items-center justify-end space-x-2">
        <span>{percentage.toFixed(0)}% Complete</span>

        {/* Progress badges */}
        {isHalfway && (
          <span className="bg-discovery-gold/10 text-discovery-gold px-2 py-0.5 rounded-full text-xs font-medium">
            {isComplete
              ? "Expert"
              : isNearComplete
              ? "Almost There!"
              : "Halfway Hero"}
          </span>
        )}
      </div>

      {/* Completion celebration */}
      {isComplete && (
        <div className="text-xs text-discovery-gold font-medium mt-1 animate-pulse">
          🎉 Course Mastered!
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

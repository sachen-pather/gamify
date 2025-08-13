import React from "react";
import { Zap, TrendingUp, Flame, Star } from "lucide-react";

const VitalityCard = ({ points, level, streak }) => {
  // Calculate progress to next level (every 100 points = 1 level)
  const pointsToNextLevel = 100 - (points % 100);
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 min-w-max">
      <div className="flex items-center space-x-4">
        {/* Vitality Points */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div className="w-8 h-8 bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center mr-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{points}</div>
              <div className="text-xs text-discovery-gold font-medium">
                Vitality Points
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-discovery-blue mr-1" />
            <div>
              <div className="text-lg font-bold text-discovery-blue">
                L{level}
              </div>
              <div className="text-xs text-gray-500">
                {pointsToNextLevel} to L{level + 1}
              </div>
            </div>
          </div>
          {/* Progress bar to next level */}
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Flame className="w-4 h-4 text-red-500 mr-1" />
            <div>
              <div className="text-lg font-bold text-red-600">{streak}</div>
              <div className="text-xs text-gray-500">Day Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalityCard;

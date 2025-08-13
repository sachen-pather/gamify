import React from "react";
import { Award, X, Zap } from "lucide-react";

const AchievementNotification = ({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideInRight">
      <div className="bg-white rounded-xl shadow-xl border-2 border-discovery-gold p-6 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center mr-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-discovery-gold font-bold text-sm">
                🎉 Achievement Unlocked!
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="ml-15">
          <h3 className="font-bold text-gray-900 mb-1 flex items-center">
            <span className="text-2xl mr-2">{achievement.icon}</span>
            {achievement.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {achievement.description}
          </p>
          <div className="flex items-center text-discovery-gold text-sm font-medium">
            <Zap className="w-4 h-4 mr-1" />+{achievement.points} Vitality
            Points
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;

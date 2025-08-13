import React from "react";
import { Award, X, Zap, Trophy } from "lucide-react";

// Mobile-Responsive Achievement Notification - UPDATED
const MobileAchievementNotification = ({
  achievement,
  onClose,
  isMobile,
  isPhoneFrame,
}) => {
  if (!achievement) return null;

  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div
      className={`${
        isPhoneFrame
          ? "absolute top-16 left-3 right-3 z-50" // Even more compact for phone frame
          : useMobileLayout
          ? "fixed top-6 left-4 right-4 z-50" // Regular mobile
          : "fixed top-6 right-6 max-w-sm z-50" // Desktop
      } animate-slideInRight`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg border-2 border-discovery-gold ${
          isPhoneFrame ? "p-2" : useMobileLayout ? "p-3" : "p-6"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div
              className={`${
                isPhoneFrame
                  ? "w-6 h-6"
                  : useMobileLayout
                  ? "w-8 h-8"
                  : "w-12 h-12"
              } bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center ${
                isPhoneFrame ? "mr-2" : useMobileLayout ? "mr-2" : "mr-3"
              }`}
            >
              <Award
                className={`${
                  isPhoneFrame
                    ? "w-3 h-3"
                    : useMobileLayout
                    ? "w-4 h-4"
                    : "w-6 h-6"
                } text-white`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`text-discovery-gold font-bold ${
                  isPhoneFrame
                    ? "text-xs"
                    : useMobileLayout
                    ? "text-xs"
                    : "text-sm"
                }`}
              >
                🎉 Achievement Unlocked!
              </div>
              <h3
                className={`font-bold text-gray-900 flex items-center ${
                  isPhoneFrame
                    ? "text-xs"
                    : useMobileLayout
                    ? "text-xs"
                    : "text-base"
                } truncate`}
              >
                <span
                  className={`${
                    isPhoneFrame
                      ? "text-sm mr-1"
                      : useMobileLayout
                      ? "text-sm mr-1"
                      : "text-2xl mr-2"
                  }`}
                >
                  {achievement.icon}
                </span>
                {achievement.title}
              </h3>
              {!isPhoneFrame && (
                <p
                  className={`text-gray-600 ${
                    useMobileLayout ? "text-xs" : "text-sm"
                  }`}
                >
                  {achievement.description}
                </p>
              )}
              <div
                className={`flex items-center text-discovery-gold ${
                  isPhoneFrame
                    ? "text-xs"
                    : useMobileLayout
                    ? "text-xs"
                    : "text-sm"
                } font-medium`}
              >
                <Zap
                  className={`${
                    isPhoneFrame
                      ? "w-3 h-3"
                      : useMobileLayout
                      ? "w-3 h-3"
                      : "w-4 h-4"
                  } mr-1`}
                />
                +{achievement.points} VP
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
          >
            <X className={`${isPhoneFrame ? "w-3 h-3" : "w-4 h-4"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAchievementNotification;

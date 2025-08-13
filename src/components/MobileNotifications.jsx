import React from "react";
import { Award, X, Zap, Trophy } from "lucide-react";

// Mobile-Responsive Achievement Notification
export const MobileAchievementNotification = ({
  achievement,
  onClose,
  isMobile,
  isPhoneFrame,
}) => {
  if (!achievement) return null;

  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div
      className={`fixed z-50 ${
        useMobileLayout
          ? isPhoneFrame
            ? "top-20 left-4 right-4"
            : "top-6 left-4 right-4"
          : "top-6 right-6 max-w-sm"
      } animate-slideInRight`}
    >
      <div
        className={`bg-white rounded-xl shadow-xl border-2 border-discovery-gold ${
          useMobileLayout ? "p-4" : "p-6"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div
              className={`${
                useMobileLayout ? "w-10 h-10" : "w-12 h-12"
              } bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center ${
                useMobileLayout ? "mr-2" : "mr-3"
              }`}
            >
              <Award
                className={`${
                  useMobileLayout ? "w-5 h-5" : "w-6 h-6"
                } text-white`}
              />
            </div>
            <div>
              <div
                className={`text-discovery-gold font-bold ${
                  useMobileLayout ? "text-sm" : "text-sm"
                }`}
              >
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

        <div className={useMobileLayout ? "ml-12" : "ml-15"}>
          <h3
            className={`font-bold text-gray-900 mb-1 flex items-center ${
              useMobileLayout ? "text-sm" : "text-base"
            }`}
          >
            <span
              className={`${
                useMobileLayout ? "text-lg mr-1" : "text-2xl mr-2"
              }`}
            >
              {achievement.icon}
            </span>
            {achievement.title}
          </h3>
          <p
            className={`text-gray-600 ${
              useMobileLayout ? "text-xs mb-2" : "text-sm mb-3"
            }`}
          >
            {achievement.description}
          </p>
          <div
            className={`flex items-center text-discovery-gold ${
              useMobileLayout ? "text-xs" : "text-sm"
            } font-medium`}
          >
            <Zap
              className={`${useMobileLayout ? "w-3 h-3" : "w-4 h-4"} mr-1`}
            />
            +{achievement.points} Vitality Points
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile-Responsive Level Up Modal
export const MobileLevelUpModal = ({
  level,
  onClose,
  isMobile,
  isPhoneFrame,
}) => {
  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl text-center ${
          useMobileLayout
            ? isPhoneFrame
              ? "mx-6 p-6"
              : "mx-4 p-8"
            : "max-w-md mx-4 p-8"
        }`}
      >
        <div
          className={`${
            useMobileLayout ? "w-16 h-16" : "w-20 h-20"
          } bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <Trophy
            className={`${
              useMobileLayout ? "w-8 h-8" : "w-10 h-10"
            } text-white`}
          />
        </div>
        <h2
          className={`font-bold text-gray-900 mb-2 ${
            useMobileLayout ? "text-xl" : "text-2xl"
          }`}
        >
          Level Up!
        </h2>
        <p
          className={`text-gray-600 mb-6 ${
            useMobileLayout ? "text-sm" : "text-base"
          }`}
        >
          Congratulations! You've reached Level {level}!
        </p>
        <button
          onClick={onClose}
          className={`bg-discovery-gold text-white rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors ${
            useMobileLayout ? "px-4 py-2 text-sm" : "px-6 py-3"
          }`}
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};

export default MobileAchievementNotification;

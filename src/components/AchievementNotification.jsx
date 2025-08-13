// src/components/AchievementNotification.jsx (The new, unified file)
import React from "react";
import { Award, X, Zap } from "lucide-react";

const AchievementNotification = ({
  achievement,
  onClose,
  isMobile,
  isPhoneFrame,
}) => {
  if (!achievement) return null;

  // --- UNIFIED STYLING LOGIC ---

  let containerClasses = "";
  let cardPadding = "p-6";
  let iconContainerSize = "w-12 h-12 mr-3";
  let iconSize = "w-6 h-6";
  let titleSize = "text-sm";
  let headerSize = "text-base";
  let descriptionSize = "text-sm";
  let pointsSize = "text-sm";
  let showDescription = true;

  if (isPhoneFrame) {
    // Case 1: Inside the phone frame. Positioned absolutely within a relative parent.
    containerClasses = "absolute top-4 left-4 right-4 z-50";
    cardPadding = "p-2";
    iconContainerSize = "w-8 h-8 mr-2";
    iconSize = "w-4 h-4";
    titleSize = "text-xs";
    headerSize = "text-sm";
    showDescription = false; // No room for description in the frame
    pointsSize = "text-xs";
  } else if (isMobile) {
    // Case 2: On a true mobile device. Fixed banner at the top.
    containerClasses = "fixed top-6 left-4 right-4 z-[9999]";
    cardPadding = "p-3";
    iconContainerSize = "w-10 h-10 mr-3";
    iconSize = "w-5 h-5";
    titleSize = "text-xs";
    headerSize = "text-sm";
    descriptionSize = "text-xs";
    pointsSize = "text-xs";
  } else {
    // Case 3: Desktop view. Fixed banner on the side.
    containerClasses = "fixed top-6 right-6 max-w-sm z-[9999]";
  }

  return (
    <div className={`${containerClasses} animate-slideInRight`}>
      <div
        className={`bg-white rounded-lg shadow-lg border-2 border-discovery-gold ${cardPadding}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`${iconContainerSize} bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <Award className={`${iconSize} text-white`} />
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className={`text-discovery-gold font-bold ${titleSize}`}>
                🎉 Achievement Unlocked!
              </div>
              <h3
                className={`font-bold text-gray-900 flex items-center ${headerSize} truncate`}
              >
                <span className="mr-1.5">{achievement.icon}</span>
                <span className="truncate">{achievement.title}</span>
              </h3>
              {showDescription && (
                <p className={`text-gray-600 ${descriptionSize} truncate`}>
                  {achievement.description}
                </p>
              )}
              <div
                className={`flex items-center text-discovery-gold font-medium mt-0.5 ${pointsSize}`}
              >
                <Zap className="w-3 h-3 mr-1" />+{achievement.points} VP
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-2 self-start"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;

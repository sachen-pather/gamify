import React from "react";
import { Award, X, Zap, Trophy } from "lucide-react";

// Mobile-Responsive Level Up Modal - UPDATED
const MobileLevelUpModal = ({ level, onClose, isMobile, isPhoneFrame }) => {
  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div
      className={`${
        isPhoneFrame
          ? "absolute inset-4 flex items-center justify-center z-50" // Contained within phone frame with padding
          : "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      }`}
    >
      {/* Add backdrop only for non-phone frame */}
      {!isPhoneFrame && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`bg-white rounded-xl text-center relative ${
          useMobileLayout
            ? isPhoneFrame
              ? "mx-2 p-4 w-full max-w-xs" // Contained within phone frame
              : "mx-4 p-6"
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

export default MobileLevelUpModal;

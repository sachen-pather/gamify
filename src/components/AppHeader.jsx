import React from "react";
import { BookOpen, Zap, Bookmark, Share2, Settings, Menu } from "lucide-react";

const AppHeader = ({
  vitalityPoints,
  userLevel,
  isMobile,
  onToggleSidebar,
  isPhoneFrame,
}) => {
  // Force mobile layout in phone frame
  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className={`${useMobileLayout ? "px-4 py-3" : "px-8 py-4"}`}>
        <div className="flex items-center justify-between">
          {/* Left side - Brand and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            {useMobileLayout && (
              <button
                onClick={onToggleSidebar}
                className="text-gray-600 hover:text-discovery-gold transition-colors p-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div
                className={`${
                  useMobileLayout ? "w-8 h-8" : "w-10 h-10"
                } bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-xl flex items-center justify-center`}
              >
                <BookOpen
                  className={`${
                    useMobileLayout ? "w-4 h-4" : "w-5 h-5"
                  } text-white`}
                />
              </div>
              {!useMobileLayout && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Financial Literacy Academy
                  </h1>
                  <p className="text-discovery-blue text-sm font-medium">
                    Professional Development Course
                  </p>
                </div>
              )}
              {useMobileLayout && (
                <div>
                  <h1 className="text-sm font-bold text-gray-900">
                    Financial Academy
                  </h1>
                  <p className="text-discovery-blue text-xs font-medium">
                    Learning
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Stats and Actions */}
          <div className="flex items-center space-x-3">
            {/* Vitality Points Display */}
            <div
              className={`flex items-center space-x-2 bg-gray-100 rounded-lg ${
                useMobileLayout ? "px-2 py-1" : "px-4 py-2"
              } border border-gray-200`}
            >
              <Zap
                className={`${
                  useMobileLayout ? "w-4 h-4" : "w-5 h-5"
                } text-discovery-gold`}
              />
              <span
                className={`text-discovery-gold font-bold ${
                  useMobileLayout ? "text-sm" : "text-lg"
                }`}
              >
                {vitalityPoints}
              </span>
              {!useMobileLayout && (
                <span className="text-gray-600 text-sm">
                  VP • Level {userLevel}
                </span>
              )}
              {useMobileLayout && (
                <span className="text-gray-600 text-xs">L{userLevel}</span>
              )}
            </div>

            {/* Action Icons - Hidden on mobile or simplified */}
            {!useMobileLayout && (
              <div className="flex items-center space-x-3">
                <Bookmark className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
                <Share2 className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
                <Settings className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
              </div>
            )}

            {/* Mobile Settings - Single button */}
            {useMobileLayout && (
              <button className="text-gray-500 hover:text-discovery-gold transition-colors p-2">
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

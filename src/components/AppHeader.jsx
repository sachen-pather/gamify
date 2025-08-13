import React from "react";
import { BookOpen, Zap, Bookmark, Share2, Settings } from "lucide-react";

const AppHeader = ({ vitalityPoints, userLevel }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Financial Literacy Academy
                </h1>
                <p className="text-discovery-blue text-sm font-medium">
                  Professional Development Course
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Stats and Actions */}
          <div className="flex items-center space-x-6">
            {/* Vitality Points Display */}
            <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2 border border-gray-200">
              <Zap className="w-5 h-5 text-discovery-gold" />
              <span className="text-discovery-gold font-bold text-lg">
                {vitalityPoints}
              </span>
              <span className="text-gray-600 text-sm">
                VP • Level {userLevel}
              </span>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-3">
              <Bookmark className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
              <Share2 className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
              <Settings className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

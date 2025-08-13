import React from "react";
import { Award, X, Zap, Trophy } from "lucide-react";
const LevelUpModal = ({ level, onClose, isMobile, isPhoneFrame }) => {
  // For desktop only - mobile uses MobileLevelUpModal
  if (isMobile || isPhoneFrame) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-discovery-gold p-8 text-center max-w-md mx-4 animate-bounce relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Celebration Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        {/* Celebration Text */}
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Level Up!</h2>
        <p className="text-xl text-discovery-gold font-semibold mb-4">
          You've reached Level {level}!
        </p>
        <p className="text-gray-600 mb-6">
          Your financial knowledge is growing stronger! Keep up the excellent
          work.
        </p>

        {/* Rewards */}
        <div className="bg-gradient-to-r from-discovery-gold/10 to-discovery-blue/10 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center">
            <Award className="w-5 h-5 text-discovery-gold mr-2" />
            Level {level} Rewards
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Increased learning multiplier</div>
            <div>• Access to advanced features</div>
            <div>• Progress recognition badge</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-discovery-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};
export default LevelUpModal;

import React from "react";
import { CheckCircle, Award, Zap, Lock, Star } from "lucide-react";

const LessonCard = ({
  lessonNum,
  currentLesson,
  completedLessons,
  lessonData,
  onClick,
  vitalityPoints,
  achievements,
}) => {
  const isActive = currentLesson === lessonNum;
  const isCompleted = completedLessons.includes(lessonNum);
  const isLocked = lessonNum > 1 && !completedLessons.includes(lessonNum - 1);

  // Calculate Vitality Points reward for this lesson
  const getVitalityReward = () => {
    const baseReward = 15; // Base lesson completion reward
    const quizReward = 20; // Quiz completion reward
    const firstAttemptBonus = 10; // Bonus for first attempt
    return baseReward + quizReward + firstAttemptBonus; // Max possible: 45 VP
  };

  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition-all lesson-card relative ${
        isActive
          ? "bg-gradient-to-r from-discovery-gold to-discovery-blue text-white shadow-lg transform scale-105"
          : isCompleted
          ? "bg-green-50 border border-green-200 text-green-800 hover:shadow-md"
          : isLocked
          ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed opacity-75"
          : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:shadow-md"
      }`}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Lock indicator for locked lessons */}
      {isLocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      )}

      {/* Achievement badge for special accomplishments */}
      {isCompleted &&
        achievements.includes("course_complete") &&
        lessonNum === 7 && (
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center border-2 border-white">
              <Award className="w-3 h-3 text-white" />
            </div>
          </div>
        )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isActive
                ? "bg-white text-discovery-gold"
                : isCompleted
                ? "bg-green-200 text-green-800"
                : isLocked
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {isCompleted ? <CheckCircle className="w-5 h-5" /> : lessonNum}
          </div>
          <div>
            <div className="text-sm font-medium">Lesson {lessonNum}</div>
            <div
              className={`text-xs ${
                isActive
                  ? "text-white/80"
                  : isLocked
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {lessonData?.duration}
            </div>
          </div>
        </div>
        {isCompleted && <Award className="w-5 h-5 text-green-600" />}
      </div>

      {/* Lesson Title */}
      <div
        className={`mt-2 text-xs font-medium ${
          isActive
            ? "text-white/90"
            : isCompleted
            ? "text-green-700"
            : isLocked
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {lessonData?.title}
      </div>

      {/* Vitality Points Reward */}
      {!isLocked && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center text-xs">
            <Zap
              className={`w-3 h-3 mr-1 ${
                isActive
                  ? "text-white"
                  : isCompleted
                  ? "text-green-600"
                  : "text-discovery-gold"
              }`}
            />
            <span
              className={`font-medium ${
                isActive
                  ? "text-white/90"
                  : isCompleted
                  ? "text-green-600"
                  : "text-discovery-gold"
              }`}
            >
              {isCompleted ? "✓ Earned" : `+${getVitalityReward()} VP`}
            </span>
          </div>

          {/* Difficulty indicator */}
          <div className="flex">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= (lessonNum <= 2 ? 1 : lessonNum <= 4 ? 2 : 3)
                    ? isActive
                      ? "text-white"
                      : isCompleted
                      ? "text-green-500"
                      : "text-discovery-gold"
                    : "text-gray-300"
                }`}
                fill={
                  star <= (lessonNum <= 2 ? 1 : lessonNum <= 4 ? 2 : 3)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress indicator for locked lessons */}
      {isLocked && (
        <div className="mt-2 text-xs text-gray-400 flex items-center">
          <Lock className="w-3 h-3 mr-1" />
          Complete Lesson {lessonNum - 1} to unlock
        </div>
      )}
    </div>
  );
};

export default LessonCard;

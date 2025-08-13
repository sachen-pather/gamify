import React from "react";
import {
  CheckCircle,
  Award,
  Zap,
  Flame,
  ChevronRight,
  Menu,
} from "lucide-react";
import { lessons } from "../data/lessons";

const LessonSidebar = ({
  currentLesson,
  completedLessons,
  onLessonClick,
  collapsed,
  onToggleCollapse,
  progressPercentage,
  vitalityPoints,
  userLevel,
  streakCount,
}) => {
  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      } flex flex-col shadow-sm`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h3 className="text-gray-900 font-semibold text-sm">
                Financial Literacy Academy
              </h3>
              <p className="text-gray-600 text-xs mt-1">
                {completedLessons.length}/7 lessons completed
              </p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 text-xs">Course Progress</span>
            <span className="text-discovery-gold text-xs font-semibold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {!collapsed && (
          <div className="p-2">
            {Object.entries(lessons).map(([lessonNum, lesson]) => {
              const num = parseInt(lessonNum);
              const isActive = currentLesson === num;
              const isCompleted = completedLessons.includes(num);
              const isLocked = num > 1 && !completedLessons.includes(num - 1);

              return (
                <div
                  key={num}
                  onClick={() => !isLocked && onLessonClick(num)}
                  className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                    isActive
                      ? "bg-gradient-to-r from-discovery-gold/15 to-discovery-blue/15 border border-discovery-gold/40 shadow-sm"
                      : isCompleted
                      ? "bg-white border border-green-200 hover:shadow-sm"
                      : isLocked
                      ? "bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed"
                      : "bg-white border border-gray-200 hover:shadow-sm hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isActive
                            ? "bg-discovery-gold text-white"
                            : isCompleted
                            ? "bg-green-600 text-white"
                            : isLocked
                            ? "bg-gray-300 text-gray-500"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          num
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-discovery-gold"
                              : isCompleted
                              ? "text-green-700"
                              : isLocked
                              ? "text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {lesson.title}
                        </div>
                        <div
                          className={`text-xs ${
                            isLocked ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {lesson.duration}
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <Award className="w-4 h-4 text-discovery-gold" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Gamification Stats */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-r from-discovery-gold/10 to-discovery-blue/10 rounded-lg p-2 text-center border border-discovery-gold/20">
              <div className="flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3 text-discovery-gold" />
                <span className="text-xs font-semibold text-discovery-gold">
                  L{userLevel}
                </span>
              </div>
              <div className="text-xs text-gray-600">{vitalityPoints} VP</div>
            </div>
            <div className="bg-gradient-to-r from-discovery-blue/10 to-discovery-gold/10 rounded-lg p-2 text-center border border-discovery-blue/20">
              <div className="flex items-center justify-center space-x-1">
                <Flame className="w-3 h-3 text-discovery-blue" />
                <span className="text-xs font-semibold text-discovery-blue">
                  {streakCount}
                </span>
              </div>
              <div className="text-xs text-gray-600">Streak</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonSidebar;

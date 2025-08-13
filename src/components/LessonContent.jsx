import React from "react";
import { CheckCircle, Target, Star } from "lucide-react";

const LessonContent = ({ lessonData, isMobile }) => {
  if (!lessonData) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-${isMobile ? "6" : "8"}`}>
      {/* Lesson Title and Summary */}
      <div
        className={`bg-white rounded-xl ${
          isMobile ? "p-6" : "p-8"
        } shadow-sm border border-gray-200`}
      >
        <h2
          className={`${
            isMobile ? "text-2xl" : "text-3xl"
          } font-bold text-gray-900 mb-4`}
        >
          {lessonData.title}
        </h2>
        <p
          className={`text-gray-700 leading-relaxed ${
            isMobile ? "text-base" : "text-lg"
          }`}
        >
          {lessonData.summary}
        </p>
      </div>

      {/* Learning Objectives and Key Terms */}
      <div
        className={`grid ${
          isMobile ? "grid-cols-1 gap-6" : "md:grid-cols-2 gap-8"
        }`}
      >
        {/* Learning Objectives */}
        <div
          className={`bg-white rounded-xl ${
            isMobile ? "p-5" : "p-6"
          } shadow-sm border border-gray-200`}
        >
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-bold text-discovery-blue mb-4 flex items-center`}
          >
            <Target
              className={`${
                isMobile ? "w-5 h-5" : "w-6 h-6"
              } mr-2 text-discovery-gold`}
            />
            Learning Objectives
          </h3>
          <ul className="space-y-3">
            {lessonData.objectives?.map((objective, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircle
                  className={`${
                    isMobile ? "w-4 h-4 mr-2 mt-1" : "w-5 h-5 mr-3 mt-0.5"
                  } text-discovery-gold flex-shrink-0`}
                />
                <span
                  className={`leading-relaxed ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  {objective}
                </span>
              </li>
            )) || (
              <li className="flex items-start text-gray-700">
                <CheckCircle
                  className={`${
                    isMobile ? "w-4 h-4 mr-2 mt-1" : "w-5 h-5 mr-3 mt-0.5"
                  } text-discovery-gold flex-shrink-0`}
                />
                <span
                  className={`leading-relaxed ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  Master fundamental financial concepts
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Key Terms */}
        <div
          className={`bg-white rounded-xl ${
            isMobile ? "p-5" : "p-6"
          } shadow-sm border border-gray-200`}
        >
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-bold text-discovery-blue mb-4 flex items-center`}
          >
            <Star
              className={`${
                isMobile ? "w-5 h-5" : "w-6 h-6"
              } mr-2 text-discovery-gold`}
            />
            Key Terms
          </h3>
          <div className={`flex flex-wrap ${isMobile ? "gap-2" : "gap-3"}`}>
            {lessonData.keyTerms?.map((term, index) => (
              <span
                key={index}
                className={`bg-discovery-gold/10 text-discovery-gold border border-discovery-gold/20 ${
                  isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                } rounded-lg font-semibold`}
              >
                {term}
              </span>
            )) || (
              <span
                className={`bg-discovery-gold/10 text-discovery-gold border border-discovery-gold/20 ${
                  isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                } rounded-lg font-semibold`}
              >
                Financial Basics
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;

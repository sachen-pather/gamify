import React from "react";
import { CheckCircle, Target, Star } from "lucide-react";

const LessonContent = ({ lessonData }) => {
  if (!lessonData) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Lesson Title and Summary */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {lessonData.title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {lessonData.summary}
        </p>
      </div>

      {/* Learning Objectives and Key Terms */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Learning Objectives */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-discovery-blue mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-discovery-gold" />
            Learning Objectives
          </h3>
          <ul className="space-y-3">
            {lessonData.objectives?.map((objective, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircle className="w-5 h-5 mr-3 text-discovery-gold mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{objective}</span>
              </li>
            )) || (
              <li className="flex items-start text-gray-700">
                <CheckCircle className="w-5 h-5 mr-3 text-discovery-gold mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Master fundamental financial concepts
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Key Terms */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-discovery-blue mb-4 flex items-center">
            <Star className="w-6 h-6 mr-3 text-discovery-gold" />
            Key Terms
          </h3>
          <div className="flex flex-wrap gap-3">
            {lessonData.keyTerms?.map((term, index) => (
              <span
                key={index}
                className="bg-discovery-gold/10 text-discovery-gold border border-discovery-gold/20 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                {term}
              </span>
            )) || (
              <span className="bg-discovery-gold/10 text-discovery-gold border border-discovery-gold/20 px-4 py-2 rounded-lg text-sm font-semibold">
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

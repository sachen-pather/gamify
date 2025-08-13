import React from "react";
import { CheckCircle, Zap, Star, Trophy, Target } from "lucide-react";

const QuizComponent = ({
  currentLesson,
  quizData,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  showResult,
  isCorrect,
  onRetry,
  isLoading = false,
  vitalityPoints,
  quizAttempts = 0,
}) => {
  // Calculate Vitality Points for this quiz
  const getQuizReward = () => {
    const baseReward = 20;
    const firstAttemptBonus = quizAttempts === 0 ? 10 : 0;
    return baseReward + firstAttemptBonus;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-discovery-blue to-discovery-gold p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Lesson {currentLesson} Quiz
            </h2>
            <p className="text-blue-100">Test your understanding</p>
          </div>

          {/* Vitality Points Reward Display */}
          <div className="text-right">
            <div className="bg-white/20 rounded-xl p-3">
              <div className="flex items-center justify-center mb-1">
                <Zap className="w-4 h-4 mr-1" />
                <span className="text-lg font-bold">+{getQuizReward()}</span>
              </div>
              <div className="text-sm opacity-90">Vitality Points</div>
              {quizAttempts === 0 && (
                <div className="text-xs opacity-75 mt-1 flex items-center justify-center">
                  <Star className="w-3 h-3 mr-1" />
                  First Attempt Bonus
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Attempt Indicator */}
        {quizAttempts > 0 && (
          <div className="bg-white/20 rounded-lg p-2 text-sm">
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Attempt #{quizAttempts + 1}
              {quizAttempts === 0 && (
                <span className="ml-2 text-yellow-200">(Bonus Available!)</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {!showResult ? (
          <>
            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {quizData?.question}
              </h3>

              {/* Answer Options */}
              <div className="space-y-3">
                {quizData?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => onAnswerSelect(option)}
                    disabled={isLoading}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all quiz-option disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedAnswer === option
                        ? "border-discovery-gold bg-yellow-50 text-discovery-gold transform scale-102"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 hover:transform hover:scale-101"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedAnswer === option
                            ? "border-discovery-gold bg-discovery-gold"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAnswer === option && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={onSubmit}
                disabled={!selectedAnswer || isLoading}
                className="btn-discovery disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Checking Answer...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <Zap className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Quiz Result */
          <div className="text-center py-8">
            <div
              className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <div className="w-12 h-12 text-red-600 text-2xl font-bold flex items-center justify-center">
                  ✕
                </div>
              )}
            </div>

            <h3
              className={`text-2xl font-bold mb-4 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Excellent Work!" : "Not Quite Right"}
            </h3>

            <div className="text-gray-600 mb-6">
              {isCorrect ? (
                <div>
                  <p className="font-medium mb-4">
                    🎉 Outstanding! You've mastered this concept!
                  </p>

                  {/* Vitality Points Earned Display */}
                  <div className="bg-gradient-to-r from-discovery-gold/10 to-discovery-blue/10 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Rewards Earned
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-center">
                        <Zap className="w-4 h-4 text-discovery-gold mr-2" />
                        <span className="font-medium text-discovery-gold">
                          +{getQuizReward()} Vitality Points
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-discovery-blue mr-2" />
                        <span className="font-medium text-discovery-blue">
                          Lesson Progress
                        </span>
                      </div>
                    </div>

                    {quizAttempts === 0 && (
                      <div className="mt-3 text-xs text-discovery-gold font-medium flex items-center justify-center">
                        <Star className="w-3 h-3 mr-1" />
                        First Attempt Bonus Applied!
                      </div>
                    )}
                  </div>

                  {currentLesson < 7 ? (
                    <p className="text-sm mt-2 text-green-600 font-medium">
                      🚀 Moving to the next lesson...
                    </p>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm mt-2 text-discovery-gold font-bold">
                        🎊 Congratulations! You've completed all lessons!
                      </p>
                      <p className="text-xs mt-1 text-gray-600">
                        You're now a Discovery Finance Expert!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="font-medium mb-2">
                    Don't worry, learning is a journey! 💪
                  </p>
                  <p className="text-sm mb-4">
                    Review the lesson content and try again to earn your
                    Vitality Points.
                  </p>
                  {quizData?.explanation && (
                    <div className="text-left">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                          Explanation
                        </h4>
                        <p className="text-sm text-gray-700">
                          {quizData.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!isCorrect && (
              <button
                onClick={onRetry}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;

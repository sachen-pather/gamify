import React from "react";
import { Brain } from "lucide-react";
import QuizComponent from "./QuizComponent";

const QuizSection = ({
  showQuiz,
  quizData,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  showResult,
  isCorrect,
  onRetry,
  onStartQuiz,
  isLoading,
  currentLesson,
  vitalityPoints,
  quizAttempts,
}) => {
  // Show start quiz interface when quiz is not active
  if (!showQuiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center bg-white rounded-xl p-12 shadow-sm border border-gray-200">
          <div className="w-20 h-20 bg-discovery-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-discovery-gold" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Test Your Knowledge?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md">
            Complete the lesson quiz to earn Vitality Points and unlock the next
            lesson.
          </p>
          <button
            onClick={onStartQuiz}
            className="bg-discovery-gold text-white px-8 py-4 rounded-lg font-bold hover:bg-discovery-gold/90 transition-colors text-lg"
          >
            Start Quiz Challenge
          </button>
        </div>
      </div>
    );
  }

  // Use existing QuizComponent if available, otherwise render inline
  if (typeof QuizComponent !== "undefined") {
    return (
      <QuizComponent
        currentLesson={currentLesson}
        quizData={quizData}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
        onSubmit={onSubmit}
        showResult={showResult}
        isCorrect={isCorrect}
        onRetry={onRetry}
        isLoading={isLoading}
        vitalityPoints={vitalityPoints}
        quizAttempts={quizAttempts}
      />
    );
  }

  // Fallback inline quiz component
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz</h2>
      {quizData && (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">{quizData.question}</p>
          <div className="space-y-3">
            {quizData.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? "bg-discovery-gold/10 border-discovery-gold/20 text-discovery-gold"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            )) || (
              <div className="text-gray-500 text-center py-8">
                Loading quiz options...
              </div>
            )}
          </div>

          {!showResult && (
            <button
              onClick={onSubmit}
              disabled={!selectedAnswer || isLoading}
              className="bg-discovery-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Answer"}
            </button>
          )}

          {showResult && (
            <div
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`font-semibold ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "Correct! Well done!" : "Incorrect. Try again!"}
              </p>
              {quizData.explanation && (
                <p className="text-sm text-gray-600 mt-2">
                  {quizData.explanation}
                </p>
              )}
              {!isCorrect && (
                <button
                  onClick={onRetry}
                  className="mt-3 bg-discovery-gold text-white px-4 py-2 rounded-lg hover:bg-discovery-gold/90 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSection;

// hooks/useQuiz.js
import { useState, useCallback } from "react";
import { useLessons } from "./useLessons";

export const useQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchQuizData, checkAnswer } = useLessons();

  const startQuiz = useCallback(
    async (lessonNumber) => {
      setIsLoading(true);
      try {
        const data = await fetchQuizData(lessonNumber);
        setQuizData(data);
        setShowQuiz(true);
        setSelectedAnswer("");
        setShowResult(false);
      } catch (error) {
        console.error("Failed to load quiz:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchQuizData]
  );

  const submitAnswer = useCallback(
    async (lessonNumber, answer) => {
      if (!answer) return false;

      setIsLoading(true);
      try {
        const result = await checkAnswer(lessonNumber, answer);
        setIsCorrect(result.correct);
        setShowResult(true);
        return result;
      } catch (error) {
        console.error("Failed to submit answer:", error);
        return { correct: false };
      } finally {
        setIsLoading(false);
      }
    },
    [checkAnswer]
  );

  const resetQuiz = useCallback(() => {
    setShowQuiz(false);
    setShowResult(false);
    setSelectedAnswer("");
    setQuizData(null);
  }, []);

  return {
    showQuiz,
    quizData,
    selectedAnswer,
    showResult,
    isCorrect,
    isLoading,
    setSelectedAnswer,
    startQuiz,
    submitAnswer,
    resetQuiz,
  };
};

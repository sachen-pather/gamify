// hooks/useLessonProgress.js
import { useState, useCallback } from "react";
import { useLessons } from "./useLessons";

export const useLessonProgress = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [lessonData, setLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { fetchLessonData, isValidLesson } = useLessons();

  const loadLesson = useCallback(
    async (lessonNumber) => {
      if (!isValidLesson(lessonNumber)) {
        setError("Invalid lesson number");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLessonData(lessonNumber);
        setLessonData(data);
      } catch (error) {
        console.error("Failed to load lesson:", error);
        setError("Failed to load lesson. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchLessonData, isValidLesson]
  );

  const completeLesson = useCallback(
    (lessonNumber) => {
      if (!completedLessons.includes(lessonNumber)) {
        setCompletedLessons((prev) => [...prev, lessonNumber]);
      }
    },
    [completedLessons]
  );

  const getProgressPercentage = useCallback(() => {
    return (completedLessons.length / 7) * 100;
  }, [completedLessons]);

  return {
    currentLesson,
    setCurrentLesson,
    completedLessons,
    lessonData,
    isLoading,
    error,
    loadLesson,
    completeLesson,
    getProgressPercentage,
  };
};

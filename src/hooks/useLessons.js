import { lessons, quizzes } from "../data/lessons";

export const useLessons = () => {
  // Simulate network delay for realistic UX (optional)
  const simulateDelay = (ms = 300) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Fetch lesson data (frontend only)
  const fetchLessonData = async (lessonId) => {
    await simulateDelay(500); // Simulate loading time

    const lesson = lessons[lessonId];
    if (!lesson) {
      throw new Error(`Lesson ${lessonId} not found`);
    }

    return lesson;
  };

  // Fetch quiz data (frontend only)
  const fetchQuizData = async (lessonId) => {
    await simulateDelay(300); // Simulate loading time

    const quiz = quizzes[lessonId];
    if (!quiz) {
      throw new Error(`Quiz for lesson ${lessonId} not found`);
    }

    return quiz;
  };

  // Check answer (frontend only)
  const checkAnswer = async (lessonId, userAnswer) => {
    await simulateDelay(200); // Simulate processing time

    const quiz = quizzes[lessonId];
    if (!quiz) {
      throw new Error(`Quiz for lesson ${lessonId} not found`);
    }

    const isCorrect = userAnswer === quiz.correctAnswer;

    return {
      correct: isCorrect,
      message: isCorrect
        ? "Correct! Next lesson available."
        : "Incorrect answer, please try again.",
      nextLesson: isCorrect && lessonId < 7 ? lessonId + 1 : null,
      explanation: quiz.explanation,
    };
  };

  // Get lesson progress
  const getLessonProgress = (completedLessons) => {
    const totalLessons = Object.keys(lessons).length;
    const completedCount = completedLessons.length;
    const percentage = (completedCount / totalLessons) * 100;

    return {
      completed: completedCount,
      total: totalLessons,
      percentage: percentage,
      isComplete: completedCount === totalLessons,
    };
  };

  // Get next available lesson
  const getNextLesson = (completedLessons) => {
    const totalLessons = Object.keys(lessons).length;

    for (let i = 1; i <= totalLessons; i++) {
      if (!completedLessons.includes(i)) {
        return i;
      }
    }

    return null; // All lessons completed
  };

  // Get all lessons
  const getAllLessons = async () => {
    await simulateDelay(200);
    return Object.values(lessons);
  };

  // Validate lesson exists
  const isValidLesson = (lessonId) => {
    return lessonId >= 1 && lessonId <= Object.keys(lessons).length;
  };

  // Get lesson by stage
  const getLessonByStage = async (stage) => {
    const lesson = Object.values(lessons).find((l) => l.stage === stage);
    if (!lesson) {
      throw new Error(`Lesson with stage ${stage} not found`);
    }
    return lesson;
  };

  return {
    fetchLessonData,
    fetchQuizData,
    checkAnswer,
    getLessonProgress,
    getNextLesson,
    getAllLessons,
    isValidLesson,
    getLessonByStage,
  };
};

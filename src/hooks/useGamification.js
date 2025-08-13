// hooks/useGamification.js
import { useState, useEffect, useCallback } from "react";

export const useGamification = () => {
  const [vitalityPoints, setVitalityPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [streakCount, setStreakCount] = useState(0);
  const [lastLearningDate, setLastLearningDate] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState({});
  const [perfectQuizzes, setPerfectQuizzes] = useState([]);

  // Calculate level from Vitality Points
  useEffect(() => {
    const newLevel = Math.floor(vitalityPoints / 100) + 1;
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 4000);
    }
  }, [vitalityPoints, userLevel]);

  const addPoints = useCallback((points) => {
    setVitalityPoints((prev) => prev + points);
  }, []);

  const checkAchievements = useCallback(
    (lessonId, isQuizCorrect, completedLessons) => {
      const newAchievements = [];

      if (lessonId === 1 && !achievements.includes("first_steps")) {
        newAchievements.push({
          id: "first_steps",
          title: "First Steps",
          description: "Completed your first lesson!",
          icon: "🎯",
          points: 25,
        });
      }

      if (
        isQuizCorrect &&
        !quizAttempts[lessonId] &&
        !achievements.includes("quiz_master")
      ) {
        setPerfectQuizzes((prev) => [...prev, lessonId]);
        if (perfectQuizzes.length + 1 >= 3) {
          newAchievements.push({
            id: "quiz_master",
            title: "Quiz Master",
            description: "Got 3 quizzes right on first try!",
            icon: "🧠",
            points: 50,
          });
        }
      }

      if (streakCount >= 3 && !achievements.includes("streak_hero")) {
        newAchievements.push({
          id: "streak_hero",
          title: "Streak Hero",
          description: "Maintained a 3-day learning streak!",
          icon: "🔥",
          points: 35,
        });
      }

      if (
        completedLessons.length + 1 === 7 &&
        !achievements.includes("course_complete")
      ) {
        newAchievements.push({
          id: "course_complete",
          title: "Finance Expert",
          description: "Completed all 7 lessons!",
          icon: "🏆",
          points: 100,
        });
      }

      if (newAchievements.length > 0) {
        const newAchievementIds = newAchievements.map((a) => a.id);
        setAchievements((prev) => [...prev, ...newAchievementIds]);

        setShowAchievement(newAchievements[0]);
        setTimeout(() => setShowAchievement(null), 5000);

        const totalAchievementPoints = newAchievements.reduce(
          (sum, a) => sum + a.points,
          0
        );
        addPoints(totalAchievementPoints);
      }
    },
    [achievements, quizAttempts, perfectQuizzes, streakCount, addPoints]
  );

  const incrementQuizAttempts = useCallback((lessonId) => {
    setQuizAttempts((prev) => ({
      ...prev,
      [lessonId]: (prev[lessonId] || 0) + 1,
    }));
  }, []);

  return {
    vitalityPoints,
    userLevel,
    streakCount,
    lastLearningDate,
    achievements,
    showAchievement,
    showLevelUp,
    quizAttempts,
    perfectQuizzes,
    addPoints,
    checkAchievements,
    incrementQuizAttempts,
    setStreakCount,
    setLastLearningDate,
    setShowLevelUp,
    setShowAchievement,
  };
};

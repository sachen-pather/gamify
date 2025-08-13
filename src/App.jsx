import React, { useState, useEffect, useCallback } from "react";

// Import custom hooks
import { useGamification, useLessonProgress, useQuiz } from "./hooks";

// Import components
import LessonSidebar from "./components/LessonSidebar";
import ContentTabs from "./components/ContentTabs";
import VideoSection from "./components/VideoSection";
import LessonContent from "./components/LessonContent";
import QuizSection from "./components/QuizSection";
import AIChatbot from "./components/AIChatbot";
import AppHeader from "./components/AppHeader";
import {
  NotesSection,
  TranscriptSection,
  LoadingScreen,
} from "./components/ContentSections";

// Import existing components
import AchievementNotification from "./components/AchievementNotification";
import LevelUpModal from "./components/LevelUpModal";

const App = () => {
  // Custom hooks for state management
  const gamification = useGamification();
  const lessonProgress = useLessonProgress();
  const quiz = useQuiz();

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showChatbot, setShowChatbot] = useState(true);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [notes, setNotes] = useState({});

  // Update streak based on learning activity
  useEffect(() => {
    const today = new Date().toDateString();
    if (lessonProgress.completedLessons.length > 0) {
      if (gamification.lastLearningDate) {
        const lastDate = new Date(gamification.lastLearningDate).toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === today) {
          return;
        } else if (lastDate === yesterday.toDateString()) {
          gamification.setStreakCount((prev) => prev + 1);
        } else {
          gamification.setStreakCount(1);
        }
      } else {
        gamification.setStreakCount(1);
      }
      gamification.setLastLearningDate(today);
    }
  }, [lessonProgress.completedLessons.length, gamification.lastLearningDate]);

  // Load lesson data when current lesson changes
  useEffect(() => {
    lessonProgress.loadLesson(lessonProgress.currentLesson);
  }, [lessonProgress.currentLesson, lessonProgress.loadLesson]);

  // Event handlers
  const handleLessonClick = useCallback(
    (lessonNum) => {
      if (!quiz.showQuiz) {
        lessonProgress.setCurrentLesson(lessonNum);
        setActiveTab("overview");
      }
    },
    [quiz.showQuiz, lessonProgress.setCurrentLesson]
  );

  const handleQuizStart = useCallback(async () => {
    await quiz.startQuiz(lessonProgress.currentLesson);
    setActiveTab("quiz");
  }, [quiz.startQuiz, lessonProgress.currentLesson]);

  const handleQuizSubmit = useCallback(async () => {
    if (!quiz.selectedAnswer) {
      alert("Please select an answer before submitting.");
      return;
    }

    gamification.incrementQuizAttempts(lessonProgress.currentLesson);

    const result = await quiz.submitAnswer(
      lessonProgress.currentLesson,
      quiz.selectedAnswer
    );

    if (result.correct) {
      const basePoints = 20;
      const firstAttemptBonus = !gamification.quizAttempts[
        lessonProgress.currentLesson
      ]
        ? 10
        : 0;
      const lessonCompletionPoints = !lessonProgress.completedLessons.includes(
        lessonProgress.currentLesson
      )
        ? 15
        : 0;
      const totalPoints =
        basePoints + firstAttemptBonus + lessonCompletionPoints;

      gamification.addPoints(totalPoints);

      if (
        !lessonProgress.completedLessons.includes(lessonProgress.currentLesson)
      ) {
        lessonProgress.completeLesson(lessonProgress.currentLesson);
      }

      gamification.checkAchievements(
        lessonProgress.currentLesson,
        true,
        lessonProgress.completedLessons
      );

      // Auto-advance to next lesson after delay
      setTimeout(() => {
        if (result.nextLesson && result.nextLesson <= 7) {
          lessonProgress.setCurrentLesson(result.nextLesson);
          quiz.resetQuiz();
          setActiveTab("overview");
        } else {
          quiz.resetQuiz();
          setActiveTab("overview");
        }
      }, 2500);
    } else {
      gamification.checkAchievements(
        lessonProgress.currentLesson,
        false,
        lessonProgress.completedLessons
      );
    }
  }, [
    quiz.selectedAnswer,
    quiz.submitAnswer,
    quiz.resetQuiz,
    gamification.incrementQuizAttempts,
    gamification.quizAttempts,
    gamification.addPoints,
    gamification.checkAchievements,
    lessonProgress.currentLesson,
    lessonProgress.completedLessons,
    lessonProgress.completeLesson,
    lessonProgress.setCurrentLesson,
  ]);

  const handleNotesChange = useCallback((lessonNumber, value) => {
    setNotes((prev) => ({
      ...prev,
      [lessonNumber]: value,
    }));
  }, []);

  // Render content based on active tab
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="p-10">
            <VideoSection
              videoUrl={lessonProgress.lessonData?.video_url}
              expanded={videoExpanded}
              onToggleExpanded={() => setVideoExpanded(!videoExpanded)}
              onQuizStart={handleQuizStart}
              lessonData={lessonProgress.lessonData}
            />
            <LessonContent lessonData={lessonProgress.lessonData} />
          </div>
        );

      case "notes":
        return (
          <div className="p-8">
            <NotesSection
              currentLesson={lessonProgress.currentLesson}
              notes={notes}
              onNotesChange={handleNotesChange}
            />
          </div>
        );

      case "transcript":
        return (
          <div className="p-8">
            <TranscriptSection
              currentLesson={lessonProgress.currentLesson}
              lessonData={lessonProgress.lessonData}
            />
          </div>
        );

      case "quiz":
        return (
          <div className="p-8">
            <QuizSection
              showQuiz={quiz.showQuiz}
              quizData={quiz.quizData}
              selectedAnswer={quiz.selectedAnswer}
              onAnswerSelect={quiz.setSelectedAnswer}
              onSubmit={handleQuizSubmit}
              showResult={quiz.showResult}
              isCorrect={quiz.isCorrect}
              onRetry={quiz.resetQuiz}
              onStartQuiz={handleQuizStart}
              isLoading={quiz.isLoading}
              currentLesson={lessonProgress.currentLesson}
              vitalityPoints={gamification.vitalityPoints}
              quizAttempts={
                gamification.quizAttempts[lessonProgress.currentLesson] || 0
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Show loading screen
  if (lessonProgress.isLoading && !lessonProgress.lessonData) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Achievement Notification */}
      {gamification.showAchievement && (
        <AchievementNotification
          achievement={gamification.showAchievement}
          onClose={() => gamification.setShowAchievement(null)}
        />
      )}

      {/* Level Up Modal */}
      {gamification.showLevelUp && (
        <LevelUpModal
          level={gamification.userLevel}
          onClose={() => gamification.setShowLevelUp(false)}
        />
      )}

      {/* App Header */}
      <AppHeader
        vitalityPoints={gamification.vitalityPoints}
        userLevel={gamification.userLevel}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Left Sidebar */}
        <LessonSidebar
          currentLesson={lessonProgress.currentLesson}
          completedLessons={lessonProgress.completedLessons}
          onLessonClick={handleLessonClick}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          progressPercentage={lessonProgress.getProgressPercentage()}
          vitalityPoints={gamification.vitalityPoints}
          userLevel={gamification.userLevel}
          streakCount={gamification.streakCount}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Content Tabs */}
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {renderActiveTabContent()}
          </div>
        </div>

        {/* AI Chatbot */}
        {showChatbot && (
          <AIChatbot
            show={showChatbot}
            onToggle={() => setShowChatbot(!showChatbot)}
            currentLesson={lessonProgress.currentLesson}
            lessonData={lessonProgress.lessonData}
          />
        )}
      </div>
    </div>
  );
};

export default App;

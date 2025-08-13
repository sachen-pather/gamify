import React, { useState, useEffect, useCallback } from "react";
import { Smartphone, Monitor, MessageCircle } from "lucide-react";

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
import AchievementNotification from "./components/AchievementNotification";
import LevelUpModal from "./components/LevelUpModal";
import MobileLevelUpModal from "./components/MobileLevelUpModal";

// Phone Frame Component
const PhoneFrame = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        <div className="bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
          <div className="bg-black rounded-[2.5rem] p-1">
            <div className="bg-white rounded-[2rem] overflow-hidden w-[375px] h-[812px] relative">
              {children}
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

// Frame Toggle Button Component
const FrameToggleButton = ({ isPhoneFrame, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
        isPhoneFrame
          ? "bg-white text-gray-800 hover:bg-gray-100"
          : "bg-discovery-gold text-white hover:bg-discovery-gold/90"
      }`}
      title={isPhoneFrame ? "Switch to Desktop View" : "Preview in Phone Frame"}
    >
      {isPhoneFrame ? (
        <Monitor className="w-5 h-5" />
      ) : (
        <Smartphone className="w-5 h-5" />
      )}
    </button>
  );
};

// Desktop Chatbot Toggle Button
const DesktopChatToggle = ({ showChatbot, onToggle }) => {
  if (showChatbot) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 bg-discovery-gold text-white p-4 rounded-full shadow-lg hover:bg-discovery-gold/90 transition-all duration-300 hover:scale-110"
      title="Open AI Assistant"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

const App = () => {
  const gamification = useGamification();
  const lessonProgress = useLessonProgress(7);
  const quiz = useQuiz();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showChatbot, setShowChatbot] = useState(false);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [notes, setNotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const actuallyMobile = window.innerWidth < 768;
      setIsMobile(actuallyMobile);
      if (actuallyMobile) {
        setSidebarCollapsed(true);
        setShowChatbot(false);
        setShowMobileSidebar(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPhoneFrame) {
      setShowChatbot(false);
      setShowMobileSidebar(false);
    } else {
      if (!isMobile) {
        setShowChatbot(true);
        setSidebarCollapsed(false);
      }
    }
  }, [isPhoneFrame, isMobile]);

  useEffect(() => {
    lessonProgress.loadLesson(lessonProgress.currentLesson);
  }, [lessonProgress.currentLesson, lessonProgress.loadLesson]);

  const handleLessonClick = useCallback(
    (lessonNum) => {
      if (!quiz.showQuiz) {
        lessonProgress.setCurrentLesson(lessonNum);
        setActiveTab("overview");
        if (isMobile) {
          setShowMobileSidebar(false);
        }
      }
    },
    [quiz.showQuiz, lessonProgress, isMobile]
  );

  const handleQuizStart = useCallback(async () => {
    await quiz.startQuiz(lessonProgress.currentLesson);
    setActiveTab("quiz");
  }, [quiz, lessonProgress.currentLesson]);

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
  }, [quiz, gamification, lessonProgress]);

  const handleNotesChange = useCallback((lessonNumber, value) => {
    setNotes((prev) => ({ ...prev, [lessonNumber]: value }));
  }, []);

  const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);
  const toggleMobileChatbot = () => setShowChatbot(!showChatbot);
  const toggleDesktopChatbot = () => setShowChatbot(!showChatbot);

  const togglePhoneFrame = () => {
    setIsPhoneFrame((prev) => {
      const newFrameState = !prev;
      if (newFrameState) {
        setShowChatbot(false);
        setShowMobileSidebar(false);
        setVideoExpanded(false);
      } else {
        if (!isMobile) {
          setShowChatbot(true);
          setSidebarCollapsed(false);
        }
      }
      return newFrameState;
    });
  };

  const renderActiveTabContent = () => {
    const useMobileLayout = isPhoneFrame || isMobile;
    const commonProps = { isMobile: useMobileLayout, isPhoneFrame };
    const contentPadding = useMobileLayout ? "p-4" : "pt-12 pr-12 pb-12 pl-0";

    return (
      <div className={contentPadding}>
        {activeTab === "overview" && (
          <>
            <VideoSection
              {...commonProps}
              videoUrl={lessonProgress.lessonData?.video_url}
              expanded={videoExpanded}
              onToggleExpanded={() => setVideoExpanded(!videoExpanded)}
              onQuizStart={handleQuizStart}
              lessonData={lessonProgress.lessonData}
            />
            <LessonContent
              {...commonProps}
              lessonData={lessonProgress.lessonData}
            />
          </>
        )}
        {activeTab === "notes" && (
          <NotesSection
            {...commonProps}
            currentLesson={lessonProgress.currentLesson}
            notes={notes}
            onNotesChange={handleNotesChange}
          />
        )}
        {activeTab === "transcript" && (
          <TranscriptSection
            {...commonProps}
            lessonData={lessonProgress.lessonData}
          />
        )}
        {activeTab === "quiz" && (
          <QuizSection
            {...commonProps}
            {...quiz}
            onAnswerSelect={quiz.setSelectedAnswer}
            onSubmit={handleQuizSubmit}
            onRetry={quiz.resetQuiz}
            currentLesson={lessonProgress.currentLesson}
            vitalityPoints={gamification.vitalityPoints}
            quizAttempts={
              gamification.quizAttempts[lessonProgress.currentLesson] || 0
            }
          />
        )}
      </div>
    );
  };

  const renderAppContent = () => {
    const useMobileLayout = isPhoneFrame || isMobile;
    return (
      <div
        className={`${
          isPhoneFrame ? "h-full" : "min-h-screen"
        } bg-gray-50 text-gray-900 relative`}
      >
        {gamification.showAchievement && (
          <AchievementNotification
            achievement={gamification.showAchievement}
            onClose={() => gamification.setShowAchievement(null)}
            isMobile={isMobile}
            isPhoneFrame={isPhoneFrame}
          />
        )}
        {gamification.showLevelUp &&
          (useMobileLayout ? (
            <div
              className={`absolute inset-0 z-50 flex items-center justify-center ${
                isPhoneFrame ? "" : "bg-black bg-opacity-50"
              }`}
            >
              {isPhoneFrame && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[2rem]"></div>
              )}
              <MobileLevelUpModal
                level={gamification.userLevel}
                onClose={() => gamification.setShowLevelUp(false)}
                isPhoneFrame={isPhoneFrame}
              />
            </div>
          ) : (
            <LevelUpModal
              level={gamification.userLevel}
              onClose={() => gamification.setShowLevelUp(false)}
            />
          ))}
        <AppHeader
          {...gamification}
          isMobile={useMobileLayout}
          onToggleSidebar={toggleMobileSidebar}
          onToggleChatbot={toggleMobileChatbot}
          showChatbot={showChatbot}
          isPhoneFrame={isPhoneFrame}
        />
        {useMobileLayout && showMobileSidebar && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 z-40 ${
              isPhoneFrame ? "rounded-[2rem]" : ""
            }`}
            onClick={() => setShowMobileSidebar(false)}
          />
        )}
        <div
          className={`flex ${
            useMobileLayout ? "h-[calc(100%-64px)]" : "h-[calc(100vh-88px)]"
          } relative`}
        >
          {useMobileLayout && showMobileSidebar && (
            <div
              className={`absolute left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                isPhoneFrame ? "rounded-r-[2rem] overflow-hidden" : ""
              }`}
            >
              <LessonSidebar
                currentLesson={lessonProgress.currentLesson}
                completedLessons={lessonProgress.completedLessons}
                onLessonClick={handleLessonClick}
                collapsed={false}
                progressPercentage={lessonProgress.getProgressPercentage()}
                vitalityPoints={gamification.vitalityPoints}
                userLevel={gamification.userLevel}
                streakCount={gamification.streakCount}
                isMobile={useMobileLayout}
                isPhoneFrame={isPhoneFrame}
              />
            </div>
          )}
          {!useMobileLayout && (
            <div className="flex-shrink-0">
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
                isMobile={useMobileLayout}
                isPhoneFrame={isPhoneFrame}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <ContentTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isMobile={useMobileLayout}
              isPhoneFrame={isPhoneFrame}
            />
            <div className="flex-1 overflow-y-auto bg-gray-50 relative">
              {renderActiveTabContent()}
            </div>
          </div>
          {!useMobileLayout && showChatbot && (
            <div className="flex-shrink-0">
              <AIChatbot
                show={showChatbot}
                onToggle={toggleDesktopChatbot}
                currentLesson={lessonProgress.currentLesson}
                lessonData={lessonProgress.lessonData}
                isMobile={false}
                isPhoneFrame={false}
              />
            </div>
          )}
        </div>

        {/* --- FIX APPLIED HERE --- */}
        {/* This block now correctly uses `fixed` for mobile and `absolute` for the phone frame */}
        {(isMobile || isPhoneFrame) && showChatbot && (
          <div
            className={`${
              isPhoneFrame
                ? "absolute" // Correctly contained within the phone frame
                : "fixed" // Correctly overlays the entire mobile viewport
            } inset-0 z-50 flex flex-col justify-end bg-black bg-opacity-40 p-4`}
          >
            <AIChatbot
              show={showChatbot}
              onToggle={toggleMobileChatbot}
              currentLesson={lessonProgress.currentLesson}
              lessonData={lessonProgress.lessonData}
              isMobile={useMobileLayout}
              isPhoneFrame={isPhoneFrame}
            />
          </div>
        )}

        {useMobileLayout && !showChatbot && (
          <button
            onClick={toggleMobileChatbot}
            className={`${
              isPhoneFrame
                ? "absolute bottom-6 right-6"
                : "fixed bottom-6 right-6"
            } z-40 bg-discovery-gold text-white p-4 rounded-full shadow-lg hover:scale-110`}
            title="Open AI Assistant"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
        {!useMobileLayout && (
          <DesktopChatToggle
            showChatbot={showChatbot}
            onToggle={toggleDesktopChatbot}
          />
        )}
      </div>
    );
  };

  if (lessonProgress.isLoading && !lessonProgress.lessonData) {
    return isPhoneFrame ? (
      <PhoneFrame>
        <LoadingScreen />
      </PhoneFrame>
    ) : (
      <LoadingScreen />
    );
  }

  return (
    <>
      <FrameToggleButton
        isPhoneFrame={isPhoneFrame}
        onToggle={togglePhoneFrame}
      />
      {isPhoneFrame ? (
        <PhoneFrame>{renderAppContent()}</PhoneFrame>
      ) : (
        renderAppContent()
      )}
    </>
  );
};

export default App;

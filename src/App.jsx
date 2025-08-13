import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  Target,
  Star,
  Trophy,
  Zap,
  Flame,
  TrendingUp,
  Clock,
  Brain,
  MessageCircle,
  Send,
  Bot,
  FileText,
  Download,
  Bookmark,
  Share2,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  Lightbulb,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  Pause,
  SkipForward,
  Cpu,
  Wand2,
} from "lucide-react";

// Import your existing components and hooks
import LessonCard from "./components/LessonCard";
import QuizComponent from "./components/QuizComponent";
import ProgressBar from "./components/ProgressBar";
import VideoPlayer from "./components/VideoPlayer";
import VitalityCard from "./components/VitalityCard";
import AchievementNotification from "./components/AchievementNotification";
import LevelUpModal from "./components/LevelUpModal";
import { useLessons } from "./hooks/useLessons";
import { lessons } from "./data/lessons";

// Custom hooks for better state management
const useGamification = () => {
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

const useLessonProgress = () => {
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

const useQuiz = () => {
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

// Components
const LessonSidebar = ({
  currentLesson,
  completedLessons,
  onLessonClick,
  collapsed,
  onToggleCollapse,
  progressPercentage,
  vitalityPoints,
  userLevel,
  streakCount,
}) => (
  <div
    className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? "w-16" : "w-72"
    } flex flex-col shadow-sm`}
  >
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">
              Financial Literacy Academy
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              {completedLessons.length}/7 lessons completed
            </p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>

    {!collapsed && (
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 text-xs">Course Progress</span>
          <span className="text-discovery-gold text-xs font-semibold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    )}

    <div className="flex-1 overflow-y-auto bg-gray-50">
      {!collapsed && (
        <div className="p-2">
          {Object.entries(lessons).map(([lessonNum, lesson]) => {
            const num = parseInt(lessonNum);
            const isActive = currentLesson === num;
            const isCompleted = completedLessons.includes(num);
            const isLocked = num > 1 && !completedLessons.includes(num - 1);

            return (
              <div
                key={num}
                onClick={() => !isLocked && onLessonClick(num)}
                className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                  isActive
                    ? "bg-gradient-to-r from-discovery-gold/15 to-discovery-blue/15 border border-discovery-gold/40 shadow-sm"
                    : isCompleted
                    ? "bg-white border border-green-200 hover:shadow-sm"
                    : isLocked
                    ? "bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed"
                    : "bg-white border border-gray-200 hover:shadow-sm hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isActive
                          ? "bg-discovery-gold text-white"
                          : isCompleted
                          ? "bg-green-600 text-white"
                          : isLocked
                          ? "bg-gray-300 text-gray-500"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : num}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-discovery-gold"
                            : isCompleted
                            ? "text-green-700"
                            : isLocked
                            ? "text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {lesson.title}
                      </div>
                      <div
                        className={`text-xs ${
                          isLocked ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                  {isCompleted && (
                    <Award className="w-4 h-4 text-discovery-gold" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {!collapsed && (
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-r from-discovery-gold/10 to-discovery-blue/10 rounded-lg p-2 text-center border border-discovery-gold/20">
            <div className="flex items-center justify-center space-x-1">
              <Zap className="w-3 h-3 text-discovery-gold" />
              <span className="text-xs font-semibold text-discovery-gold">
                L{userLevel}
              </span>
            </div>
            <div className="text-xs text-gray-600">{vitalityPoints} VP</div>
          </div>
          <div className="bg-gradient-to-r from-discovery-blue/10 to-discovery-gold/10 rounded-lg p-2 text-center border border-discovery-blue/20">
            <div className="flex items-center justify-center space-x-1">
              <Flame className="w-3 h-3 text-discovery-blue" />
              <span className="text-xs font-semibold text-discovery-blue">
                {streakCount}
              </span>
            </div>
            <div className="text-xs text-gray-600">Streak</div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const ContentTabs = ({ activeTab, onTabChange }) => (
  <div className="bg-white border-b border-gray-200 shadow-sm">
    <div className="flex space-x-8 px-8">
      {[
        { id: "overview", label: "Overview", icon: BookOpen },
        { id: "notes", label: "Notes", icon: FileText },
        { id: "transcript", label: "Transcript", icon: MessageCircle },
        { id: "quiz", label: "Quiz", icon: Brain },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 py-4 border-b-2 transition-colors font-medium ${
            activeTab === tab.id
              ? "border-discovery-gold text-discovery-gold"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span className="text-sm">{tab.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const EnhancedVideoPlayer = ({
  videoUrl,
  expanded,
  onToggleExpanded,
  onQuizStart,
}) => (
  <div className="mb-6">
    <div
      className="bg-black rounded-xl overflow-hidden shadow-2xl"
      style={{ aspectRatio: expanded ? "16/9" : "28/9" }}
    >
      {videoUrl ? (
        <VideoPlayer videoUrl={videoUrl} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-center">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <p className="text-lg">Video Player</p>
            <p className="text-sm opacity-60 mt-2">Loading lesson video...</p>
          </div>
        </div>
      )}
    </div>

    <div className="bg-white rounded-b-xl border border-gray-200 border-t-0 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={onQuizStart}
            className="bg-discovery-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-discovery-gold/90 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Brain className="w-5 h-5" />
            <span>Take Quiz</span>
          </button>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="font-medium">15 min</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm">HD Quality</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm">Interactive Content</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-discovery-gold/10 text-discovery-gold px-4 py-2 rounded-lg font-bold flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>+45 VP Available</span>
          </div>
          <button
            onClick={onToggleExpanded}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LessonContent = ({ lessonData }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {lessonData?.title}
      </h2>
      <p className="text-gray-700 leading-relaxed text-lg">
        {lessonData?.summary}
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-discovery-blue mb-4 flex items-center">
          <Target className="w-6 h-6 mr-3 text-discovery-gold" />
          Learning Objectives
        </h3>
        <ul className="space-y-3">
          {lessonData?.objectives?.map((objective, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <CheckCircle className="w-5 h-5 mr-3 text-discovery-gold mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-discovery-blue mb-4 flex items-center">
          <Star className="w-6 h-6 mr-3 text-discovery-gold" />
          Key Terms
        </h3>
        <div className="flex flex-wrap gap-3">
          {lessonData?.keyTerms?.map((term, index) => (
            <span
              key={index}
              className="bg-discovery-gold/10 text-discovery-gold border border-discovery-gold/20 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EnhancedQuizSection = ({
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
            {quizData.options.map((option, index) => (
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
            ))}
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

const AIChatbot = ({ show, onToggle, currentLesson, lessonData }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message:
        "Hi! I'm your AI learning assistant. I can help you with lesson summaries, answer questions, and provide study tips. What would you like to explore?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [show]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const message = chatInput.trim();
      if (!message) return;

      const userMessage = {
        id: Date.now(),
        type: "user",
        message,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setChatInput("");
      setIsTyping(true);

      // Enhanced contextual responses
      setTimeout(() => {
        const contextualResponses = [
          `Great question about **${
            lessonData?.title || "this lesson"
          }**! 🎯\n\nBased on Lesson ${currentLesson}, here's what you need to know about ${
            lessonData?.keyTerms?.[0] || "this concept"
          }:\n\n**Key Insight:** ${lessonData?.summary?.substring(
            0,
            120
          )}...\n\n**Practical Application:** This concept is crucial for ${
            lessonData?.objectives?.[0]?.toLowerCase() ||
            "building financial knowledge"
          }.\n\n**Next Steps:** Focus on understanding how this applies to your personal financial goals. Would you like me to explain any specific aspect in more detail?`,

          `Excellent question! 💡 Let me break this down for you:\n\n**Core Concept:** ${
            lessonData?.keyTerms?.[1] || "Financial planning"
          } is fundamental because it ${
            lessonData?.objectives?.[1]?.toLowerCase() ||
            "helps you make informed decisions"
          }.\n\n**Real-World Example:** Think about how this applies when you're making everyday financial choices.\n\n**Pro Tip:** The key takeaway from this lesson is ${
            lessonData?.keyTerms?.[0] || "understanding the basics"
          }. This builds the foundation for more advanced concepts.\n\nWould you like me to provide a specific example or dive deeper into any aspect?`,
        ];

        const aiMessage = {
          id: Date.now() + 1,
          type: "ai",
          message:
            contextualResponses[
              Math.floor(Math.random() * contextualResponses.length)
            ],
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    },
    [chatInput, lessonData, currentLesson]
  );

  const generateSummary = useCallback(() => {
    setAiThinking(true);
    const summaryMessage = {
      id: Date.now(),
      type: "ai",
      message: `📚 **Lesson ${currentLesson} Summary**\n\n**Title:** ${
        lessonData?.title
      }\n**Duration:** ${lessonData?.duration}\n\n**Key Objectives:**\n${
        lessonData?.objectives
          ?.map((obj, i) => `${i + 1}. ${obj}`)
          .join("\n") || "• Master fundamental concepts"
      }\n\n**Essential Terms:**\n${
        lessonData?.keyTerms?.map((term) => `• **${term}**`).join("\n") ||
        "• Financial Basics"
      }\n\n**Overview:** ${
        lessonData?.summary
      }\n\nReady to dive deeper? Just ask! 🚀`,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, summaryMessage]);
    setAiThinking(false);
  }, [currentLesson, lessonData]);

  if (!show) return null;

  return (
    <div className="bg-white border-l border-gray-200 w-96 flex flex-col shadow-xl">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-discovery-blue to-discovery-gold">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center">
                AI Learning Assistant
                <Sparkles className="w-4 h-4 ml-1" />
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white/90 text-xs">Ready to help</p>
              </div>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={generateSummary}
            disabled={aiThinking}
            className="bg-discovery-blue/10 text-discovery-blue text-xs px-3 py-2 rounded-lg hover:bg-discovery-blue/20 transition-colors flex items-center justify-center space-x-1 font-medium border border-discovery-blue/20 disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3" />
            <span>AI Summary</span>
          </button>
          <button
            onClick={() => {
              const tipMessage = {
                id: Date.now(),
                type: "ai",
                message: `💡 **Study Tip for Lesson ${currentLesson}:**\n\nFocus on understanding ${
                  lessonData?.keyTerms?.[0] || "the key concepts"
                } and how they apply to real-world situations. This will help you excel in both the quiz and practical applications!`,
                timestamp: new Date(),
              };
              setChatMessages((prev) => [...prev, tipMessage]);
            }}
            className="bg-discovery-gold/10 text-discovery-gold text-xs px-3 py-2 rounded-lg hover:bg-discovery-gold/20 transition-colors flex items-center justify-center space-x-1 font-medium border border-discovery-gold/20"
          >
            <Lightbulb className="w-3 h-3" />
            <span>Study Tips</span>
          </button>
        </div>

        {aiThinking && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-discovery-blue text-xs">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-discovery-blue rounded-full animate-bounce"></div>
              <div
                className="w-1 h-1 bg-discovery-blue rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-1 bg-discovery-blue rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="font-medium">AI is thinking...</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                message.type === "user"
                  ? "bg-discovery-blue text-white rounded-br-md"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
              }`}
            >
              {message.type === "ai" && (
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="w-4 h-4 text-discovery-blue" />
                  <span className="text-discovery-blue font-semibold text-xs">
                    AI Assistant
                  </span>
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.message}
              </div>
              <div
                className={`text-xs mt-2 ${
                  message.type === "user" ? "text-white/70" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 p-4 rounded-2xl rounded-bl-md text-sm shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu className="w-4 h-4 text-discovery-blue" />
                <span className="text-discovery-blue font-semibold text-xs">
                  AI Assistant
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything about this lesson..."
              className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-xl border border-gray-200 focus:border-discovery-gold focus:outline-none text-sm focus:bg-white transition-colors"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isTyping}
              className="bg-discovery-gold text-white px-4 py-3 rounded-xl hover:bg-discovery-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Powered by advanced AI</span>
          </div>
        </form>
      </div>
    </div>
  );
};

const NotesSection = ({ currentLesson, notes, onNotesChange }) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Lesson Notes</h2>
    <textarea
      value={notes[currentLesson] || ""}
      onChange={(e) => onNotesChange(currentLesson, e.target.value)}
      placeholder="Take notes about this lesson..."
      className="w-full h-80 bg-gray-50 text-gray-900 placeholder-gray-500 p-6 rounded-lg border border-gray-200 focus:border-discovery-gold focus:outline-none resize-none text-lg leading-relaxed"
    />
    <div className="mt-6 flex justify-between items-center">
      <span className="text-gray-500 text-sm">
        Auto-saved • Last updated just now
      </span>
      <button className="bg-discovery-blue text-white px-6 py-3 rounded-lg hover:bg-discovery-blue/90 transition-colors flex items-center space-x-2 font-semibold">
        <Download className="w-4 h-4" />
        <span>Export Notes</span>
      </button>
    </div>
  </div>
);

const TranscriptSection = ({ currentLesson, lessonData }) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Transcript</h2>
    <div className="space-y-6 text-gray-700 leading-relaxed">
      <div className="flex space-x-4">
        <span className="text-discovery-blue font-mono text-sm min-w-[60px]">
          [00:00]
        </span>
        <p>
          Welcome to Lesson {currentLesson}: {lessonData?.title}
        </p>
      </div>
      <div className="flex space-x-4">
        <span className="text-discovery-blue font-mono text-sm min-w-[60px]">
          [00:15]
        </span>
        <p>
          In this lesson, we'll explore{" "}
          {lessonData?.keyTerms?.[0] || "financial concepts"} and how they apply
          to your personal financial journey.
        </p>
      </div>
      <div className="flex space-x-4">
        <span className="text-discovery-blue font-mono text-sm min-w-[60px]">
          [00:30]
        </span>
        <p>{lessonData?.summary}</p>
      </div>
      <div className="flex space-x-4">
        <span className="text-discovery-blue font-mono text-sm min-w-[60px]">
          [01:00]
        </span>
        <p>Let's start by understanding the key objectives...</p>
      </div>
      <div className="bg-discovery-gold/10 border border-discovery-gold/20 rounded-lg p-6 mt-8">
        <p className="text-discovery-gold font-semibold flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Full interactive transcript available after video completion
        </p>
        <p className="text-discovery-gold/80 text-sm mt-2">
          Complete the lesson to unlock searchable transcript with timestamps
        </p>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  // Custom hooks
  const gamification = useGamification();
  const lessonProgress = useLessonProgress();
  const quiz = useQuiz();

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showChatbot, setShowChatbot] = useState(true);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [notes, setNotes] = useState({});
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message:
        "Hi! I'm your AI learning assistant powered by advanced language models. I can help summarize lessons, answer questions, provide insights, and guide you through financial concepts. What would you like to explore?",
      timestamp: new Date(),
    },
  ]);

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

  // Handle lesson click
  const handleLessonClick = useCallback(
    (lessonNum) => {
      if (!quiz.showQuiz) {
        lessonProgress.setCurrentLesson(lessonNum);
        setActiveTab("overview");
      }
    },
    [quiz.showQuiz, lessonProgress.setCurrentLesson]
  );

  // Handle quiz start
  const handleQuizStart = useCallback(async () => {
    await quiz.startQuiz(lessonProgress.currentLesson);
    setActiveTab("quiz");
  }, [quiz.startQuiz, lessonProgress.currentLesson]);

  // Handle quiz submission
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

      // Add AI congratulation message
      const congratsMessage = {
        id: Date.now(),
        type: "ai",
        message: `🎉 Outstanding work! You've mastered Lesson ${
          lessonProgress.currentLesson
        } and earned ${totalPoints} Vitality Points. Your understanding of ${
          lessonProgress.lessonData?.keyTerms?.[0] || "financial concepts"
        } is excellent! ${
          result.nextLesson
            ? "Ready to tackle the next challenge?"
            : "You've completed the entire course - congratulations on becoming a financial literacy expert!"
        }`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, congratsMessage]);

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
    lessonProgress.lessonData,
  ]);

  // Handle notes change
  const handleNotesChange = useCallback((lessonNumber, value) => {
    setNotes((prev) => ({
      ...prev,
      [lessonNumber]: value,
    }));
  }, []);

  // Loading screen
  if (lessonProgress.isLoading && !lessonProgress.lessonData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-discovery-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-discovery-blue text-xl font-bold">
            Loading Financial Learning Platform
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Preparing your personalized learning experience...
          </p>
        </div>
      </div>
    );
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

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-discovery-gold to-discovery-blue rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Financial Literacy Academy
                  </h1>
                  <p className="text-discovery-blue text-sm font-medium">
                    Professional Development Course
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2 border border-gray-200">
                <Zap className="w-5 h-5 text-discovery-gold" />
                <span className="text-discovery-gold font-bold text-lg">
                  {gamification.vitalityPoints}
                </span>
                <span className="text-gray-600 text-sm">
                  VP • Level {gamification.userLevel}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Bookmark className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
                <Share2 className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
                <Settings className="w-6 h-6 text-gray-500 hover:text-discovery-gold cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

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

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 overflow-y-auto bg-gray-50">
            {activeTab === "overview" && (
              <div className="p-10">
                <EnhancedVideoPlayer
                  videoUrl={lessonProgress.lessonData?.video_url}
                  expanded={videoExpanded}
                  onToggleExpanded={() => setVideoExpanded(!videoExpanded)}
                  onQuizStart={handleQuizStart}
                />
                <LessonContent lessonData={lessonProgress.lessonData} />
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-8">
                <NotesSection
                  currentLesson={lessonProgress.currentLesson}
                  notes={notes}
                  onNotesChange={handleNotesChange}
                />
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="p-8">
                <TranscriptSection
                  currentLesson={lessonProgress.currentLesson}
                  lessonData={lessonProgress.lessonData}
                />
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="p-8">
                <EnhancedQuizSection
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
            )}
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

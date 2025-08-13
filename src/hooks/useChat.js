// hooks/useChat.js
import { useState, useRef, useEffect, useCallback } from "react";

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message:
        "Hi! I'm your AI learning assistant powered by advanced language models. I can help summarize lessons, answer questions, provide insights, and guide you through financial concepts. What would you like to explore?",
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

  const addMessage = useCallback((message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const generateContextualResponse = useCallback(
    (userMessage, lessonData, currentLesson) => {
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

      return contextualResponses[
        Math.floor(Math.random() * contextualResponses.length)
      ];
    },
    []
  );

  const generateSummary = useCallback((currentLesson, lessonData) => {
    return `📚 **Lesson ${currentLesson} Summary**\n\n**Title:** ${
      lessonData?.title
    }\n**Duration:** ${lessonData?.duration}\n\n**Key Objectives:**\n${
      lessonData?.objectives?.map((obj, i) => `${i + 1}. ${obj}`).join("\n") ||
      "• Master fundamental concepts"
    }\n\n**Essential Terms:**\n${
      lessonData?.keyTerms?.map((term) => `• **${term}**`).join("\n") ||
      "• Financial Basics"
    }\n\n**Overview:** ${
      lessonData?.summary
    }\n\nReady to dive deeper? Just ask! 🚀`;
  }, []);

  const generateStudyTip = useCallback((currentLesson, lessonData) => {
    return `💡 **Study Tip for Lesson ${currentLesson}:**\n\nFocus on understanding ${
      lessonData?.keyTerms?.[0] || "the key concepts"
    } and how they apply to real-world situations. This will help you excel in both the quiz and practical applications!`;
  }, []);

  return {
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    isTyping,
    setIsTyping,
    aiThinking,
    setAiThinking,
    chatEndRef,
    inputRef,
    addMessage,
    generateContextualResponse,
    generateSummary,
    generateStudyTip,
  };
};

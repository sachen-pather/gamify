import React, { useEffect } from "react";
import { X, Cpu, Sparkles, Send, Wand2, Lightbulb } from "lucide-react";
import { useChat } from "../hooks";

const AIChatbot = ({ show, onToggle, currentLesson, lessonData }) => {
  const {
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
    generateContextualResponse,
    generateSummary,
    generateStudyTip,
  } = useChat();

  // Focus input when chat is opened
  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [show]);

  const handleSubmit = async (e) => {
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

    // Simulate AI response with contextual content
    setTimeout(() => {
      const aiResponse = generateContextualResponse(
        message,
        lessonData,
        currentLesson
      );
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        message: aiResponse,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleGenerateSummary = () => {
    setAiThinking(true);
    const summaryMessage = {
      id: Date.now(),
      type: "ai",
      message: generateSummary(currentLesson, lessonData),
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, summaryMessage]);
    setAiThinking(false);
  };

  const handleGenerateStudyTip = () => {
    const tipMessage = {
      id: Date.now(),
      type: "ai",
      message: generateStudyTip(currentLesson, lessonData),
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, tipMessage]);
  };

  if (!show) return null;

  return (
    <div className="bg-white border-l border-gray-200 w-96 flex flex-col shadow-xl">
      {/* Header */}
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

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleGenerateSummary}
            disabled={aiThinking}
            className="bg-discovery-blue/10 text-discovery-blue text-xs px-3 py-2 rounded-lg hover:bg-discovery-blue/20 transition-colors flex items-center justify-center space-x-1 font-medium border border-discovery-blue/20 disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3" />
            <span>AI Summary</span>
          </button>
          <button
            onClick={handleGenerateStudyTip}
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

      {/* Chat Messages */}
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

      {/* Chat Input */}
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

export default AIChatbot;

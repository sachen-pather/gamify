import React, { useState, useEffect, useRef } from "react";
import { X, Cpu, Sparkles, Send, Wand2, Lightbulb } from "lucide-react";

// This component now correctly handles BOTH mobile/popup and desktop/sidebar views.
const AIChatbot = ({
  show,
  onToggle,
  currentLesson,
  lessonData,
  isMobile,
  isPhoneFrame,
}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // This flag correctly determines which layout to use.
  const useMobileLayout = isMobile || isPhoneFrame;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [show]);

  const getSystemPrompt = () => {
    return `You are a helpful AI learning assistant for the current lesson: "${
      lessonData?.title || "Personal Finance"
    }". Base your responses on the lesson content: ${
      lessonData?.content || "General personal finance principles"
    }. Keep responses concise (50-80 words), educational, and relevant. Do not use bold formatting or emojis, except for currency or % symbols.`;
  };

  const sendMessageToGroq = async (messages) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return "Error: API key is missing.";

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
              { role: "system", content: getSystemPrompt() },
              ...messages,
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      return `Sorry, an error occurred: "${error.message}".`;
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const message = chatInput.trim();
    if (!message || isTyping || aiThinking) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      message,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    const historyMessages = chatMessages.map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.message,
    }));
    const aiResponse = await sendMessageToGroq([
      ...historyMessages,
      { role: "user", content: message },
    ]);

    const aiMessage = {
      id: Date.now() + 1,
      type: "ai",
      message: aiResponse,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleGenerateAction = async (prompt) => {
    if (isTyping || aiThinking) return;
    setAiThinking(true);
    const aiResponse = await sendMessageToGroq([
      { role: "user", content: prompt },
    ]);
    const aiMessage = {
      id: Date.now(),
      type: "ai",
      message: aiResponse,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, aiMessage]);
    setAiThinking(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isTyping && !aiThinking) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!show) return null;

  // --- MOBILE LAYOUT: Using YOUR proven layout ---
  if (useMobileLayout) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col max-h-[450px]">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-discovery-gold to-discovery-blue text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">AI Learning Assistant</h3>
              <p className="text-xs text-white/90">Ready to help</p>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:text-white/80"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <div className="w-12 h-12 bg-discovery-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Cpu className="w-6 h-6 text-discovery-gold" />
              </div>
              <p className="text-sm font-semibold">
                Hi, I'm your AI assistant!
              </p>
              <p className="text-xs mt-1">Ask me anything about this lesson.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                      message.type === "user"
                        ? "bg-discovery-blue text-white rounded-br-lg"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-lg"
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isTyping}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-discovery-gold focus:border-transparent disabled:bg-gray-100"
            />
            <button
              onClick={handleSubmit}
              disabled={isTyping || !chatInput.trim()}
              className="p-2.5 bg-discovery-gold text-white rounded-full hover:bg-discovery-gold/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- DESKTOP LAYOUT: SIDEBAR PANEL ---
  return (
    <div className="bg-white border-l border-gray-200 flex flex-col shadow-lg w-96 h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gradient-to-r from-discovery-gold to-discovery-blue">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center">
                AI Learning Assistant <Sparkles className="w-3 h-3 ml-1" />
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white/90 text-xs">Ready to help</p>
              </div>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              handleGenerateAction(
                "Provide a concise summary of the key points from the current lesson."
              )
            }
            disabled={aiThinking || isTyping}
            className="bg-discovery-blue/10 text-discovery-blue text-xs px-3 py-2 rounded-lg hover:bg-discovery-blue/20 flex items-center justify-center space-x-1 font-medium border border-discovery-blue/20 disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3" />
            <span>AI Summary</span>
          </button>
          <button
            onClick={() =>
              handleGenerateAction(
                "Provide a useful study tip related to the current lesson."
              )
            }
            disabled={aiThinking || isTyping}
            className="bg-discovery-gold/10 text-discovery-gold text-xs px-3 py-2 rounded-lg hover:bg-discovery-gold/20 transition-colors flex items-center justify-center space-x-1 font-medium border border-discovery-gold/20 disabled:opacity-50"
          >
            <Lightbulb className="w-3 h-3" />
            <span>Study Tips</span>
          </button>
        </div>
        {(aiThinking || isTyping) && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-discovery-blue text-xs">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-discovery-blue rounded-full animate-bounce"></div>
              <div
                className="w-1.5 h-1.5 bg-discovery-blue rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-discovery-blue rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="font-medium">AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
        <div className="p-3 space-y-3">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <div className="w-12 h-12 bg-discovery-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-6 h-6 text-discovery-gold" />
              </div>
              <p className="text-sm font-medium mb-2">
                Hi! I'm your AI assistant
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Ask me anything about this lesson!
              </p>
            </div>
          ) : (
            chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    message.type === "user"
                      ? "bg-discovery-blue text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </div>
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 bg-white border rounded-2xl shadow-sm">
                ...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded-xl border border-transparent focus:border-discovery-gold focus:outline-none"
            disabled={isTyping || aiThinking}
          />
          <button
            onClick={handleSubmit}
            disabled={!chatInput.trim() || isTyping || aiThinking}
            className="bg-discovery-gold text-white px-3 py-2 rounded-xl hover:bg-discovery-gold/90 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;

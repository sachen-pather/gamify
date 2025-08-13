import React from "react";
import { BookOpen, FileText, MessageCircle, Brain } from "lucide-react";

const ContentTabs = ({ activeTab, onTabChange, isMobile, isPhoneFrame }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen, shortLabel: "Learn" },
    { id: "notes", label: "Notes", icon: FileText, shortLabel: "Notes" },
    {
      id: "transcript",
      label: "Transcript",
      icon: MessageCircle,
      shortLabel: "Text",
    },
    { id: "quiz", label: "Quiz", icon: Brain, shortLabel: "Quiz" },
  ];

  // Force mobile layout in phone frame
  const useMobileLayout = isMobile || isPhoneFrame;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div
        className={`flex ${
          useMobileLayout ? "justify-around" : "space-x-8 px-8"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center ${
              useMobileLayout
                ? "flex-col space-y-1 py-3 px-2"
                : "space-x-2 py-4"
            } border-b-2 transition-colors font-medium ${
              activeTab === tab.id
                ? "border-discovery-gold text-discovery-gold"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            <tab.icon
              className={`${useMobileLayout ? "w-5 h-5" : "w-4 h-4"}`}
            />
            <span className={`${useMobileLayout ? "text-xs" : "text-sm"}`}>
              {useMobileLayout ? tab.shortLabel : tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTabs;

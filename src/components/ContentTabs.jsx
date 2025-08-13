import React from "react";
import { BookOpen, FileText, MessageCircle, Brain } from "lucide-react";

const ContentTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "transcript", label: "Transcript", icon: MessageCircle },
    { id: "quiz", label: "Quiz", icon: Brain },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex space-x-8 px-8">
        {tabs.map((tab) => (
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
};

export default ContentTabs;

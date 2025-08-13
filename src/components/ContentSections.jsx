import React from "react";
import { Download, Search } from "lucide-react";

// Notes Section Component
export const NotesSection = ({ currentLesson, notes, onNotesChange }) => (
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

// Transcript Section Component
export const TranscriptSection = ({ currentLesson, lessonData }) => (
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

// Loading Component
export const LoadingScreen = () => (
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

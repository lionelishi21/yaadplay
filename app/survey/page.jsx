'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';

export default function SurveyPage() {
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [surveyData, setSurveyData] = useState({
    consolesOwned: [],
    importantFactors: [],
    playFrequency: '',
    gameTypes: [],
    ps5Features: [],
    infoSources: [],
    purchaseReason: '',
    purchaseType: '',
    ageRange: '',
    gamerType: '',
  });

  const isStepValid = (step, data) => {
    switch (step) {
      case 0: return data.consolesOwned.length > 0;
      case 1: return data.importantFactors.length > 0;
      case 2: return data.playFrequency !== '';
      case 3: return data.gameTypes.length > 0;
      case 4: return data.ps5Features.length > 0;
      case 5: return data.infoSources.length > 0;
      case 6: return data.purchaseReason !== '';
      case 7: return data.purchaseType !== '';
      case 8: return data.ageRange !== '';
      case 9: return data.gamerType !== '';
      default: return false;
    }
  };

  const handleSurveySubmit = async () => {
    // Replace this URL with your Make.com webhook URL
    const MAKE_WEBHOOK_URL = 'YOUR_MAKE_COM_WEBHOOK_URL_HERE';
    
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...surveyData,
          timestamp: new Date().toISOString(),
          source: 'YaadPlay Gaming Survey',
        }),
      });
      
      if (response.ok) {
        setSurveySubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Unable to submit survey. Please check your connection.');
    }
  };

  const handleNext = () => {
    if (surveyStep < 9) {
      setSurveyStep(surveyStep + 1);
    } else {
      handleSurveySubmit();
    }
  };

  const handleOptionClick = (question, option) => {
    if (question.type === "multi") {
      const currentValues = surveyData[question.field] || [];
      if (currentValues.includes(option)) {
        setSurveyData(prev => ({
          ...prev,
          [question.field]: currentValues.filter(item => item !== option)
        }));
      } else {
        setSurveyData(prev => ({
          ...prev,
          [question.field]: [...currentValues, option]
        }));
      }
    } else {
      setSurveyData(prev => ({
        ...prev,
        [question.field]: option
      }));
      // Auto-advance for single-select questions after a short delay
      setTimeout(() => {
        if (surveyStep < 9) {
          handleNext();
        }
      }, 300);
    }
  };

  const questions = [
    {
      title: "Which gaming consoles do you currently own or have you owned in the past?",
      subtitle: "Select all that apply",
      type: "multi",
      field: "consolesOwned",
      options: [
        "PlayStation 5",
        "PlayStation 4",
        "Xbox Series X/S",
        "Xbox One",
        "Nintendo Switch",
        "Nintendo Wii U",
        "PC Gaming",
        "Mobile Gaming",
        "None of the above"
      ]
    },
    {
      title: "What factors are most important to you when choosing a new gaming console?",
      subtitle: "Select all that apply",
      type: "multi",
      field: "importantFactors",
      options: [
        "Graphics Quality",
        "Exclusive Games",
        "Price",
        "Online Features",
        "Community/Player Base",
        "Backward Compatibility",
        "Controller Design",
        "Performance/Speed",
        "Brand Preference"
      ]
    },
    {
      title: "How often do you play video games?",
      subtitle: "Select one option",
      type: "single",
      field: "playFrequency",
      options: [
        "Daily",
        "Several times a week",
        "Weekly",
        "Monthly",
        "Rarely"
      ]
    },
    {
      title: "What types of games do you enjoy playing the most?",
      subtitle: "Select all that apply",
      type: "multi",
      field: "gameTypes",
      options: [
        "Action",
        "RPG (Role-Playing Games)",
        "Sports",
        "Adventure",
        "Multiplayer",
        "Story-driven",
        "Racing",
        "Fighting",
        "Strategy",
        "Puzzle"
      ]
    },
    {
      title: "What features of the PlayStation 5 are you most aware of or interested in?",
      subtitle: "Select all that apply",
      type: "multi",
      field: "ps5Features",
      options: [
        "Fast Loading (SSD)",
        "DualSense Controller",
        "3D Audio",
        "Exclusive Titles",
        "8K Support",
        "Ray Tracing",
        "Backward Compatibility",
        "PlayStation Plus",
        "Not sure"
      ]
    },
    {
      title: "Where do you typically get your information about new gaming consoles or games?",
      subtitle: "Select all that apply",
      type: "multi",
      field: "infoSources",
      options: [
        "Social Media",
        "Gaming Websites",
        "YouTube",
        "Friends/Family",
        "TV Ads",
        "Gaming Forums",
        "Streamers/Influencers",
        "Gaming Magazines",
        "Retail Stores"
      ]
    },
    {
      title: "What would make you consider purchasing a PlayStation 5 in the near future?",
      subtitle: "Select one option",
      type: "single",
      field: "purchaseReason",
      options: [
        "Price drop or sale",
        "More exclusive games",
        "Better availability",
        "Recommendation from friends",
        "Upgrade from older console",
        "Gift for someone",
        "Already planning to buy",
        "Not interested"
      ]
    },
    {
      title: "Are you more likely to purchase a console for yourself or as a gift for someone else?",
      subtitle: "Select one option",
      type: "single",
      field: "purchaseType",
      options: [
        "For myself",
        "As a gift",
        "Both",
        "Not planning to purchase"
      ]
    },
    {
      title: "What is your age range?",
      subtitle: "Select one option",
      type: "single",
      field: "ageRange",
      options: [
        "Under 18",
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55+"
      ]
    },
    {
      title: "Do you consider yourself a casual, moderate, or hardcore gamer?",
      subtitle: "Select one option",
      type: "single",
      field: "gamerType",
      options: [
        "Casual Gamer",
        "Moderate Gamer",
        "Hardcore Gamer",
        "Not sure"
      ]
    }
  ];

  const currentQuestion = questions[surveyStep];
  const progress = ((surveyStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="YaadPlay Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-black hover:text-accent-red transition-colors">YaadPlay</span>
          </Link>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to leave? Your progress will be saved.')) {
                window.location.href = '/';
              }
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 h-1 bg-gray-100 z-40">
        <div 
          className="h-full bg-accent-red transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Survey Content */}
      <div className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6 w-full">
          {surveySubmitted ? (
            <div className="text-center animate-fadeIn">
              <div className="w-24 h-24 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Thank you! 🎮
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Your responses have been submitted successfully. We appreciate your feedback and will use it to improve your gaming experience!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-red text-white font-semibold text-lg rounded-lg hover:bg-accent-dark-red transition-colors"
              >
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {/* Question Number */}
              <div className="text-sm text-gray-500 mb-8 font-medium">
                Question {surveyStep + 1} of {questions.length}
              </div>

              {/* Question Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">
                {currentQuestion.title}
              </h1>

              {/* Question Subtitle */}
              {currentQuestion.subtitle && (
                <p className="text-lg md:text-xl text-gray-500 mb-12">
                  {currentQuestion.subtitle}
                </p>
              )}

              {/* Answer Options */}
              <div className="space-y-3 mb-12">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentQuestion.type === "multi"
                    ? (surveyData[currentQuestion.field] || []).includes(option)
                    : surveyData[currentQuestion.field] === option;

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(currentQuestion, option)}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 group ${
                        isSelected
                          ? 'border-accent-red bg-red-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-accent-red/50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-lg md:text-xl font-medium ${
                          isSelected ? 'text-accent-red' : 'text-gray-900'
                        }`}>
                          {option}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                {surveyStep > 0 && (
                  <button
                    onClick={() => setSurveyStep(surveyStep - 1)}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-black font-medium transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </button>
                )}
                <div className="flex-1" />
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(surveyStep, surveyData)}
                  className="flex items-center gap-2 px-8 py-4 bg-accent-red text-white font-semibold rounded-lg hover:bg-accent-dark-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-red"
                >
                  {surveyStep === 9 ? 'Submit' : 'Next'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

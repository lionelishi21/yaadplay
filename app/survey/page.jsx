'use client';

import React, { useState } from 'react';
import { Gamepad2, Check, ArrowRight, ArrowLeft, Home } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-100 border-b-2 border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-14 h-14 rounded-2xl neumorphism-card flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-jamaica-green" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800">YaadPlay</h1>
                <p className="text-xs text-gray-600">Gaming Survey 🇯🇲</p>
              </div>
            </Link>
            <Link
              href="/"
              className="neumorphism-button px-6 py-3 rounded-2xl flex items-center gap-2 text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-jamaica-green hover:to-jamaica-yellow hover:text-white transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Survey Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="neumorphism-card rounded-3xl p-8 md:p-12">
          {/* Survey Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    step <= surveyStep
                      ? 'bg-gradient-to-r from-jamaica-green to-jamaica-yellow'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <div className="text-sm font-semibold text-jamaica-green text-center">
              Question {surveyStep + 1} of 10
            </div>
          </div>

          {/* Survey Content */}
          <div className="min-h-[400px]">
            {surveySubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-jamaica-green to-jamaica-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-4">Thank You! 🎮</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Your responses have been submitted successfully. We appreciate your feedback!
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl text-white"
                  style={{
                    background: 'linear-gradient(135deg, #00A859 0%, #FCD116 100%)',
                  }}
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <SurveyStep
                step={surveyStep}
                surveyData={surveyData}
                setSurveyData={setSurveyData}
              />
            )}
          </div>

          {/* Survey Navigation */}
          {!surveySubmitted && (
            <div className="mt-8 flex gap-4">
              {surveyStep > 0 && (
                <button
                  onClick={() => setSurveyStep(surveyStep - 1)}
                  className="flex-1 px-6 py-3 rounded-2xl font-semibold neumorphism-button text-gray-800 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  if (surveyStep < 9) {
                    setSurveyStep(surveyStep + 1);
                  } else {
                    handleSurveySubmit();
                  }
                }}
                disabled={!isStepValid(surveyStep, surveyData)}
                className="flex-1 px-6 py-3 rounded-2xl font-bold text-white transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #00A859 0%, #FCD116 100%)',
                }}
              >
                {surveyStep === 9 ? 'Submit' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Survey Step Component
function SurveyStep({ step, surveyData, setSurveyData }) {
  const handleMultiSelect = (field, value) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSingleSelect = (field, value) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const question = questions[step];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-3 leading-tight">
          {question.title}
        </h3>
        <p className="text-gray-600 text-lg">{question.subtitle}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = question.type === "multi"
            ? surveyData[question.field].includes(option)
            : surveyData[question.field] === option;

          return (
            <button
              key={index}
              onClick={() => {
                if (question.type === "multi") {
                  handleMultiSelect(question.field, option);
                } else {
                  handleSingleSelect(question.field, option);
                }
              }}
              className={`w-full text-left p-5 rounded-2xl font-semibold transition-all ${
                isSelected
                  ? 'neumorphism-pressed bg-gradient-to-r from-jamaica-green/10 to-jamaica-yellow/10 border-2 border-jamaica-green'
                  : 'neumorphism-button hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={isSelected ? 'text-jamaica-green font-bold text-lg' : 'text-gray-800 text-lg'}>
                  {option}
                </span>
                {isSelected && (
                  <Check className="w-6 h-6 text-jamaica-green" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

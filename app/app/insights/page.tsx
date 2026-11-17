"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import {
  Sparkles,
  Utensils,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Send,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Users,
  Clock,
  ArrowRight
} from "lucide-react";

export default function AiInsightsPage() {
  const { wedding, queryAiAssistant } = useWedding();

  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string; time: string }[]
  >([
    {
      role: "assistant",
      content: `Hello! I am **WeddingOS AI**, connected live to the wedding database for **${wedding.coupleNames}**.\n\nYou can ask me anything about attendance forecasting, food preparation numbers, pending families, VIP arrivals, or ceremony schedules!`,
      time: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "How many people should we prepare food for?",
    "Who hasn't responded?",
    "Which families are attending the Sangeet?",
    "How many Jain meals do we need?",
    "How many guests are arriving before 7 PM?",
    "Which guests changed their RSVP?",
    "Give me a summary of tomorrow's events."
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      role: "user" as const,
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    setLoading(true);

    try {
      const response = await queryAiAssistant(textToSend);
      const assistantMsg = {
        role: "assistant" as const,
        content: response.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an issue querying the database. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full">
              Core Differentiator
            </span>
            <span className="text-xs text-[#C5A059] font-bold">Predictive Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            AI Wedding Intelligence & Assistant
          </h1>
          <p className="text-xs text-[#7D597E]">
            Machine learning models tuned on Indian wedding turnout behaviors, dietary calculations, and conversational assistant.
          </p>
        </div>
      </div>

      {/* SECTION 18: AI ATTENDANCE & CATERING INTELLIGENCE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Prediction (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border-2 border-[#C5A059] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DDCF]">
            <span className="text-xs uppercase font-bold text-[#74182E] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C5A059]" /> Expected Attendance
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              High Confidence (94%)
            </span>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1B28]">
              {wedding.aiAttendanceEstimate.min}–{wedding.aiAttendanceEstimate.max} guests
            </div>
            <p className="text-xs text-[#7D597E] mt-1">
              Projected turnout based on 526 raw RSVPs + 183 pending conversions.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#FAF7F2]">
            <div className="text-xs font-bold text-stone-700">Predictive Modeling Factors:</div>
            <ul className="space-y-1.5 text-xs text-[#654566]">
              {wedding.aiAttendanceEstimate.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C5A059] font-bold">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Catering Recommendation (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DDCF]">
            <span className="text-xs uppercase font-bold text-[#74182E] flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-[#74182E]" /> Catering Recommendation
            </span>
            <span className="text-[10px] bg-[#FAF7F2] text-[#74182E] font-semibold px-2 py-0.5 rounded-full border border-[#E8DDCF]">
              Banquet Ready
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xs text-[#7D597E]">Recommended Meals Order</div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#74182E] mt-0.5">
                {wedding.cateringEstimate.recommendedMeals}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                +{wedding.cateringEstimate.bufferPercent}% Safety Buffer
              </span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#FAF7F2] text-center text-xs">
            <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF]">
              <div className="text-[10px] text-stone-500">Expected</div>
              <div className="text-lg font-bold text-[#2D1B28]">{wedding.cateringEstimate.expectedGuests}</div>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-[10px] text-emerald-800">Vegetarian</div>
              <div className="text-lg font-bold text-emerald-950">{wedding.cateringEstimate.vegetarian}</div>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
              <div className="text-[10px] text-rose-800">Non-Veg</div>
              <div className="text-lg font-bold text-rose-950">{wedding.cateringEstimate.nonVegetarian}</div>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
              <div className="text-[10px] text-amber-800">Jain</div>
              <div className="text-lg font-bold text-amber-950">{wedding.cateringEstimate.jain}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 19: CONVERSATIONAL AI WEDDING ASSISTANT */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#74182E] flex items-center justify-center text-[#E1CD98] shadow-soft">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-[#2D1B28]">WeddingOS AI Assistant</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#7D597E]">
                Answers operational questions using actual live wedding guest records & ceremonies data.
              </p>
            </div>
          </div>
        </div>

        {/* Preset Question Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Suggested Quick Queries:
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] hover:border-[#74182E] text-xs text-[#4D334E] hover:text-[#74182E] transition-all text-left"
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] max-h-96 overflow-y-auto space-y-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-soft-sm ${
                  msg.role === "user"
                    ? "bg-[#74182E] text-white rounded-br-none"
                    : "bg-white text-[#2D1B28] border border-[#E8DDCF] rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[10px] mt-1.5 ${
                    msg.role === "user" ? "text-stone-300 text-right" : "text-[#7D597E]"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#74182E] font-medium p-2">
              <BrainCircuit className="w-4 h-4 animate-spin text-[#C5A059]" />
              <span>Analyzing wedding database...</span>
            </div>
          )}
        </div>

        {/* Chat Input Box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask WeddingOS AI (e.g. 'How many Jain meals do we need?')"
            className="flex-1 px-4 py-3 rounded-2xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#74182E] focus:outline-none bg-[#FAF7F2]"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="px-5 py-3 rounded-2xl bg-[#74182E] text-white text-xs sm:text-sm font-semibold hover:bg-[#581223] transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-soft"
          >
            <Send className="w-4 h-4 text-[#E1CD98]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
}

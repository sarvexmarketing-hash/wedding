"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import { ScheduledReminder } from "@/lib/types";
import {
  BellRing,
  Clock,
  Send,
  Plus,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Smartphone,
  Mail,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export default function SmartRemindersPage() {
  const { reminders, toggleReminder, addReminder, wedding, events } = useWedding();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [testSentId, setTestSentId] = useState<string | null>(null);

  // Form states for new reminder
  const [eventName, setEventName] = useState("The Royal Sangeet");
  const [title, setTitle] = useState("Tonight's Sangeet Call-time");
  const [triggerTiming, setTriggerTiming] = useState("Day of event at 2:00 PM");
  const [channel, setChannel] = useState<ScheduledReminder["channel"]>("WhatsApp");
  const [message, setMessage] = useState(
    "Namaskar {{guest_name}}! The Royal Sangeet begins tonight at 7:00 PM in the Grand Ballroom. Dress Code: Glamorous Indo-Western. We look forward to celebrating together!"
  );

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    addReminder({
      eventId: "evt-sangeet",
      eventName,
      title,
      message,
      triggerTiming,
      channel,
      enabled: true
    });
    setAddModalOpen(false);
  };

  const handleTestSend = (remId: string) => {
    setTestSentId(remId);
    setTimeout(() => setTestSentId(null), 2200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full">
              Automated Operations
            </span>
            <span className="text-xs font-bold text-[#C5A059]">Smart Event Nudges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Wedding Reminders & Notifications
          </h1>
          <p className="text-xs text-[#7D597E]">
            Configure scheduled day-of alerts for dress codes, ceremony schedules, and GPS venue directions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Plus className="w-4 h-4 text-[#E1CD98]" /> Add New Reminder Rule
          </button>
        </div>
      </div>

      {/* Preset Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map(rem => (
          <div
            key={rem.id}
            className={`p-6 rounded-3xl border transition-all space-y-4 ${
              rem.enabled
                ? "bg-white border-[#E8DDCF] shadow-soft hover:border-[#C5A059]"
                : "bg-stone-50 border-stone-200 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74182E] bg-[#74182E]/10 px-2 py-0.5 rounded">
                    {rem.eventName}
                  </span>
                  <span className="text-[10px] bg-white border border-[#E8DDCF] px-2 py-0.5 rounded-full font-semibold text-stone-600">
                    {rem.channel}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2D1B28] mt-1.5">
                  {rem.title}
                </h3>
              </div>

              <button
                onClick={() => toggleReminder(rem.id)}
                className="text-stone-400 hover:text-[#74182E] transition-colors"
                title={rem.enabled ? "Disable Reminder" : "Enable Reminder"}
              >
                {rem.enabled ? (
                  <ToggleRight className="w-8 h-8 text-[#74182E]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-stone-300" />
                )}
              </button>
            </div>

            {/* Timing Chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DDCF] text-xs font-medium text-[#4D334E]">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Trigger: <strong>{rem.triggerTiming}</strong></span>
            </div>

            {/* Message Bubble Preview */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] text-xs text-[#4D334E] leading-relaxed">
              <p className="italic font-serif">&ldquo;{rem.message}&rdquo;</p>
            </div>

            {/* Footer with dispatch test */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#FAF7F2]">
              <span className="text-[11px] text-stone-400">
                Delivered to <strong>{rem.sentCount}</strong> guests
              </span>

              <button
                onClick={() => handleTestSend(rem.id)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#74182E] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>{testSentId === rem.id ? "Test Sent to You!" : "Test Dispatch"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Add Reminder */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8DDCF] shadow-2xl relative">
            <h3 className="font-serif font-bold text-xl text-[#2D1B28] pb-3 mb-4 border-b border-[#E8DDCF]">
              Configure Event Reminder
            </h3>

            <form onSubmit={handleCreateReminder} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Target Ceremony</label>
                <select
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                >
                  <option value="Haldi & Phoolon Ki Holi">Haldi & Phoolon Ki Holi</option>
                  <option value="Mehendi & High Tea">Mehendi & High Tea</option>
                  <option value="The Royal Sangeet">The Royal Sangeet</option>
                  <option value="Sacred Muhurtham & Varmala">Sacred Muhurtham & Varmala</option>
                  <option value="The Grand Regal Reception">The Grand Regal Reception</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Reminder Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  placeholder="e.g. Sangeet Dress Code Tonight"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Trigger Timing</label>
                  <select
                    value={triggerTiming}
                    onChange={e => setTriggerTiming(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                  >
                    <option value="1 day before at 10:00 AM">1 day before at 10:00 AM</option>
                    <option value="Day of event at 2:00 PM">Day of event at 2:00 PM</option>
                    <option value="2 hours before ceremony">2 hours before ceremony</option>
                    <option value="4 hours before reception">4 hours before reception</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Channel</label>
                  <select
                    value={channel}
                    onChange={e => setChannel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Message Content (Variables: &#123;&#123;guest_name&#125;&#125;)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DDCF]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#74182E] text-white font-bold hover:bg-[#581223] shadow-soft"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

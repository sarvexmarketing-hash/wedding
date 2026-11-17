"use client";

import React, { useState } from "react";
import { Check, UserCheck, Sparkles, CheckCircle2, QrCode } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
  initialGuestName?: string;
  initialPhone?: string;
  initialGuestCount?: number;
  onSubmitRsvp?: (rsvpData: {
    guestName: string;
    phone: string;
    rsvpStatus: "confirmed" | "declined";
    eventsAttending: string[];
    foodPreference: "Vegetarian" | "Non-Vegetarian" | "Jain" | "Vegan" | "Other";
    guestCount: number;
    notes?: string;
  }) => Promise<any>;
}

export function RsvpSection({
  data,
  template,
  initialGuestName = "",
  initialPhone = "",
  initialGuestCount = 1,
  onSubmitRsvp
}: SectionProps) {
  const { rsvp, events, couple } = data;
  const { theme } = template;

  const [guestName, setGuestName] = useState(initialGuestName);
  const [phone, setPhone] = useState(initialPhone);
  const [status, setStatus] = useState<"confirmed" | "declined">("confirmed");
  const [guestCount, setGuestCount] = useState(initialGuestCount || 1);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(events.map(e => e.id));
  const [foodPreference, setFoodPreference] = useState<"Vegetarian" | "Non-Vegetarian" | "Jain" | "Vegan" | "Other">("Vegetarian");
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!rsvp.enabled) return null;

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setLoading(true);

    if (onSubmitRsvp) {
      await onSubmitRsvp({
        guestName,
        phone,
        rsvpStatus: status,
        eventsAttending: status === "confirmed" ? selectedEvents : [],
        foodPreference,
        guestCount,
        notes: wishes
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-8 border-t space-y-6 text-center" style={{ borderColor: theme.borderColor }}>
      <div className="space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          RSVP & Guest Pass
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          Will you celebrate with us?
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          Kindly respond by <strong>{rsvp.deadline || "the RSVP deadline"}</strong> to help the royal banquets prepare exact hospitality.
        </p>
      </div>

      <div
        className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border text-left space-y-5 shadow-soft"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor
        }}
      >
        {submitted ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif font-bold text-2xl" style={{ color: theme.textColor }}>
              {status === "confirmed" ? `Thank you, ${guestName || "Valued Guest"}. We can't wait to celebrate with you.` : "Thank you for letting us know."}
            </h3>

            <p className="text-xs max-w-sm mx-auto" style={{ color: theme.subtextColor }}>
              {status === "confirmed"
                ? `Your response has been saved to the royal guest registry. Your digital palace check-in pass is ready below.`
                : `We will miss your presence dearly. Your warm blessings mean everything to ${couple.displayNames}.`}
            </p>

            {status === "confirmed" && (
              <div
                className="p-4 rounded-xl border text-center space-y-2 max-w-xs mx-auto shadow-sm"
                style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
              >
                <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: theme.primaryColor }}>
                  Digital Wedding Pass
                </div>
                <div className="font-serif font-bold text-base" style={{ color: theme.textColor }}>
                  {guestName} ({guestCount} Guests)
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-lg border mx-auto flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-stone-800" />
                </div>
                <div className="text-[10px] text-stone-500 font-mono">Meal: {foodPreference}</div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGuestName("");
              }}
              className="text-xs underline font-medium"
              style={{ color: theme.primaryColor }}
            >
              Submit RSVP for another guest
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Status Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus("confirmed")}
                className={`py-3.5 px-4 rounded-xl font-serif text-sm tracking-wide font-bold transition-all border text-center ${
                  status === "confirmed" ? "shadow-md scale-[1.02]" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: status === "confirmed" ? theme.primaryColor : theme.backgroundColor,
                  color: status === "confirmed" ? "#FFFFFF" : theme.textColor,
                  borderColor: status === "confirmed" ? theme.accentColor : theme.borderColor
                }}
              >
                ✓ YES, I&apos;LL BE THERE
              </button>

              <button
                type="button"
                onClick={() => setStatus("declined")}
                className={`py-3.5 px-4 rounded-xl font-serif text-sm tracking-wide font-bold transition-all border text-center ${
                  status === "declined" ? "shadow-md scale-[1.02]" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: status === "declined" ? theme.primaryColor : theme.backgroundColor,
                  color: status === "declined" ? "#FFFFFF" : theme.textColor,
                  borderColor: theme.borderColor
                }}
              >
                ✕ SORRY, CAN&apos;T MAKE IT
              </button>
            </div>

            {/* Guest Name & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl border focus:outline-none"
                  style={{
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                  WhatsApp Phone {rsvp.phoneRequired ? "*" : "(Optional)"}
                </label>
                <input
                  type="text"
                  required={rsvp.phoneRequired}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98201 12345"
                  className="w-full p-2.5 rounded-xl border focus:outline-none"
                  style={{
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }}
                />
              </div>
            </div>

            {status === "confirmed" && (
              <>
                {/* Guest Count */}
                {rsvp.allowGuestCount && (
                  <div>
                    <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                      Total Guests Attending (Including You)
                    </label>
                    <select
                      value={guestCount}
                      onChange={e => setGuestCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border focus:outline-none"
                      style={{
                        backgroundColor: theme.backgroundColor,
                        borderColor: theme.borderColor,
                        color: theme.textColor
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest (Solo)" : `Guests (Family / Party of ${num})`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Events Attending */}
                <div>
                  <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                    Which ceremonies will you celebrate with us?
                  </label>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {events.map(evt => (
                      <label
                        key={evt.id}
                        onClick={() => toggleEvent(evt.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-colors"
                        style={{
                          backgroundColor: selectedEvents.includes(evt.id)
                            ? `${theme.primaryColor}10`
                            : theme.backgroundColor,
                          borderColor: theme.borderColor
                        }}
                      >
                        <span style={{ color: theme.textColor }}>
                          <strong>{evt.name}</strong> ({evt.date})
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(evt.id)}
                          onChange={() => {}}
                          className="w-4 h-4 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                    Banquet Food Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(rsvp.dietaryOptions || ["Vegetarian", "Non-Vegetarian", "Jain"]).map(diet => (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => setFoodPreference(diet as any)}
                        className={`p-2 rounded-xl border text-center font-medium transition-all ${
                          foodPreference === diet ? "font-bold shadow-sm" : ""
                        }`}
                        style={{
                          backgroundColor: foodPreference === diet ? theme.primaryColor : theme.backgroundColor,
                          color: foodPreference === diet ? "#FFFFFF" : theme.textColor,
                          borderColor: theme.borderColor
                        }}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Heartfelt Note / DJ Song Request */}
            <div>
              <label className="block mb-1 font-semibold" style={{ color: theme.textColor }}>
                {rsvp.notesPrompt || "Blessing message or song request for the couple"}
              </label>
              <textarea
                rows={2}
                value={wishes}
                onChange={e => setWishes(e.target.value)}
                placeholder="Can't wait to dance with you both at the Sangeet!"
                className="w-full p-2.5 rounded-xl border focus:outline-none"
                style={{
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.borderColor,
                  color: theme.textColor
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !guestName.trim()}
              className="w-full py-3.5 rounded-full font-serif text-sm font-bold shadow-soft transition-all text-white disabled:opacity-50"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {loading ? "Registering Attendance..." : "Confirm RSVP & Generate Entry Pass ❤️"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

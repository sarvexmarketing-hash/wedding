"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Volume2, VolumeX, ArrowRight, Check } from "lucide-react";

interface EnvelopeOpeningProps {
  coupleNames: string;
  weddingDate: string;
  city: string;
  venue: string;
  guestName?: string;
  monogram?: string;
  themeStyle?: string;
  onOpened: () => void;
}

export function EnvelopeOpeningExperience({
  coupleNames,
  weddingDate,
  city,
  venue,
  guestName,
  monogram,
  themeStyle = "royal",
  onOpened
}: EnvelopeOpeningProps) {
  // Opening stages: 'sealed' -> 'breaking_seal' -> 'flap_open' -> 'card_revealed' -> 'completed'
  const [stage, setStage] = useState<"sealed" | "breaking_seal" | "flap_open" | "card_revealed" | "completed">("sealed");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number; duration: number }>>([]);

  // Generate floating gold/rose petals
  useEffect(() => {
    const list = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 95,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4
    }));
    setPetals(list);
  }, []);

  // Web Audio chime generator (royal melodic chime)
  const playRoyalChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5 (joyful royal pentatonic)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch (e) {
      // Audio autoplay gracefully handled
    }
  };

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;

    playRoyalChime();
    setStage("breaking_seal");

    setTimeout(() => {
      setStage("flap_open");
    }, 450);

    setTimeout(() => {
      setStage("card_revealed");
    }, 1100);

    setTimeout(() => {
      setStage("completed");
      onOpened();
    }, 2800);
  };

  const handleSkip = () => {
    setStage("completed");
    onOpened();
  };

  if (stage === "completed") return null;

  const derivedMonogram = monogram || (coupleNames
    .split("&")
    .map(n => n.trim().charAt(0))
    .join(" & ")
    .toUpperCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F0E17]/90 backdrop-blur-xl transition-opacity duration-700 opacity-100">
      {/* Ambient golden ambient light & animated petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#74182E]/30 rounded-full blur-3xl" />

        {/* Floating Jasmine & Rose Petals */}
        {petals.map(p => (
          <div
            key={p.id}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.4}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
            className="absolute rounded-full bg-gradient-to-tr from-[#E1CD98]/50 via-[#FAF7F2]/60 to-[#C5A059]/40 blur-[0.5px] animate-bounce pointer-events-none"
          />
        ))}
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-5 right-5 z-50 flex items-center gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all border border-white/15"
          aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          title={soundEnabled ? "Sound enabled" : "Sound muted"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#E1CD98]" /> : <VolumeX className="w-4 h-4 text-white/50" />}
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF7F2] text-xs font-serif tracking-widest uppercase backdrop-blur-md transition-all border border-white/20 shadow-soft-sm flex items-center gap-1.5"
        >
          <span>Skip to Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E1CD98]" />
        </button>
      </div>

      {/* Main 3D Royal Indian Envelope Container */}
      <div className="relative w-full max-w-[390px] sm:max-w-[460px] mx-4 perspective-1000">
        {/* Envelope Shell */}
        <div
          onClick={stage === "sealed" ? handleOpenEnvelope : undefined}
          className={`relative w-full rounded-2xl shadow-2xl transition-all duration-700 cursor-pointer overflow-visible ${
            stage === "sealed" ? "hover:scale-[1.02] active:scale-[0.99]" : ""
          }`}
          style={{
            minHeight: "440px",
            background: "linear-gradient(145deg, #74182E 0%, #4D101E 100%)",
            border: "2px solid #C5A059",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(197, 160, 89, 0.25)"
          }}
        >
          {/* Gold Filigree Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/70 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/70 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/70 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/70 rounded-br-lg pointer-events-none" />

          {/* Envelope Flap (3D Flip Animation) */}
          <div
            className={`absolute top-0 left-0 right-0 h-32 origin-top transition-transform duration-700 ease-out z-20 ${
              stage === "sealed"
                ? "transform rotate-x-0"
                : "transform -rotate-x-180 opacity-0 pointer-events-none"
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #841B35 0%, #5F1325 100%)",
              borderBottom: "1px solid #C5A059"
            }}
          />

          {/* Personalized Recipient Calligraphy Label */}
          <div className="pt-8 pb-4 text-center px-6 relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-[0.25em] text-[#E1CD98] font-bold">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Imperial Wedding Invitation</span>
            </div>

            {guestName ? (
              <div className="space-y-0.5 pt-1">
                <p className="text-xs font-serif italic text-white/70">Exclusively Orchestrated for</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF7F2] tracking-wide">
                  {guestName}
                </h3>
              </div>
            ) : (
              <div className="space-y-0.5 pt-1">
                <p className="text-xs font-serif italic text-white/70">With the blessings of our families</p>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF7F2]">
                  Valued Guest & Family
                </h3>
              </div>
            )}
          </div>

          {/* Interactive Royal Wax Seal (Center) */}
          <div className="flex flex-col items-center justify-center my-6 relative z-30">
            <div
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                stage === "sealed"
                  ? "animate-pulse scale-100 hover:scale-105"
                  : stage === "breaking_seal"
                  ? "scale-125 rotate-12 opacity-80"
                  : "opacity-0 scale-150 pointer-events-none"
              }`}
              style={{
                background: "radial-gradient(circle, #D4AF37 0%, #997825 70%, #5A4310 100%)",
                boxShadow: "0 0 35px rgba(212, 175, 55, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -3px 6px rgba(0, 0, 0, 0.5)",
                border: "2px solid #FFE7A0"
              }}
            >
              {/* Embossed Monogram */}
              <div className="text-center">
                <div className="text-[#2D1B28] font-serif font-black text-xl tracking-wider select-none">
                  {derivedMonogram}
                </div>
                <div className="text-[8px] font-mono tracking-widest text-[#2D1B28]/80 uppercase font-bold">
                  SEAL
                </div>
              </div>
            </div>

            {/* Instruction Callout */}
            {stage === "sealed" && (
              <div className="mt-4 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C5A059]/40 text-[#E1CD98] text-xs font-serif tracking-widest uppercase animate-bounce">
                Tap to Break Seal & Open
              </div>
            )}
          </div>

          {/* SLIDING ROYAL GOLD INVITATION CARD (Reveals during stage === 'card_revealed') */}
          <div
            className={`absolute inset-x-3 bottom-3 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-center transition-all duration-1000 ease-out z-25 ${
              stage === "card_revealed"
                ? "translate-y-[-70px] opacity-100 scale-100 shadow-2xl"
                : "translate-y-0 opacity-0 pointer-events-none"
            }`}
            style={{
              height: "400px",
              background: "linear-gradient(135deg, #FAF7F2 0%, #F5EFEB 100%)",
              border: "2px solid #C5A059",
              boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Top auspicious header */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#74182E] font-bold">
                Shubh Vivah · Auspicious Union
              </div>
              <div className="w-16 h-0.5 bg-[#C5A059] mx-auto rounded-full" />
            </div>

            {/* Couple Names Reveal */}
            <div className="space-y-2 py-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#74182E] tracking-tight leading-none">
                {coupleNames}
              </h2>
              <p className="text-xs font-serif italic text-[#7D597E]">
                Together with their families invite you to celebrate
              </p>
            </div>

            {/* Date & Palace Venue */}
            <div className="border-t border-b border-[#E8DDCF] py-3 my-2 space-y-1 bg-white/60 rounded-lg">
              <div className="text-sm font-serif font-bold text-[#2D1B28]">
                {weddingDate}
              </div>
              <div className="text-xs text-[#74182E] font-medium flex items-center justify-center gap-1">
                <span>{venue}</span>
                <span>·</span>
                <span>{city}</span>
              </div>
            </div>

            {/* Unfolding confirmation */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#74182E] animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Entering Your Wedding Experience...</span>
              </div>
            </div>
          </div>

          {/* Lower footer note */}
          <div className="pb-6 text-center px-4 relative z-10">
            <div className="text-[11px] font-serif text-[#E1CD98]/80 italic">
              {weddingDate} · {city}
            </div>
            <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 pt-1">
              Protected by WeddingOS Guest Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnvelopeOpeningExperience;

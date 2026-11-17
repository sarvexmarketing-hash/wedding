"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { AIVideo } from "@/lib/types";
import {
  Video,
  Play,
  Pause,
  Sparkles,
  Upload,
  Share2,
  Copy,
  Check,
  Music,
  Palette,
  Film,
  Download,
  Smartphone,
  CheckCircle2,
  Volume2,
  VolumeX,
  ExternalLink
} from "lucide-react";

export default function AiVideoInvitationPage() {
  const { wedding, aiVideo, generateAiVideo } = useWedding();

  const [title, setTitle] = useState(aiVideo.title);
  const [style, setStyle] = useState<AIVideo["style"]>(aiVideo.style);
  const [musicTrack, setMusicTrack] = useState(aiVideo.musicTrack);
  const [storyScript, setStoryScript] = useState(aiVideo.storyScript);
  const [generating, setGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Video progress state simulation
  const [activeSlide, setActiveSlide] = useState(0);

  const styleOptions = [
    {
      id: "royal_palace",
      name: "Royal Palace",
      desc: "Regal arches, gold filigree & majestic shehnai melodies",
      gradient: "from-[#74182E] to-[#380714]",
      badge: "Most Popular"
    },
    {
      id: "modern_cinematic",
      name: "Modern Cinematic",
      desc: "Slow-motion portraits, sleek typography & filmic lens flares",
      gradient: "from-stone-900 to-stone-700",
      badge: "Contemporary"
    },
    {
      id: "traditional_vedic",
      name: "Traditional Vedic",
      desc: "Sacred Sanskrit slokas, marigold petals & temple motifs",
      gradient: "from-amber-800 to-amber-950",
      badge: "Heritage"
    },
    {
      id: "floral_dream",
      name: "Floral Dream",
      desc: "Floating pastel rose petals, soft acoustic sitar & bokeh",
      gradient: "from-rose-900 to-pink-950",
      badge: "Romantic"
    },
    {
      id: "golden_sunset",
      name: "Golden Sunset",
      desc: "Warm twilight glow over palace domes & ambient strings",
      gradient: "from-yellow-900 to-amber-900",
      badge: "Warm"
    }
  ];

  const musicTracks = [
    "Shehnai Symphony & Acoustic Sitar Romance",
    "Royal Durbar Strings & Wedding Shehnai",
    "Bollywood Acoustic Lo-Fi · Tum Hi Ho Mood",
    "Traditional Mangalyam Nadaswaram & Thavil",
    "Symphonic Palace Waltz in D Major"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1400));
    await generateAiVideo({
      title,
      style,
      musicTrack,
      photos: aiVideo.photos,
      storyScript
    });
    setGenerating(false);
    setIsPlaying(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://weddingos.com/invite/${wedding.slug}#video`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Watch our official AI Wedding Invitation Video for ${wedding.coupleNames}! Tap here: https://weddingos.com/invite/${wedding.slug}#video`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    setShareFeedback("Opening WhatsApp share...");
    setTimeout(() => setShareFeedback(null), 2500);
  };

  const handleShareInstagram = () => {
    navigator.clipboard.writeText(`https://weddingos.com/invite/${wedding.slug}#video`);
    setShareFeedback("Video link copied for Instagram Story sticker!");
    setTimeout(() => setShareFeedback(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full">
              Smart Feature
            </span>
            <span className="text-xs font-bold text-[#C5A059]">AI Creative Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Create AI Wedding Invitation Video
          </h1>
          <p className="text-xs text-[#7D597E]">
            Generate personalized cinematic wedding invitation videos for {wedding.coupleNames} to share across WhatsApp and Instagram.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/invite/${wedding.slug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <span>Guest Card View</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </Link>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5 text-[#E1CD98]" />}
            <span>{copiedLink ? "Link Copied!" : "Share Video"}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Creator Controls + Interactive Cinema Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: AI Video Configuration Studio */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Visual Style Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7D597E] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#C5A059]" /> 1. Select Visual Theme & Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {styleOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setStyle(opt.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      style === opt.id
                        ? "bg-[#FAF7F2] border-[#74182E] ring-2 ring-[#74182E] text-[#2D1B28]"
                        : "border-[#E8DDCF] hover:bg-[#FAF7F2]/60 text-[#4D334E]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#2D1B28]">{opt.name}</span>
                      <span className="text-[9px] bg-white border border-[#E8DDCF] px-1.5 py-0.5 rounded font-semibold text-[#74182E]">
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7D597E] mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Couple Photos Gallery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7D597E] flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#C5A059]" /> 2. Couple Photos ({aiVideo.photos.length} Uploaded)
                </label>
                <span className="text-[11px] text-[#74182E] font-medium">Auto-enhances to 4K</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {aiVideo.photos.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 cursor-pointer transition-all ${
                      activeSlide === i ? "border-[#74182E] scale-105 shadow-soft" : "border-[#E8DDCF]"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${src}')` }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Title & Soundtrack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Video Title / Chapter</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Soundtrack / Melodies</label>
                <select
                  value={musicTrack}
                  onChange={e => setMusicTrack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                >
                  {musicTracks.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Story Voiceover Script */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-stone-600 font-semibold text-xs">
                  Cinematic Story Voiceover & Subtitles
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setStoryScript(
                      `Amidst the timeless hills and grand domes of Taj Falaknuma, two souls pledge their sacred forever. Rahul & Priya warmly request the pleasure of your company to grace their union with your blessings.`
                    )
                  }
                  className="text-[11px] text-[#74182E] font-medium hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#C5A059]" /> Auto-Write Script
                </button>
              </div>
              <textarea
                rows={3}
                value={storyScript}
                onChange={e => setStoryScript(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Generate Action Button */}
            <div className="pt-2 flex items-center justify-between border-t border-[#E8DDCF]">
              <span className="text-xs text-stone-500">
                {generating ? "Rendering cinematic sequence..." : "Ready to generate customized video"}
              </span>
              <button
                type="submit"
                disabled={generating}
                className="px-6 py-3 rounded-xl bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#E1CD98]" />
                <span>{generating ? "Generating AI Video..." : "Render AI Video Preview"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 cols: Interactive Cinematic Video Player Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7D597E] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-[#C5A059]" /> Live Video Preview (45s)
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
              4K Master Ready
            </span>
          </div>

          {/* Player Frame */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-black shadow-2xl border-2 border-[#C5A059] group">
            {/* Animated Photo Transition Slide */}
            <div
              className={`w-full h-full bg-cover bg-center transition-all duration-1000 transform ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
              style={{
                backgroundImage: `url('${aiVideo.photos[activeSlide % aiVideo.photos.length]}')`
              }}
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

            {/* Top Overlay: Monogram & Style */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-[#E1CD98] flex items-center justify-center font-serif text-xs font-bold text-[#E1CD98]">
                  R & P
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#E1CD98] font-bold">
                    Official Wedding Video
                  </div>
                  <div className="text-xs font-serif font-bold">{wedding.coupleNames}</div>
                </div>
              </div>
              <span className="text-[10px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 capitalize">
                {style.replace("_", " ")}
              </span>
            </div>

            {/* Center: Play / Pause Control */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-[#E1CD98] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group-hover:bg-[#74182E]/80"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
            </div>

            {/* Bottom Overlay: Subtitles & Sound Controls */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
              {/* Cinematic Subtitles */}
              <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center">
                <p className="text-[11px] font-serif text-[#FAF7F2] italic leading-relaxed">
                  &ldquo;{storyScript}&rdquo;
                </p>
                <div className="text-[9px] text-[#E1CD98] mt-1 font-mono uppercase tracking-wider">
                  {wedding.weddingDate} · {wedding.primaryVenue.split(",")[0]}
                </div>
              </div>

              {/* Progress Bar & Audio Indicator */}
              <div className="flex items-center justify-between text-[10px] text-stone-300 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E1CD98]" />}
                  </button>
                  <span className="truncate max-w-[180px] text-[10px] text-[#E1CD98]">
                    ♫ {musicTrack}
                  </span>
                </div>
                <span>00:45</span>
              </div>
            </div>
          </div>

          {/* Social Share Controls */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DDCF] shadow-soft space-y-3 text-xs">
            <div className="font-bold text-[#2D1B28] flex items-center justify-between">
              <span>Share Wedding Video Invitation:</span>
              {shareFeedback && (
                <span className="text-[11px] text-emerald-700 font-normal">{shareFeedback}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>WhatsApp Video Link</span>
              </button>

              <button
                onClick={handleShareInstagram}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Instagram Story Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

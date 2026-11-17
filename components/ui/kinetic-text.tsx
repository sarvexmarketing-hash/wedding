"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface KineticTextRotatorProps {
  phrases?: string[];
  intervalMs?: number;
  className?: string;
}

const defaultPhrases = [
  "Plan with elegance.",
  "Invite with grandeur.",
  "Celebrate without chaos.",
  "Your wedding. Your guests. Your story."
];

export function KineticTextRotator({
  phrases = defaultPhrases,
  intervalMs = 3200,
  className = ""
}: KineticTextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [phrases.length, intervalMs]);

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden h-[1.3em] align-middle ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap font-serif italic text-[#74182E]"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

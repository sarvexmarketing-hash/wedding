"use client";

import React, { useState, useEffect, useRef } from "react";

export interface GhostTypeProps {
  /**
   * The text to type out, or an array of phrases to cycle through
   */
  text: string | string[];
  /**
   * Fixed prefix that remains constant (e.g. "Stop Managing Your Wedding ")
   */
  prefix?: string;
  /**
   * Speed of typing each character in milliseconds
   */
  typingSpeed?: number;
  /**
   * Pause duration in milliseconds after a phrase is completely typed
   */
  pauseDuration?: number;
  /**
   * Speed of deleting characters if cycling through multiple phrases
   */
  deletingSpeed?: number;
  /**
   * Whether to loop through phrases continuously
   */
  loop?: boolean;
  /**
   * Opacity of the ghost completion text (0 to 1)
   */
  ghostOpacity?: number;
  /**
   * Whether to display the blinking cursor
   */
  showCursor?: boolean;
  /**
   * Custom cursor color
   */
  cursorColor?: string;
  className?: string;
  ghostClassName?: string;
}

export function GhostType({
  text,
  prefix = "",
  typingSpeed = 55,
  pauseDuration = 2400,
  deletingSpeed = 25,
  loop = true,
  ghostOpacity = 0.35,
  showCursor = true,
  cursorColor = "currentColor",
  className = "",
  ghostClassName = ""
}: GhostTypeProps) {
  const phrases = Array.isArray(text) ? text : [text];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

  const currentPhrase = phrases[phraseIndex] || "";
  const shouldDelete = phrases.length > 1 && loop;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentPhrase.length) {
      // Natural typing cadence with subtle jitter
      const jitter = Math.random() * 20 - 10;
      const delay = Math.max(20, typingSpeed + jitter);

      timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, delay);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      if (shouldDelete) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setCharIndex(prev => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex(prev => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, inView, currentPhrase, phrases.length, shouldDelete, typingSpeed, pauseDuration, deletingSpeed]);

  const typedPart = currentPhrase.slice(0, charIndex);
  const ghostPart = currentPhrase.slice(charIndex);

  return (
    <span ref={containerRef} className={`inline-block relative ${className}`}>
      {prefix && <span className="text-current">{prefix}</span>}

      {/* Committed Solid Typed Text */}
      <span className="text-current font-bold">{typedPart}</span>

      {/* AI Blinking Cursor at the junction */}
      {showCursor && (
        <span
          className="inline-block w-[3px] h-[0.9em] align-middle rounded-full animate-pulse transition-opacity mx-[1.5px]"
          style={{ backgroundColor: cursorColor }}
          aria-hidden="true"
        />
      )}

      {/* AI Ghost Completion Suggestion */}
      {ghostPart && (
        <span
          className={`select-none transition-opacity duration-200 ${ghostClassName}`}
          style={{ opacity: ghostOpacity }}
          aria-hidden="true"
        >
          {ghostPart}
        </span>
      )}
    </span>
  );
}

export default GhostType;

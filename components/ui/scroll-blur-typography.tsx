"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollBlurTypographyProps {
  text: string;
  className?: string;
  wordClassName?: string;
  mode?: "words" | "chars";
  blurAmount?: number;
  containerClassName?: string;
}

export function ScrollBlurTypography({
  text,
  className = "",
  wordClassName = "",
  mode = "words",
  blurAmount = 14,
  containerClassName = ""
}: ScrollBlurTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"]
  });

  if (mode === "chars") {
    const chars = Array.from(text);
    const totalChars = chars.length;

    return (
      <div ref={containerRef} className={cn("relative", containerClassName)}>
        <p className={cn("inline-block", className)}>
          {chars.map((char, index) => {
            const start = index / totalChars;
            const end = Math.min(start + 1.5 / totalChars, 1);
            return (
              <CharToken
                key={`${char}-${index}`}
                char={char}
                progress={scrollYProgress}
                range={[start, end]}
                blurAmount={blurAmount}
                className={wordClassName}
              />
            );
          })}
        </p>
      </div>
    );
  }

  // Words mode (default, silky-smooth & highly readable for luxury editorial feel)
  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  return (
    <div ref={containerRef} className={cn("relative", containerClassName)}>
      <p className={cn("flex flex-wrap items-baseline gap-x-[0.3em] gap-y-[0.1em]", className)}>
        {words.map((word, index) => {
          // Staggered threshold for each word across scroll range
          const start = index / totalWords;
          const end = Math.min(start + 1.2 / totalWords, 1);
          return (
            <WordToken
              key={`${word}-${index}`}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              blurAmount={blurAmount}
              className={wordClassName}
            />
          );
        })}
      </p>
    </div>
  );
}

interface WordTokenProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  blurAmount: number;
  className?: string;
}

function WordToken({ word, progress, range, blurAmount, className }: WordTokenProps) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [blurAmount, 0]);
  const y = useTransform(progress, range, [10, 0]);
  const scale = useTransform(progress, range, [0.96, 1]);

  const filter = useTransform(blur, (b: number) => `blur(${b}px)`);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        scale,
        willChange: "filter, opacity, transform"
      }}
      className={cn("inline-block transform-gpu transition-colors duration-200", className)}
    >
      {word}
    </motion.span>
  );
}

interface CharTokenProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  blurAmount: number;
  className?: string;
}

function CharToken({ char, progress, range, blurAmount, className }: CharTokenProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [blurAmount, 0]);
  const y = useTransform(progress, range, [6, 0]);

  const filter = useTransform(blur, (b: number) => `blur(${b}px)`);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        willChange: "filter, opacity, transform"
      }}
      className={cn("inline-block transform-gpu", className)}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

'use client';

import React from 'react';
import { motion, useInView } from 'motion/react';

export interface HighlightTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  highlightClassName?: string;
  delay?: number;
  duration?: number;
  inView?: boolean;
  once?: boolean;
  as?: React.ElementType;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  children,
  className = '',
  highlightClassName = 'bg-gradient-to-r from-[#C5A059]/30 via-[#74182E]/15 to-[#C5A059]/35 rounded-md',
  delay = 0,
  duration = 0.8,
  inView = true,
  once = true,
  as: Component = 'span',
}) => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });

  const shouldAnimate = inView ? isInView : true;
  const content = text || children;

  return (
    <Component
      ref={ref}
      className={`relative inline-block px-1 py-0.5 ${className}`}
    >
      {/* Sweeping highlighter background */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Smooth organic sweeping curve
        }}
        style={{ transformOrigin: 'left center' }}
        className={`absolute inset-0 -z-10 block ${highlightClassName}`}
      />
      <span className="relative z-10">{content}</span>
    </Component>
  );
};

export default HighlightText;

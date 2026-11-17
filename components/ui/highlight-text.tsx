'use client';

import * as React from 'react';
import { useInView } from 'motion/react';

export interface HighlightTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  children?: React.ReactNode;
  className?: string;
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
  delay = 0,
  duration = 0.85,
  inView = true,
  once = true,
  as: Component = 'span',
  style,
  ...props
}) => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      if (isInView) {
        setAnimated(true);
      }
    } else {
      setAnimated(true);
    }
  }, [inView, isInView]);

  const content = text ?? children;

  return (
    <Component
      ref={ref}
      className={`relative inline-block bg-no-repeat transition-[background-size] ${className}`}
      style={{
        backgroundPosition: 'left center',
        backgroundSize: animated ? '100% 100%' : '0% 100%',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...props}
    >
      {content}
    </Component>
  );
};

export default HighlightText;

'use client';

import * as React from 'react';
import { HighlightText } from '@/components/ui/highlight-text';
import { RotateCw } from 'lucide-react';

export default function HighlightTextDemo({ delay = 0 }: { delay?: number }) {
  const [run, setRun] = React.useState(0);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <HighlightText
        key={`${run}-${delay}`}
        delay={delay}
        className="rounded-md bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-0.5 text-4xl font-semibold text-[#2D1B28]"
        text="Highlight Text"
        inView
      />
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md border border-[#E8DDCF] bg-white hover:bg-[#FAF7F2] text-[#2D1B28] transition-colors shadow-sm"
        onClick={() => setRun((n) => n + 1)}
      >
        <RotateCw className="w-3.5 h-3.5 text-[#74182E]" />
        Replay
      </button>
    </div>
  );
}

export function Title() {
  return (
    <HighlightText
      text="Highlight Text"
      className="rounded-md bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-0.5"
      inView
    />
  );
}

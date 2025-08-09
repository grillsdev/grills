'use client'

import React from 'react';

export default function HighlightedComponent({ text = "", color = "oklch(0.657 0.144 247.45)" }: {text: string, color?: string}) {
  return (
    <div className="relative inline-block space-y-1">
      <div className="relative z-10">{text}</div>
      <svg
            className="absolute bottom-0 left-0 w-full h-3 -z-0"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <path
              d="M5,6 Q50,2 95,6"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
    </div>
  );
}
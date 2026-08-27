import React, { useId } from "react";

interface TravoCoinIconProps {
  className?: string;
}

// The TRAVO Coins currency mark — a gold coin embossed with the brand's
// twin-peak mountain glyph. Drop-in sized like a lucide icon (w-4 h-4, etc).
export default function TravoCoinIcon({ className = "w-4 h-4" }: TravoCoinIconProps) {
  const uid = useId();
  const faceId = `travo-coin-face-${uid}`;
  const rimId = `travo-coin-rim-${uid}`;

  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Travo Coins">
      <defs>
        <linearGradient id={faceId} x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F0B429" />
          <stop offset="100%" stopColor="#9C6B12" />
        </linearGradient>
        <linearGradient id={rimId} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="100%" stopColor="#B9791A" />
        </linearGradient>
      </defs>

      <circle cx="12" cy="12" r="10.25" fill={`url(#${rimId})`} />
      <circle cx="12" cy="12" r="8.75" fill={`url(#${faceId})`} stroke="#8A5A10" strokeWidth="0.5" />
      <circle cx="12" cy="12" r="7.25" fill="none" stroke="#8A5A10" strokeWidth="0.5" strokeDasharray="1.2 1.6" opacity="0.6" />

      {/* Twin-peak mountain mark, embossed */}
      <path
        d="M6.2 15.3L10 8.7l2 3.05 1.1-1.55 4.7 5.1H6.2z"
        fill="#5C3A0E"
        opacity="0.9"
      />
      <path
        d="M6.2 15.3L10 8.7l2 3.05 1.1-1.55 4.7 5.1"
        fill="none"
        stroke="#3E2708"
        strokeWidth="0.4"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

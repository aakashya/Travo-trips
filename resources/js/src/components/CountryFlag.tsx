import React from "react";
import { Globe2 } from "lucide-react";

export type CountryType = "all" | "india" | "bhutan" | "nepal" | "in" | "bt" | "np";

interface CountryFlagProps {
  country: CountryType | string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  labelClassName?: string;
}

export function IndiaFlagSvg({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className={`${className} inline-block rounded-xs shadow-2xs overflow-hidden shrink-0 border border-black/10`}
      aria-label="Flag of India"
    >
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#138808" />
      <g transform="translate(450, 300)">
        <circle r="78" fill="none" stroke="#000080" strokeWidth="6" />
        <circle r="16" fill="#000080" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={78 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={78 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="3.2"
          />
        ))}
      </g>
    </svg>
  );
}

export function BhutanFlagSvg({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className={`${className} inline-block rounded-xs shadow-2xs overflow-hidden shrink-0 border border-black/10`}
      aria-label="Flag of Bhutan"
    >
      {/* Upper Yellow */}
      <polygon points="0,600 0,0 900,0" fill="#FFCC00" />
      {/* Lower Orange */}
      <polygon points="0,600 900,0 900,600" fill="#FF4E12" />
      {/* Stylized White Dragon (Druk) */}
      <g fill="#FFFFFF" stroke="#1a1a1a" strokeWidth="3">
        {/* Dragon Spine/Body */}
        <path d="M 220 480 Q 280 430 350 440 Q 420 450 480 390 Q 540 330 600 310 Q 670 290 730 210 Q 710 180 670 190 Q 620 200 580 240 Q 520 300 460 310 Q 400 320 340 370 Q 270 420 220 480 Z" />
        {/* Head and Horns */}
        <path d="M 730 210 Q 770 180 800 195 Q 810 215 780 230 Q 750 240 720 235 Z" />
        <path d="M 760 185 Q 780 150 790 140 Q 775 160 765 180 Z" />
        <path d="M 775 190 Q 805 165 820 155 Q 800 175 785 195 Z" />
        {/* Claws & Sacred Jewels */}
        <circle cx="780" cy="270" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="2.5" />
        <circle cx="610" cy="370" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="2.5" />
        <circle cx="370" cy="480" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="2.5" />
        <circle cx="210" cy="520" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function NepalFlagSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 500 600" 
      className={`${className} inline-block overflow-visible shrink-0 drop-shadow-xs`}
      aria-label="Flag of Nepal"
    >
      {/* Outer Blue Border and Crimson Pennants */}
      <polygon points="20,580 20,20 440,240 180,240 440,580" fill="#003893" />
      <polygon points="40,550 40,50 390,230 160,230 390,550" fill="#DC143C" />
      
      {/* Moon Symbol in Upper Triangle */}
      <g fill="#FFFFFF" transform="translate(130, 160) scale(0.65)">
        <path d="M -50 0 A 50 50 0 0 0 50 0 A 40 40 0 0 1 -50 0 Z" />
        <circle cx="0" cy="15" r="16" />
      </g>

      {/* Sun Symbol in Lower Triangle */}
      <g fill="#FFFFFF" transform="translate(130, 410) scale(0.7)">
        <circle cx="0" cy="0" r="30" />
        {[...Array(12)].map((_, i) => (
          <polygon
            key={i}
            points="0,-50 10,-32 -10,-32"
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function GlobeFlagSvg({ className = "text-xl shrink-0" }: { className?: string }) {
  return (
    <span className={className} role="img" aria-label="All Destinations">
      🌍
    </span>
  );
}

export function CountryFlag({ 
  country, 
  className,
  size = "sm",
  showLabel = false,
  labelClassName = "text-xs font-bold text-neutral-800"
}: CountryFlagProps) {
  const norm = (country || "").toLowerCase().trim();

  let sizeClass = "w-5 h-3.5";
  if (size === "xs") sizeClass = "w-4 h-3";
  if (size === "md") sizeClass = "w-7 h-5";
  if (size === "lg") sizeClass = "w-9 h-6";

  const finalClass = className || sizeClass;

  let flagComponent = <GlobeFlagSvg className={finalClass} />;
  let labelText = "All Destinations";

  if (norm === "india" || norm === "in") {
    flagComponent = <IndiaFlagSvg className={finalClass} />;
    labelText = "India";
  } else if (norm === "bhutan" || norm === "bt") {
    flagComponent = <BhutanFlagSvg className={finalClass} />;
    labelText = "Bhutan";
  } else if (norm === "nepal" || norm === "np") {
    flagComponent = <NepalFlagSvg className={finalClass} />;
    labelText = "Nepal";
  }

  if (showLabel) {
    return (
      <span className="inline-flex items-center gap-1.5 align-middle">
        {flagComponent}
        <span className={labelClassName}>{labelText}</span>
      </span>
    );
  }

  return flagComponent;
}

export default CountryFlag;

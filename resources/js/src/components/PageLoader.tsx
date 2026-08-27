import React from "react";

// Suspense fallback shown for the brief moment a lazy-loaded route chunk is downloading.
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-10 h-10 rounded-full border-[3px] border-[#9C753B]/20 border-t-[#9C753B] animate-spin" />
    </div>
  );
}

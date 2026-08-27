import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  id?: string;
  value: string; // ISO "YYYY-MM-DD", or "" when nothing is selected yet
  onChange: (isoDate: string) => void;
  minDate?: string; // ISO "YYYY-MM-DD" — earliest selectable day
  placeholder?: string;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIso(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function buildMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// Fully custom-styled replacement for <input type="date"> — native date inputs render their
// own browser calendar-picker-indicator icon that can't be restyled and would sit on top of
// (or under) any decorative icon we draw, showing two calendar glyphs where only one actually
// opens anything. Building the trigger + dropdown ourselves means there's no native picker in
// the DOM at all, so only our on-brand calendar ever appears.
export default function CustomDatePicker({ id, value, onChange, minDate, placeholder = "Select a date" }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = useMemo(() => parseIso(value), [value]);
  const minDateObj = useMemo(() => parseIso(minDate || ""), [minDate]);

  const [viewYear, setViewYear] = useState(() => (selectedDate || minDateObj || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (selectedDate || minDateObj || new Date()).getMonth());

  // Re-anchor the visible month whenever the selected value changes from outside (e.g. the
  // booking page resets it on a fresh trip), so the calendar doesn't stay stuck on a stale month.
  useEffect(() => {
    const anchor = parseIso(value) || minDateObj || new Date();
    setViewYear(anchor.getFullYear());
    setViewMonth(anchor.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const weeks = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const todayIso = useMemo(() => toIso(new Date()), []);

  const goToPrevMonth = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
  };
  const goToNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const isPrevDisabled = minDateObj
    ? viewYear * 12 + viewMonth <= minDateObj.getFullYear() * 12 + minDateObj.getMonth()
    : false;

  const displayLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : placeholder;

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs text-left focus:outline-none transition-all cursor-pointer shadow-sm"
      >
        <span className={selectedDate ? "font-bold text-neutral-900" : "font-medium text-neutral-400"}>
          {displayLabel}
        </span>
        <Calendar className="w-4 h-4 text-[#9C753B] shrink-0" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="absolute left-0 z-50 mt-2 w-[300px] max-w-[90vw] bg-white border-2 border-neutral-200 rounded-2xl shadow-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={goToPrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 hover:bg-[#9C753B]/10 hover:text-[#9C753B] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black uppercase tracking-wider text-neutral-900">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Next month"
              className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 hover:bg-[#9C753B]/10 hover:text-[#9C753B] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAY_LABELS.map((label) => (
              <div key={label} className="text-center text-[10px] font-bold text-neutral-400 uppercase py-1">
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weeks.flatMap((week, weekIdx) =>
              week.map((date, dayIdx) => {
                if (!date) return <div key={`${weekIdx}-${dayIdx}`} />;
                const iso = toIso(date);
                const isDisabled = !!minDate && iso < minDate;
                const isSelected = iso === value;
                const isToday = iso === todayIso;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      onChange(iso);
                      setIsOpen(false);
                    }}
                    className={[
                      "aspect-square flex items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                      isSelected
                        ? "bg-[#9C753B] text-white shadow-sm"
                        : isDisabled
                        ? "text-neutral-300 cursor-not-allowed"
                        : "text-neutral-700 hover:bg-[#9C753B]/10 hover:text-[#9C753B]",
                      isToday && !isSelected ? "ring-1 ring-inset ring-[#9C753B]/50" : "",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

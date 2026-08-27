// Internal pricing markup — applied on top of the raw operator cost figures stored in the trip
// data files, without ever changing those underlying numbers. This is the single place the
// multiplier is defined, so every customer-facing price display (catalogue cards, trip hero,
// each package page's own fare calculator, and the Book Now page) stays consistent.
//
// Manali, Valley of Flowers, and Udaipur are excluded — their listed price is the real price.
const NO_MARKUP_TRIP_IDS = new Set(["manali", "valley-of-flowers", "udaipur-lakes"]);
const MARKUP_MULTIPLIER = 1.5;

export function applyMarkup(basePrice: number, tripId: string): number {
  if (NO_MARKUP_TRIP_IDS.has(tripId)) return basePrice;
  return Math.round(basePrice * MARKUP_MULTIPLIER);
}

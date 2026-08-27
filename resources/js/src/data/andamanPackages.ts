export interface AndamanHotelCategory {
  starRating: 2 | 3 | 4 | 5;
  categoryName: string; // e.g. "Standard Category (2 Star)", "Deluxe Category (3 Star)", "Premium Category (4 Star)", "Luxury Category (5 Star)"
  badgeLabel: string; // e.g. "BUDGET PACKAGE", "HOT SALE PACKAGE", "RECOMMENDED PACKAGE", "HIGH STANDARD PACKAGE"
  hotels: {
    location: string;
    hotelName: string;
    roomCategory: string;
    nights: number;
  }[];
  ferryType: string;
  pricing: Record<number | string, {
    selectedHotelCost: number;
    carCost: number;
    shipCost: number;
    ticketsCost: number;
    honeymoonSpecial?: number;
    serviceCharge: number;
    totalPrice: number;
    perPersonPrice: number;
  }>;
}

export interface AndamanPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nightsCount: number;
  daysCount: number;
  planType: "MAP" | "CP";
  destinationsCovered: string[];
  heroImage: string;
  badge: string;
  travoAssured: boolean;
  shortDescription: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
  categories: AndamanHotelCategory[];
}

export function buildPricingMap(nightsCount: number, starRating: 2 | 3 | 4 | 5, planType: "CP" | "MAP" = "CP"): Record<number | string, { selectedHotelCost: number; carCost: number; shipCost: number; ticketsCost: number; serviceCharge: number; totalPrice: number; perPersonPrice: number }> {
  const baseCpTotals: Record<number, Record<number, Record<number, number>>> = {
    2: { // 3D2N
      2: { 1: 9170, 2: 10400, 3: 13500, 4: 16200, 5: 19300, 6: 22000, 7: 25100, 8: 27800, 9: 35600, 10: 36200, 12: 40600 },
      3: { 1: 11170, 2: 12400, 3: 16500, 4: 20200, 5: 24300, 6: 28000, 7: 32100, 8: 35800, 9: 44600, 10: 44200, 12: 52600 },
      4: { 1: 18170, 2: 19400, 3: 23700, 4: 34200, 5: 38500, 6: 49000, 7: 53300, 8: 63800, 9: 66200, 10: 78200, 12: 94600 },
      5: { 1: 32170, 2: 33400, 3: 41700, 4: 62200, 5: 70500, 6: 91000, 7: 99300, 8: 119800, 9: 116600, 10: 112200, 12: 178600 }
    },
    3: { // 4D3N
      2: { 1: 17600, 2: 21700, 3: 28800, 4: 32000, 5: 37900, 6: 43500, 7: 49400, 8: 55000, 9: 78400, 10: 81500, 12: 84700 },
      3: { 1: 24600, 2: 29700, 3: 38700, 4: 43000, 5: 51650, 6: 60000, 7: 68650, 8: 77000, 9: 108100, 10: 117500, 12: 123700 },
      4: { 1: 32100, 2: 37200, 3: 48900, 4: 67000, 5: 81650, 6: 96000, 7: 110650, 8: 125000, 9: 138700, 10: 150500, 12: 177700 },
      5: { 1: 50100, 2: 55200, 3: 69300, 4: 115000, 5: 141650, 6: 168000, 7: 194650, 8: 221000, 9: 199900, 10: 193500, 12: 294700 }
    },
    4: { // 5D4N
      2: { 1: 20200, 2: 25100, 3: 32250, 4: 39200, 5: 46350, 6: 53400, 7: 60550, 8: 67600, 9: 98500, 10: 102500, 12: 109700 },
      3: { 1: 27000, 2: 32800, 3: 43800, 4: 54600, 5: 65600, 6: 76400, 7: 87400, 8: 98200, 9: 129100, 10: 135500, 12: 163700 },
      4: { 1: 41000, 2: 48000, 3: 66600, 4: 85000, 5: 103600, 6: 122000, 7: 140600, 8: 159000, 9: 174100, 10: 191500, 12: 229700 },
      5: { 1: 72000, 2: 80000, 3: 114600, 4: 149000, 5: 183600, 6: 218000, 7: 252600, 8: 287000, 9: 256000, 10: 247500, 12: 379700 }
    },
    5: { // 6D5N
      2: { 1: 24800, 2: 30800, 3: 39700, 4: 48600, 5: 57500, 6: 66400, 7: 75300, 8: 84200, 9: 114900, 10: 120200, 12: 144000 },
      3: { 1: 33800, 2: 40800, 3: 54700, 4: 68600, 5: 82500, 6: 96400, 7: 110300, 8: 124200, 9: 150000, 10: 158200, 12: 195000 },
      4: { 1: 52800, 2: 60800, 3: 84700, 4: 108600, 5: 132500, 6: 156400, 7: 180300, 8: 204200, 9: 205800, 10: 230200, 12: 288000 },
      5: { 1: 92800, 2: 101800, 3: 146200, 4: 190600, 5: 235000, 6: 279400, 7: 323800, 8: 368200, 9: 313200, 10: 303200, 12: 472000 }
    },
    6: { // 7D6N
      2: { 1: 28900, 2: 35500, 3: 45650, 4: 55800, 5: 65950, 6: 76100, 7: 86250, 8: 96400, 9: 133900, 10: 141200, 12: 169000 },
      3: { 1: 39800, 2: 47800, 3: 64100, 4: 80400, 5: 96700, 6: 113000, 7: 129300, 8: 145600, 9: 168100, 10: 190200, 12: 235000 },
      4: { 1: 62800, 2: 71800, 3: 100100, 4: 128400, 5: 156700, 6: 185000, 7: 213300, 8: 241600, 9: 242800, 10: 270200, 12: 340000 },
      5: { 1: 111800, 2: 121800, 3: 175100, 4: 228400, 5: 281700, 6: 335000, 7: 388300, 8: 441600, 9: 368200, 10: 356200, 12: 557000 }
    },
    7: { // 8D7N
      2: { 1: 33500, 2: 41200, 3: 53100, 4: 65000, 5: 76900, 6: 88800, 7: 100700, 8: 112600, 9: 159500, 10: 168200, 12: 198800 },
      3: { 1: 46800, 2: 55800, 3: 75000, 4: 94200, 5: 113400, 6: 132600, 7: 151800, 8: 171000, 9: 207200, 10: 221200, 12: 270800 },
      4: { 1: 74800, 2: 84800, 3: 118500, 4: 152200, 5: 185900, 6: 219600, 7: 253300, 8: 287000, 9: 283700, 10: 318200, 12: 396800 },
      5: { 1: 132800, 2: 143800, 3: 207000, 4: 270200, 5: 333400, 6: 396600, 7: 459800, 8: 523000, 9: 434300, 10: 421200, 12: 655800 }
    },
    8: { // 9D8N
      2: { 1: 37800, 2: 46500, 3: 60000, 4: 73500, 5: 87000, 6: 100500, 7: 114000, 8: 127500, 9: 174500, 10: 185200, 12: 219800 },
      3: { 1: 53200, 2: 63200, 3: 85050, 4: 106900, 5: 128750, 6: 150600, 7: 172450, 8: 194300, 9: 222200, 10: 238200, 12: 291800 },
      4: { 1: 85800, 2: 96800, 3: 135450, 4: 174100, 5: 212750, 6: 251400, 7: 290050, 8: 328700, 9: 312200, 10: 348200, 12: 435800 },
      5: { 1: 152800, 2: 164800, 3: 237450, 4: 310100, 5: 382750, 6: 455400, 7: 528050, 8: 600700, 9: 476600, 10: 460200, 12: 719000 }
    },
    9: { // 10D9N
      2: { 1: 43000, 2: 52800, 3: 68100, 4: 83400, 5: 98700, 6: 114000, 7: 129300, 8: 144600, 9: 220000, 10: 227500, 12: 232600 },
      3: { 1: 60800, 2: 71800, 3: 96600, 4: 121400, 5: 146200, 6: 171000, 7: 195800, 8: 220600, 9: 267700, 10: 275200, 12: 288200 },
      4: { 1: 98800, 2: 110800, 3: 155100, 4: 199400, 5: 243700, 6: 288000, 7: 332300, 8: 376600, 9: 344200, 10: 351700, 12: 380400 },
      5: { 1: 175800, 2: 188800, 3: 272100, 4: 355400, 5: 438700, 6: 522000, 7: 605300, 8: 688600, 9: 494800, 10: 502300, 12: 483400 }
    },
    10: { // 11D10N
      2: { 1: 47200, 2: 58000, 3: 74850, 4: 91700, 5: 108550, 6: 125400, 7: 142250, 8: 159100, 9: 240000, 10: 246600, 12: 284800 },
      3: { 1: 67000, 2: 79000, 3: 106350, 4: 133700, 5: 161050, 6: 188400, 7: 215750, 8: 243100, 9: 287700, 10: 310200, 12: 344800 },
      4: { 1: 109000, 2: 122000, 3: 170850, 4: 219700, 5: 268550, 6: 317400, 7: 366250, 8: 415100, 9: 364200, 10: 396600, 12: 470800 },
      5: { 1: 194000, 2: 208000, 3: 299850, 4: 391700, 5: 483550, 6: 575400, 7: 667250, 8: 759100, 9: 514800, 10: 529100, 12: 729400 }
    }
  };

  const paxList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  const mapSurplusPerPaxPerNight = 500; // MAP Dinner surcharge per pax per night

  const tierTotals = baseCpTotals[nightsCount]?.[starRating] || baseCpTotals[2][3];

  const result: Record<number | string, any> = {};

  paxList.forEach(pax => {
    let cpTotal = tierTotals[pax];
    if (!cpTotal) {
      const rate8 = tierTotals[8] || tierTotals[6] || tierTotals[4];
      cpTotal = Math.round((rate8 / 8) * pax * 0.98);
    }

    const total = planType === "MAP" ? cpTotal + (pax * nightsCount * mapSurplusPerPaxPerNight) : cpTotal;
    const perPerson = Math.round(total / pax);

    const hotelCost = Math.round(total * 0.55);
    const carCost = Math.round(total * 0.20);
    const shipCost = Math.round(total * 0.15);
    const ticketsCost = Math.round(total * 0.05);
    const serviceCharge = Math.round(total * 0.05);

    result[pax] = {
      selectedHotelCost: hotelCost,
      carCost,
      shipCost,
      ticketsCost,
      serviceCharge,
      totalPrice: total,
      perPersonPrice: perPerson
    };
  });

  return result;
}

export const ANDAMAN_PACKAGES: AndamanPackage[] = [
  // =========================================================================
  // MAP PLAN PACKAGES (Breakfast & Dinner Included)
  // =========================================================================
  {
    id: "andaman-rush-3d2n",
    title: "Andaman Rush Expedition",
    subtitle: "Port Blair, Ross & North Bay",
    duration: "3 Days / 2 Nights",
    daysCount: 3,
    nightsCount: 2,
    planType: "CP",
    badge: "ISLAND GETAWAY",
    travoAssured: false,
    destinationsCovered: ["Port Blair", "Ross Island (Netaji Subhash Chandra Bose Island)", "North Bay Island"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Ideal short island retreat covering Cellular Jail, Corbyn's Cove Beach, Light & Sound show, and speed boat trips to Ross & North Bay Islands with MAP Meal Plan.",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Historic City Sightseeing",
        activities: [
          "Airport pickup & drop to hotel (Airport Meet & Greet)",
          "Complimentary welcome drinks at check-in",
          "After lunch sightseeing tour around Port Blair",
          "Visit Cellular Jail (National Memorial)",
          "Visit Corbyn's Cove Beach with complimentary photoshoot",
          "Attend the inspiring Light & Sound Show at Cellular Jail",
          "Hotel drop for overnight stay"
        ]
      },
      {
        day: 2,
        title: "Trip to Ross Island + North Bay Island",
        activities: [
          "After breakfast pickup from hotel",
          "Transfer to water sports complex & speed boat to Ross Island",
          "Explore Ross Island's historic ruins, nature trails & friendly deer",
          "Transfer by speed boat to North Bay Island (Coral Island)",
          "Sightseeing - Light House & water sports hub",
          "Plenty of activities available (Scuba, Sea Walk, Jet Ski - On site cash booking)",
          "Return from North Bay to Port Blair & visit Marina Park",
          "Hotel drop for overnight stay"
        ]
      },
      {
        day: 3,
        title: "Return with Sweet Island Memories",
        activities: [
          "Breakfast & checkout from hotel",
          "Airport drop (reach 2 hours prior to flight timing)",
          "Fly home with sweet memories of the Bay of Bengal"
        ]
      }
    ],
    inclusions: [
      "ACCOMMODATION: Selected room tier on double sharing basis",
      "MEAL PLAN: (MAP) Breakfast & Dinner included in all hotels",
      "PRIVATE CAB: AC Cab for all airport pickups/drops + point-to-point sightseeing",
      "OTHER INCLUSIONS: Speed boat cost + Permits + Parking charges",
      "GST & GOVT TAXES: 100% Included (No hidden extra costs)",
      "TICKETS: Light & Sound Show, Ross & North Bay Speed Boat",
      "Complimentary Airport Meet & Greet + Welcome Drinks",
      "Complimentary Beach Photography at Corbyn's Cove",
      "24*7 On-Call Island Concierge Support during the trip"
    ],
    exclusions: [
      "Flight tickets to/from Port Blair",
      "Vehicle at disposal outside itinerary routing",
      "Lunch & personal laundry charges",
      "Telephone calls, internet, alcoholic & non-alcoholic beverages",
      "Optional water activities (Sea Walk, Scuba, Jet Ski)",
      "Gala dinner charges during Christmas & New Year (if requested by hotel at check-in)"
    ],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest / Equivalent", roomCategory: "AC Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 5000, carCost: 3000, shipCost: 0, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 10670, perPersonPrice: 10670 },
          2: { selectedHotelCost: 5000, carCost: 3000, shipCost: 0, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 11900, perPersonPrice: 5950 },
          3: { selectedHotelCost: 8000, carCost: 3000, shipCost: 0, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 13000, perPersonPrice: 4333 },
          4: { selectedHotelCost: 10000, carCost: 3000, shipCost: 0, ticketsCost: 4700, serviceCharge: 1500, totalPrice: 19200, perPersonPrice: 4800 },
          5: { selectedHotelCost: 13000, carCost: 3000, shipCost: 0, ticketsCost: 5900, serviceCharge: 1500, totalPrice: 23400, perPersonPrice: 4680 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International / Equivalent", roomCategory: "Premium Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 7000, carCost: 3000, shipCost: 0, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 12670, perPersonPrice: 12670 },
          2: { selectedHotelCost: 7000, carCost: 3000, shipCost: 0, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 13900, perPersonPrice: 6950 },
          3: { selectedHotelCost: 11000, carCost: 3000, shipCost: 0, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 19000, perPersonPrice: 6333 },
          4: { selectedHotelCost: 14000, carCost: 3000, shipCost: 0, ticketsCost: 4700, serviceCharge: 1500, totalPrice: 23200, perPersonPrice: 5800 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) / Equivalent", roomCategory: "Premium Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 15500, carCost: 3000, shipCost: 0, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 21170, perPersonPrice: 21170 },
          2: { selectedHotelCost: 15500, carCost: 3000, shipCost: 0, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 22400, perPersonPrice: 11200 },
          3: { selectedHotelCost: 20500, carCost: 3000, shipCost: 0, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 28500, perPersonPrice: 9500 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (Pool & Beach Property)", roomCategory: "Standard Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 36000, carCost: 3000, shipCost: 0, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 41670, perPersonPrice: 41670 },
          2: { selectedHotelCost: 36000, carCost: 3000, shipCost: 0, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 42900, perPersonPrice: 21450 },
          3: { selectedHotelCost: 47000, carCost: 3000, shipCost: 0, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 55000, perPersonPrice: 18333 }
        }
      }
    ]
  },
  {
    id: "andaman-dream-4d3n",
    title: "Andaman Dream Vacation",
    subtitle: "Port Blair & Havelock Island",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    planType: "CP",
    badge: "HOT SELLER",
    travoAssured: false,
    destinationsCovered: ["Port Blair (1N)", "Swaraj Dweep / Havelock Island (2N)"],
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Experience Havelock Island's world-famous Radhanagar Beach, Elephant Beach complimentary snorkeling, Kalapathar Beach, and Cellular Jail.",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Transfer to Havelock Island",
        activities: [
          "Airport pickup & transfer to Port Blair Jetty",
          "Private Cruise journey from Port Blair to Havelock Island",
          "Havelock Jetty pickup & check-in to beachside resort",
          "Trip to Radhanagar Beach (Asia's 7th best beach)",
          "Enjoy the turquoise sea, soft sand & sunset",
          "Return to hotel for overnight stay"
        ]
      },
      {
        day: 2,
        title: "Trip to Elephant Beach (Snorkeling) + Kalapathar Beach",
        activities: [
          "After breakfast pickup from hotel",
          "Speed boat transfer to Elephant Beach",
          "Complimentary Snorkeling session with certified instructors",
          "Trip to Kalapathar Beach for scenic photography",
          "Return to hotel for overnight stay"
        ]
      },
      {
        day: 3,
        title: "Return Cruise to Port Blair & City Sightseeing",
        activities: [
          "After breakfast checkout from Havelock hotel",
          "Return cruise to Port Blair & hotel check-in",
          "Visit Cellular Jail (National Memorial)",
          "Visit Corbyn's Cove Beach & Light & Sound Show",
          "Return to hotel for overnight stay"
        ]
      },
      {
        day: 4,
        title: "Departure with Unforgettable Memories",
        activities: [
          "Checkout from hotel after breakfast",
          "Airport drop (2 hours prior to flight)",
          "Fly home with sweet memories"
        ]
      }
    ],
    inclusions: [
      "ACCOMMODATION: 1N Port Blair + 2N Havelock Island on double sharing",
      "MEAL PLAN: Selected Plan (CP / MAP)",
      "PRIVATE CAB: AC Cab for all pickup/drop + sightseeing",
      "PRIVATE CRUISE: Govt. Ferry / Green Ocean / Nautika / Makruzz ticket included",
      "TICKETS: Light & Sound Show + Elephant Beach Speed Boat",
      "Complimentary Airport Meet & Greet + Welcome Drinks",
      "Complimentary Photography at Corbyn's Cove Beach",
      "Complimentary Snorkeling at Elephant Beach with gear",
      "24*7 On-Call Island Concierge Support"
    ],
    exclusions: [
      "Flight tickets",
      "Vehicle at disposal outside itinerary schedule",
      "Personal laundry & extra drinks"
    ],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest / Equivalent", roomCategory: "AC Room (1 Night)", nights: 1 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna / Equivalent", roomCategory: "AC Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 8500, carCost: 6000, shipCost: 2800, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 20100, perPersonPrice: 20100 },
          2: { selectedHotelCost: 9000, carCost: 6000, shipCost: 5600, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 24700, perPersonPrice: 12350 },
          3: { selectedHotelCost: 13500, carCost: 6000, shipCost: 8400, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 33300, perPersonPrice: 11100 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International / Equivalent", roomCategory: "Premium Room (1 Night)", nights: 1 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort", roomCategory: "Deluxe Room (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 14500, carCost: 6000, shipCost: 3800, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 27100, perPersonPrice: 27100 },
          2: { selectedHotelCost: 15000, carCost: 6000, shipCost: 7600, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 32700, perPersonPrice: 16350 },
          3: { selectedHotelCost: 21000, carCost: 6000, shipCost: 11400, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 43800, perPersonPrice: 14600 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property)", roomCategory: "Premium Room (1 Night)", nights: 1 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (Pool & Beach)", roomCategory: "Havelock Plaza (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 22000, carCost: 6000, shipCost: 3800, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 34600, perPersonPrice: 34600 },
          2: { selectedHotelCost: 22500, carCost: 6000, shipCost: 7600, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 40200, perPersonPrice: 20100 },
          3: { selectedHotelCost: 30000, carCost: 6000, shipCost: 11400, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 52800, perPersonPrice: 17600 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair", roomCategory: "Standard Room (1 Night)", nights: 1 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (Pool & Beach)", roomCategory: "Nicobari Cottage (2 Nights)", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 41000, carCost: 6000, shipCost: 3800, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 53600, perPersonPrice: 53600 },
          2: { selectedHotelCost: 41500, carCost: 6000, shipCost: 7600, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 59200, perPersonPrice: 29600 },
          3: { selectedHotelCost: 52000, carCost: 6000, shipCost: 11400, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 74800, perPersonPrice: 24933 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-5d4n",
    title: "Andaman Island Triangle",
    subtitle: "Port Blair, Havelock & Neil Island",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    planType: "CP",
    badge: "RECOMMENDED",
    travoAssured: false,
    destinationsCovered: ["Port Blair (1N)", "Havelock Island (2N)", "Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "The flagship 3-island circuit covering Port Blair, Havelock Island & Neil Island with complimentary snorkeling and MAP Meal Plan.",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Transfer to Havelock Island",
        activities: ["Airport pickup & jetty transfer", "Cruise to Havelock Island", "Check-in to resort & visit Radhanagar Beach sunset"]
      },
      {
        day: 2,
        title: "Elephant Beach Snorkeling & Kalapathar Beach",
        activities: ["Speed boat to Elephant Beach", "Complimentary Snorkeling with certified guide", "Visit Kalapathar Beach"]
      },
      {
        day: 3,
        title: "Cruise to Shaheed Dweep (Neil Island)",
        activities: ["Ferry transfer to Neil Island", "Visit Lakshmanpur Beach, Bharatpur Beach & Natural Bridge sunset"]
      },
      {
        day: 4,
        title: "Return to Port Blair & City Sightseeing",
        activities: ["Return ferry to Port Blair", "Cellular Jail national memorial, Corbyn's Cove Beach & Light/Sound Show"]
      },
      {
        day: 5,
        title: "Airport Drop & Departure",
        activities: ["Checkout & transfer to Port Blair Airport (IXZ)"]
      }
    ],
    inclusions: [
      "ACCOMMODATION: 1N Port Blair + 2N Havelock + 1N Neil Island",
      "MEAL PLAN: (MAP) Breakfast & Dinner Included in all hotels",
      "PRIVATE CAB: AC Cab for all transfers & sightseeing",
      "CRUISE: Nautika / Makruzz / Govt Ferry tickets",
      "TICKETS: Light & Sound Show, Elephant Beach Speed Boat",
      "Complimentary Snorkeling at Elephant Beach",
      "24*7 On-Call Concierge Support"
    ],
    exclusions: ["Flight tickets", "Lunches & personal beverages", "Extra water activities"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (1N)", roomCategory: "AC Room", nights: 1 },
          { location: "Havelock", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 10500, carCost: 8000, shipCost: 4200, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 25500, perPersonPrice: 25500 },
          2: { selectedHotelCost: 11000, carCost: 8000, shipCost: 8400, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 31500, perPersonPrice: 15750 },
          3: { selectedHotelCost: 15500, carCost: 8000, shipCost: 12600, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 41500, perPersonPrice: 13833 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (1N)", roomCategory: "Premium Room", nights: 1 },
          { location: "Havelock", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 17000, carCost: 8000, shipCost: 5700, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 33500, perPersonPrice: 33500 },
          2: { selectedHotelCost: 17500, carCost: 8000, shipCost: 11400, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 41000, perPersonPrice: 20500 },
          3: { selectedHotelCost: 24000, carCost: 8000, shipCost: 17100, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 54500, perPersonPrice: 18166 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (1N)", roomCategory: "Premium Room", nights: 1 },
          { location: "Havelock", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Havelock Plaza", nights: 2 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 28000, carCost: 8000, shipCost: 5700, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 44500, perPersonPrice: 44500 },
          2: { selectedHotelCost: 28500, carCost: 8000, shipCost: 11400, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 52000, perPersonPrice: 26000 },
          3: { selectedHotelCost: 38000, carCost: 8000, shipCost: 17100, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 68500, perPersonPrice: 22833 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Havelock", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 52000, carCost: 8000, shipCost: 5700, ticketsCost: 1300, serviceCharge: 1500, totalPrice: 68500, perPersonPrice: 68500 },
          2: { selectedHotelCost: 52500, carCost: 8000, shipCost: 11400, ticketsCost: 2600, serviceCharge: 1500, totalPrice: 76000, perPersonPrice: 38000 },
          3: { selectedHotelCost: 65000, carCost: 8000, shipCost: 17100, ticketsCost: 3900, serviceCharge: 1500, totalPrice: 95500, perPersonPrice: 31833 }
        }
      }
    ]
  },


  {
    id: "andaman-exotic-6d5n",
    title: "Andaman Island Explorer",
    subtitle: "Port Blair, Havelock & Neil",
    duration: "6 Days / 5 Nights",
    daysCount: 6,
    nightsCount: 5,
    planType: "CP",
    badge: "ISLAND EXPLORER",
    travoAssured: false,
    destinationsCovered: ["Port Blair (3N)", "Swaraj Dweep / Havelock (1N)", "Shaheed Dweep / Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Balanced 6-day itinerary covering Ross & North Bay Islands, Cellular Jail, Havelock Island, and Neil Island with CP Meal Plan.",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Tour Around",
        activities: [
          "Airport Pickup & Drop to Hotel",
          "After lunch sightseeing: Cellular Jail & Corbyn's Cove Beach",
          "Lights & Sound Show at Cellular Jail",
          "Hotel drop for overnight stay"
        ]
      },
      {
        day: 2,
        title: "Trip to Ross Island & North Bay Island",
        activities: [
          "After breakfast pickup & transfer to Ross Island (Haunting Beauty)",
          "Transfer to North Bay Island (Light House & Water Sports)",
          "Return to Port Blair, visit Marina Park & Flag Point",
          "Hotel drop for overnight stay"
        ]
      },
      {
        day: 3,
        title: "Trip to Swaraj Dweep (Havelock Island)",
        activities: [
          "Take packed breakfast & checkout from hotel",
          "Cruise to Havelock Island & hotel check-in",
          "Trip to Kalapathar Beach & Radhanagar Beach",
          "Return to hotel & stay overnight"
        ]
      },
      {
        day: 4,
        title: "Trip to Shaheed Dweep (Neil Island)",
        activities: [
          "After breakfast pickup & ferry transfer to Neil Island",
          "Visit Lakshmanpur Beach, Bharatpur Beach & Natural Bridge",
          "Return to hotel & stay overnight"
        ]
      },
      {
        day: 5,
        title: "Return to Port Blair & Chidiya Tapu Sunset",
        activities: [
          "After breakfast pickup & return ferry to Port Blair",
          "Hotel check-in & evening visit to Chidiya Tapu Beach (Sunset Point)",
          "Return to hotel & stay overnight"
        ]
      },
      {
        day: 6,
        title: "Return with Sweet Memories",
        activities: [
          "Checkout from hotel after breakfast",
          "Airport drop (reach 2 hours prior to flight)",
          "Fly home with sweet memories"
        ]
      }
    ],
    inclusions: [
      "ACCOMMODATION: 3N Port Blair + 1N Havelock + 1N Neil Island",
      "MEAL PLAN: (CP) Breakfast Included in all hotels/resorts",
      "PRIVATE CAB: 1 AC Cab for pickup/drop & sightseeing per point basis",
      "PRIVATE CRUISE: Govt. Ferry / Green Ocean / Nautika / Makruzz",
      "TICKETS: Light & Sound Show, Ross & North Bay Speed Boat",
      "Complimentary Airport Meet & Greet + Welcome Drinks",
      "Complimentary Photography at Corbyn's Cove Beach",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch + Dinner + Laundry charges",
      "Personal expenses & additional water sports"
    ],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (3N)", roomCategory: "AC Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (1N)", roomCategory: "AC Room", nights: 1 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 10000, carCost: 9500, shipCost: 4200, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 26370, perPersonPrice: 26370 },
          2: { selectedHotelCost: 10000, carCost: 9500, shipCost: 8400, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 31800, perPersonPrice: 15900 },
          3: { selectedHotelCost: 15000, carCost: 9500, shipCost: 12600, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 42100, perPersonPrice: 14033 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (3N)", roomCategory: "Premium Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (1N)", roomCategory: "Deluxe Room", nights: 1 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 15500, carCost: 9500, shipCost: 5700, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 33370, perPersonPrice: 33370 },
          2: { selectedHotelCost: 15500, carCost: 9500, shipCost: 11400, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 40300, perPersonPrice: 20150 },
          3: { selectedHotelCost: 22200, carCost: 9500, shipCost: 17100, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 53800, perPersonPrice: 17933 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (3N)", roomCategory: "Premium Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Havelock Plaza", nights: 1 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 31000, carCost: 9500, shipCost: 5700, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 48870, perPersonPrice: 48870 },
          2: { selectedHotelCost: 31000, carCost: 9500, shipCost: 11400, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 55800, perPersonPrice: 27900 },
          3: { selectedHotelCost: 40800, carCost: 9500, shipCost: 17100, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 72400, perPersonPrice: 24133 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (3N)", roomCategory: "Standard Room", nights: 3 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (1N)", roomCategory: "Nicobari Cottage", nights: 1 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 61600, carCost: 9500, shipCost: 5700, ticketsCost: 1170, serviceCharge: 1500, totalPrice: 79470, perPersonPrice: 79470 },
          2: { selectedHotelCost: 61600, carCost: 9500, shipCost: 11400, ticketsCost: 2400, serviceCharge: 1500, totalPrice: 86400, perPersonPrice: 43200 },
          3: { selectedHotelCost: 76600, carCost: 9500, shipCost: 17100, ticketsCost: 3500, serviceCharge: 1500, totalPrice: 108200, perPersonPrice: 36066 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-7d6n",
    title: "Andaman Grand Island & Baratang Caves",
    subtitle: "Port Blair, Baratang, Havelock & Neil",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    planType: "CP",
    badge: "GRAND CIRCUIT",
    travoAssured: false,
    destinationsCovered: ["Port Blair (3N)", "Baratang Lime Caves", "Havelock Island (2N)", "Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "7-day grand archipelago tour featuring Baratang Island Lime Caves trekking, Havelock Island (2N), Neil Island (1N) & Port Blair with CP Meal Plan.",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Tour Around",
        activities: ["Airport pickup & hotel check-in", "Cellular Jail National Memorial & Corbyn's Cove Beach", "Light & Sound Show at Cellular Jail"]
      },
      {
        day: 2,
        title: "Baratang Island Lime Caves Trekking",
        activities: ["Early morning AC Car pickup to Baratang through tribal reserve", "Speed boat through mangrove creeks & Lime Caves trekking", "Return to Port Blair hotel for overnight stay"]
      },
      {
        day: 3,
        title: "Transfer to Swaraj Dweep (Havelock Island)",
        activities: ["Take packed breakfast & ferry transfer to Havelock Island", "Visit Kalapathar Beach & Radhanagar Beach (Asia's #7 Beach)"]
      },
      {
        day: 4,
        title: "Trip to Elephant Beach (Snorkeling)",
        activities: ["Speed boat transfer to Elephant Beach", "Complimentary Snorkeling with certified instructor & water activities"]
      },
      {
        day: 5,
        title: "Trip to Shaheed Dweep (Neil Island)",
        activities: ["Ferry transfer to Neil Island", "Visit Lakshmanpur Beach, Bharatpur Beach & Natural Bridge"]
      },
      {
        day: 6,
        title: "Return to Port Blair & Chidiya Tapu Sunset",
        activities: ["Return ferry to Port Blair", "Evening visit to Chidiya Tapu Beach (Sunset Point)"]
      },
      {
        day: 7,
        title: "Return with Sweet Memories",
        activities: ["Checkout & airport drop 2 hours prior to flight"]
      }
    ],
    inclusions: [
      "ACCOMMODATION: 3N Port Blair + 2N Havelock + 1N Neil Island",
      "MEAL PLAN: (CP) Breakfast Included in all hotels",
      "PRIVATE CAB: 1 AC Cab for pickup/drop & sightseeing per point basis",
      "PRIVATE CRUISE: Govt. Ferry / Green Ocean / Nautika / Makruzz",
      "TICKETS: Light & Sound Show, Baratang Lime Cave Speed Boat, Elephant Beach Speed Boat",
      "Complimentary Airport Meet & Greet + Welcome Drinks",
      "Complimentary Photography at Corbyn's Cove Beach",
      "Complimentary Snorkeling at Elephant Beach",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: ["Flight tickets", "Lunch + Dinner + Laundry", "Personal expenses"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (3N)", roomCategory: "AC Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 12000, carCost: 14500, shipCost: 4200, ticketsCost: 2200, serviceCharge: 1500, totalPrice: 34400, perPersonPrice: 34400 },
          2: { selectedHotelCost: 12000, carCost: 14500, shipCost: 8400, ticketsCost: 4400, serviceCharge: 1500, totalPrice: 40800, perPersonPrice: 20400 },
          3: { selectedHotelCost: 18000, carCost: 14500, shipCost: 12600, ticketsCost: 6600, serviceCharge: 1500, totalPrice: 53200, perPersonPrice: 17733 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (3N)", roomCategory: "Premium Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 20000, carCost: 14500, shipCost: 5700, ticketsCost: 2200, serviceCharge: 1500, totalPrice: 43900, perPersonPrice: 43900 },
          2: { selectedHotelCost: 20000, carCost: 14500, shipCost: 11400, ticketsCost: 4400, serviceCharge: 1500, totalPrice: 51800, perPersonPrice: 25900 },
          3: { selectedHotelCost: 27900, carCost: 14500, shipCost: 17100, ticketsCost: 6600, serviceCharge: 1500, totalPrice: 67600, perPersonPrice: 22533 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (3N)", roomCategory: "Premium Room", nights: 3 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Havelock Plaza", nights: 2 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 37500, carCost: 14500, shipCost: 5700, ticketsCost: 2200, serviceCharge: 1500, totalPrice: 61400, perPersonPrice: 61400 },
          2: { selectedHotelCost: 37500, carCost: 14500, shipCost: 11400, ticketsCost: 4400, serviceCharge: 1500, totalPrice: 69300, perPersonPrice: 34650 },
          3: { selectedHotelCost: 49800, carCost: 14500, shipCost: 17100, ticketsCost: 6600, serviceCharge: 1500, totalPrice: 89500, perPersonPrice: 29833 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise (Base seat)",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (3N)", roomCategory: "Standard Room", nights: 3 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 73600, carCost: 14500, shipCost: 5700, ticketsCost: 2200, serviceCharge: 1500, totalPrice: 97500, perPersonPrice: 97500 },
          2: { selectedHotelCost: 73600, carCost: 14500, shipCost: 11400, ticketsCost: 4400, serviceCharge: 1500, totalPrice: 105400, perPersonPrice: 52700 },
          3: { selectedHotelCost: 91600, carCost: 14500, shipCost: 17100, ticketsCost: 6600, serviceCharge: 1500, totalPrice: 131300, perPersonPrice: 43766 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-8d7n",
    title: "Andaman Island Circuit & Baratang",
    subtitle: "Complete 4-Island Route",
    duration: "8 Days / 7 Nights",
    daysCount: 8,
    nightsCount: 7,
    planType: "CP",
    badge: "BESTSELLER",
    travoAssured: false,
    destinationsCovered: ["Port Blair (4N)", "Ross & North Bay", "Baratang", "Havelock Island (2N)", "Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Comprehensive 8-day island circuit covering Ross & North Bay, Baratang Lime Caves, Havelock (2N), Neil Island (1N) & Port Blair.",
    itinerary: [
      { day: 1, title: "Arrival at Port Blair & Tour Around", activities: ["Airport pickup, Cellular Jail, Corbyn's Cove Beach & Light/Sound Show"] },
      { day: 2, title: "Trip to Ross Island & North Bay", activities: ["Speed boat to Ross Island ruins & North Bay Coral Island", "Marina Park visit"] },
      { day: 3, title: "Trip to Baratang Lime Caves", activities: ["Early AC car drive to Baratang, speed boat to Lime Caves trekking"] },
      { day: 4, title: "Trip to Swaraj Dweep (Havelock Island)", activities: ["Cruise to Havelock, Kalapathar Beach & Radhanagar Beach sunset"] },
      { day: 5, title: "Trip to Elephant Beach (Snorkeling)", activities: ["Speed boat to Elephant Beach with complimentary Snorkeling"] },
      { day: 6, title: "Trip to Shaheed Dweep (Neil Island)", activities: ["Ferry to Neil Island, Lakshmanpur Beach, Bharatpur Beach & Natural Bridge"] },
      { day: 7, title: "Return to Port Blair & Chidiya Tapu", activities: ["Return ferry to Port Blair, Chidiya Tapu sunset point"] },
      { day: 8, title: "Return Fly Home", activities: ["Checkout & airport drop"] }
    ],
    inclusions: [
      "ACCOMMODATION: 4N Port Blair + 2N Havelock + 1N Neil Island",
      "MEAL PLAN: Selected Plan (CP / MAP)",
      "PRIVATE CAB: 1 AC Cab for pickup/drop & sightseeing per point basis",
      "PRIVATE CRUISE: Govt. Ferry / Green Ocean / Nautika / Makruzz",
      "TICKETS: Light & Sound Show, Ross & North Bay, Baratang Lime Cave, Elephant Beach",
      "Complimentary Meet & Greet, Welcome Drinks, Corbyn's Cove Photo & Snorkeling",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: ["Flight tickets", "Personal laundry & extra drinks", "Personal expenses"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (4N)", roomCategory: "AC Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 13500, carCost: 15000, shipCost: 4200, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 37270, perPersonPrice: 37270 },
          2: { selectedHotelCost: 13500, carCost: 15000, shipCost: 8400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 44600, perPersonPrice: 22300 },
          3: { selectedHotelCost: 20500, carCost: 15000, shipCost: 12600, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 58800, perPersonPrice: 19600 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 22500, carCost: 15000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 47770, perPersonPrice: 47770 },
          2: { selectedHotelCost: 22500, carCost: 15000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 56600, perPersonPrice: 28300 },
          3: { selectedHotelCost: 31900, carCost: 15000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 74700, perPersonPrice: 24900 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Havelock Plaza", nights: 2 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 43500, carCost: 15000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 68770, perPersonPrice: 68770 },
          2: { selectedHotelCost: 43500, carCost: 15000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 77600, perPersonPrice: 38800 },
          3: { selectedHotelCost: 57400, carCost: 15000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 100200, perPersonPrice: 33400 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (4N)", roomCategory: "Standard Room", nights: 4 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 86600, carCost: 15000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 111870, perPersonPrice: 111870 },
          2: { selectedHotelCost: 86600, carCost: 15000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 120700, perPersonPrice: 60350 },
          3: { selectedHotelCost: 107600, carCost: 15000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 150400, perPersonPrice: 50133 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-9d8n",
    title: "Andaman Island Odyssey & Sitapur",
    subtitle: "Neil Island Sunrise Special",
    duration: "9 Days / 8 Nights",
    daysCount: 9,
    nightsCount: 8,
    planType: "CP",
    badge: "SPECIAL ODYSSEY",
    travoAssured: false,
    destinationsCovered: ["Port Blair (4N)", "Baratang", "Havelock Island (2N)", "Neil Island (2N - Sitapur Beach)"],
    heroImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "9-day complete island odyssey featuring 2 nights in Neil Island with Sitapur Beach sunrise, Baratang Lime Caves, Havelock & Port Blair.",
    itinerary: [
      { day: 1, title: "Arrival at Port Blair & Tour Around", activities: ["Airport pickup, Cellular Jail, Corbyn's Cove Beach & Light/Sound Show"] },
      { day: 2, title: "Trip to Ross Island & North Bay", activities: ["Ross Island & North Bay Coral Reef speed boat trip, Marina Park"] },
      { day: 3, title: "Trip to Baratang Lime Caves", activities: ["Early AC car to Baratang, speed boat to Lime Caves trekking"] },
      { day: 4, title: "Trip to Swaraj Dweep (Havelock Island)", activities: ["Cruise to Havelock, Kalapathar Beach & Radhanagar Beach"] },
      { day: 5, title: "Trip to Elephant Beach (Snorkeling)", activities: ["Speed boat to Elephant Beach & complimentary Snorkeling"] },
      { day: 6, title: "Trip to Shaheed Dweep (Neil Island)", activities: ["Ferry to Neil Island, Lakshmanpur Beach & Bharatpur Beach"] },
      { day: 7, title: "Trip to Sitapur Beach Sunrise & Natural Bridge", activities: ["Early morning car pickup for Sitapur Beach Sunrise", "Evening sightseeing at Natural Bridge"] },
      { day: 8, title: "Return to Port Blair & Chidiya Tapu", activities: ["Return ferry to Port Blair, Chidiya Tapu sunset point"] },
      { day: 9, title: "Return Fly Home", activities: ["Checkout & airport drop"] }
    ],
    inclusions: [
      "ACCOMMODATION: 4N Port Blair + 2N Havelock + 2N Neil Island",
      "MEAL PLAN: Selected Plan (CP / MAP)",
      "PRIVATE CAB: 1 AC Cab for pickup/drop & sightseeing per point basis",
      "PRIVATE CRUISE: Govt. Ferry / Green Ocean / Nautika / Makruzz",
      "TICKETS: Light & Sound Show, Ross & North Bay, Baratang, Elephant Beach",
      "Complimentary Meet & Greet, Welcome Drinks, Corbyn's Cove Photo & Snorkeling",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: ["Flight tickets", "Personal laundry & extra drinks", "Personal expenses"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (4N)", roomCategory: "AC Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Neil Island", hotelName: "Purnima Resort (2N)", roomCategory: "Deluxe Room", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 16500, carCost: 16500, shipCost: 4200, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 41770, perPersonPrice: 41770 },
          2: { selectedHotelCost: 16500, carCost: 16500, shipCost: 8400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 49100, perPersonPrice: 24550 },
          3: { selectedHotelCost: 24500, carCost: 16500, shipCost: 12600, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 64300, perPersonPrice: 21433 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (2N)", roomCategory: "Premium Room", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 25500, carCost: 16500, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 52270, perPersonPrice: 52270 },
          2: { selectedHotelCost: 25500, carCost: 16500, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 61100, perPersonPrice: 30550 },
          3: { selectedHotelCost: 35900, carCost: 16500, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 80200, perPersonPrice: 26733 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Lagoon Plaza", nights: 2 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Neil Plaza", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 49500, carCost: 16500, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 76270, perPersonPrice: 76270 },
          2: { selectedHotelCost: 49500, carCost: 16500, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 85100, perPersonPrice: 42550 },
          3: { selectedHotelCost: 65900, carCost: 16500, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 110200, perPersonPrice: 36733 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (4N)", roomCategory: "Standard Room", nights: 4 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Neil Island", hotelName: "SeaShell Neil (2N)", roomCategory: "Andaman Cottage", nights: 2 }
        ],
        pricing: {
          1: { selectedHotelCost: 96700, carCost: 16500, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 123470, perPersonPrice: 123470 },
          2: { selectedHotelCost: 96700, carCost: 16500, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 132300, perPersonPrice: 66150 },
          3: { selectedHotelCost: 120700, carCost: 16500, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 165000, perPersonPrice: 55000 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-10d9n",
    title: "Andaman Full North-South Circuit & Diglipur",
    subtitle: "Diglipur & Pristine Beach Special",
    duration: "10 Days / 9 Nights",
    daysCount: 10,
    nightsCount: 9,
    planType: "CP",
    badge: "FULL ARCHIPELAGO",
    travoAssured: false,
    destinationsCovered: ["Port Blair (4N)", "Diglipur (1N)", "Rangat (1N)", "Havelock Island (2N)", "Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "North & South Andaman complete circuit covering Diglipur market, Pristine Beach, Ross & Smith Hotel, Rangat, Havelock & Neil with CP Meal Plan.",
    itinerary: [
      { day: 1, title: "Arrival at Port Blair & Tour Around", activities: ["Airport pickup, Cellular Jail, Corbyn's Cove & Light/Sound Show"] },
      { day: 2, title: "Trip to Ross Island & North Bay", activities: ["Ross Island ruins & North Bay Coral Island speed boat trip, Marina Park"] },
      { day: 3, title: "Trip to Baratang & Diglipur", activities: ["Early AC car drive to Baratang, Lime Stone Caves, proceed to Diglipur"] },
      { day: 4, title: "Diglipur Tour", activities: ["Diglipur market, local beaches & sites, Pristine Beach Resort"] },
      { day: 5, title: "Diglipur to Rangat & Return to Port Blair", activities: ["Visit Morich Dera Beach, Danni Nala Boardwalk, Panchwatti Beach, Chidiya Tapu"] },
      { day: 6, title: "Cruise to Swaraj Dweep (Havelock Island)", activities: ["Cruise to Havelock, Kalapathar Beach & Radhanagar Beach"] },
      { day: 7, title: "Trip to Elephant Beach (Snorkeling)", activities: ["Speed boat to Elephant Beach & complimentary Snorkeling"] },
      { day: 8, title: "Trip to Shaheed Dweep (Neil Island)", activities: ["Ferry to Neil Island, Lakshmanpur Beach, Bharatpur Beach & Natural Bridge"] },
      { day: 9, title: "Return to Port Blair & City Tour", activities: ["Return ferry to Port Blair, city sightseeing & shopping"] },
      { day: 10, title: "Return Fly Home", activities: ["Checkout & airport drop"] }
    ],
    inclusions: [
      "ACCOMMODATION: 4N Port Blair + 1N Diglipur + 1N Rangat + 2N Havelock + 1N Neil Island",
      "MEAL PLAN: (CP) Breakfast Included in all hotels",
      "PRIVATE CAB: 1 AC Cab for full North-South Andaman route",
      "PRIVATE CRUISE: All inter-island ferries & speed boats included",
      "TICKETS: Light & Sound Show, Ross & North Bay, Baratang, Elephant Beach",
      "Complimentary Meet & Greet, Welcome Drinks, Corbyn's Cove Photo & Snorkeling",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: ["Flight tickets", "Lunch + Dinner + Laundry", "Personal expenses"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (4N)", roomCategory: "AC Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 22500, carCost: 31000, shipCost: 4200, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 62270, perPersonPrice: 62270 },
          2: { selectedHotelCost: 22500, carCost: 31000, shipCost: 8400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 69600, perPersonPrice: 34800 },
          3: { selectedHotelCost: 30000, carCost: 31000, shipCost: 12600, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 84300, perPersonPrice: 28100 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 31500, carCost: 31000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 72770, perPersonPrice: 72770 },
          2: { selectedHotelCost: 31500, carCost: 31000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 81600, perPersonPrice: 40800 },
          3: { selectedHotelCost: 41400, carCost: 31000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 100200, perPersonPrice: 33400 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Havelock Plaza", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 52500, carCost: 31000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 93770, perPersonPrice: 93770 },
          2: { selectedHotelCost: 52500, carCost: 31000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 102600, perPersonPrice: 51300 },
          3: { selectedHotelCost: 66900, carCost: 31000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 125700, perPersonPrice: 41900 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (4N)", roomCategory: "Standard Room", nights: 4 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 95600, carCost: 31000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 136870, perPersonPrice: 136870 },
          2: { selectedHotelCost: 95600, carCost: 31000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 145700, perPersonPrice: 72850 },
          3: { selectedHotelCost: 117100, carCost: 31000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 175900, perPersonPrice: 58633 }
        }
      }
    ]
  },
  {
    id: "andaman-exotic-11d10n",
    title: "Andaman Ultimate Grand Archipelago",
    subtitle: "Ultimate Island Expedition",
    duration: "11 Days / 10 Nights",
    daysCount: 11,
    nightsCount: 10,
    planType: "CP",
    badge: "ULTIMATE EXPEDITION",
    travoAssured: false,
    destinationsCovered: ["Port Blair (4N)", "Diglipur (1N)", "Rangat (1N)", "Havelock Island (2N)", "Neil Island (1N)"],
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "The grandest 11-day Andaman adventure spanning Port Blair, Ross & North Bay, Baratang Lime Caves, Diglipur, Rangat, Havelock & Neil with CP Meal Plan.",
    itinerary: [
      { day: 1, title: "Arrival at Port Blair & City Sightseeing", activities: ["Airport pickup, room decoration, Cellular Jail & Corbyn's Cove"] },
      { day: 2, title: "Ross Island & North Bay Coral Island", activities: ["Speed boat trip to Ross Island ruins & North Bay coral reefs"] },
      { day: 3, title: "Road Expedition to Baratang & Diglipur", activities: ["AC car journey to Baratang, Lime Stone Caves, proceed to Diglipur"] },
      { day: 4, title: "Diglipur Tour & Local Sites", activities: ["Diglipur market, local beaches & Pristine Beach Resort"] },
      { day: 5, title: "Diglipur to Rangat Excursion", activities: ["Morich Dera Beach, Danni Nala Boardwalk, Panchwatti Beach"] },
      { day: 6, title: "Return to Port Blair & Chidiya Tapu", activities: ["Return journey to Port Blair, sunset at Chidiya Tapu Beach"] },
      { day: 7, title: "Cruise to Swaraj Dweep (Havelock Island)", activities: ["Private cruise to Havelock, Kalapathar & Radhanagar Beach"] },
      { day: 8, title: "Elephant Beach Snorkeling", activities: ["Speed boat trip to Elephant Beach with complimentary Snorkeling"] },
      { day: 9, title: "Shaheed Dweep (Neil Island)", activities: ["Cruise to Neil Island, Lakshmanpur, Bharatpur Beach & Natural Bridge"] },
      { day: 10, title: "Return to Port Blair & City Tour", activities: ["Return ferry to Port Blair, souvenirs & local city tour"] },
      { day: 11, title: "Return Fly Home", activities: ["Checkout & airport drop"] }
    ],
    inclusions: [
      "ACCOMMODATION: 4N Port Blair + 1N Diglipur + 1N Rangat + 2N Havelock + 1N Neil Island",
      "MEAL PLAN: (CP) Breakfast Included in all hotels",
      "PRIVATE CAB: 1 AC Cab for full 11-day North-South Andaman route",
      "PRIVATE CRUISE: All inter-island ferries & speed boats included",
      "TICKETS: Light & Sound Show, Ross & North Bay, Baratang, Elephant Beach",
      "Complimentary Meet & Greet, Welcome Drinks, Corbyn's Cove Photo & Snorkeling",
      "24*7 On-Call Support during the trip"
    ],
    exclusions: ["Flight tickets", "Lunch + Dinner + Laundry", "Personal expenses"],
    categories: [
      {
        starRating: 2,
        categoryName: "Standard Category (2 Star)",
        badgeLabel: "BUDGET PACKAGE",
        ferryType: "GOVT. Ferry / Green Ocean Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Urben Forest (4N)", roomCategory: "AC Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Hotel Radhakrishna (2N)", roomCategory: "AC Room", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Purnima Resort (1N)", roomCategory: "Deluxe Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 25000, carCost: 32000, shipCost: 4200, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 65770, perPersonPrice: 65770 },
          2: { selectedHotelCost: 25000, carCost: 32000, shipCost: 8400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 73100, perPersonPrice: 36550 },
          3: { selectedHotelCost: 36000, carCost: 32000, shipCost: 12600, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 91300, perPersonPrice: 30433 }
        }
      },
      {
        starRating: 3,
        categoryName: "Deluxe Category (3 Star)",
        badgeLabel: "HOT SALE PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hotel NK International (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Shangrilas Beach Resort (2N)", roomCategory: "Deluxe Room", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Hotel CS Empire (1N)", roomCategory: "Premium Room", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 34000, carCost: 32000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 76270, perPersonPrice: 76270 },
          2: { selectedHotelCost: 34000, carCost: 32000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 85100, perPersonPrice: 42550 },
          3: { selectedHotelCost: 47400, carCost: 32000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 107200, perPersonPrice: 35733 }
        }
      },
      {
        starRating: 4,
        categoryName: "Premium Category (4 Star)",
        badgeLabel: "RECOMMENDED PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "Hill Top (Pool Property) (4N)", roomCategory: "Premium Room", nights: 4 },
          { location: "Havelock Island", hotelName: "Aquays Hotel & Resort (2N)", roomCategory: "Havelock Plaza", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "Aquays Hotel & Resort (1N)", roomCategory: "Neil Plaza", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 55000, carCost: 32000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 97270, perPersonPrice: 97270 },
          2: { selectedHotelCost: 55000, carCost: 32000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 106100, perPersonPrice: 53050 },
          3: { selectedHotelCost: 72900, carCost: 32000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 133700, perPersonPrice: 44566 }
        }
      },
      {
        starRating: 5,
        categoryName: "Luxury Category (5 Star)",
        badgeLabel: "HIGH STANDARD PACKAGE",
        ferryType: "Nautika Cruise / Makruzz Cruise",
        hotels: [
          { location: "Port Blair", hotelName: "SeaShell Port Blair (4N)", roomCategory: "Standard Room", nights: 4 },
          { location: "Havelock Island", hotelName: "SeaShell Havelock (2N)", roomCategory: "Nicobari Cottage", nights: 2 },
          { location: "Diglipur", hotelName: "Pristine Beach Resort (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Rangat", hotelName: "Ross & Smith Hotel (1N)", roomCategory: "Standard Room", nights: 1 },
          { location: "Neil Island", hotelName: "SeaShell Neil (1N)", roomCategory: "Andaman Cottage", nights: 1 }
        ],
        pricing: {
          1: { selectedHotelCost: 98100, carCost: 32000, shipCost: 5700, ticketsCost: 3070, serviceCharge: 1500, totalPrice: 140370, perPersonPrice: 140370 },
          2: { selectedHotelCost: 98100, carCost: 32000, shipCost: 11400, ticketsCost: 6200, serviceCharge: 1500, totalPrice: 149200, perPersonPrice: 74600 },
          3: { selectedHotelCost: 123100, carCost: 32000, shipCost: 17100, ticketsCost: 9200, serviceCharge: 1500, totalPrice: 182900, perPersonPrice: 60966 }
        }
      }
    ]
  }
];

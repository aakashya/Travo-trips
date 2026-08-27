export interface NepalHotelTier {
  tierId: string;
  categoryName: string; // e.g., "3★ Standard", "3★ Deluxe", "4★ Standard", "4★ Deluxe", "5★ Standard", "5★ Deluxe"
  starRating: 3 | 4 | 5;
  badgeLabel: string;
  hotels: string[];
  pricingByPax: {
    paxSlab: "2-3 PAX" | "4-5 PAX" | "10-12 PAX" | "17-20 PAX" | "26-30 PAX";
    minPax: number;
    maxPax: number;
    pricePerPerson: number;
  }[];
}

export interface NepalPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  daysCount: number;
  nightsCount: number;
  badge: string;
  validityOffer: string;
  heroImage: string;
  destinationsCovered: string[];
  shortDescription: string;
  flightSupplementNote?: string;
  optionalEverestFlight?: {
    name: string;
    timing: string;
    costInr: number;
  };
  itinerary: {
    day: number;
    title: string;
    timingSummary?: string;
    activities: string[];
  }[];
  vehicleAllocation: {
    paxRange: string;
    vehicleName: string;
    capacity: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  keyHighlights: string[];
  importantNotes: string[];
  paymentPolicy: {
    installment: string;
    percentage: string;
    timing: string;
  }[];
  hotelTiers: NepalHotelTier[];
}

export const NEPAL_VEHICLE_DETAILS = [
  { paxRange: "2 – 3 PAX", vehicleName: "Swift Dzire or similar (AC)", capacity: "4 Seats" },
  { paxRange: "4 – 5 PAX", vehicleName: "Mahindra Scorpio (AC)", capacity: "7 Seats" },
  { paxRange: "6 – 12 PAX", vehicleName: "Toyota Hiace (AC)", capacity: "14 Seats" },
  { paxRange: "13 – 20 PAX", vehicleName: "Toyota Coaster (AC)", capacity: "22 Seats" },
  { paxRange: "20 – 35 PAX", vehicleName: "Sutlej Coach (AC)", capacity: "35–37 Seats" }
];

export const NEPAL_PAYMENT_POLICY = [
  { installment: "1st Advance", percentage: "25%", timing: "At the time of confirmation" },
  { installment: "2nd Installment", percentage: "25%", timing: "15 days prior to check-in" },
  { installment: "Final Balance", percentage: "50%", timing: "7 days prior to check-in" }
];

export const NEPAL_GENERAL_NOTES = [
  "Rates are subject to room availability at the time of confirmation.",
  "Monument entrance fees & cable car tickets are directly payable by guest (can be arranged on request at additional cost).",
  "Flight tickets are always subject to live seat availability and airline schedule changes.",
  "Vehicle is point-to-point as per the itinerary (not at disposal for unlisted personal detours).",
  "Category of rooms in the packages is standard base category unless upgraded.",
  "Sightseeing durations: Half-day ~03 hours | Full-day ~06 hours.",
  "Hotel Check-in is 13:00 hrs / Check-out is 11:00 hrs.",
  "IMPORTANT CURRENCY LAW: INR 200, 500, and 2000 denomination Indian currency notes are strictly banned in Nepal by law. Do not carry these denominations. INR 100 notes & digital payments / cards are accepted.",
  "DMC operates hassle-free tours under standard conditions. Natural calamities, weather, or government flight delays are managed with immediate local assistance."
];

export const NEPAL_PACKAGES: NepalPackage[] = [
  // 1. Temple Valley Kathmandu 2N/3D
  {
    id: "nepal-temple-valley-kathmandu-3d2n",
    title: "Temple Valley Kathmandu 🇳🇵",
    subtitle: "Pashupatinath, Boudhanath, Swayambhunath & Kathmandu Durbar Square",
    duration: "3 Days / 2 Nights",
    daysCount: 3,
    nightsCount: 2,
    badge: "SPIRITUAL & CULTURAL",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Pashupatinath Temple (Lord Shiva Jyotirlinga)",
      "Boudhanath Stupa (Mandala Stupa)",
      "Swayambhunath (Monkey Temple)",
      "Kathmandu Durbar Square & Kumari Ghar"
    ],
    shortDescription: "A short yet deeply fulfilling cultural and spiritual journey through the holy valley of Kathmandu, featuring UNESCO World Heritage shrines, sacred Bagmati river rituals, and historic royal palaces.",
    optionalEverestFlight: {
      name: "Everest Scenic Mountain Flight (KTM - KTM)",
      timing: "06:00 AM Departure",
      costInr: 9500
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu & Welcome Briefing",
        timingSummary: "Representative Meet & Greet with Traditional Khada Welcome",
        activities: [
          "Our representative will meet and greet you at Tribhuvan International Airport (Kathmandu) with traditional Khada welcome.",
          "Private AC transfer to your selected hotel with assisted check-in.",
          "At 06:00 PM: Short tour briefing by TRAVO representative at hotel (if arriving after 4:00 PM, briefing held at 09:00 AM on Day 2).",
          "Evening free to explore the vibrant markets of Thamel or relax at the hotel."
        ]
      },
      {
        day: 2,
        title: "Full Day Kathmandu World Heritage Sightseeing",
        timingSummary: "10:00 AM to 04:30 PM (Optional 06:00 AM Everest Flight)",
        activities: [
          "(Optional) 06:00 AM: Early morning Everest Mountain Flight for breathtaking close-up views of Mt. Everest, Lhotse & Makalu.",
          "Delicious breakfast at hotel.",
          "10:00 AM: Visit sacred Pashupatinath Temple on the banks of holy Bagmati River (492 temples, 15 Shiva shrines & 12 Jyotirlingas).",
          "Visit Boudhanath Stupa – one of the largest spherical stupas in South Asia and heart of Tibetan Buddhism.",
          "Visit Swayambhunath (Monkey Temple) perched on a hilltop offering 360-degree panoramic views of Kathmandu Valley.",
          "Explore Kathmandu Durbar Square – Hanuman Dhoka royal palace, Taleju Temple, Kasthamandap, and Kumari Bahal (home of the Living Goddess).",
          "Drop back to hotel for restful overnight stay."
        ]
      },
      {
        day: 3,
        title: "Kathmandu Final Departure",
        timingSummary: "Airport Transfer 3 Hours Prior to Flight",
        activities: [
          "Breakfast at hotel & leisurely morning for shopping Nepali pashminas, tea, and handicrafts.",
          "Check out from hotel by 11:00 AM.",
          "Private AC transfer to Kathmandu Tribhuvan International Airport 3 hours prior to scheduled flight timing.",
          "Board flight with sacred blessings and divine memories of Nepal."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "2 Nights hotel accommodation with daily breakfast",
      "Traditional welcome at airport with Khada",
      "Arrival and departure airport transfers by private AC vehicle",
      "Full-day Kathmandu sightseeing by private AC vehicle as per group size",
      "Comprehensive tour briefing upon arrival",
      "All applicable Nepal government taxes"
    ],
    exclusions: [
      "International / Domestic Airfare",
      "Monument entrance fees & temple permits (Direct payable)",
      "Optional Everest Mountain Flight (₹9,500 / person)",
      "Lunches, dinners, and personal expenses",
      "Travel insurance and tips"
    ],
    keyHighlights: [
      "UNESCO World Heritage Pashupatinath & Boudhanath Stupa",
      "Hilltop panoramic vistas from historic Swayambhunath",
      "Living Goddess (Kumari) tradition at Kathmandu Durbar Square",
      "Comfortable private AC vehicle throughout the tour"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BUDGET CHOICE",
        hotels: ["Yellow Pagoda", "Satkar Hotel & Spa", "Hotel Mudita", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 8500 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 8000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 7000 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 6800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 6700 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "POPULAR DELUXE",
        hotels: ["Grand Hotel", "Hotel Marshyangdi 3* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 8700 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 8200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 7200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 7000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 6900 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "COMFORT PLUS",
        hotels: ["Hotel Mulberry 4*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 9600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 9200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 8200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 8100 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 8000 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM STAY",
        hotels: ["Ramada Encore", "Hotel Shambhala 4* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 10100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 9600 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 8600 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 8400 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 8300 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place", "The Yak & Yeti 5*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 14700 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 14200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 13100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 13000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 11900 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL HERITAGE",
        hotels: ["Hyatt Regency", "The Soaltee 5* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 16600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 16200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 15100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 15000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 14900 }
        ]
      }
    ]
  },

  // 2. Kathmandu on Top & Chandragiri 3N/4D
  {
    id: "nepal-kathmandu-chandragiri-4d3n",
    title: "Kathmandu on Top & Chandragiri 🚠",
    subtitle: "Kathmandu Heritage, Jal Narayan & Chandragiri Hill Cable Car",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    badge: "PANORAMIC MOUNTAIN VIEWS",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Pashupatinath Temple",
      "Boudhanath Stupa",
      "Budhanilkantha Temple (Sleeping Jal Narayan)",
      "Chandragiri Hill Cable Car (2,551m altitude)",
      "Swayambhunath Monkey Temple"
    ],
    shortDescription: "Experience ancient Himalayan spirituality and soaring cable car rides to the summit of Chandragiri Hill for sweeping vistas of the Ganesh and Langtang mountain ranges.",
    optionalEverestFlight: {
      name: "Everest Mountain Flight",
      timing: "06:00 AM Departure",
      costInr: 9500
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu & Welcome Briefing",
        timingSummary: "Khada Welcome & Hotel Check-in",
        activities: [
          "Arrival at Tribhuvan International Airport; meet our representative with traditional Khada scarf welcome.",
          "Private AC transfer to hotel.",
          "Evening briefing at 06:00 PM regarding the 4-day itinerary and logistics.",
          "Rest of the evening at leisure to discover local cuisine and artisanal shops in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Full Day Kathmandu Sightseeing & Budhanilkantha",
        timingSummary: "10:00 AM Departure",
        activities: [
          "(Optional) 06:00 AM Everest Scenic Mountain Flight.",
          "Breakfast at hotel.",
          "Visit holy Pashupatinath Temple complex on Bagmati River.",
          "Visit Boudhanath Stupa with chanting Tibetan monks and spinning prayer wheels.",
          "Drive to Budhanilkantha Temple (Jal Narayan) at the foot of Shivpuri Hills – witnessing the 5-meter single rock black granite idol of Lord Vishnu reclining on cosmic serpents in a holy pool.",
          "Visit Swayambhunath Stupa (Monkey Temple) overlooking the entire Kathmandu valley.",
          "Return to hotel for overnight stay."
        ]
      },
      {
        day: 3,
        title: "Full Day Chandragiri Hill Cable Car Excursion",
        timingSummary: "Mountain Top Fort & Panoramic Views",
        activities: [
          "Breakfast at hotel.",
          "Scenic drive towards south-west Kathmandu to Chandragiri Cable Car base station.",
          "Take the thrilling 2.5 km Gondola Cable Car ride ascending through lush pine forests to Chandragiri Hill summit (2,551m).",
          "Enjoy majestic panoramic views of Ganesh Himal, Manaslu, Langtang, and Mt. Everest on clear days.",
          "Visit Bhaleshwor Mahadev Temple on the hilltop and explore the historical 11th-century fort ruins & royal park.",
          "Descend via cable car and drive back to Kathmandu for overnight stay."
        ]
      },
      {
        day: 4,
        title: "Kathmandu Final Departure",
        timingSummary: "Airport Transfer 3 Hours Prior",
        activities: [
          "Breakfast at hotel.",
          "Free morning for souvenir shopping or personal exploration.",
          "Assisted checkout and private AC transfer to Kathmandu airport 3 hours before flight."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "3 Nights hotel accommodation with daily breakfast",
      "Traditional welcome with Khada at airport",
      "Private AC vehicle transfers for airport pickup, drop, and sightseeing",
      "Full-day Kathmandu sightseeing and full-day Chandragiri transfer",
      "Tour orientation briefing",
      "All government taxes included"
    ],
    exclusions: [
      "Chandragiri Cable Car ticket (Directly payable at ticket counter / on request)",
      "Monument entrance fees and camera charges",
      "Everest mountain flight optional add-on",
      "Meals not mentioned in inclusions"
    ],
    keyHighlights: [
      "High altitude panoramic cable car at Chandragiri Hill",
      "Reclining cosmic Vishnu statue at Budhanilkantha (Jal Narayan)",
      "Pashupatinath & Boudhanath sacred shrines",
      "Stunning views of Ganesh and Langtang mountain peaks"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BUDGET VALUE",
        hotels: ["Yellow Pagoda", "Satkar Hotel & Spa", "Hotel Mudita", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 11500 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 10500 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 8500 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 8400 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 8200 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE COMFORT",
        hotels: ["Grand Hotel", "Hotel Marshyangdi 3* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 12100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 11100 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 9200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 9000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 8800 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR CHOICE",
        hotels: ["Hotel Mulberry", "Crown Imperial 4*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 13000 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 11900 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 10100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 9900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 9600 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM DELUXE",
        hotels: ["Ramada Encore", "Hotel Shambhala 4* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 14100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 13200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 11300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 11100 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 10900 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place", "The Yak & Yeti 5*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 21100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 20100 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 18200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 18100 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 17800 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "GRAND LUXURY",
        hotels: ["Hyatt Regency", "The Soaltee 5* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 24100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 23100 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 21200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 21100 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 20800 }
        ]
      }
    ]
  },

  // 3. Kathmandu & Nagarkot Everest Sunrise 4N/5D
  {
    id: "nepal-kathmandu-nagarkot-5d4n",
    title: "Kathmandu & Nagarkot Everest Sunrise 🌄",
    subtitle: "Bhaktapur, Changu Narayan UNESCO Temple, Nagarkot Panoramic Peaks & Patan",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    badge: "HIMALAYAN SUNRISE",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Nagarkot Viewpoint (2,195m)",
      "Changu Narayan Temple (Oldest temple in Nepal)",
      "Bhaktapur Durbar Square (City of Devotees)",
      "Patan Durbar Square",
      "Pashupatinath & Boudhanath"
    ],
    shortDescription: "Witness the golden sunrise lighting up the world's highest Himalayan peaks from Nagarkot hill ridge (2,195m), paired with medieval Newari pottery art and palace courtyards in Bhaktapur.",
    optionalEverestFlight: {
      name: "Everest Mountain Flight",
      timing: "06:00 AM Departure",
      costInr: 9500
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu & Welcome",
        activities: [
          "Meet and greet at Kathmandu airport with Khada.",
          "Transfer to hotel in private AC vehicle.",
          "Evening tour briefing at 06:00 PM.",
          "Overnight stay in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Changu Narayan, Bhaktapur & Nagarkot Hill Excursion",
        activities: [
          "Breakfast at hotel.",
          "Drive 22 km east to Changu Narayan Temple – the oldest Hindu temple in Nepal perched on a forested hill with 5th-century stone inscriptions (UNESCO 1979).",
          "Explore medieval Bhaktapur Durbar Square – 55 Window Palace, Golden Gate, Nyatapola Temple (highest pagoda in Nepal), and traditional pottery square.",
          "Drive to Nagarkot hill viewpoint (2,195m) for panoramic sunset over the central Himalayas.",
          "Drive back to Kathmandu for overnight stay."
        ]
      },
      {
        day: 3,
        title: "Kathmandu Valley & Patan Heritage Tour",
        activities: [
          "Breakfast at hotel.",
          "Visit Patan Durbar Square – royal residence of Malla kings, Krishna Mandir, Golden Temple (Hiranyavarna Mahavihar), and intricate bronze museum courtyards.",
          "Visit Swayambhunath (Monkey Temple) with sweeping valley panoramas.",
          "Explore Kathmandu Durbar Square and Taleju Temple.",
          "Overnight stay in Kathmandu."
        ]
      },
      {
        day: 4,
        title: "Half Day Holy Temples Sightseeing",
        activities: [
          "Breakfast at hotel.",
          "Half-day spiritual sightseeing of Pashupatinath Temple and Boudhanath Stupa.",
          "Afternoon free for personal leisure, relaxing at spa, or shopping in Thamel.",
          "Overnight stay in Kathmandu."
        ]
      },
      {
        day: 5,
        title: "Final Departure",
        activities: [
          "Breakfast at hotel.",
          "Morning free for packing and souvenirs.",
          "Transfer to Kathmandu airport 3 hours before flight schedule."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "4 Nights accommodation with daily breakfast",
      "Welcome by Khada at airport",
      "Private AC vehicle transfers for all days as per group size",
      "Full-day Bhaktapur & Nagarkot excursion + Kathmandu & Patan sightseeing",
      "All applicable taxes"
    ],
    exclusions: [
      "Monument fees and Nagarkot entry permits",
      "Meals other than breakfast",
      "Personal expenses & tipping"
    ],
    keyHighlights: [
      "Golden Himalayan sunrise from Nagarkot (2,195m)",
      "UNESCO ancient marvel of Changu Narayan & Bhaktapur",
      "Intricate metalwork and palaces of Patan Durbar Square",
      "Full spiritual immersion at Pashupatinath"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BUDGET CHOICE",
        hotels: ["Yellow Pagoda & Spa", "Hotel Mudita", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 13600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 12400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 10200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 9900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 9600 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE STAY",
        hotels: ["Grand Hotel", "Hotel Marshyangdi 3* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 14400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 13200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 11000 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 10800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 10500 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR VALUE",
        hotels: ["Hotel Mulberry", "Crown Imperial 4*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 16400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 15200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 13000 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 12800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 12500 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "EXECUTIVE LUXURY",
        hotels: ["Ramada Encore", "Hotel Shambhala 4* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 17600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 16400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 14200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 14000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 13700 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place", "The Yak & Yeti 5*", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 26400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 25200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 23000 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 22800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 22500 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL LUXURY",
        hotels: ["Hyatt Regency", "The Soaltee 5* Deluxe", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 29200 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 28000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 25800 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 25600 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 25300 }
        ]
      }
    ]
  },

  // 4. Nepal Twin Valley: Kathmandu & Pokhara 4N/5D
  {
    id: "nepal-twin-valley-5d4n",
    title: "Nepal Twin Valley: Kathmandu & Pokhara 🏔️",
    subtitle: "Kathmandu Temples, Manakamana Cable Car, Peace Stupa & Phewa Lake",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    badge: "BESTSELLER TOUR",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Manakamana Temple (Wish-fulfilling Goddess)",
      "Pokhara Valley & Phewa Lake",
      "World Peace Pagoda (Shanti Stupa)",
      "Devi's Falls (Patale Chhango)",
      "Gupteshwor Mahadev Cave",
      "Seti River Gorge"
    ],
    shortDescription: "The classic Nepal holiday pairing Kathmandu's sacred temples with the serene alpine beauty of Pokhara, boating on Phewa Lake beneath the sacred Fishtail (Machhapuchhre) peak.",
    flightSupplementNote: "Optional Kathmandu to Pokhara return flight ticket: ₹5,500 / person",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu & Half Day Sightseeing",
        activities: [
          "Airport pickup by representative with Khada welcome.",
          "Transfer to hotel and check-in.",
          "Half-day holy sightseeing of Boudhanath Stupa and Pashupatinath Temple.",
          "Evening tour briefing at 06:00 PM; overnight stay in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Kathmandu to Pokhara Drive via Manakamana Temple",
        activities: [
          "Breakfast at hotel; begin scenic drive along the Trishuli River highway (approx. 200 km / 6-7 hrs).",
          "Stop en-route at Kurintar for thrilling Cable Car ride to holy Manakamana Temple (1,302m) overlooking Trishuli and Marshyangdi river valleys.",
          "Continue drive into the magical valley of Pokhara.",
          "Check in to Pokhara hotel and enjoy evening stroll along lakeside; overnight in Pokhara."
        ]
      },
      {
        day: 3,
        title: "Full Day Pokhara Valley Sightseeing & Lake Boating",
        activities: [
          "Breakfast at hotel.",
          "Visit World Peace Pagoda (Shanti Stupa at 1,100m) with sweeping views of Annapurna massif and Machhapuchhre.",
          "Scenic boat ride on crystal clear Phewa Lake, visiting island temple Tal Barahi Mandir.",
          "Visit Seti River Gorge cutting deep through the city with milky white waters.",
          "Explore Devi's Falls (Patale Chhango underground waterfall) and Gupteshwor Mahadev Cave.",
          "Visit historic Bindhyabasini Temple in Old Pokhara; overnight in Pokhara."
        ]
      },
      {
        day: 4,
        title: "Pokhara to Kathmandu Scenic Drive",
        activities: [
          "Breakfast at hotel.",
          "Scenic return drive back to Kathmandu through Himalayan foothills and riverside valleys (approx. 8 hrs).",
          "Check in to Kathmandu hotel; free evening for shopping souvenirs in Thamel; overnight in Kathmandu."
        ]
      },
      {
        day: 5,
        title: "Final Departure",
        activities: [
          "Breakfast at hotel.",
          "Leisure morning; airport transfer 3 hours prior to flight timing."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "4 Nights accommodation (2N Kathmandu + 2N Pokhara) with breakfast",
      "Welcome by Khada at airport",
      "All intercity transfers and sightseeing by private AC vehicle as per group size",
      "Full tour briefing upon arrival",
      "All applicable taxes"
    ],
    exclusions: [
      "Manakamana Cable Car ticket (Direct payable)",
      "Monument fees, boating charges, and personal expenses",
      "Optional Pokhara flight upgrade (₹5,500 / person)"
    ],
    keyHighlights: [
      "Phewa Lake boat ride with reflection of Mt. Machhapuchhre",
      "Manakamana wish-fulfilling temple cable car",
      "Spiritual energy at Peace Pagoda and Gupteshwor Cave",
      "Scenic highway journey following the roaring Trishuli River"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BUDGET BESTSELLER",
        hotels: ["Yellow Pagoda & Spa (KTM)", "Hotel Murano (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 17300 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 15200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 11300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 10900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 10400 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE COMFORT",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Batika Resort 3* Dlx (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 18100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 16000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 12100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 11700 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 11200 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR RESORT",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Lake View 4* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 20100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 18000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 14100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 13700 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 13200 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM DELUXE",
        hotels: ["Hotel Shambhala (KTM)", "Hotel Barahi 4* Deluxe (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 20300 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 19200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 15300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 14900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 14400 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Fishtail Lodge 5* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 30100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 28000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 24100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 23700 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 23200 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL RESORT",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Dorje Spa 5* Deluxe (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 30900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 28800 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 24900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 24500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 24000 }
        ]
      }
    ]
  },

  // 5. Nepal Twin Valley Grand: Kathmandu & Pokhara 5N/6D
  {
    id: "nepal-twin-valley-6d5n",
    title: "Nepal Twin Valley Grand: Kathmandu & Pokhara 🏔️",
    subtitle: "Patan Durbar Square, Sarangkot Sunrise, Phewa Lake & Flight Return to KTM",
    duration: "6 Days / 5 Nights",
    daysCount: 6,
    nightsCount: 5,
    badge: "DELUXE LEISURE",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Patan Durbar Square & Swayambhunath",
      "Manakamana Temple Cable Car",
      "Pokhara Valley & Phewa Lake",
      "Sarangkot Sunrise (Annapurna, Dhaulagiri & Fishtail)",
      "Seti River Gorge & Devi's Falls"
    ],
    shortDescription: "An extended, relaxed expedition across Kathmandu and Pokhara featuring Patan's Malla art, early morning Himalayan sunrise from Sarangkot, and a quick flight back to Kathmandu with leisure time.",
    flightSupplementNote: "Includes Pokhara to Kathmandu domestic flight / Return ticket supplement ₹5,500",
    optionalEverestFlight: {
      name: "Everest Scenic Mountain Flight",
      timing: "06:00 AM Departure",
      costInr: 9800
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu & Welcome",
        activities: [
          "Representative welcome at Kathmandu airport with Khada.",
          "Hotel transfer and check-in.",
          "06:00 PM briefing; evening free in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Full Day Kathmandu & Patan Durbar Square Sightseeing",
        activities: [
          "(Optional) 06:00 AM Everest Scenic Mountain Flight.",
          "Breakfast at hotel.",
          "Visit sacred Pashupatinath Temple and towering Boudhanath Stupa.",
          "Explore Swayambhunath (Monkey Temple).",
          "Visit ancient Patan Durbar Square – royal baths, Keshav Narayan Chowk, and Golden Temple.",
          "Overnight in Kathmandu."
        ]
      },
      {
        day: 3,
        title: "Kathmandu to Pokhara Drive via Manakamana",
        activities: [
          "Breakfast at hotel; scenic drive through lush hills to Pokhara.",
          "En-route visit to Manakamana Temple via cable car.",
          "Arrive in Pokhara, check in to hotel, and enjoy sunset by Phewa Lake; overnight in Pokhara."
        ]
      },
      {
        day: 4,
        title: "Sarangkot Sunrise & Full Day Pokhara Sightseeing",
        activities: [
          "05:30 AM: Drive to Sarangkot height for iconic sunrise over Annapurna I, Annapurna South, Dhaulagiri, Fishtail & Manaslu.",
          "Return to hotel for breakfast.",
          "Full-day sightseeing: World Peace Stupa, Phewa Lake boat ride to Tal Barahi Mandir, Devi's Falls, Gupteshwor Cave, and Seti River Gorge.",
          "Overnight in Pokhara."
        ]
      },
      {
        day: 5,
        title: "Pokhara to Kathmandu Flight & Free Leisure Day",
        activities: [
          "Breakfast at hotel.",
          "Morning transfer to Pokhara airport for flight back to Kathmandu.",
          "Transfer to Kathmandu hotel; full free day at leisure for shopping, spa, or casino games.",
          "Overnight in Kathmandu."
        ]
      },
      {
        day: 6,
        title: "Farewell & Departure",
        activities: [
          "Breakfast at hotel; airport transfer 3 hours prior to flight departure."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "5 Nights accommodation (3N Kathmandu + 2N Pokhara) with breakfast",
      "Khada welcome at airport",
      "All transfers and sightseeing by private AC vehicle",
      "Pokhara valley sightseeing & Sarangkot sunrise transfer",
      "All taxes included"
    ],
    exclusions: [
      "Airfare supplements & cable car tickets",
      "Monument entry fees & personal expenses"
    ],
    keyHighlights: [
      "Legendary golden sunrise from Sarangkot viewpoint",
      "Full sightseeing in Patan, Kathmandu, and Pokhara",
      "Relaxed pace with domestic flight option back to Kathmandu",
      "Phewa Lake boat cruise"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BEST VALUE",
        hotels: ["Yellow Pagoda & Spa (KTM)", "Hotel Murano (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 19900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 17400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 12900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 12500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 12000 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE UPGRADE",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Queens Park / Batika 3* Dlx (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 20900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 18400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 13900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 13500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 13000 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR RESORT",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Lake View 4* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 23400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 20900 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 16400 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 16000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 15500 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM EXPERIENCE",
        hotels: ["Hotel Shambhala (KTM)", "Hotel Barahi 4* Deluxe (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 24900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 22400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 17900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 17500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 17000 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Fishtail Lodge 5* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 35900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 33400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 28900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 28500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 28000 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "PREMIUM ROYAL",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Dorje Spa 5* Deluxe (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 39400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 36900 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 32400 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 32000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 31500 }
        ]
      }
    ]
  },

  // 6. Nepal Wildlife & Heritage: Kathmandu & Chitwan 4N/5D
  {
    id: "nepal-kathmandu-chitwan-5d4n",
    title: "Nepal Wildlife & Heritage: Kathmandu & Chitwan 🦏",
    subtitle: "Pashupatinath, Boudhanath, Chitwan Jungle Safari, Rapti Canoe & Manakamana",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    badge: "WILDLIFE JUNGLE SAFARI",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Chitwan National Park (UNESCO World Heritage)",
      "Rapti River (Marsh Mugger & Gharial Crocodiles)",
      "Sauraha Elephant Breeding Center",
      "Tharu Cultural Village & Dance",
      "Manakamana Temple"
    ],
    shortDescription: "Encounter one-horned rhinoceroses, Bengal tigers, and rare crocodiles in Chitwan National Park alongside indigenous Tharu culture and sacred Hindu shrines in Kathmandu.",
    flightSupplementNote: "Optional Kathmandu to Chitwan (Bharatpur) return flight: ₹4,800 / person",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu & Half Day Sightseeing",
        activities: [
          "Arrival greeting at airport with Khada.",
          "Hotel check-in; visit holy Pashupatinath Temple and Boudhanath Stupa.",
          "Tour briefing at 06:00 PM; overnight in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Kathmandu to Chitwan Drive & Sunset Birding",
        activities: [
          "Breakfast at hotel; drive towards the subtropical jungles of Chitwan National Park (approx. 5-6 hrs).",
          "Arrive and check in to jungle resort.",
          "Evening walk along the banks of Rapti River for tranquil sunset and exotic birdwatching (Giant Hornbill, Paradise Flycatcher).",
          "Overnight at Chitwan resort."
        ]
      },
      {
        day: 3,
        title: "Full Day Chitwan Jungle Safari & Tharu Culture",
        activities: [
          "Early breakfast at resort.",
          "Half-day thrilling Jungle Jeep Safari / Elephant Safari into the deep core of Chitwan National Park to spot One-Horned Rhinos, Deer, Wild Boars, and Sloth Bears.",
          "Return to resort for lunch.",
          "Afternoon 45-minute wooden canoe ride on Rapti River observing Mugger & fish-eating Gharial Crocodiles.",
          "Visit Sauraha Elephant Breeding Center.",
          "Evening vibrant Tharu Cultural Dance performance by local tribal villagers.",
          "Overnight in Chitwan."
        ]
      },
      {
        day: 4,
        title: "Chitwan to Kathmandu via Manakamana Temple",
        activities: [
          "Breakfast at resort.",
          "Drive back towards Kathmandu, stopping for the cable car visit to sacred Manakamana Temple.",
          "Check in to Kathmandu hotel; free evening for shopping; overnight in Kathmandu."
        ]
      },
      {
        day: 5,
        title: "Kathmandu Final Departure",
        activities: [
          "Breakfast at hotel.",
          "Airport transfer 3 hours prior to departure."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "4 Nights accommodation (2N Kathmandu + 2N Chitwan) with breakfast",
      "Airport welcome with Khada",
      "Private AC vehicle for all transfers and sightseeing",
      "Chitwan National Park safari activities as per itinerary",
      "All taxes included"
    ],
    exclusions: [
      "National park entrance fees & safari permits (payable on spot)",
      "Manakamana Cable car ticket & flight supplements",
      "Lunches, dinners & personal expenses"
    ],
    keyHighlights: [
      "Open hood Jeep safari in Chitwan National Park",
      "Canoe ride with close-up crocodile sightings on Rapti River",
      "Traditional Tharu folk dance show",
      "Sacred temples of Kathmandu Valley"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "SAFARI BUDGET",
        hotels: ["Yellow Pagoda & Spa (KTM)", "Eden Jungle Resort 3* (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 18100 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 16800 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 14200 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 14000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 13700 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE JUNGLE",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Batika Resort 3* Dlx (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 20000 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 18700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 16100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 15900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 15600 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR WILDLIFE",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Jungle Crown 4* (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 24000 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 24700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 20100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 19900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 19600 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "LUXURY SAFARI",
        hotels: ["Hotel Shambhala (KTM)", "Tigerland Safari Resort 4* Deluxe (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 28600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 27300 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 24700 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 24500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 24200 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR JUNGLE",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Barahi Jungle Lodge 5* (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 36600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 34700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 32100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 31900 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 31600 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ULTRA LUXURY SAFARI",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Taj Safari / Dorje Spa 5* Deluxe (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 41400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 41000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 38500 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 38300 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 38000 }
        ]
      }
    ]
  },

  // 7. Nepal Golden Triangle: Kathmandu, Pokhara & Chitwan 6N/7D
  {
    id: "nepal-golden-triangle-7d6n",
    title: "Nepal Golden Triangle: Kathmandu, Pokhara & Chitwan 🛕",
    subtitle: "Annapurna Sunrise, World Peace Stupa, Chitwan Safari & Manakamana",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    badge: "ULTIMATE NEPAL TOUR",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley (Heritage & Temples)",
      "Manakamana Temple",
      "Pokhara (Sarangkot Sunrise & Phewa Lake)",
      "Chitwan National Park (Safari, Canoe & Tharu Dance)",
      "Seti River Gorge, Devi's Falls & Caves"
    ],
    shortDescription: "Nepal's most celebrated trio tour: immersing you into Kathmandu's ancient living heritage, Pokhara's Himalayan vistas and alpine lakes, and Chitwan's thrilling wildlife safaris.",
    flightSupplementNote: "Optional Kathmandu to Pokhara to Chitwan return flight package: ₹10,500 / person",
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu & Half Day Sightseeing",
        activities: [
          "Traditional welcome at airport with Khada.",
          "Transfer to hotel; visit Pashupatinath Temple and Boudhanath Stupa.",
          "Evening tour briefing; overnight in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Kathmandu to Pokhara via Manakamana Cable Car",
        activities: [
          "Breakfast at hotel; drive along scenic highway towards Pokhara.",
          "Visit holy Manakamana Temple via cable car.",
          "Arrive in Pokhara, check in to hotel; evening free at lakeside; overnight in Pokhara."
        ]
      },
      {
        day: 3,
        title: "Sarangkot Sunrise & Pokhara Valley Sightseeing",
        activities: [
          "05:30 AM: Sarangkot height sunrise view over Dhaulagiri, Annapurna I & III, Fishtail, and Manaslu.",
          "Breakfast at hotel.",
          "Sightseeing: Seti Gorge, Bindhyabasini Temple, Devi's Falls, Gupteshwor Mahadev Cave, and Phewa Lake.",
          "Overnight in Pokhara."
        ]
      },
      {
        day: 4,
        title: "Pokhara to Chitwan Jungle Drive",
        activities: [
          "Breakfast at hotel; scenic drive downhill to Chitwan National Park (approx. 4-5 hrs).",
          "Check in to jungle lodge; free evening to relax by riverside sunset; overnight in Chitwan."
        ]
      },
      {
        day: 5,
        title: "Full Day Chitwan Jungle Safari & Wildlife Activities",
        activities: [
          "Breakfast at resort.",
          "Half-day Elephant Safari or open Jeep Safari inside Chitwan National Park core area.",
          "Lunch at resort.",
          "45-minute wooden canoeing ride on Rapti River to see Mugger and Gharial crocodiles.",
          "Visit Sauraha Elephant Breeding Center and enjoy Tharu Cultural Folk Dance performance.",
          "Overnight in Chitwan."
        ]
      },
      {
        day: 6,
        title: "Chitwan to Kathmandu Scenic Drive",
        activities: [
          "Breakfast at resort; drive back to Kathmandu (approx. 5-6 hrs).",
          "Check in to hotel; evening free for shopping in Thamel; overnight in Kathmandu."
        ]
      },
      {
        day: 7,
        title: "Farewell & Final Departure",
        activities: [
          "Breakfast at hotel; transfer to airport 3 hours prior to flight timing."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "6 Nights accommodation (2N Kathmandu + 2N Pokhara + 2N Chitwan) with breakfast",
      "Welcome by Khada at airport",
      "All intercity transfers & sightseeing by private AC vehicle",
      "Chitwan safari package & Pokhara valley sightseeing",
      "All taxes included"
    ],
    exclusions: [
      "Cable car tickets, monument entry fees & safari park entry",
      "Meals other than breakfast",
      "Optional flight package supplement (₹10,500)"
    ],
    keyHighlights: [
      "Tri-city Nepal itinerary covering culture, mountains, and wildlife",
      "Breathtaking Annapurna panorama from Sarangkot",
      "One-horned rhino and tiger habitat safari in Chitwan",
      "Scenic boating on Phewa Lake"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "BUDGET TRIO",
        hotels: ["Yellow Pagoda (KTM)", "Eden Jungle (Chitwan)", "Murano 3* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 28200 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 25000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 19000 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 18500 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 17800 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE TRIO",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Queens Park / Batika Resort (PKR/Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 30500 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 27300 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 21300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 20800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 20100 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR COMFORT",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Jungle Crown (Chitwan)", "Lake View 4* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 35500 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 32300 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 26300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 25800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 25100 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM DELUXE",
        hotels: ["Hotel Shambhala (KTM)", "Tigerland Resort (Chitwan)", "Hotel Barahi 4* Dlx (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 40700 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 37500 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 31500 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 31000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 30300 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Fishtail Lodge (PKR)", "Barahi Jungle Lodge 5* (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 52500 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 49300 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 43300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 42800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 42100 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL HERITAGE & SAFARI",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Dorje Spa (PKR)", "Taj Safari 5* Deluxe (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 59300 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 56100 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 50100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 49600 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 48900 }
        ]
      }
    ]
  },

  // 8. Nepal Grand Explorer: Kathmandu, Nagarkot, Pokhara & Chitwan 7N/8D
  {
    id: "nepal-golden-triangle-grand-8d7n",
    title: "Nepal Grand Explorer: Kathmandu, Nagarkot, Pokhara & Chitwan 🌄",
    subtitle: "Nagarkot Everest Sunrise, Bhaktapur UNESCO, Sarangkot & Chitwan Safari",
    duration: "8 Days / 7 Nights",
    daysCount: 8,
    nightsCount: 7,
    badge: "FLAGSHIP EXPEDITION",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Nagarkot Himalayan Viewpoint (2,195m)",
      "Bhaktapur Durbar Square & Changu Narayan",
      "Manakamana Temple",
      "Pokhara (Sarangkot Sunrise & Phewa Lake)",
      "Chitwan National Park Safari"
    ],
    shortDescription: "The most complete, all-encompassing Nepal tour combining the Himalayan sunrise from Nagarkot, Bhaktapur's medieval architecture, Annapurna peak viewpoints in Pokhara, and thrilling wildlife encounters in Chitwan.",
    flightSupplementNote: "Optional Kathmandu to Pokhara to Chitwan return flight package: ₹10,500 / person",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu & Half Day Sightseeing",
        activities: [
          "Traditional airport greeting with Khada.",
          "Transfer to hotel; visit Pashupatinath Temple and Boudhanath Stupa.",
          "Evening tour briefing; overnight in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Changu Narayan, Bhaktapur & Nagarkot Excursion",
        activities: [
          "Breakfast at hotel; full-day excursion to ancient Changu Narayan Temple (UNESCO).",
          "Explore historical Bhaktapur Durbar Square – 55 Window Palace, Golden Gate & pottery square.",
          "Drive to Nagarkot (2,195m) for sunset views over Langtang and Everest ranges; return to Kathmandu for overnight."
        ]
      },
      {
        day: 3,
        title: "Kathmandu to Pokhara via Manakamana",
        activities: [
          "Breakfast at hotel; highway drive to Pokhara.",
          "Stop at Kurintar for the Manakamana cable car pilgrimage.",
          "Arrive in Pokhara and check in; evening free by Phewa Lake; overnight in Pokhara."
        ]
      },
      {
        day: 4,
        title: "Sarangkot Sunrise & Full Day Pokhara Sightseeing",
        activities: [
          "05:30 AM: Sarangkot sunrise viewpoint overlooking the Annapurna range.",
          "Breakfast at hotel.",
          "Sightseeing: Seti Gorge, Bindhyabasini Temple, Devi's Falls, Gupteshwor Cave & Phewa Lake boat ride.",
          "Overnight in Pokhara."
        ]
      },
      {
        day: 5,
        title: "Pokhara to Chitwan National Park",
        activities: [
          "Breakfast at hotel; scenic drive to Chitwan National Park.",
          "Check in to jungle lodge; evening free for riverside sunset; overnight in Chitwan."
        ]
      },
      {
        day: 6,
        title: "Chitwan Jungle Safari & Tharu Cultural Show",
        activities: [
          "Breakfast at resort.",
          "Jungle Safari (Jeep or Elephant) in Chitwan core zone.",
          "Lunch at resort.",
          "Canoe ride on Rapti River + Elephant Breeding Center visit.",
          "Evening Tharu Cultural Dance show; overnight in Chitwan."
        ]
      },
      {
        day: 7,
        title: "Chitwan to Kathmandu Drive & Leisure Evening",
        activities: [
          "Breakfast at resort; scenic drive back to Kathmandu.",
          "Check in to hotel; evening free for shopping in Thamel or casino visit; overnight in Kathmandu."
        ]
      },
      {
        day: 8,
        title: "Farewell & Airport Transfer",
        activities: [
          "Breakfast at hotel; transfer to Tribhuvan International Airport 3 hours prior to flight."
        ]
      }
    ],
    vehicleAllocation: NEPAL_VEHICLE_DETAILS,
    inclusions: [
      "7 Nights accommodation (3N Kathmandu + 2N Pokhara + 2N Chitwan) with breakfast",
      "Khada welcome at airport",
      "Private AC vehicle for all transfers and sightseeing throughout the trip",
      "Full tour briefing upon arrival",
      "All government taxes"
    ],
    exclusions: [
      "Monument fees, cable car tickets & safari entry charges",
      "Meals other than breakfast",
      "Optional flight package supplement (₹10,500)"
    ],
    keyHighlights: [
      "Nagarkot Himalayan sunrise and Bhaktapur heritage",
      "Sarangkot sunrise view of Annapurna & Fishtail peaks",
      "Chitwan National Park wildlife safari & canoe ride",
      "Pashupatinath, Boudhanath & Manakamana holy shrines"
    ],
    importantNotes: NEPAL_GENERAL_NOTES,
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "EXPLORER VALUE",
        hotels: ["Yellow Pagoda (KTM)", "Eden Jungle (Chitwan)", "Murano 3* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 31400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 27700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 20900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 20300 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 19500 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE EXPLORER",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Queens Park / Batika Resort (PKR/Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 33900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 30200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 23400 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 22800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 22000 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR EXPLORER",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Jungle Crown (Chitwan)", "Lake View 4* (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 39400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 35700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 28900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 28300 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 27500 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM DELUXE",
        hotels: ["Hotel Shambhala (KTM)", "Tigerland Resort (Chitwan)", "Hotel Barahi 4* Dlx (PKR)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 44900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 41200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 34400 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 33800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 33000 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Fishtail Lodge (PKR)", "Barahi Jungle Lodge 5* (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 58900 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 55200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 48400 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 47800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 47000 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL LUXURY SUITE",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Dorje Spa (PKR)", "Taj Safari 5* Deluxe (Chitwan)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 66400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 62700 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 55900 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 55300 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 54500 }
        ]
      }
    ]
  },

  // 9. Nepal Mystical Muktinath & Jomsom Pilgrimage 6N/7D
  {
    id: "nepal-mystical-jomsom-muktinath-7d6n",
    title: "Nepal Mystical Muktinath & Jomsom Pilgrimage 🏔️",
    subtitle: "Sacred Muktinath Temple 108 Sprouts, Pokhara & Kathmandu Valley",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    badge: "SACRED PILGRIMAGE",
    validityOffer: "Special 2026 Guaranteed Rates",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "Kathmandu Valley",
      "Pokhara Valley",
      "Jomsom (Mustang Valley)",
      "Muktinath Temple (3,710m - 108 Holy Water Spouts & 2 Sacred Kunda Ponds)",
      "Manakamana Temple",
      "Seti Gorge & Devi's Falls"
    ],
    shortDescription: "A revered sacred pilgrimage to holy Muktinath Temple (Chumig Gyatsa) located at 3,710m in the trans-Himalayan Mustang district, where taking a holy bath in the 108 water spouts is believed to grant salvation (Moksha).",
    flightSupplementNote: "Flight Options: KTM-PKR return ticket ₹4,500 | PKR-Jomsom return flight ₹6,000 / person",
    optionalEverestFlight: {
      name: "Everest Scenic Mountain Flight",
      timing: "06:00 AM Departure",
      costInr: 9500
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu & Welcome",
        activities: [
          "Traditional Khada greeting at airport.",
          "Hotel transfer and check-in.",
          "Evening tour briefing at 06:00 PM; overnight in Kathmandu."
        ]
      },
      {
        day: 2,
        title: "Full Day Kathmandu Sightseeing",
        activities: [
          "(Optional) 06:00 AM Everest Scenic Mountain Flight.",
          "Breakfast at hotel.",
          "Full-day spiritual sightseeing of Pashupatinath Temple, Boudhanath Stupa, Swayambhunath, and Kathmandu Durbar Square.",
          "Overnight in Kathmandu."
        ]
      },
      {
        day: 3,
        title: "Kathmandu to Pokhara via Manakamana",
        activities: [
          "Breakfast at hotel; drive to Pokhara with en-route visit to Manakamana Temple by cable car.",
          "Arrive in Pokhara; check-in and evening leisure along lakeside; overnight in Pokhara."
        ]
      },
      {
        day: 4,
        title: "Pokhara to Jomsom & Holy Muktinath Darshan",
        activities: [
          "Scenic mountain drive / flight from Pokhara to Jomsom across the Kali Gandaki Gorge.",
          "Drive to sacred Muktinath Temple situated at 3,710 meters altitude.",
          "Perform holy puja and sacred bath under the 108 brass water sprouts (Muktidhara) and take a holy dip in the 2 sacred ponds (Muktikunda).",
          "Marvel at the eternal flame burning from natural gas inside Jwala Mai Temple.",
          "Return to Jomsom hotel for overnight stay."
        ]
      },
      {
        day: 5,
        title: "Jomsom to Pokhara & Pokhara Sightseeing",
        activities: [
          "Breakfast in Jomsom; drive / fly back to Pokhara.",
          "Afternoon Pokhara sightseeing: Seti River Gorge, Bindhyabasini Temple, Devi's Falls, and Gupteshwor Mahadev Cave.",
          "Overnight in Pokhara."
        ]
      },
      {
        day: 6,
        title: "Pokhara to Kathmandu Drive",
        activities: [
          "Breakfast at hotel; drive back to Kathmandu.",
          "Check in to hotel; free evening for leisure and shopping; overnight in Kathmandu."
        ]
      },
      {
        day: 7,
        title: "Final Departure",
        activities: [
          "Breakfast at hotel; airport transfer 3 hours prior to scheduled flight."
        ]
      }
    ],
    vehicleAllocation: [
      { paxRange: "2 – 3 PAX", vehicleName: "Swift Dzire (AC) + Scorpio in Jomsom", capacity: "4 Seats" },
      { paxRange: "4 – 5 PAX", vehicleName: "Mahindra Scorpio 4WD (AC)", capacity: "7 Seats" },
      { paxRange: "6 – 12 PAX", vehicleName: "Toyota Hiace (AC) + Scorpio in Mustang", capacity: "14 Seats" },
      { paxRange: "13 – 20 PAX", vehicleName: "Toyota Coaster (AC) + Mini Bus in Mustang", capacity: "22 Seats" },
      { paxRange: "20 – 35 PAX", vehicleName: "Sutlej Coach (AC) + Mountain Bus", capacity: "35 Seats" }
    ],
    inclusions: [
      "6 Nights accommodation (2N Kathmandu + 2N Pokhara + 2N Jomsom / 1N Jomsom + 1N PKR) with breakfast",
      "Khada welcome at airport",
      "Private AC vehicle transfers and sightseeing as per itinerary",
      "Muktinath darshan local transport arrangements",
      "All applicable taxes"
    ],
    exclusions: [
      "ACAP & TIMS permits for Annapurna / Muktinath region",
      "Manakamana Cable Car ticket & flight supplements (KTM-PKR ₹4,500 / PKR-Jomsom ₹6,000)",
      "Meals other than breakfast"
    ],
    keyHighlights: [
      "Sacred holy bath under 108 water sprouts at Muktinath (3,710m)",
      "Jaw-dropping views of Dhaulagiri & Nilgiri Himalayan massifs",
      "Pashupatinath & Manakamana blessings",
      "Pokhara lake city exploration"
    ],
    importantNotes: [
      ...NEPAL_GENERAL_NOTES,
      "Hotel accommodations in Jomsom / Mustang are standard mountain lodges reflecting the remote alpine terrain."
    ],
    paymentPolicy: NEPAL_PAYMENT_POLICY,
    hotelTiers: [
      {
        tierId: "3star-std",
        categoryName: "3★ Standard",
        starRating: 3,
        badgeLabel: "PILGRIMAGE VALUE",
        hotels: ["Yellow Pagoda (KTM)", "Murano (PKR)", "Sunrise / Hotel Mustang (Jomsom)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 24200 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 22200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 15300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 15800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 15100 }
        ]
      },
      {
        tierId: "3star-dlx",
        categoryName: "3★ Deluxe",
        starRating: 3,
        badgeLabel: "DELUXE PILGRIMAGE",
        hotels: ["Grand Hotel / Marshyangdi (KTM)", "Queens Park / Batika (PKR)", "Majestic 3* Dlx (Jomsom)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 25400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 22200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 16300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 15800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 15100 }
        ]
      },
      {
        tierId: "4star-std",
        categoryName: "4★ Standard",
        starRating: 4,
        badgeLabel: "4-STAR COMFORT",
        hotels: ["Hotel Mulberry / Crown Imperial (KTM)", "Lake View 4* (PKR)", "Jomsom Mountain Resort", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 26400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 25200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 19300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 18800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 18100 }
        ]
      },
      {
        tierId: "4star-dlx",
        categoryName: "4★ Deluxe",
        starRating: 4,
        badgeLabel: "PREMIUM DELUXE",
        hotels: ["Hotel Shambhala (KTM)", "Hotel Barahi 4* Dlx (PKR)", "Om's Home Resort (Jomsom)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 30200 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 27000 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 21100 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 20600 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 19900 }
        ]
      },
      {
        tierId: "5star-std",
        categoryName: "5★ Standard",
        starRating: 5,
        badgeLabel: "5-STAR LUXURY",
        hotels: ["Hyatt Place / Yak & Yeti (KTM)", "Fishtail Lodge (PKR)", "Om's Home Deluxe (Jomsom)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 43400 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 40200 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 34300 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 33800 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 33100 }
        ]
      },
      {
        tierId: "5star-dlx",
        categoryName: "5★ Deluxe",
        starRating: 5,
        badgeLabel: "ROYAL LUXURY",
        hotels: ["Hyatt Regency / Soaltee (KTM)", "Dorje Spa 5* Deluxe (PKR)", "Luxury Lodge (Jomsom)", "Or Similar"],
        pricingByPax: [
          { paxSlab: "2-3 PAX", minPax: 2, maxPax: 3, pricePerPerson: 47600 },
          { paxSlab: "4-5 PAX", minPax: 4, maxPax: 5, pricePerPerson: 44400 },
          { paxSlab: "10-12 PAX", minPax: 10, maxPax: 12, pricePerPerson: 38500 },
          { paxSlab: "17-20 PAX", minPax: 17, maxPax: 20, pricePerPerson: 38000 },
          { paxSlab: "26-30 PAX", minPax: 26, maxPax: 30, pricePerPerson: 37300 }
        ]
      }
    ]
  }
];

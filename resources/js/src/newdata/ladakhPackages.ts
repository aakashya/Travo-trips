export interface LadakhPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  destinationsCovered: string[];
  heroImage: string;
  bannerImage: string;
  badge: string;
  shortDescription: string;
  hotelCategory: string;
  pricingByPax: {
    paxSlab: string;
    minPax: number;
    vehicleType: string;
    pricePerPerson: number;
  }[];
  itinerary: {
    day: number;
    title: string;
    nightStay: string;
    timingSummary?: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
}

export const LADAKH_PACKAGES: LadakhPackage[] = [
  {
    id: "leh-ladakh-b2b-5n6d",
    title: "B2B Leh Ladakh Package (Leh, Khardung La, Nubra Valley & Pangong Lake)",
    subtitle: "5 Nights / 6 Days • 3 Nights Leh + 1 Night Nubra + 1 Night Pangong • MAPAI Meal Plan",
    duration: "6 Days / 5 Nights",
    nights: 5,
    days: 6,
    destinationsCovered: ["Leh", "Khardung La Pass (18,380 ft)", "Nubra Valley", "Diskit Monastery", "Hunder Sand Dunes", "Pangong Tso Lake", "Changla Pass"],
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop",
    badge: "B2B SPECIAL • @ ₹8,499/- PP",
    shortDescription: "High-altitude road trip across the Land of High Passes with Deluxe Hotel, Luxury Camps in Nubra and Pangong, MAPAI buffet meals, Inner Line Permits, and private Scorpio/Xylo/Ertiga.",
    hotelCategory: "Deluxe Hotel, Cottage & Camp",
    pricingByPax: [
      { paxSlab: "12 Pax Traveling Together", minPax: 12, vehicleType: "Tempo Traveller", pricePerPerson: 8499 },
      { paxSlab: "10 Pax Traveling Together", minPax: 10, vehicleType: "Tempo Traveller", pricePerPerson: 8999 },
      { paxSlab: "8 Pax Traveling Together", minPax: 8, vehicleType: "Tempo Traveller / 2 Cabs", pricePerPerson: 9999 },
      { paxSlab: "6 Pax Traveling Together", minPax: 6, vehicleType: "Scorpio / Xylo / Ertiga", pricePerPerson: 9699 },
      { paxSlab: "4 Pax Traveling Together", minPax: 4, vehicleType: "Scorpio / Xylo / Ertiga", pricePerPerson: 11799 },
      { paxSlab: "2 Pax Traveling Together", minPax: 2, vehicleType: "Dedicated Cab", pricePerPerson: 17999 }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh & Acclimatization Leisure",
        nightStay: "Leh Deluxe Hotel",
        timingSummary: "Arrival at 3,500m Altitude & Rest",
        activities: [
          "Arrive at Kushok Bakula Rimpochee Airport (IXL), Leh (3,524 m)",
          "Transfer to hotel and check-in with traditional Ladakhi welcome",
          "Mandatory full day rest for high-altitude acclimatization to avoid AMS (Acute Mountain Sickness)",
          "Evening short gentle walk to Leh Market and Shanti Stupa for panoramic sunset over Leh Valley",
          "Buffet dinner and overnight stay at Leh Deluxe Hotel"
        ]
      },
      {
        day: 2,
        title: "Leh Local Sightseeing & Confluence Tour",
        nightStay: "Leh Deluxe Hotel",
        timingSummary: "Monasteries, Hall of Fame & Sangam",
        activities: [
          "Healthy breakfast at hotel and departure for Indus Valley sightseeing",
          "Visit Hall of Fame Museum maintained by the Indian Army commemorating brave soldiers",
          "Experience the gravity-defying optical illusion at Magnetic Hill",
          "Visit Gurudwara Pathar Sahib built in 1517 to commemorate Guru Nanak Dev's visit",
          "Witness the spectacular confluence (Sangam) of the emerald Indus River and muddy Zanskar River",
          "Visit Spituk Gompa & Leh Palace, return for dinner and overnight stay at Leh Hotel"
        ]
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La Pass (18,380 ft)",
        nightStay: "Nubra Valley Deluxe Camp / Cottage",
        timingSummary: "Crossing Highest Motorable Road (125 km / 5 hrs)",
        activities: [
          "Early breakfast and drive towards Nubra Valley via the legendary Khardung La Pass (18,380 ft)",
          "Take memorable photos at the world's highest motorable pass signboards with snow-covered peaks",
          "Descend into the scenic Nubra Valley (Valley of Flowers at 10,000 ft)",
          "Visit the historic Diskit Monastery and marvel at the 106-ft tall Maitreya Buddha statue",
          "Proceed to Hunder Sand Dunes for a unique double-humped Bactrian camel safari amidst cold desert dunes",
          "Check-in at Deluxe Camps / Cottages in Nubra, bonfire under starry sky, buffet dinner & overnight stay"
        ]
      },
      {
        day: 4,
        title: "Nubra Valley to Pangong Lake via Shyok River Route",
        nightStay: "Pangong Lake Luxury Camp",
        timingSummary: "Scenic River Gorge Drive (150 km / 6 hrs)",
        activities: [
          "Wake up to crisp mountain air and hearty camp breakfast",
          "Drive along the turquoise Shyok River gorge towards the enchanting Pangong Tso Lake (14,270 ft)",
          "First breathtaking glimpse of the color-changing blue lake stretching into Tibet (134 km long)",
          "Spend an unforgettable afternoon strolling along the shoreline, photography at the 3-Idiots point",
          "Witness a magical sunset as the lake shifts colors from turquoise to deep indigo",
          "Buffet dinner and overnight stay in cozy Deluxe Camps near Pangong Lake"
        ]
      },
      {
        day: 5,
        title: "Pangong Lake Sunrise to Leh via Changla Pass (17,688 ft)",
        nightStay: "Leh Deluxe Hotel",
        timingSummary: "Lake Sunrise & Return Pass Drive (140 km / 5 hrs)",
        activities: [
          "Early morning sunrise over Pangong Lake offering surreal reflections",
          "Breakfast at camp and start journey back to Leh crossing the mighty Changla Pass (17,688 ft)",
          "Visit the majestic Thiksey Monastery (resembling the Potala Palace of Lhasa) and Shey Palace",
          "Arrive back in Leh by afternoon, check-in to hotel and relax",
          "Last-minute souvenir shopping for Pashmina shawls, Ladakhi dry fruits & prayer wheels in Leh Bazaar",
          "Grand farewell dinner buffet and overnight stay in Leh"
        ]
      },
      {
        day: 6,
        title: "Leh Departure with High Altitude Memories",
        nightStay: "Departure",
        timingSummary: "Airport Drop & Return Flight",
        activities: [
          "Early breakfast at hotel, pack your high-altitude travel journals",
          "Transfer to Leh Airport (IXL) for your scheduled flight back home",
          "Fly over snow-capped Himalayan ranges, bidding farewell to the Land of High Passes"
        ]
      }
    ],
    inclusions: [
      "Accommodation on double sharing (03 Nights Leh + 1 Night Nubra + 1 Night Pangong)",
      "MAPAI basis (Daily Breakfast + Dinner Buffet)",
      "Dedicated Non-Ac Scorpio / Xylo / Ertiga / Tempo Traveller as per group size",
      "Inner line permits & Wildlife sanctuary environmental fees",
      "All driver allowances, toll taxes, parking charges, road tax & fuel charges",
      "Oxygen cylinder assistance in vehicle for Khardung La & Pangong emergency use"
    ],
    exclusions: [
      "Flight tickets to/from Leh Airport (IXL)",
      "Camel rides in Hunder dunes & river rafting in Zanskar",
      "Monument & monastery entrance tickets",
      "Personal expenses (laundry, beverages, tips, heater charges)",
      "Medical evacuation or travel insurance"
    ]
  }
];

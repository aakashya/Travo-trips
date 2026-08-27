export interface BhutanPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  fixedDepartures: string[];
  destinationsCovered: string[];
  heroImage: string;
  bannerImage: string;
  badge: string;
  shortDescription: string;
  pricePerPerson: number;
  mealPlan: string;
  sdfIncludedPerDay: number;
  hotelDetails: {
    dayRange: string;
    city: string;
    hotel3Star: string;
    rooms: string;
    mealPlan: string;
  }[];
  itinerary: {
    day: number;
    title: string;
    timingSummary?: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
}

export const BHUTAN_PACKAGES: BhutanPackage[] = [
  {
    id: "bhutan-fixed-departure-7d6n",
    title: "Bhutan Kingdom of Thunder Dragon",
    subtitle: "Phuentsholing (1N) • Thimphu (2N) • Paro (2N with Tiger's Nest) • Phuentsholing (1N)",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    fixedDepartures: ["15th August 2026 (Independence Special)", "5th September 2026", "26th September 2026"],
    destinationsCovered: ["Bagdogra/NJP", "Phuentsholing (2N)", "Thimphu (2N)", "Punakha", "Paro (2N)", "Tiger's Nest Hike"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    badge: "FIXED DEPARTURE 2026",
    shortDescription: "Embark on an unforgettable Himalayan pilgrimage and cultural odyssey through Bhutan. Includes Thimphu Buddha Dordenma, Dochula Pass 108 Chortens, Punakha Dzong, and the legendary cliffside Tiger's Nest (Taktsang) Monastery hike.",
    pricePerPerson: 27000,
    mealPlan: "MAP (Breakfast & Dinner Included)",
    sdfIncludedPerDay: 1200,
    hotelDetails: [
      { dayRange: "Day 1", city: "Phuentsholing", hotel3Star: "Hotel Metto Pema / Amachu / Mandala or Similar", rooms: "Double Sharing", mealPlan: "Breakfast + Dinner" },
      { dayRange: "Day 2-3", city: "Thimphu", hotel3Star: "Hotel Depsi Resort / Gochukha / Takshang / Snowland / Drukill or Similar", rooms: "Double Sharing", mealPlan: "Breakfast + Dinner" },
      { dayRange: "Day 4-5", city: "Paro", hotel3Star: "Galling / Drugel / Eco Nest Resort / Ratnavara or Similar", rooms: "Double Sharing", mealPlan: "Breakfast + Dinner" },
      { dayRange: "Day 6", city: "Phuentsholing", hotel3Star: "Hotel Metto Pema / Amachu / Mandala or Similar", rooms: "Double Sharing", mealPlan: "Breakfast + Dinner" }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at IXB/NJP & Transfer to Phuentsholing (172 Km | 6 Hrs)",
        timingSummary: "Meet representative at Bagdogra Airport (IXB) / NJP Railway Station",
        activities: [
          "Meet TRAVO & Help The Tourists tour coordinator at Bagdogra Airport (IXB) / New Jalpaiguri (NJP).",
          "Board comfortable vehicle and drive through scenic tea estate plains of Dooars to the Bhutan border town Phuentsholing.",
          "Check in at hotel and relax.",
          "Overnight stay at Phuentsholing."
        ]
      },
      {
        day: 2,
        title: "Phuentsholing to Capital Thimphu via Scenic Valleys (172 Km | 6 Hrs)",
        timingSummary: "Immigration Formalities, Kharbandi Gumba, Chuzom Confluence & Tachogang Lhakhang",
        activities: [
          "Meet tour guide after breakfast and complete biometric immigration permit formalities.",
          "Scenic ascent towards Thimphu (2,334m) through misty sub-tropical and alpine pine forests.",
          "Visit sacred Kharbandi Gumba monastery with valley panoramic views.",
          "En-route stop at Chuzom (river confluence of Thimphu Chu & Paro Chu) and Tachogang Lhakhang (historic 15th-century Iron Chain Suspension Bridge).",
          "Check in at Thimphu hotel and evening walk around Thimphu town & Clock Tower Square.",
          "Overnight stay in Thimphu."
        ]
      },
      {
        day: 3,
        title: "Excursion to Punakha Valley via Dochula Pass & Back to Thimphu",
        timingSummary: "Dochula Pass (3,100m) with 108 Chortens & Iconic Punakha Dzong",
        activities: [
          "Drive across breathtaking Dochula Pass (3,100m) with spectacular panoramic views of 108 memorial chortens and snow-capped Himalayan peaks.",
          "Visit the magnificent Punakha Dzong (Palace of Great Happiness), built in 1637 at the confluence of Pho Chhu and Mo Chhu rivers.",
          "Walk across the thrilling Punakha Suspension Bridge.",
          "Visit Chimi Lhakhang (Fertility Temple of Divine Madman).",
          "Evening drive back to Thimphu for overnight stay."
        ]
      },
      {
        day: 4,
        title: "Thimphu Sightseeing & Transfer to Paro Valley",
        timingSummary: "Buddha Dordenma (51.5m Bronze), Takin Preserve, Simply Bhutan & Paro Arrival",
        activities: [
          "Visit gigantic Buddha Dordenma (169-ft bronze Buddha statue overlooking Thimphu valley).",
          "Explore Motithang Takin Preserve - sanctuary of Bhutan's national animal.",
          "Visit Simply Bhutan Living Museum, BBS Tower, and National Institute for Zorig Chusum (13 Traditional Arts & Crafts).",
          "Visit Memorial Chorten and Trashi Chho Dzong (seat of Bhutanese government and religion).",
          "Scenic 1.5-hour drive to picturesque Paro valley; check in to hotel and relax."
        ]
      },
      {
        day: 5,
        title: "The Legendary Tiger's Nest (Paro Taktsang) Cliffside Monastery Hike",
        timingSummary: "6.4 Km Mountain Trail Hike to 3,120m Sacred Monastery Clinging to Granite Cliff",
        activities: [
          "Early morning embark on the world-famous hike to Tiger's Nest (Paro Taktsang Monastery), perched dramatically 900 meters above Paro Valley floor.",
          "Hike through shaded pine forests with fluttering prayer flags, stopping at Taktsang Cafeteria for panoramic photos and tea.",
          "Explore the sacred cave temples where Guru Padmasambhava meditated in the 8th century.",
          "Descend back to valley base and enjoy evening relaxation, hot stone bath (optional), or stroll in Paro market.",
          "Overnight stay in Paro."
        ]
      },
      {
        day: 6,
        title: "Paro Sightseeing & Scenic Transfer back to Phuentsholing",
        timingSummary: "Rinpung Dzong, National Museum of Bhutan, Drukgyel Dzong & Paro Airport View",
        activities: [
          "Visit ancient Rinpung Dzong (Fortress of the Heap of Jewels) and Ta Dzong (National Museum of Bhutan).",
          "Visit ruins of historic Drukgyel Dzong, Kyichu Lhakhang (7th-century sacred temple), and Paro International Airport runway viewpoint.",
          "Drive down through mountain highway back to border city Phuentsholing.",
          "Check in at hotel and farewell evening in Bhutan.",
          "Overnight stay in Phuentsholing."
        ]
      },
      {
        day: 7,
        title: "Farewell Bhutan - Phuentsholing to Bagdogra / NJP Drop",
        timingSummary: "Scenic return drive to Bagdogra (IXB) / NJP for flight/train departure",
        activities: [
          "Enjoy breakfast and complete checkout.",
          "Board private vehicle for return transfer to Bagdogra Airport (IXB) / New Jalpaiguri Railway Station (NJP).",
          "Bid goodbye with lifelong memories of the Kingdom of Happiness!"
        ]
      }
    ],
    inclusions: [
      "Government Sustainable Development Fee (SDF) of ₹1,200/day per person included.",
      "GST & all government border entry taxes included.",
      "Immigration and Inner Line Permit Assistance.",
      "Dedicated Private Coaster Bus / Tourist Vehicle for Bhutan section & 3-Traveller for India transit.",
      "Bhutan Tourism Council certified English/Hindi speaking licensed guide.",
      "MAP Meal Plan: Daily Continental & Traditional Breakfast and Dinner at all hotels.",
      "6 Nights 3-Star Certified Hotel Accommodation on Double Sharing basis.",
      "All driver allowance, fuel, tolls, parking, and night charges."
    ],
    exclusions: [
      "Airfare / Train fare to Bagdogra/NJP.",
      "Daily Lunch and personal beverage expenses.",
      "Chele La Pass excursion (optional ₹2,000/- vehicle supplement).",
      "Monuments & Museum entrance ticketing fees.",
      "Personal expenses (laundry, phone calls, gratuities/tips for driver & guide)."
    ]
  }
];

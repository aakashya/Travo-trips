export interface SikkimPackage {
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
  hotelTiers: {
    tierId: "SUPER_DELUXE" | "3_STAR";
    categoryName: string;
    badgeLabel: string;
    hotelListByCity: Record<string, string[]>;
    seasonPricing: {
      paxSlab: "2 PAX" | "4 PAX" | "6 PAX";
      paxCount: number;
      seasonTotal: number;
      offSeasonTotal: number;
      seasonPerPerson: number;
      offSeasonPerPerson: number;
    }[];
  }[];
  itinerary: {
    day: number;
    title: string;
    nightStay: string;
    altitude?: string;
    timingSummary?: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
}

export const SIKKIM_PACKAGES: SikkimPackage[] = [
  // 1. 4N/5D Gangtok & Darjeeling
  {
    id: "sikkim-gangtok-darjeeling-5d4n",
    title: "Gangtok & Darjeeling Himalayan Duo",
    subtitle: "Gangtok 02N + Darjeeling 02N",
    duration: "4 Nights / 5 Days",
    nights: 4,
    days: 5,
    destinationsCovered: ["Bagdogra/NJP", "Gangtok (2N)", "Tsomgo Lake", "Baba Mandir", "Darjeeling (2N)", "Tiger Hill Sunrise"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    badge: "STARTING FROM ₹9,800/PAX",
    shortDescription: "A compact mountain holiday featuring the sacred glacial Tsomgo Lake, Baba Harbhajan Singh Mandir, Gangtok's MG Marg, Tiger Hill sunrise over Mt. Kanchenjunga, and the historic Darjeeling Himalayan Toy Train.",
    hotelTiers: [
      {
        tierId: "SUPER_DELUXE",
        categoryName: "Super Deluxe Hotels",
        badgeLabel: "3-STAR RATED ON MMT",
        hotelListByCity: {
          "Gangtok": ["Hotel Sun Mount Mayal Retreat", "Tashi Yang by Baizus", "Maya Inn"],
          "Darjeeling": ["Aristocrat By Baizus", "Hotel Raj Ville", "Tripoo Potala Palace"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 38808, offSeasonTotal: 30925, seasonPerPerson: 19404, offSeasonPerPerson: 15463 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 54574, offSeasonTotal: 41839, seasonPerPerson: 13644, offSeasonPerPerson: 10460 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 81254, offSeasonTotal: 58818, seasonPerPerson: 13542, offSeasonPerPerson: 9803 }
        ]
      },
      {
        tierId: "3_STAR",
        categoryName: "3-Star Boutique Hotels",
        badgeLabel: "UDAAN & SUMMIT LUXURY",
        hotelListByCity: {
          "Gangtok": ["Udaan Hotels | Keepsa Hotel & Spa", "Summit Namnang Courtyard & Spa", "Yashshree Sikkim Blossom"],
          "Darjeeling": ["Udaan Hotels - Himalayan Suites & Spa", "Summit Swiss", "Yashshree Mall Road", "Hotel Tenzing Glory"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 65489, offSeasonTotal: 47903, seasonPerPerson: 32745, offSeasonPerPerson: 23952 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 107935, offSeasonTotal: 75796, seasonPerPerson: 26984, offSeasonPerPerson: 18949 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 161296, offSeasonTotal: 109753, seasonPerPerson: 26883, offSeasonPerPerson: 18292 }
        ]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Transfer to Gangtok (125 Km | 4-5 Hrs)",
        nightStay: "Gangtok",
        altitude: "5,480 ft",
        timingSummary: "Scenic drive along turquoise Teesta River",
        activities: [
          "Meet driver at NJP Railway Station / Bagdogra Airport (IXB).",
          "Scenic mountain climb following Teesta river valley into Sikkim.",
          "Check in to hotel & relax.",
          "Evening free to explore the cobblestone pedestrian promenade of MG Marg.",
          "Enjoy local Tibetan cafe hopping and street momos."
        ]
      },
      {
        day: 2,
        title: "Tsomgo Glacial Lake & Baba Harbhajan Mandir Excursion (120 Km | 6-7 Hrs)",
        nightStay: "Gangtok",
        timingSummary: "High altitude glacial lake at 12,400 ft • Optional Nathula Pass on Indo-China Border",
        activities: [
          "Drive up to sacred high-altitude Tsomgo (Changu) Lake.",
          "Enjoy colorful decorated Yak rides & alpine photography.",
          "Seek blessings at the legendary Baba Harbhajan Singh Memorial Shrine.",
          "Optional exploration of Nathula Pass (subject to permits & open Wed-Sun).",
          "Breathtaking snow-clad mountain vistas; return to Gangtok."
        ]
      },
      {
        day: 3,
        title: "Gangtok to Darjeeling - Queen of the Hills (100 Km | 4-5 Hrs)",
        nightStay: "Darjeeling",
        altitude: "6,710 ft",
        timingSummary: "Scenic drive across rolling emerald tea gardens into West Bengal hills",
        activities: [
          "Drive through picturesque tea valleys and misty mountain ridges to Darjeeling.",
          "Mesmerizing views of the Kanchenjunga massif.",
          "Check in at hotel and relax.",
          "Evening stroll at iconic Chowrasta Mall Road and historic Glenary's Bakery.",
          "Optional joy ride on the UNESCO Darjeeling Himalayan Railway Toy Train."
        ]
      },
      {
        day: 4,
        title: "Tiger Hill Sunrise & Full Day Darjeeling Local Sightseeing",
        nightStay: "Darjeeling",
        timingSummary: "04:00 AM Tiger Hill Sunrise • Ghoom Monastery • Batasia Loop • Tea Garden",
        activities: [
          "Early morning (04:00 AM) drive to Tiger Hill for golden sunrise over Mt. Everest & Mt. Kanchenjunga.",
          "Visit ancient Ghoom Monastery and the Batasia Loop war memorial.",
          "Visit Himalayan Mountaineering Institute (HMI) & Padmaja Naidu Himalayan Zoological Park (Snow Leopards & Red Pandas).",
          "Visit Tibetan Refugee Self Help Centre and Happy Valley Tea Estate.",
          "Visit Japanese Peace Pagoda and optional Darjeeling Ropeway cable car ride."
        ]
      },
      {
        day: 5,
        title: "Farewell Himalayas - Darjeeling to NJP / Bagdogra Drop (100 Km | 4-5 Hrs)",
        nightStay: "Departure",
        timingSummary: "Scenic downhill drive through Kurseong & Mirik tea slopes",
        activities: [
          "Enjoy a leisurely breakfast overlooking misty valleys.",
          "Checkout and scenic transfer down to NJP Railway Station / Bagdogra Airport.",
          "Depart with unforgettable Himalayan memories."
        ]
      }
    ],
    inclusions: [
      "Accommodation on double/triple sharing in certified hotels.",
      "MAP Meal Plan: Daily Breakfast & Dinner included.",
      "All transfers & sightseeing by private dedicated vehicle (Swift Dzire / Scorpio / Xylo / Innova Crysta).",
      "Driver allowance, fuel, road parking fees & toll taxes.",
      "All applicable luxury & GST taxes."
    ],
    exclusions: [
      "Airfare / Train fare.",
      "Daily Lunch and personal beverages.",
      "Entry fees to monuments, ropeway rides & permit charges.",
      "Nathula Pass permit fee (optional ₹5,000/- to ₹7,000/- per vehicle supplement)."
    ]
  },

  // 2. 5N/6D Gangtok, Pelling & Darjeeling
  {
    id: "sikkim-gangtok-pelling-darjeeling-6d5n",
    title: "Gangtok, Pelling Skywalk & Darjeeling Tour",
    subtitle: "Gangtok 02N + Pelling 01N + Darjeeling 02N",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    destinationsCovered: ["Bagdogra/NJP", "Gangtok (2N)", "Tsomgo Lake", "Namchi Chardham", "Pelling (1N)", "Glass Skywalk", "Darjeeling (2N)"],
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    badge: "POPULAR CIRCUIT",
    shortDescription: "Covers Gangtok, high-altitude Tsomgo Lake, the towering 108-ft Shiva statue at Namchi Chardham, thrilling glass Pelling Skywalk facing Mt. Kanchenjunga, and Darjeeling tea estates.",
    hotelTiers: [
      {
        tierId: "SUPER_DELUXE",
        categoryName: "Super Deluxe Hotels",
        badgeLabel: "3-STAR RATED ON MMT",
        hotelListByCity: {
          "Gangtok": ["Hotel Sun Mount Mayal Retreat", "Tashi Yang by Baizus", "Maya Inn"],
          "Pelling": ["Hotel Dubdi (Linkage)", "Tripoo Rhisum Haapo Retreat", "Rufina Palm Bliss", "The Golden Retreat"],
          "Darjeeling": ["Aristocrat By Baizus", "Hotel Raj Ville", "Tripoo Potala Palace"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 53361, offSeasonTotal: 41839, seasonPerPerson: 26681, offSeasonPerPerson: 20920 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 73978, offSeasonTotal: 55787, seasonPerPerson: 18495, offSeasonPerPerson: 13947 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 109148, offSeasonTotal: 78222, seasonPerPerson: 18191, offSeasonPerPerson: 13037 }
        ]
      },
      {
        tierId: "3_STAR",
        categoryName: "3-Star Boutique Hotels",
        badgeLabel: "UDAAN & YASHSHREE LUXURY",
        hotelListByCity: {
          "Gangtok": ["Udaan Hotels | Keepsa Hotel & Spa", "Summit Namnang Courtyard & Spa", "Yashshree Sikkim Blossom"],
          "Pelling": ["Yashshree Pelling The Chekhim Retreat", "Wisteria Crystal Manor", "Udaan Olive Hotel & Spa", "Kaya Gantavya Resort"],
          "Darjeeling": ["Udaan Hotels - Himalayan Suites & Spa", "Summit Swiss", "Yashshree Mall Road", "Hotel Tenzing Glory"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 86105, offSeasonTotal: 62456, seasonPerPerson: 43053, offSeasonPerPerson: 31228 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 139466, offSeasonTotal: 97020, seasonPerPerson: 34867, offSeasonPerPerson: 24255 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 207380, offSeasonTotal: 140072, seasonPerPerson: 34563, offSeasonPerPerson: 23345 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "NJP/Bagdogra to Gangtok Transfer (125 Km | 4-5 Hrs)", nightStay: "Gangtok", altitude: "5,480 ft", activities: ["Scenic drive along Teesta River", "Hotel check-in", "Evening at MG Marg"] },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion (120 Km | 6-7 Hrs)", nightStay: "Gangtok", activities: ["Tsomgo glacial lake", "Yak riding & photos", "Baba Harbhajan Singh Shrine", "Snow clad peaks"] },
      { day: 3, title: "Gangtok to Pelling via Namchi Chardham (120 Km | 5-6 Hrs)", nightStay: "Pelling", altitude: "7,200 ft", activities: ["Visit monumental Siddheshwar Dham (Namchi Chardham) with 108-ft Lord Shiva statue", "Replicas of 4 sacred Dhams", "Drive to Pelling and hotel check-in"] },
      { day: 4, title: "Pelling Sightseeing & Darjeeling Transfer (75 Km | 3-4 Hrs)", nightStay: "Darjeeling", altitude: "6,710 ft", activities: ["Visit Pelling Glass Skywalk & 137-ft Chenrezig Statue", "Explore Pemayangtse Monastery and Rabdentse Royal Palace Ruins", "Transfer to Darjeeling", "Evening at Chowrasta"] },
      { day: 5, title: "Tiger Hill Sunrise & Darjeeling Sightseeing", nightStay: "Darjeeling", activities: ["04:00 AM Tiger Hill Sunrise", "Ghoom Monastery & Batasia Loop", "HMI & Himalayan Zoo", "Tea Estate & Peace Pagoda"] },
      { day: 6, title: "Farewell Himalayas - Darjeeling to NJP/IXB (100 Km | 4-5 Hrs)", nightStay: "Departure", activities: ["Breakfast with mountain view", "Transfer to Bagdogra Airport / NJP Station"] }
    ],
    inclusions: ["Accommodation on double/triple sharing", "Breakfast & Dinner (MAP Plan)", "Private AC vehicle", "Driver allowance, fuel, parking & toll", "All taxes"],
    exclusions: ["Airfare/train", "Lunch", "Monuments entrance fees & joyride tickets"]
  },

  // 3. 6N/7D Gangtok, Pelling & Darjeeling
  {
    id: "sikkim-grand-gangtok-pelling-darjeeling-7d6n",
    title: "Grand Sikkim & Darjeeling Explorer",
    subtitle: "Gangtok 03N + Pelling 01N + Darjeeling 02N",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    destinationsCovered: ["Bagdogra/NJP", "Gangtok (3N)", "Tsomgo Lake", "Banjhakri Falls", "Namchi Chardham", "Pelling (1N)", "Glass Skywalk", "Darjeeling (2N)"],
    heroImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    badge: "COMPLETE CULTURAL TRAIL",
    shortDescription: "Includes an additional full day Gangtok local sightseeing day covering Research Institute of Tibetology, Banjhakri Waterfalls, Tashi View Point, Namchi Chardham, Pelling Skywalk, and Darjeeling.",
    hotelTiers: [
      {
        tierId: "SUPER_DELUXE",
        categoryName: "Super Deluxe Hotels",
        badgeLabel: "3-STAR RATED ON MMT",
        hotelListByCity: {
          "Gangtok": ["Hotel Sun Mount Mayal Retreat", "Tashi Yang by Baizus", "Maya Inn"],
          "Pelling": ["Hotel Dubdi (Linkage)", "Tripoo Rhisum Haapo Retreat", "Rufina Palm Bliss", "The Golden Retreat"],
          "Darjeeling": ["Aristocrat By Baizus", "Hotel Raj Ville", "Tripoo Potala Palace"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 60638, offSeasonTotal: 47297, seasonPerPerson: 30319, offSeasonPerPerson: 23649 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 84286, offSeasonTotal: 63669, seasonPerPerson: 21072, offSeasonPerPerson: 15917 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 125519, offSeasonTotal: 90956, seasonPerPerson: 20920, offSeasonPerPerson: 15159 }
        ]
      },
      {
        tierId: "3_STAR",
        categoryName: "3-Star Boutique Hotels",
        badgeLabel: "UDAAN & YASHSHREE LUXURY",
        hotelListByCity: {
          "Gangtok": ["Udaan Hotels | Keepsa Hotel & Spa", "Summit Namnang Courtyard & Spa", "Yashshree Sikkim Blossom"],
          "Pelling": ["Yashshree Pelling The Chekhim Retreat", "Wisteria Crystal Manor", "Udaan Olive Hotel & Spa", "Kaya Gantavya Resort"],
          "Darjeeling": ["Udaan Hotels - Himalayan Suites & Spa", "Summit Swiss", "Yashshree Mall Road", "Hotel Tenzing Glory"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 100658, offSeasonTotal: 72158, seasonPerPerson: 50329, offSeasonPerPerson: 36079 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 164327, offSeasonTotal: 113392, seasonPerPerson: 41082, offSeasonPerPerson: 28348 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 245581, offSeasonTotal: 165540, seasonPerPerson: 40930, offSeasonPerPerson: 27590 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Arrival & Transfer to Gangtok (125 Km | 4-5 Hrs)", nightStay: "Gangtok", altitude: "5,480 ft", activities: ["Teesta river drive", "Hotel check-in", "Evening MG Marg stroll"] },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion (120 Km | 6-7 Hrs)", nightStay: "Gangtok", activities: ["Glacial lake at 12,400 ft", "Baba Harbhajan Singh Shrine", "Snow view points"] },
      { day: 3, title: "Gangtok Full Day Local Sightseeing", nightStay: "Gangtok", activities: ["Tashi View Point for Kanchenjunga view", "Research Institute of Tibetology & Gonjang Monastery", "Bakthang & Banjhakri Waterfalls", "Directorate of Handicrafts & Handlooms", "Gangtok Ropeway cable car"] },
      { day: 4, title: "Gangtok to Pelling via Namchi Chardham (120 Km | 5-6 Hrs)", nightStay: "Pelling", altitude: "7,200 ft", activities: ["Visit 108-ft Shiva statue at Namchi Chardham", "Replicas of 4 Dhams", "Check-in at Pelling"] },
      { day: 5, title: "Pelling Sightseeing & Darjeeling Transfer (75 Km | 3-4 Hrs)", nightStay: "Darjeeling", altitude: "6,710 ft", activities: ["Pelling Glass Skywalk", "Pemayangtse Monastery", "Rabdentse Ruins", "Transfer to Darjeeling", "Mall Road evening"] },
      { day: 6, title: "Tiger Hill Sunrise & Darjeeling Sightseeing", nightStay: "Darjeeling", activities: ["04:00 AM Tiger Hill Sunrise", "Ghoom Monastery & Batasia Loop", "HMI & Zoo", "Tea garden & Peace Pagoda"] },
      { day: 7, title: "Farewell Himalayas - Darjeeling to NJP/IXB (100 Km | 4-5 Hrs)", nightStay: "Departure", activities: ["Breakfast with views", "Drop at Bagdogra Airport / NJP Station"] }
    ],
    inclusions: ["Accommodation on double/triple sharing", "Breakfast & Dinner (MAP Plan)", "Private AC vehicle", "Driver allowance, fuel, parking & toll", "All taxes"],
    exclusions: ["Airfare/train", "Lunch", "Monuments entrance fees"]
  },

  // 4. 7N/8D Gangtok, North Sikkim (Lachen, Lachung, Gurudongmar, Yumthang) & Darjeeling
  {
    id: "sikkim-north-gurudongmar-yumthang-darjeeling-8d7n",
    title: "North Sikkim & Darjeeling High Altitude Expedition",
    subtitle: "Gangtok 04N + Lachen 01N + Lachung 01N + Darjeeling 02N",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    destinationsCovered: ["Bagdogra/NJP", "Gangtok (4N)", "Tsomgo Lake", "Lachen (1N)", "Gurudongmar Lake (17,800 ft)", "Lachung (1N)", "Yumthang Valley of Flowers", "Darjeeling (2N)"],
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
    badge: "ULTIMATE HIMALAYAN EXPEDITION",
    shortDescription: "The ultimate Himalayan odyssey reaching one of the highest lakes on Earth - Gurudongmar Lake (17,800 ft), the blooming alpine meadow of Yumthang Valley of Flowers, high passes, plus Darjeeling.",
    hotelTiers: [
      {
        tierId: "SUPER_DELUXE",
        categoryName: "Super Deluxe Hotels",
        badgeLabel: "3-STAR RATED ON MMT",
        hotelListByCity: {
          "Gangtok": ["Hotel Sun Mount Mayal Retreat", "Tashi Yang by Baizus", "Maya Inn"],
          "Lachung": ["Divine The Elite Zong", "The Lachung Inn", "Floret Holidays Hotel", "Rufina Royal Lachung"],
          "Darjeeling": ["Aristocrat By Baizus", "Hotel Raj Ville", "Tripoo Potala Palace"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 74099, offSeasonTotal: 60031, seasonPerPerson: 37050, offSeasonPerPerson: 30016 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 99688, offSeasonTotal: 78222, seasonPerPerson: 24922, offSeasonPerPerson: 19556 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 136191, offSeasonTotal: 102477, seasonPerPerson: 22699, offSeasonPerPerson: 17080 }
        ]
      },
      {
        tierId: "3_STAR",
        categoryName: "3-Star Boutique Hotels",
        badgeLabel: "UDAAN & YASHSHREE LUXURY",
        hotelListByCity: {
          "Gangtok": ["Udaan Hotels | Keepsa Hotel & Spa", "Summit Namnang Courtyard & Spa", "Yashshree Sikkim Blossom"],
          "Lachung": ["Yashshree Lachung", "Udaan Metho Pelri Resort", "Magellan's Grandala Habitatio", "Verdant The Vintage"],
          "Darjeeling": ["Udaan Hotels - Himalayan Suites & Spa", "Summit Swiss", "Yashshree Mall Road", "Hotel Tenzing Glory"]
        },
        seasonPricing: [
          { paxSlab: "2 PAX", paxCount: 2, seasonTotal: 117272, offSeasonTotal: 87439, seasonPerPerson: 58636, offSeasonPerPerson: 43720 },
          { paxSlab: "4 PAX", paxCount: 4, seasonTotal: 186036, offSeasonTotal: 133038, seasonPerPerson: 46509, offSeasonPerPerson: 33260 },
          { paxSlab: "6 PAX", paxCount: 6, seasonTotal: 265713, offSeasonTotal: 184701, seasonPerPerson: 44286, offSeasonPerPerson: 30784 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Arrival & Transfer to Gangtok (125 Km | 4-5 Hrs)", nightStay: "Gangtok", altitude: "5,480 ft", activities: ["Teesta valley scenic drive", "Hotel check-in", "Evening MG Marg stroll"] },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion (120 Km | 6-7 Hrs)", nightStay: "Gangtok", activities: ["Tsomgo glacial lake at 12,400 ft", "Yak riding & photos", "Baba Harbhajan Singh Shrine"] },
      { day: 3, title: "Gangtok to Lachen High Mountain Valley (120 Km | 5-6 Hrs)", nightStay: "Lachen", altitude: "9,020 ft", activities: ["Drive through Chungthang gorge", "Confluence of Lachen Chu & Lachung Chu rivers", "Singhik view point", "Check-in at Lachen amidst snow-capped peaks"] },
      { day: 4, title: "Excursion to Gurudongmar Lake (17,800 ft) & Lachung Transfer (120 Km | 7-8 Hrs)", nightStay: "Lachung", altitude: "8,610 ft", activities: ["Early morning drive to sacred Gurudongmar Lake - one of the highest lakes in the world", "Crystal-clear azure waters surrounded by Tibetan Plateau peaks", "Drive through Chopta Valley and Thangu Valley", "Transfer to alpine village of Lachung"] },
      { day: 5, title: "Yumthang Valley of Flowers & Transfer to Gangtok (115 Km | 6-7 Hrs)", nightStay: "Gangtok", altitude: "5,410 ft", activities: ["Visit breathtaking Yumthang Valley (Sikkim Valley of Flowers)", "Lush alpine meadows, rhododendron blooms, and sulfur hot springs", "Optional Zero Point (Yumesamdong at 15,300 ft)", "Transfer back to Gangtok"] },
      { day: 6, title: "Gangtok to Darjeeling Transfer (100 Km | 4-5 Hrs)", nightStay: "Darjeeling", altitude: "7,000 ft", activities: ["Drive through rolling tea gardens to Darjeeling", "Check in to hotel", "Evening walk at Chowrasta Mall Road", "Optional Toy Train joyride"] },
      { day: 7, title: "Tiger Hill Sunrise & Full Day Darjeeling Sightseeing", nightStay: "Darjeeling", activities: ["04:00 AM Tiger Hill Sunrise over Mt. Kanchenjunga", "Ghoom Monastery & Batasia Loop", "HMI & Himalayan Zoo (Red Pandas)", "Tea Estate & Peace Pagoda"] },
      { day: 8, title: "Farewell Himalayas - Darjeeling to NJP/IXB (100 Km | 4-5 Hrs)", nightStay: "Departure", activities: ["Breakfast with tea garden views", "Transfer to Bagdogra Airport / NJP Railway Station"] }
    ],
    inclusions: ["Accommodation on double/triple sharing", "Breakfast & Dinner (MAP Plan)", "North Sikkim Special Protected Area permits & SUV", "Driver allowance, fuel, parking & toll", "All taxes"],
    exclusions: ["Airfare/train", "Lunch", "Zero Point excursion supplement (₹3,500-₹4,500/vehicle)", "Personal expenses"]
  }
];

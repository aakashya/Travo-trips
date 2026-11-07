export interface WinterPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  badge: string;
  /** Flat advertised per-person rate — these routes have no hotel tiers or group-size slabs. */
  pricePerPerson: number;
  heroImage: string;
  bannerImage: string;
  destinationsCovered: string[];
  shortDescription: string;
  /** Short form used on catalogue cards, e.g. "Daily Departures • 20 Oct onwards". */
  departureWindow: string;
  departureNote: string;
  pickupPoints: { city: string; detail: string }[];
  transport: string;
  mealPlan: string;
  tripHighlights: string[];
  stayDetails: { dayRange: string; place: string; property: string; mealPlan: string }[];
  itinerary: {
    day: number;
    locationLabel: string;
    title: string;
    timingSummary?: string;
    activities: string[];
  }[];
  packingChecklist: { category: string; items: string[] }[];
  inclusions: string[];
  exclusions: string[];
  galleryPhotos: { url: string; title: string }[];
}

const WIKI = (file: string, width = 800) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`;

export const WINTER_PACKAGES: WinterPackage[] = [
  // 1. Chopta – Tungnath 2N/3D
  {
    id: "chopta-tungnath-3d2n",
    title: "Chopta & Tungnath Winter Escape",
    subtitle: "Devprayag Sangam • Chopta Campsite (2N) • Tungnath Temple & Chandrashila Summit • Deoria Tal",
    duration: "3 Days / 2 Nights",
    nights: 2,
    days: 3,
    badge: "WINTER EDITION",
    pricePerPerson: 6499,
    heroImage: WIKI("Tungnath%20Temple.jpg", 1600),
    bannerImage: WIKI("Tungnath%20Temple.jpg", 1600),
    destinationsCovered: ["Devprayag", "Chopta", "Tungnath", "Chandrashila", "Deoria Tal"],
    shortDescription:
      "A short, high-reward Himalayan escape through Garhwal — the Devprayag Sangam where the Ganga begins, two nights at a meadow campsite in Chopta, the world's highest Shiva temple at Tungnath, the 360° Chandrashila summit, and the mirror-still Deoria Tal.",
    departureWindow: "Daily Departures • 20 Oct onwards",
    departureNote: "Daily departures from 20th October onwards (till next 2 months)",
    pickupPoints: [
      { city: "Delhi", detail: "Akshardham Metro Station" },
      { city: "Rishikesh", detail: "On request — confirm while booking" }
    ],
    transport: "AC Traveller / Bus (Delhi / Rishikesh)",
    mealPlan: "4 Meals (2 Breakfasts + 2 Dinners)",
    tripHighlights: [
      "Devprayag Sangam",
      "Scenic Campsite in Chopta",
      "Forest Trek",
      "Tungnath Temple Trek",
      "Chandrashila Summit View",
      "Deoria Tal Lake",
      "Bonfire Nights",
      "Comfortable Travel & Stay"
    ],
    stayDetails: [
      { dayRange: "Day 1-2", place: "Chopta", property: "Scenic Campsite (Deluxe Tents, Sharing Basis)", mealPlan: "Breakfast + Dinner" }
    ],
    itinerary: [
      {
        day: 0,
        locationLabel: "Delhi / Rishikesh",
        title: "Departure from Delhi & Rishikesh",
        timingSummary: "Pickup at Akshardham Metro Station • Overnight journey",
        activities: [
          "Boarding a bus or traveller from Delhi.",
          "Pick-up Point: Akshardham Metro Station at the decided time.",
          "Small briefing session from the Trip Captain.",
          "Overnight journey from Delhi to Chopta with 2-3 halt stops (borne by customer)."
        ]
      },
      {
        day: 1,
        locationLabel: "Devprayag & Chopta",
        title: "Leisure & Short Forest Trek",
        timingSummary: "Devprayag Sangam in the morning • Campsite check-in by afternoon",
        activities: [
          "Reach Devprayag in the morning, freshen up, and have breakfast.",
          "Enjoy the view of the Sangam (confluence) of Bhagirathi and Alaknanda rivers.",
          "Reach Chopta early afternoon and check into a scenic campsite.",
          "After lunch, head for a forest (jungle) trek and refresh with evening snacks.",
          "Enjoy a Bonfire / DJ Night, dinner, and a good night's sleep."
        ]
      },
      {
        day: 2,
        locationLabel: "Tungnath & Chandrashila",
        title: "Tungnath & Chandrashila Trek",
        timingSummary: "Early sunrise • Trek to 3,680m Tungnath and 4,000m Chandrashila",
        activities: [
          "Wake up early to catch the morning sunrise from the campsite.",
          "After breakfast, drive to the trek starting point and trek to Tungnath (World's Highest Shiva Temple).",
          "Trek further to Chandrashila Peak for a 360-degree panoramic view.",
          "Return to Chopta campsite by evening and refresh with evening snacks.",
          "Enjoy a Bonfire & Music session followed by a delicious dinner."
        ]
      },
      {
        day: 3,
        locationLabel: "Deoria Tal & Return",
        title: "Deoria Tal & Departure",
        timingSummary: "Sari village trek • Overnight return journey to Delhi",
        activities: [
          "Wake up early, enjoy breakfast, and check out from the campsite.",
          "Drive to Sari village (~30 minutes from the campsite).",
          "Trek to Deoria Tal and depart for Delhi after having lunch.",
          "Overnight journey to Delhi."
        ]
      }
    ],
    packingChecklist: [
      {
        category: "🧥 Winter Layers & Footwear",
        items: [
          "Heavy insulated jacket & windcheater",
          "Thermal innerwear (2 sets) and warm socks",
          "Woollen cap and gloves for the summit morning",
          "Trekking shoes with solid grip (snow underfoot in winter)"
        ]
      },
      {
        category: "🎒 Trek Essentials & Documents",
        items: [
          "Daypack for the Tungnath & Deoria Tal treks",
          "Reusable water bottle, dry snacks & personal medicines",
          "Sunscreen SPF 50+, sunglasses, lip balm, torch & power bank",
          "Valid government photo ID (mandatory at checkpoints)"
        ]
      }
    ],
    inclusions: [
      "Comfortable AC Traveller / Bus for transportation from Delhi (Rishikesh pickup on request).",
      "2 Nights accommodation at a scenic campsite in Chopta.",
      "4 Meals included (2 Breakfasts & 2 Dinners).",
      "Bonfire with music (subject to availability).",
      "All sightseeing as per itinerary (subject to permits).",
      "Experienced Trip Captain throughout the journey.",
      "24x7 assistance during the trip."
    ],
    exclusions: [
      "5% extra GST on drinks, food, tea, and snacks.",
      "Ticket for any sightseeing or extra activity outside the camp area.",
      "Travel insurance and other personal benefits.",
      "Heater charges extra.",
      "Cost escalation due to unforeseen reasons (weather, road conditions, landslides, etc.).",
      "Anything not explicitly mentioned in the inclusions."
    ],
    galleryPhotos: [
      { url: WIKI("Tungnath%20Temple.jpg"), title: "Tungnath — World's Highest Shiva Temple" },
      { url: WIKI("Chandrashila%20peak.jpg"), title: "Chandrashila Summit Panorama (4,000m)" },
      { url: WIKI("Chopta%20Valley.jpg"), title: "Chopta Meadows & Campsite Country" },
      { url: WIKI("Deoria%20Tal.jpg"), title: "Deoria Tal — The Mirror Lake" },
      { url: WIKI("A%20confluence%20of%20Alaknanda%20and%20Bhagirathi%20rivers%2C%20Devprayag%2C%20Uttarakhand.jpg"), title: "Devprayag Sangam — Where the Ganga Begins" },
      { url: WIKI("Rishikesh%27s%20ganga.jpg"), title: "Rishikesh — Alternate Pickup Point" }
    ]
  },

  // 2. Manali – Sissu – Kasol 3N/4D
  {
    id: "manali-sissu-kasol-4d3n",
    title: "Manali, Sissu & Kasol Winter Circuit",
    subtitle: "Manali (2N) • Hadimba & Mall Road • Solang Valley • Atal Tunnel & Sissu • Kasol (1N) & Manikaran",
    duration: "4 Days / 3 Nights",
    nights: 3,
    days: 4,
    badge: "WINTER EDITION",
    pricePerPerson: 6999,
    heroImage: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg?width=1600",
    bannerImage: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg?width=1600",
    destinationsCovered: ["Manali", "Solang Valley", "Atal Tunnel", "Sissu", "Kasol", "Manikaran"],
    shortDescription:
      "The complete Himachal winter circuit — Hadimba's cedar forests and Mall Road evenings in Manali, snow at Solang Valley, a drive through the Atal Tunnel into the stark Lahaul landscape at Sissu, and a final night by the Parvati river at Kasol with the Manikaran Gurudwara langar.",
    departureWindow: "Daily Departures • 20 Oct onwards",
    departureNote: "Daily departures from 20th October onwards (till next 2 months)",
    pickupPoints: [
      { city: "Delhi", detail: "Boarding at the decided time" },
      { city: "Chandigarh", detail: "Boarding at the decided time" }
    ],
    transport: "AC Traveller / Bus (Delhi / Chandigarh)",
    mealPlan: "6 Meals (3 Breakfasts + 3 Dinners)",
    tripHighlights: [
      "Manali Local Sightseeing",
      "Hadimba Temple & Mall Road",
      "Solang Valley",
      "Atal Tunnel & Sissu",
      "Kasol & Manikaran Gurudwara",
      "Scenic Drives & River Views",
      "Bonfire Nights",
      "Comfortable Travel & Stay"
    ],
    stayDetails: [
      { dayRange: "Day 1-2", place: "Manali", property: "Scenic Hotel (Sharing Basis)", mealPlan: "Breakfast + Dinner" },
      { dayRange: "Day 3", place: "Kasol", property: "Riverside Camps / Cottage", mealPlan: "Breakfast + Dinner" }
    ],
    itinerary: [
      {
        day: 0,
        locationLabel: "Delhi / Chandigarh",
        title: "Departure From Delhi / Chandigarh",
        timingSummary: "Boarding at the decided time • Overnight journey towards Manali",
        activities: [
          "Boarding comfortable AC Traveller / Bus from Delhi / Chandigarh at the decided time.",
          "Short briefing session with your Trip Captain.",
          "Overnight journey towards Manali with 2–3 dinner/snack halts."
        ]
      },
      {
        day: 1,
        locationLabel: "Manali",
        title: "Manali Arrival & Local Sightseeing",
        timingSummary: "Morning hotel check-in • Hadimba Temple, Old Manali & Mall Road",
        activities: [
          "Reach Manali in the morning & check into the hotel.",
          "Freshen up & relax.",
          "Visit Hadimba Temple, explore Old Manali, and stroll through Mall Road.",
          "Return to hotel for dinner served alongside a bonfire & light music.",
          "Overnight stay in Manali."
        ]
      },
      {
        day: 2,
        locationLabel: "Solang • Atal Tunnel • Sissu",
        title: "Solang Valley – Atal Tunnel – Sissu",
        timingSummary: "Full day sightseeing • Drive through the Atal Tunnel into Lahaul",
        activities: [
          "Post breakfast, head out for sightseeing.",
          "Experience mesmerising views at Solang Valley.",
          "Drive through the iconic Atal Tunnel to reach Sissu.",
          "Spend leisure time taking in the stunning mountain landscapes of Sissu.",
          "Return to hotel for dinner & overnight stay in Manali."
        ]
      },
      {
        day: 3,
        locationLabel: "Manali to Kasol",
        title: "Manali to Kasol",
        timingSummary: "Checkout & scenic drive • Optional rafting / paragliding en route",
        activities: [
          "Early morning breakfast & hotel checkout.",
          "Drive towards Kasol. En route, enjoy adventurous activities like River Rafting & Paragliding (optional).",
          "Check in at Kasol Camps / Cottage.",
          "Enjoy dinner with a cozy bonfire night.",
          "Overnight stay in Kasol."
        ]
      },
      {
        day: 4,
        locationLabel: "Kasol & Manikaran",
        title: "Kasol – Manikaran Gurudwara – Return Journey",
        timingSummary: "Manikaran langar • Kasol cafes • Late evening departure",
        activities: [
          "Morning breakfast & checkout.",
          "Visit the holy Manikaran Gurudwara & partake in the Langar.",
          "Relax by the Kasol riverbanks & explore vibrant Kasol Cafes (e.g., Cafe Evergreen).",
          "Departure for Delhi in the late evening, arriving back the next morning with unforgettable memories!"
        ]
      }
    ],
    packingChecklist: [
      {
        category: "🧥 Winter Layers & Footwear",
        items: [
          "Heavy insulated jacket & windcheater",
          "Thermal innerwear (2 sets) and warm socks",
          "Woollen cap and gloves for Solang & Sissu",
          "Waterproof shoes with good grip for snow"
        ]
      },
      {
        category: "🎒 Day Essentials & Documents",
        items: [
          "Small daypack for sightseeing days",
          "Sunscreen SPF 50+, sunglasses, lip balm & power bank",
          "Personal medicines and a reusable water bottle",
          "Valid government photo ID & a head covering for the Gurudwara"
        ]
      }
    ],
    inclusions: [
      "Comfortable AC Traveller / Bus for transportation from Delhi / Chandigarh.",
      "3 Nights accommodation (scenic hotel in Manali + camps / cottage in Kasol).",
      "6 Meals included (3 Breakfasts + 3 Dinners).",
      "Bonfire with music (subject to availability).",
      "All sightseeing as per itinerary.",
      "Experienced Trip Captain throughout the journey.",
      "24x7 assistance during the trip."
    ],
    exclusions: [
      "5% GST on extra food, drinks, tea, and snacks.",
      "Tickets for extra activities/sightseeing outside camp area (e.g., Rafting, Paragliding, Entry Tickets).",
      "Personal insurance and heater charges.",
      "Extra cost due to unforeseen events (landslides, heavy snow, road closures).",
      "Anything not explicitly mentioned in the inclusions."
    ],
    galleryPhotos: [
      { url: WIKI("The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg"), title: "Manali — Himalayan Winter Landscapes" },
      { url: WIKI("Solang%20Valley%20Manali.JPG"), title: "Solang Valley Snow Slopes" },
      { url: WIKI("Atal%20Tunnel.jpg"), title: "Atal Tunnel — Gateway to Lahaul" },
      { url: WIKI("Lahaul%20Valley.jpg"), title: "Sissu & the Lahaul Valley" },
      { url: WIKI("Kasol-parvati%20valley%2C%20himachal%20pradesh.jpg"), title: "Kasol & the Parvati Valley" },
      { url: WIKI("Manikaran%20Sahib%20Gurudwara.jpg"), title: "Manikaran Sahib Gurudwara" }
    ]
  }
];

export const WINTER_PACKAGE_IDS = WINTER_PACKAGES.map((pkg) => pkg.id);

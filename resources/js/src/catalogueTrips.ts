// Central catalogue dataset used by the homepage and the full trips catalogue.
// Set hasFullItinerary to true only when a matching full itinerary page exists.
// Types for the showcase trips
export interface ShowcaseTrip {
  id: string;
  name: string;
  subtitle: string;
  category: "treks" | "escapes" | "backpacking" | "spiritual" | "leisure";
  price: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  startPoint: string;
  upcomingDeparture: string;
  shortDesc: string;
  itinerarySummary: string[];
  inclusions: string[];
  hasFullItinerary?: boolean;
}

// 30+ Curated Trips Across 5 Distinct Categories
export const ALL_SHOWCASE_TRIPS: ShowcaseTrip[] = [
  // CATEGORY 1: HIMALAYAN TREKS (treks)
  {
    id: "valley-of-flowers",
    hasFullItinerary: true,
    name: "Valley of Flowers Expedition",
    subtitle: "UNESCO World Heritage Flora & Sacred Lake",
    category: "treks",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 320,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Valley%20of%20flowers%20national%20park%2C%20Uttarakhand%2C%20India%2003.jpg?width=1200",
    badge: "UNESCO Heritage",
    startPoint: "Delhi NCR",
    upcomingDeparture: "17th July 2026",
    shortDesc: "Trek through a celestial blanket of alpine flowers, scale up to the high glacial Hemkund Sahib lake, and wash your soul in sacred hot springs.",
    itinerarySummary: [
      "Day 1: Drive from Rishikesh to Govindghat via Panch Prayag",
      "Day 2: Trek 10km along Bhyundar river to Ghangaria basecamp",
      "Day 3: Immersive trek into the Valley of Flowers National Park",
      "Day 4: Climb to 14,203 ft to the holy Hemkund Sahib Gurudwara",
      "Day 5: Drive down to Badrinath Temple & Tapt Kund hot springs",
      "Day 6: Return journey back to Delhi with lifetime memories"
    ],
    inclusions: ["AC Tempo Traveller transfers", "5 Nights stay in deluxe guesthouses", "All meals, permits & forest entry fees", "Certified Mountaineering Guides"]
  },
  {
    id: "kedarkantha",
    name: "Kedarkantha Winter Peak",
    subtitle: "Magical Snow Peak Trekking Experience",
    category: "treks",
    price: "₹8,499",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate",
    rating: 4.8,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
    startPoint: "Dehradun",
    upcomingDeparture: "Every Saturday",
    shortDesc: "Summit a beautiful 12,500 ft snow peak. Famous for majestic pine-forest clearings, cozy frozen campsites, and stunning 360-degree views.",
    itinerarySummary: [
      "Day 1: Drive from Dehradun to Sankri village through scenic gorges",
      "Day 2: Trek from Sankri to Juda-Ka-Talab forest lake campsite",
      "Day 3: Trek to Kedarkantha Basecamp; stargazing under snow slopes",
      "Day 4: Pre-dawn summit climb to 12,500 ft; descend back to Sankri",
      "Day 5: Drive back to Dehradun with bags full of snow adventures"
    ],
    inclusions: ["Dehradun to Dehradun transport", "Camping tents & sleeping bags", "Experienced local guides & cooks", "All mountain permits"]
  },
  {
    id: "hampta-pass",
    name: "Hampta Pass Crossing",
    subtitle: "Dramatic Valley Contrast & Chandra Tal Lake",
    category: "treks",
    price: "₹9,800",
    duration: "5 Days / 4 Nights",
    difficulty: "Challenging",
    rating: 4.7,
    reviewsCount: 185,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    badge: "High Altitude",
    startPoint: "Manali",
    upcomingDeparture: "22nd July 2026",
    shortDesc: "A rare cross-over trek connecting the lush green valleys of Kullu with the stark, cold, moon-like desert landscapes of Spiti Valley.",
    itinerarySummary: [
      "Day 1: Drive from Manali to Jobra; trek to Chika riverside camp",
      "Day 2: Trek through wildflower valleys to Balu Ka Gera sandy camp",
      "Day 3: Steep climb over Hampta Pass (14,100 ft); descend to Shea Goru",
      "Day 4: Trek to Chatru; drive to the mystical crescent Moon Lake (Chandra Tal)",
      "Day 5: High mountain drive back to Manali via Atal Tunnel"
    ],
    inclusions: ["Manali to Manali logistics", "Premium camping dome tents", "High-nutrient trekking meals", "Microspikes and safety gear"]
  },
  {
    id: "har-ki-dun",
    name: "Har Ki Dun Valley",
    subtitle: "Amphitheatre of Gods & Ancient Timber Villages",
    category: "treks",
    price: "₹10,500",
    duration: "7 Days / 6 Nights",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 192,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    badge: "Cultural Trek",
    startPoint: "Dehradun",
    upcomingDeparture: "1st August 2026",
    shortDesc: "Step back in time. Walk through the ancient Himalayan villages of Garhwal with wood-carved temples, farming terraces, and snow-capped peaks.",
    itinerarySummary: [
      "Day 1: Scenic drive from Dehradun to Sankri village",
      "Day 2: Drive to Taluka; begin trek through mixed pine forests to Seema",
      "Day 3: Hike up to Har Ki Dun Valley, the cradle of the Tons River",
      "Day 4: Explore the glorious peak of Swargarohini glacier meadows",
      "Day 5: Trek back to Seema village; interact with local elders",
      "Day 6: Complete descent to Sankri; celebrate final group bonfire",
      "Day 7: Drive back to Dehradun railway/airport hub"
    ],
    inclusions: ["Stay in wooden homestays", "Forest entry permits & guide fees", "Healthy organic mountain meals", "All equipment & emergency oxygen"]
  },
  {
    id: "roopkund",
    name: "Roopkund Mystery Lake",
    subtitle: "Sacred High Alpine Glacial Meadow Trek",
    category: "treks",
    price: "₹15,500",
    duration: "8 Days / 7 Nights",
    difficulty: "Challenging",
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    badge: "Expert Adventure",
    startPoint: "Kathgodam",
    upcomingDeparture: "25th August 2026",
    shortDesc: "Venture to 16,000 ft to witness the legendary skeleton lake nested under Trishul and Nanda Ghunti peaks, surrounded by Asia's widest green meadows.",
    itinerarySummary: [
      "Day 1: Drive to Lohajung basecamp through rich Kumaon oak forests",
      "Day 2: Trek to Didna village; experience organic local stays",
      "Day 3: Climb through virgin rhododendron woodlands to Ali Bugyal meadow",
      "Day 4: Walk the gorgeous green ridge to Patar Nachuni alpine camp",
      "Day 5: Climb to Bhagwabasa high altitude transit camp",
      "Day 6: Summit Roopkund Lake (15,750 ft); return to Patar Nachuni",
      "Day 7: Descend to Lohajung village; bonfire celebrations",
      "Day 8: Drive back to Kathgodam railway hub"
    ],
    inclusions: ["All transfers from Kathgodam", "Stay in high-altitude dome camps", "Certified mountain leaders & safety ropes", "Nutritious group buffet dinners"]
  },
  {
    id: "bhrigu-lake",
    name: "Bhrigu Lake Alpine Meadows",
    subtitle: "High Altitude Glacial Meadow Excursion",
    category: "treks",
    price: "₹6,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Moderate",
    rating: 4.7,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    badge: "Quick Trek",
    startPoint: "Manali",
    upcomingDeparture: "Every Weekend",
    shortDesc: "Ascend rapidly from Manali to 14,000 ft to find a sacred, crystal-clear high altitude lake that never freezes completely, wrapped in lush meadows.",
    itinerarySummary: [
      "Day 1: Drive from Manali to Gulaba village; trek to Jonker Thach camp",
      "Day 2: Trek to Bhrigu Lake; witness endless views of Solang valleys; back to camp",
      "Day 3: Return trek down to Gulaba; drive back to Manali café spots"
    ],
    inclusions: ["Tented camps & warm liners", "Professional mountain kitchen staff", "Local permits", "Manali pickups"]
  },

  // CATEGORY 2: WEEKEND ESCAPES (escapes)
  {
    id: "bir-billing",
    name: "Bir Billing Paragliding",
    subtitle: "Sky Flying & Monastery Backpacking",
    category: "escapes",
    price: "₹7,499",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    badge: "Sky Adventure",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Thursday",
    shortDesc: "Soar like a bird from the world's 2nd highest paragliding launch pad. Witness sunset glider skies, walk serene Buddhist monasteries, and camp in pine forests.",
    itinerarySummary: [
      "Day 0: Leave Delhi NCR via overnight Volvo traveler bus",
      "Day 1: Arrive in Bir; check into mountain hostel; bicycle café tour & monastery sunset",
      "Day 2: Paragliding launch from Billing peak (8,000 ft); 20-min flight; evening forest campfire",
      "Day 3: Waterfall walk, souvenir shopping, overnight return drive to Delhi NCR"
    ],
    inclusions: ["Tandem Paragliding flight with Go Pro", "Hostel / Luxury tent stay", "Campfire & dynamic music night", "All transport logs"]
  },
  {
    id: "rishikesh-rafting",
    name: "Rishikesh River Rapids",
    subtitle: "Ganga White-water Rafting & Cliff Jumping",
    category: "escapes",
    price: "₹4,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 428,
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=800&auto=format&fit=crop",
    badge: "Water Thrills",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Friday",
    shortDesc: "Conquer the roaring rapids of the holy Ganges. Sleep under forest canopy tents, experience high cliff jumps, hike to hidden falls, and participate in Ganga Aarti.",
    itinerarySummary: [
      "Day 1: Delhi to Rishikesh drive; camp check-in; dynamic beach volleyball & sunset trek",
      "Day 2: 16 km white water rafting (Roller Coaster rapids), cliff jumping, starlit campfire & guitar evening",
      "Day 3: Sunrise trek to Kunjapuri Temple, waterfall bathe, return drive to Delhi"
    ],
    inclusions: ["16km White Water Rafting", "Riverside/Forest campsite stay", "All meals, tea & evening snacks", "Ganga Aarti transport help"]
  },
  {
    id: "mcleodganj-weekend",
    name: "Dharamshala Mcleodganj Escape",
    subtitle: "Tibetan Soul, Triund Trek & Monasteries",
    category: "escapes",
    price: "₹6,999",
    duration: "4 Days / 3 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 201,
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    badge: "Tibetan Vibe",
    startPoint: "Delhi NCR",
    upcomingDeparture: "11th July 2026",
    shortDesc: "Explore the residence of His Holiness Dalai Lama. Hike through tall rhododendron forests to Triund ridge with giant snow wall views, and chill in Bhagsu cafes.",
    itinerarySummary: [
      "Day 1: Arrive in Mcleodganj; tour the Dalai Lama Temple & beautiful St. John in Wilderness church",
      "Day 2: Walk/trek 9km to Triund ridge (9,350 ft); sleep in sky camps beside the Dhauladhar wall",
      "Day 3: Witness starry sunrise; descend to Mcleodganj; shop handwoven Tibetan carpets; café dinner",
      "Day 4: Drive down to Dharamshala Cricket Stadium; board return AC bus to Delhi"
    ],
    inclusions: ["Delhi to Delhi transport", "Cozy hotel (1N) & Triund Camps (1N)", "Certified local trek captains", "Traditional meals"]
  },
  {
    id: "jaipur-royal",
    name: "Jaipur Forts & Culture",
    subtitle: "Royal Heritage palaces & Street Food Walk",
    category: "escapes",
    price: "₹5,499",
    duration: "2 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1472214222541-d510753a4707?q=80&w=800&auto=format&fit=crop",
    badge: "Heritage Tour",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Saturday",
    shortDesc: "Drench yourself in the pink city's royal heritage. Explore glowing forts at night, capture historical palace symmetrical windows, and try mouthwatering traditional food.",
    itinerarySummary: [
      "Day 1: Early morning Delhi to Jaipur drive; check-in; explore Amber Palace, Hawa Mahal and Nahargarh sunset fort lights",
      "Day 2: City Palace tour, structural stepwell shoot, deep local bazaar shopping & heritage street food walk, return to Delhi"
    ],
    inclusions: ["Private tempo transportation", "Boutique heritage hotel stay", "Lal Maas / traditional Thali lunch", "Verified local guide"]
  },
  {
    id: "udaipur-lakes",
    hasFullItinerary: true,
    name: "Udaipur Lakes & Palaces",
    subtitle: "The City of Lakes, Royal Forts & Timeless Streets",
    category: "escapes",
    price: "₹10,499",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 176,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20view%20of%20City%20Palace%20%28Udaipur%29%2C%20Rajasthan%2C%20India%20-2.jpg?width=1600",
    badge: "Booking Open",
    startPoint: "IFFCO Chowk, Gurugram",
    upcomingDeparture: "7th August 2026",
    shortDesc: "Discover Rajasthan's City of Lakes through royal palaces, serene gardens, Kumbhalgarh Fort, Ranakpur's marble temple, old-city ghats, and a final Aravalli sunset.",
    itinerarySummary: [
      "Day 0: 9:00 PM departure from IFFCO Chowk, Gurugram; overnight premium AC coach journey to Udaipur",
      "Day 1: Arrival and hotel check-in, Fateh Sagar Lake, Saheliyon Ki Bari, Hathi Pol Market, dinner and overnight stay",
      "Day 2: Breakfast, Kumbhalgarh Fort, Ranakpur Jain Temple, Karni Mata Ropeway, sunset viewpoint, dinner and overnight stay",
      "Day 3: City Palace, Jagdish Temple, Lake Pichola boat ride, Gangaur Ghat, Bagore Ki Haveli, Badi Lake and Bahubali Hills before the return journey"
    ],
    inclusions: ["Gurugram to Udaipur AC transportation", "2 nights comfortable hotel stay", "Daily breakfast and dinner", "Sightseeing and experienced trip captain"]
  },
  {
    id: "shimla-retreat",
    name: "Shimla Kufri Explorer",
    subtitle: "British Era Architecture & Apple Orchards",
    category: "escapes",
    price: "₹6,800",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.6,
    reviewsCount: 139,
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    badge: "Pine Forests",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Friday",
    shortDesc: "Stroll down the pedestrian Ridge of Shimla, snap Gothic church towers, hike the tall pine woods of Kufri, and see beautiful snowy mountain outlines.",
    itinerarySummary: [
      "Day 1: Scenic hill drive to Shimla; stroll Mall Road & Lakkar Bazaar; wood souvenirs shopping",
      "Day 2: Ride horses in the lush meadows of Kufri; forest trail walk; bonfire at hotel",
      "Day 3: Jakhoo Hill Temple trek, scenic road-trip return to Delhi via Pinjore Gardens"
    ],
    inclusions: ["AC Traveller transport", "Pine-view resort stay", "Breakfast & dinner buffets", "Local trip marshal"]
  },

  // CATEGORY 3: BACKPACKING TOURS (backpacking)
  {
    id: "ladakh-backpacking",
    name: "Leh Ladakh Roadtrip",
    subtitle: "High Mountain Passes, Nubra Sand Dunes & Blue Lakes",
    category: "backpacking",
    price: "₹24,999",
    duration: "9 Days / 8 Nights",
    difficulty: "Challenging",
    rating: 4.9,
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    badge: "Bucket List",
    startPoint: "Manali / Leh",
    upcomingDeparture: "15th July 2026",
    shortDesc: "Cruising the legendary high-altitude roads. Cross the world's highest motorable passes, double-hump camel ride in cold deserts, and camp beside the pure blue water of Pangong Lake.",
    itinerarySummary: [
      "Day 1: Assemble in Manali; briefing; drive through Atal Tunnel to Keylong",
      "Day 2: Drive the majestic Gata Loops to Leh; acclimatize",
      "Day 3: Leh local sightseeing: Hall of Fame, Magnetic Hill, Sangam river junction",
      "Day 4: Cross Khardung La (17,580 ft) to Nubra Valley; ride Bactrian camels",
      "Day 5: Drive to the border village of Turtuk; experience organic Baltic lifestyle",
      "Day 6: Cruise to Pangong Lake via Shyok River; starry galaxy camping",
      "Day 7: Drive Pangong to Leh via Chang La pass; souvenir shopping",
      "Day 8: Journey Leh back to Keylong/Jispa with group songs",
      "Day 9: Reach Manali; say final emotional farewells to the clan"
    ],
    inclusions: ["All inner-line tourist permits", "Stay in cozy hotels & Pangong luxury camps", "Bullet / Himalayan bikes or SUVs as selected", "Mechanical backup & oxygen cylinders"]
  },
  {
    id: "spiti-valley",
    name: "Spiti Valley Expedition",
    subtitle: "1000-Yr Old Monasteries & Highest Post Office",
    category: "backpacking",
    price: "₹18,999",
    duration: "8 Days / 7 Nights",
    difficulty: "Challenging",
    rating: 4.9,
    reviewsCount: 290,
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop",
    badge: "Most Remote",
    startPoint: "Shimla / Manali",
    upcomingDeparture: "18th July 2026",
    shortDesc: "Venture into the cold desert of Spiti. Post a letter from the world's highest post office at Hikkim, explore precariously perched monasteries, and star-gaze under dark sky reserves.",
    itinerarySummary: [
      "Day 1: Shimla to Sangla valley drive; cross dangerous rocky roads",
      "Day 2: Visit Chitkul, the last Indian village with wooden architectures",
      "Day 3: Drive into Spiti valley; explore Tabo Monastery (Ajanta of Himalayas)",
      "Day 4: Visit Pin Valley snow leopard park & Dhankar fort monastery",
      "Day 5: Hike the highest motorable villages: Komik, Hikkim & Langza Buddha",
      "Day 6: Key Monastery castle tour; drive to high-altitude Chicham bridge",
      "Day 7: Trek to Chandra Tal (Crescent Moon Lake); lakeside bonfire",
      "Day 8: Drive back to Manali via Kunzum Pass and Atal Tunnel"
    ],
    inclusions: ["High-clearance SUV transport", "Stays in authentic Spitian homestays", "Local guides & breakfast/dinner", "Permits and oxygen logistics"]
  },
  {
    id: "meghalaya-caves",
    name: "Meghalaya Wet Backpacking",
    subtitle: "Living Root Bridges & Crystal Clear Canyons",
    category: "backpacking",
    price: "₹19,500",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop",
    badge: "Eco-Adventure",
    startPoint: "Guwahati",
    upcomingDeparture: "12th August 2026",
    shortDesc: "Explore the wettest region on earth. Trek to natural double-decker living root bridges, plunge into turquoise natural pools, explore deep limestone caves, and row boats on clear glass-like rivers.",
    itinerarySummary: [
      "Day 1: Guwahati to Shillong drive; cafe hopping & rock music sunset",
      "Day 2: Drive to Cherrapunji; trek down 3,500 steps to Double Decker Root Bridge",
      "Day 3: Dip in the magical blue Rainbow Falls; sleep in village homestays",
      "Day 4: Explore ancient Mawmluh limestone caves; drive to Dawki border town",
      "Day 5: Boat ride on glass-clear Umngot river; trek to canyon cliffs",
      "Day 6: Return via cleanest village Mawlynnong to Guwahati"
    ],
    inclusions: ["Private local transfers", "Homestays & boutique eco-resorts", "All entry, boating & cave guide fees", "Khasi local delicacies"]
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters & Tea Trails",
    subtitle: "Misty Munnar Hills, Houseboats & Surfing",
    category: "backpacking",
    price: "₹16,500",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    badge: "Nature Relax",
    startPoint: "Kochi",
    upcomingDeparture: "22nd August 2026",
    shortDesc: "Venture from the historic spice markets of Fort Kochi to the sweeping emerald tea plantations of Munnar, floating down palm-fringed backwaters on traditional houseboats.",
    itinerarySummary: [
      "Day 1: Kochi arrival; explore colonial streets, Chinese fishing nets & spice markets",
      "Day 2: Drive into misty Munnar tea hills; tea-factory tour & spice gardens",
      "Day 3: Trek the Kolukkumalai sunrise peaks (world's highest tea estate) via 4x4 Jeep",
      "Day 4: Drive to Alleppey; check-in to private traditional wooden houseboats",
      "Day 5: Floating backwater cruise; traditional Toddy shop visits; drive to Varkala cliffs",
      "Day 6: Morning cliff yoga, surf trial, return drive to Kochi airport"
    ],
    inclusions: ["All transfers in private AC cab", "Resort stay & 1 Night full houseboat cruise", "All meals on houseboat", "Kolukkumalai 4x4 Jeep rides"]
  },
  {
    id: "rajasthan-desert",
    name: "Rajasthan Desert Safari",
    subtitle: "Blue City Forts, Haunted Villages & Dune Camps",
    category: "backpacking",
    price: "₹12,499",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    badge: "Ethnic Vibe",
    startPoint: "Jaipur / Jodhpur",
    upcomingDeparture: "20th August 2026",
    shortDesc: "Backpack through royalty. Shoot blue alleyways of Jodhpur, trek Mehrangarh ramparts, sleep under clear desert stars on sand dunes, and walk empty haunted towns.",
    itinerarySummary: [
      "Day 1: Jaipur heritage palaces; traditional Rajasthani folk music dinner",
      "Day 2: Drive to blue Jodhpur; explore Mehrangarh fort and stepwells",
      "Day 3: Head to golden Jaisalmer; explore the only living fort castle in India",
      "Day 4: Visit haunted Kuldhara village; camel safari into Sam sand dunes; starry tents",
      "Day 5: Dune-bashing; Rajasthani cultural dance show & bonfire under star arrays",
      "Day 6: Drive back with ethnic shopping bags to Jaipur"
    ],
    inclusions: ["Boutique fort hotels & luxury Swiss camps", "Camel desert safaris & dune dinners", "Folk dance & musical gatherings", "Full vehicle support"]
  },
  {
    id: "andaman-scuba",
    name: "Andaman Island Backpacking",
    subtitle: "Turquoise Beaches, Scuba Diving & Rainforests",
    category: "backpacking",
    price: "₹21,800",
    duration: "5 Days / 4 Nights",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 122,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    badge: "Ocean Dive",
    startPoint: "Port Blair",
    upcomingDeparture: "Every Monday",
    shortDesc: "Venture to remote white sand islands. Dive in coral reefs, kayak inside dense swamp mangroves, walk old British prison halls, and capture gorgeous sunsets.",
    itinerarySummary: [
      "Day 1: Port Blair arrival; historic Cellular Jail light and sound show",
      "Day 2: Private cruise to Havelock Island; walk Radhanagar Beach (Asia's finest)",
      "Day 3: Guided Scuba diving trial; explore underwater coral walls & vibrant marine life",
      "Day 4: Boat trip to Elephant Beach; coral snorkeling or mangrove kayaking",
      "Day 5: Cruise to Neil island; natural bridge walk; flight return Port Blair"
    ],
    inclusions: ["Private cruise ferry tickets (Makruzz/Nautika)", "Beachside cottage stays", "1 fully guided Scuba Dive with photos", "Snorkelling kits & guides"]
  },

  // CATEGORY 4: SPIRITUAL JOURNEYS (spiritual)
  {
    id: "char-dham",
    name: "Char Dham Pilgrimage",
    subtitle: "Complete Sacred Devotional Uttarakhand Circuit",
    category: "spiritual",
    price: "₹34,999",
    duration: "11 Days / 10 Nights",
    difficulty: "Challenging",
    rating: 4.9,
    reviewsCount: 388,
    image: "https://images.unsplash.com/photo-1627894158434-60471900dfc1?q=80&w=800&auto=format&fit=crop",
    badge: "Sacred Yatra",
    startPoint: "Delhi NCR",
    upcomingDeparture: "20th July 2026",
    shortDesc: "Seek deep spiritual peace on the historic Char Dham circuit: Yamunotri, Gangotri, Kedarnath, and Badrinath. Bathe in geothermal spring waters and walk majestic shrines.",
    itinerarySummary: [
      "Day 1: Drive Delhi to Barkot via Mussoorie falls",
      "Day 2: Trek 6km to Yamunotri Temple; holy bath in Surya Kund",
      "Day 3: Drive Barkot to Uttarkashi; attend Ganga Aarti at Vishwanath Temple",
      "Day 4: Drive to holy Gangotri Temple; collect sacred glacier water",
      "Day 5: Drive to Guptkashi; scenic Mandakini river road trails",
      "Day 6: Trek 16km to Kedarnath Peak Temple; sleep in mountain ashrams",
      "Day 7: Sunrise Lord Shiva darshan; descend back to Guptkashi",
      "Day 8: Drive to Badrinath; take bath in sacred geothermal Tapt Kund",
      "Day 9: Visit Mana (First Indian Village), Vyas Cave, Vasudhara Falls",
      "Day 10: Drive to Rishikesh; enjoy local devotional chanting & prayers",
      "Day 11: Drive back to Delhi with blessed sacred offerings"
    ],
    inclusions: ["Premium pushback AC Traveller logs", "All pilgrim registration assistance", "Hot traditional vegetarian meals", "Premium hotels near shrines"]
  },
  {
    id: "varanasi-ghats",
    name: "Varanasi Ganga Devotion",
    subtitle: "Sacred Ganga Aarti & Ancient Alley Walks",
    category: "spiritual",
    price: "₹8,999",
    duration: "4 Days / 3 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 267,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    badge: "Timeless Soul",
    startPoint: "Varanasi / Delhi",
    upcomingDeparture: "25th July 2026",
    shortDesc: "Row boats during sunrise on the mystical Ganges. Experience the world-famous evening Ganga Aarti at Dashashwamedh Ghat, explore ancient temple alleyways, and visit Sarnath.",
    itinerarySummary: [
      "Day 1: Varanasi check-in; explore old alleyways; enjoy traditional lassi; evening Ganga Aarti on a private wooden boat",
      "Day 2: Pre-dawn boat ride witnessing Hindu morning rituals; visit Kashi Vishwanath Golden Temple",
      "Day 3: Sarnath historical excursion where Buddha gave his first sermon; evening folk music session",
      "Day 4: Banarasi silk weaving looms tour; local street food walk; airport return"
    ],
    inclusions: ["Aesthetic heritage hotel stay", "Private sunrise & sunset boat rides", "Sarnath entry & local expert guide", "Traditional street food tastings"]
  },
  {
    id: "kedarnath-trek",
    name: "Kedarnath Solo & Group Trek",
    subtitle: "Devotional trek to 11,750 ft Shiva Shrine",
    category: "spiritual",
    price: "₹13,500",
    duration: "5 Days / 4 Nights",
    difficulty: "Challenging",
    rating: 4.9,
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    badge: "Highly Demanded",
    startPoint: "Haridwar / Rishikesh",
    upcomingDeparture: "Every Tuesday",
    shortDesc: "Join a high-energy group hike to the iconic Kedarnath Temple. Traverse misty valley trails, waterfalls, and towering snow massifs with chants of Har Har Mahadev.",
    itinerarySummary: [
      "Day 1: Drive from Rishikesh along Ganga & Mandakini confluences to Sonprayag",
      "Day 2: Ride local jeeps to Gaurikund; begin 16km scenic valley trek to Kedarnath Peak",
      "Day 3: Early morning Abhishek prayers; explore behind the temple; descend to Sonprayag",
      "Day 4: Drive to Chopta (Mini Switzerland of India); local meadow bonfire",
      "Day 5: Return to Rishikesh; holy river dip; final group departure"
    ],
    inclusions: ["All Haridwar/Rishikesh transfers", "Stay in Sonprayag hotel & Kedarnath cottage", "Certified trek captains & medical oxygen", "Yatra biometric card help"]
  },
  {
    id: "amritsar-golden",
    name: "Amritsar Soul & Wagah Border",
    subtitle: "Golden Temple Seva & Heritage Streets",
    category: "spiritual",
    price: "₹4,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    badge: "Inner Peace",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Friday",
    shortDesc: "Experience serene night light reflections at the Golden Temple. Volunteer in the world's largest community kitchen (Langar), witness the patriotic Wagah Border parade, and try heavy butter Kulchas.",
    itinerarySummary: [
      "Day 1: Delhi to Amritsar road trip; late night Golden Temple visit (divine lighting); community kitchen volunteering",
      "Day 2: Historical Jallianwala Bagh stroll; drive to Wagah Border for high-energy military beating retreat ceremony; bonfire dinner",
      "Day 3: Heritage street shopping (phulkari, juttis); return drive to Delhi NCR"
    ],
    inclusions: ["AC traveler transport", "3-Star hotel stay", "Langar Seva coordination", "Wagah Border entry assist"]
  },
  {
    id: "south-temples",
    name: "Rameshwaram & Madurai Heritage",
    subtitle: "Pamban Bridge, Ghost Town & Meenakshi Darshan",
    category: "spiritual",
    price: "₹14,800",
    duration: "5 Days / 4 Nights",
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 109,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    badge: "Heritage Route",
    startPoint: "Madurai / Chennai",
    upcomingDeparture: "1st September 2026",
    shortDesc: "Seek peace at Madurai Meenakshi Temple's thousands of carved pillars, cross the spectacular ocean railway Pamban bridge, and explore the wind-swept ruins of Dhanushkodi.",
    itinerarySummary: [
      "Day 1: Madurai arrival; tour the towering, colored Meenakshi Amman Temple gates; royal palace light show",
      "Day 2: Drive to Rameshwaram Island; cross the sea-bridge; take dip in 22 sacred temple wells",
      "Day 3: Sunrise trip to Dhanushkodi (ghost town border); walk on sand lands dividing India & Sri Lanka",
      "Day 4: Visit APJ Abdul Kalam Memorial; evening beach sunset; drive back to Madurai",
      "Day 5: Local weaving crafts tour; airport drops"
    ],
    inclusions: ["AC Cab logs", "Traditional hotels", "Traditional South Indian meals", "All temple guides"]
  },
  {
    id: "haridwar-yog",
    name: "Rishikesh Yog & Ashrams",
    subtitle: "Soul detox, Meditation & Ashram Stays",
    category: "spiritual",
    price: "₹5,800",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.6,
    reviewsCount: 144,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
    badge: "Yogic Detox",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Weekend",
    shortDesc: "Unplug from screen noise. Live inside a riverside ashram, practice morning pranayama yoga, learn sound healing therapies, and listen to classical flutes.",
    itinerarySummary: [
      "Day 1: Clean drive to Rishikesh; check-in ashram; silent meditation; Ganga beach stroll",
      "Day 2: Sunrise yoga on river edge; organic breakfast; sound bath therapy session; evening Ganga Aarti",
      "Day 3: Beatles Ashram history tour, organic café lunch, return drive to Delhi"
    ],
    inclusions: ["Ashram living & organic diet", "Certified Yoga & Sound healing gurus", "Beatles ashram tickets", "Transfers"]
  },

  // CATEGORY 5: LEISURE & NATURE (leisure)
  {
    id: "manali",
    hasFullItinerary: true,
    name: "Manali Kasol Escape",
    subtitle: "Cozy Riverside Camping & Snow Pass",
    category: "leisure",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 540,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg?width=1200",
    badge: "Trending",
    startPoint: "Delhi Metro Gate 1",
    upcomingDeparture: "10th July 2026",
    shortDesc: "Our ultra-popular escape featuring snowy peak glances at Solang, bohemian café hopping in Old Manali, riverside dome camping beside the Parvati River, and starry DJ nights.",
    itinerarySummary: [
      "Day 0: Overnight road trip from Delhi in luxury AC traveller",
      "Day 1: Manali hotel check-in; Old Manali café tours & mall strolls",
      "Day 2: Snow Point / Solang adventure with paragliding options",
      "Day 3: Scenic Parvati valley road trip; deluxe riverside camping",
      "Day 4: Manikaran Sahib hot springs; return bus overnight to Delhi",
      "Day 5: Arrival in Delhi by 8:00 AM with happy smiles"
    ],
    inclusions: ["Luxury AC Traveller from Delhi", "Deluxe Hotels & Riverside Camps", "Buffet breakfast & hot dinners", "DJ and Bonfire setups"]
  },
  {
    id: "jim-corbett",
    name: "Jim Corbett Wildlife Safari",
    subtitle: "Deep Forest Lodges, Tiger Trails & Rivers",
    category: "leisure",
    price: "₹8,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop",
    badge: "Wild Safari",
    startPoint: "Delhi NCR",
    upcomingDeparture: "Every Friday",
    shortDesc: "Venture deep into India's oldest national park. Ride open 4x4 Jeeps through tiger zones, stay in lush forest resorts on the Kosi river edge, and enjoy barbecues under star systems.",
    itinerarySummary: [
      "Day 1: Delhi to Corbett drive; check-in at riverfront resort; walk around Garjiya temple; evening slide deck and bonfire",
      "Day 2: Pre-dawn 4x4 Jeep safari through Corbett Core Zone (Bijrani/Dhela); chase tiger tracks & elephant families; evening pool party",
      "Day 3: Organic garden walk, birdwatching trails, local river dip, return drive to Delhi"
    ],
    inclusions: ["Open 4x4 Jeep Jungle Safari", "Riverfront luxury resort stay", "All meals (Buffets)", "Delhi NCR transfers"]
  },
  {
    id: "kashmir-paradise",
    name: "Kashmir Paradise Valleys",
    subtitle: "Gulmarg Gondola, Sonamarg Glaciers & Dal Lake",
    category: "leisure",
    price: "₹21,500",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 412,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    badge: "Premium Leisure",
    startPoint: "Srinagar",
    upcomingDeparture: "14th July 2026",
    shortDesc: "Experience heaven on earth. Cruise in colorful wooden Shikara boats on Dal Lake, ride the world's 2nd highest Gondola cable car in Gulmarg, and hike Sonamarg glaciers.",
    itinerarySummary: [
      "Day 1: Srinagar airport pickup; check-in to historic luxury carved wooden houseboats; evening slow Dal Lake Shikara ride",
      "Day 2: Drive to Pahalgam (Valley of Shepherds); walk saffron fields & Apple orchards; bonfire",
      "Day 3: Horse ride to high Baisaran meadows (Mini Switzerland); river strolls",
      "Day 4: Drive to Gulmarg; ride the high Gondola cable car up to 13,000 ft snow line; stay in mountain cottage",
      "Day 5: Sonamarg glacier day; stroll the golden river trails; Srinagar return",
      "Day 6: Mughal gardens tour; local saffron & walnut shopping; airport drops"
    ],
    inclusions: ["All transfers in private sedan", "1 Night Dal Houseboat & 4 Nights Luxury hotels", "Dal Lake Shikara boat hours", "Gulmarg Gondola Phase 1 tickets"]
  },
  {
    id: "coromandel-beach",
    name: "Pondicherry French Quarter",
    subtitle: "Colonial Streets, Surfing & Auroville Oasis",
    category: "leisure",
    price: "₹7,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    badge: "French Colony",
    startPoint: "Chennai",
    upcomingDeparture: "Every Weekend",
    shortDesc: "Walk down pastel yellow French villas wrapped in bougainvillea. Experience surfing at Serenity Beach, silent meditation in Auroville, and delicious French bakeries.",
    itinerarySummary: [
      "Day 1: Scenic East Coast Road drive from Chennai; explore French White Town on bicycles; sunset at Promenade Beach",
      "Day 2: Early morning surf lesson trial; drive to Auroville township; meditate in Matrimandir; evening wood-fired pizzas",
      "Day 3: Boat trip to Paradise island beach; local paper crafts tour, return Chennai"
    ],
    inclusions: ["AC Tempo transportation", "French boutique hotel stay", "Bicycle rental fees", "Matrimandir entry booking assist"]
  },
  {
    id: "coorg-coffee",
    name: "Coorg Coffee Estate Oasis",
    subtitle: "Lush Coffee Trails, Elephant Camps & Waterfalls",
    category: "leisure",
    price: "₹6,999",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 134,
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    badge: "Coffee Trails",
    startPoint: "Bangalore",
    upcomingDeparture: "Every Friday",
    shortDesc: "Escape Bangalore screen hustle. Stay inside a working coffee estate cottage, bathe elephants at Dubare camp, see Abbey falls, and visit Golden Temple Tibetan camps.",
    itinerarySummary: [
      "Day 1: Bangalore to Coorg drive; check-in plantation villa; walk through private coffee paths; local Coorgi pork/veg buffet dinner",
      "Day 2: Interact & bathe elephants at Dubare river; stand under Abbey waterfall mist; visit Bylakuppe Golden Temple monasteries",
      "Day 3: Sunrise trek to Raja Seat; chocolate shopping, return drive to Bangalore"
    ],
    inclusions: ["Bangalore pick-up & drops", "Coffee estate villa stay", "Elephant camp entry", "All meals (estate style)"]
  },
  {
    id: "goa-backpack",
    name: "Goa Secret Beaches & Forts",
    subtitle: "Unexplored South Goa, Waterfalls & Kayaking",
    category: "leisure",
    price: "₹9,500",
    duration: "4 Days / 3 Nights",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 189,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    badge: "Coastal Sunset",
    startPoint: "Goa Airport / Madgaon",
    upcomingDeparture: "Every Tuesday",
    shortDesc: "Skip the crowded beaches. Canoe inside mangrove creeks, swim in wild jungle waterfalls, stay in beachside wooden huts in South Goa, and capture empty fort sunsets.",
    itinerarySummary: [
      "Day 1: South Goa arrival; settle into Palolem beach huts; dolphin boat sunset cruise",
      "Day 2: Kayaking inside secret backwater mangroves; visit historic Cabo de Rama fort; seafood dinner on beach beds",
      "Day 3: Trek to Dudhsagar jungle waterfalls (milky falls); spice garden tour with traditional lunch",
      "Day 4: Stroll colorful Portuguese Latin quarters of Fontainhas; airport drops"
    ],
    inclusions: ["Havelock beach hut lodging", "Dolphin cruise & backwater kayaking gear", "Traditional spice plantation meal & guide", "Airport cab pickups"]
  },
  {
    id: "munnar-hills",
    name: "Munnar Tea Plantation Escape",
    subtitle: "Sprawling tea hills, lake dams & wild elephants",
    category: "leisure",
    price: "₹6,400",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    rating: 4.6,
    reviewsCount: 115,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    badge: "Misty Hills",
    startPoint: "Kochi",
    upcomingDeparture: "Every Friday",
    shortDesc: "Rest your eyes on endless rolling green tea fields. See wild elephants grazing near lake margins, stand in foggy passes, and breathe fresh hill air.",
    itinerarySummary: [
      "Day 1: Kochi to Munnar drive passing Valara falls; tea gardens check-in; evening campfire",
      "Day 2: Trek to tea estate sunset ridge; boat trip in Kundala dam lake; tea museum tour",
      "Day 3: Visit Eravikulam Nilgiri mountain goat park; spice buying; Kochi drive back"
    ],
    inclusions: ["Kochi to Kochi transport", "Valley-view cottage stays", "Eco-safari tickets", "Breakfasts & dinners"]
  }
];

// Only these trips are currently published. The complete dataset above remains
// available so archived trips can be enabled again without recreating their data.
const PUBLISHED_TRIP_IDS = ["manali", "valley-of-flowers", "udaipur-lakes"];

export const PUBLISHED_CATALOGUE_TRIPS = PUBLISHED_TRIP_IDS
  .map((id) => ALL_SHOWCASE_TRIPS.find((trip) => trip.id === id))
  .filter((trip): trip is ShowcaseTrip => Boolean(trip));

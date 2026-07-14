import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Search, SlidersHorizontal, 
  ArrowRight, Star, Heart, Check, X, Shield
} from "lucide-react";

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
}

interface TripsShowcaseProps {
  onNavigate: (view: any) => void;
  onOpenBooking: (tripId: string) => void;
  isHomePage?: boolean;
}

// 30+ Curated Trips Across 5 Distinct Categories
const ALL_SHOWCASE_TRIPS: ShowcaseTrip[] = [
  // CATEGORY 1: HIMALAYAN TREKS (treks)
  {
    id: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    subtitle: "UNESCO World Heritage Flora & Sacred Lake",
    category: "treks",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
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
    id: "manali",
    name: "Manali Kasol Escape",
    subtitle: "Cozy Riverside Camping & Snow Pass",
    category: "escapes",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 540,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    badge: "Trending",
    startPoint: "Delhi Metro Gate 1",
    upcomingDeparture: "10th July 2026",
    shortDesc: "Our ultra-popular escape featuring snowy peak glances at Solang, bohemian café hopping in Old Manali, riverside dome camping in Kasol, and starry DJ nights.",
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

const HOME_TRIPS_PER_PAGE = 6;

export default function TripsShowcase({ onNavigate, onOpenBooking, isHomePage = false }: TripsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [homePageIndex, setHomePageIndex] = useState(0);
  
  // Modal State for details of a selected trip
  const [selectedDetailedTrip, setSelectedDetailedTrip] = useState<ShowcaseTrip | null>(null);

  // Filter and Sort Trips
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...ALL_SHOWCASE_TRIPS];

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter(t => t.category === activeCategory);
    }

    // Filter by Difficulty
    if (difficultyFilter !== "all") {
      result = result.filter(t => t.difficulty === difficultyFilter);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.subtitle.toLowerCase().includes(query) ||
        t.shortDesc.toLowerCase().includes(query) ||
        t.startPoint.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""));
        const pB = parseInt(b.price.replace(/[^\d]/g, ""));
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""));
        const pB = parseInt(b.price.replace(/[^\d]/g, ""));
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular (default)
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [activeCategory, searchQuery, difficultyFilter, sortBy]);

  const categories = [
    { id: "all", name: "✨ All Expeditions", count: ALL_SHOWCASE_TRIPS.length },
    { id: "treks", name: "🏔️ Himalayan Treks", count: ALL_SHOWCASE_TRIPS.filter(t => t.category === "treks").length },
    { id: "escapes", name: "🎒 Weekend Escapes", count: ALL_SHOWCASE_TRIPS.filter(t => t.category === "escapes").length },
    { id: "backpacking", name: "🗺️ Backpacking Tours", count: ALL_SHOWCASE_TRIPS.filter(t => t.category === "backpacking").length },
    { id: "spiritual", name: "🛕 Spiritual Journeys", count: ALL_SHOWCASE_TRIPS.filter(t => t.category === "spiritual").length },
    { id: "leisure", name: "🌿 Leisure & Nature", count: ALL_SHOWCASE_TRIPS.filter(t => t.category === "leisure").length },
  ];

  const homePageCount = Math.ceil(filteredAndSortedTrips.length / HOME_TRIPS_PER_PAGE);
  const visibleTrips = isHomePage
    ? filteredAndSortedTrips.slice(homePageIndex * HOME_TRIPS_PER_PAGE, (homePageIndex + 1) * HOME_TRIPS_PER_PAGE)
    : filteredAndSortedTrips;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setHomePageIndex(0);
  };

  const handleTripCardAction = (trip: ShowcaseTrip) => {
    // If it's one of our two primary deep-interactive trips, use onNavigate to show full immersive view
    if (trip.id === "manali" || trip.id === "valley-of-flowers") {
      onNavigate(trip.id);
    } else {
      // Otherwise, open our custom gorgeous detail modal
      setSelectedDetailedTrip(trip);
    }
  };

  return (
    <section id="all-trips-showcase" className="py-24 px-6 bg-[#F9F8F6] border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title with premium alignment */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-[#9C753B]/10 border border-[#9C753B]/20 rounded-full inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '40s' }} /> EXPEDITION CATALOGUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
            Discover Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
              Major Destinations
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-xl mx-auto leading-relaxed">
            Choose from 30+ meticulously customized group departures. Designed for young hearts (Age 18-35), led by experts, and budgeted with full transparency.
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className={isHomePage ? "space-y-5" : "p-4 sm:p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4"}>
          {!isHomePage && (
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search destinations, states, or start points..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9C753B] transition-colors shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 bg-neutral-200/50 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              
              {/* Difficulty Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF9F6] px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-neutral-700 font-bold">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9C753B]" />
                <span>Difficulty:</span>
                <select 
                  value={difficultyFilter} 
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-transparent focus:outline-none text-neutral-900 cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">🍀 Easy (Comfort)</option>
                  <option value="Moderate">⛰️ Moderate</option>
                  <option value="Challenging">🔥 Challenging</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF9F6] px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-neutral-700 font-bold">
                <span>Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-neutral-900 cursor-pointer font-bold"
                >
                  <option value="popular">🔥 Most Popular</option>
                  <option value="rating">⭐ Top Rated</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                </select>
              </div>

            </div>
          </div>
          )}

          {/* Horizontal Category Selection Tabs */}
          <div className={isHomePage ? "flex flex-wrap items-center justify-center gap-2 sm:gap-3" : "border-t border-neutral-100 pt-4 flex items-center overflow-x-auto gap-2 no-scrollbar scroll-smooth"}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-black transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#9C753B] text-white shadow-md shadow-[#9C753B]/20 scale-[1.02]"
                    : isHomePage
                      ? "bg-white text-neutral-700 border border-neutral-200 shadow-sm hover:border-[#9C753B]/45 hover:bg-[#FFFDF9] hover:shadow-md"
                      : "bg-[#FAF9F6] text-neutral-700 border border-neutral-200 hover:border-[#9C753B]/45 hover:bg-white"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-lg font-mono ${activeCategory === cat.id ? "bg-white/25 text-white" : "bg-neutral-200/60 text-neutral-600"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Trips Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleTrips.map((trip) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={trip.id}
                className="group bg-white rounded-[32px] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#9C753B]/20 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Cover Header */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    {trip.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#9C753B] text-white text-[9px] font-black uppercase tracking-widest shadow-md">
                        {trip.badge}
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-md ${
                      trip.difficulty === "Easy" ? "bg-emerald-600" :
                      trip.difficulty === "Moderate" ? "bg-amber-600" : "bg-rose-700"
                    }`}>
                      {trip.difficulty}
                    </span>
                  </div>

                  <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-rose-500 transition-all duration-300">
                    <Heart className="w-4 h-4 fill-current text-white/50 hover:text-rose-500 transition-colors" />
                  </button>

                  {/* Rating Badge at bottom right of image */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-neutral-900 border border-neutral-200">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{trip.rating}</span>
                    <span className="text-neutral-400 font-normal">({trip.reviewsCount})</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-[#9C753B]">
                      <span>Departing: {trip.upcomingDeparture}</span>
                      <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono text-[9px]">{trip.startPoint}</span>
                    </div>
                    
                    <h3 className="text-lg font-black text-neutral-900 uppercase font-display leading-tight group-hover:text-[#9C753B] transition-colors line-clamp-1">
                      {trip.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                      {trip.shortDesc}
                    </p>
                  </div>

                  {/* Quick specs banner */}
                  <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-3 text-[11px] text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-[#9C753B]" />
                      <span className="font-mono font-bold text-neutral-800">{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9C753B]" />
                      <span className="truncate">Starts: <strong>{trip.startPoint.split(" ")[0]}</strong></span>
                    </div>
                  </div>

                  {/* CTA Footer Row */}
                  <div className="pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <p className="text-[9px] uppercase text-neutral-400 font-bold leading-none">Starting Fare</p>
                      <p className="text-lg font-black text-neutral-900 font-mono mt-0.5">
                        {trip.price} <span className="text-[9px] font-normal text-neutral-400">/ user</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleTripCardAction(trip)}
                      className="px-4.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] active:scale-95 transition-all rounded-xl inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No results placeholder */}
          {filteredAndSortedTrips.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Compass className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-lg font-bold text-neutral-800 uppercase">No Expeditions Found</h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                We couldn't find any trips matching "{searchQuery}" under this category. Try adjusting your search query or filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setDifficultyFilter("all"); setActiveCategory("all"); }}
                className="px-5 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {isHomePage && homePageCount > 1 && (
          <div className="flex items-center justify-center gap-2 pt-1" aria-label="Trip pages">
            {Array.from({ length: homePageCount }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => setHomePageIndex(pageIndex)}
                aria-label={`Show trip page ${pageIndex + 1}`}
                aria-current={homePageIndex === pageIndex ? "page" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  homePageIndex === pageIndex
                    ? "w-8 bg-[#9C753B] shadow-sm"
                    : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* GORGEOUS MODAL / DRAWER SLIDE-OVER FOR 30+ DESTINATION TRIP DETAIL PREVIEWS */}
      <AnimatePresence>
        {selectedDetailedTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailedTrip(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[85vh] flex flex-col text-left"
            >
              {/* Image banner header with close trigger */}
              <div className="relative h-60 sm:h-72 shrink-0">
                <img 
                  src={selectedDetailedTrip.image} 
                  alt={selectedDetailedTrip.name} 
                  className="w-full h-full object-cover brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Header Overlay metadata */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="px-3 py-1 bg-[#9C753B] text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                    {selectedDetailedTrip.badge || "FEATURED ADVENTURE"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight leading-tight">
                    {selectedDetailedTrip.name}
                  </h3>
                  <p className="text-xs text-neutral-200 font-normal italic">
                    "{selectedDetailedTrip.subtitle}"
                  </p>
                </div>

                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedDetailedTrip(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details area */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                
                {/* Grid Metadata columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Net Investment</span>
                    <span className="font-black text-neutral-900 font-mono text-sm block mt-0.5">{selectedDetailedTrip.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Expedition Span</span>
                    <span className="font-black text-neutral-900 font-mono text-sm block mt-0.5">{selectedDetailedTrip.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Trek Difficulty</span>
                    <span className="font-black text-neutral-900 text-sm block mt-0.5 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#9C753B]" />
                      {selectedDetailedTrip.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Starting Station</span>
                    <span className="font-black text-neutral-900 text-sm block mt-0.5">{selectedDetailedTrip.startPoint}</span>
                  </div>
                </div>

                {/* Left-Right description and summary details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2">
                    Expedition Overview
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {selectedDetailedTrip.shortDesc}
                  </p>
                </div>

                {/* Day-Wise Route Summary Timeline preview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#9C753B]" /> 
                    <span>Journey Blueprint / Itinerary</span>
                  </h4>
                  <div className="space-y-2.5 pl-2 border-l border-neutral-100">
                    {selectedDetailedTrip.itinerarySummary.map((dayLine, idx) => (
                      <div key={idx} className="flex gap-3 text-xs text-neutral-700 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p>{dayLine}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions checklist preview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2">
                    Inclusive Pack Comforts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDetailedTrip.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peace of mind banner */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">100% Verified Safety Protocols</p>
                    <p className="text-emerald-700 font-light leading-relaxed">
                      Accompanied by two certified mountaineer trip leaders, with standard oxygen logs, stretchers, and full coordination with state medical desks.
                    </p>
                  </div>
                </div>

              </div>

              {/* Sticky bottom checkout / action row */}
              <div className="p-6 border-t border-neutral-200 bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div>
                  <p className="text-[9px] uppercase text-neutral-400 font-bold">Upcoming Batch Departure</p>
                  <p className="text-sm font-black text-[#9C753B] font-mono mt-0.5">
                    {selectedDetailedTrip.upcomingDeparture}
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedDetailedTrip(null)}
                    className="flex-1 sm:flex-none px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                  >
                    Back to Catalog
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDetailedTrip(null);
                      onOpenBooking(selectedDetailedTrip.id);
                    }}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#9C753B] hover:bg-[#7C552B] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

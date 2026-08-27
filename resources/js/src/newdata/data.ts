import { TripDetails } from "./types";
import { ANDAMAN_PACKAGES, AndamanPackage } from "./data/andamanPackages";
import { GOA_PACKAGES, GoaPackage } from "./data/goaPackages";
import { NEPAL_PACKAGES, NepalPackage } from "./data/nepalPackages";
import { KERALA_PACKAGES, KeralaPackage } from "./data/keralaPackages";
import { BHUTAN_PACKAGES, BhutanPackage } from "./data/bhutanPackages";
import { SIKKIM_PACKAGES, SikkimPackage } from "./data/sikkimPackages";
import { KASHMIR_PACKAGES, KashmirPackage } from "./data/kashmirPackages";
import { LADAKH_PACKAGES, LadakhPackage } from "./data/ladakhPackages";

// Re-export packages
export { ANDAMAN_PACKAGES, GOA_PACKAGES, NEPAL_PACKAGES, KERALA_PACKAGES, BHUTAN_PACKAGES, SIKKIM_PACKAGES, KASHMIR_PACKAGES, LADAKH_PACKAGES };
export type { AndamanPackage, GoaPackage, NepalPackage, KeralaPackage, BhutanPackage, SikkimPackage, KashmirPackage, LadakhPackage };

// 1. Manali Kasol Original Trip
export const MANALI_TRIP: TripDetails = {
  id: "manali",
  name: "Manali & Kasol Youth Escape",
  subtitle: "Solang Valley, Kasol Manikaran, Tosh Village & Parvati River Camps",
  price: "₹9,999",
  duration: "5 Days / 4 Nights",
  upcomingDeparture: "Aug 14, 2025 • Independence Day Long Weekend Batch",
  bannerImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
  heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
  routeStops: [
    { id: "stop-1", name: "Delhi Assembly", coords: { x: 10, y: 80 }, description: "Boarding at New Delhi Metro Gate 1 in Volvo AC Bus at 07:00 PM.", tag: "START" },
    { id: "stop-2", name: "Aut Tunnel & Aut Bridge", coords: { x: 35, y: 65 }, description: "Scenic gateway into the Beas river valley & Himachal mountains.", tag: "GATEWAY" },
    { id: "stop-3", name: "Manali Riverside Stay", coords: { x: 55, y: 35 }, description: "Check in to riverside hotel, Mall Road exploration & Hadimba Temple.", tag: "BASE CAMP" },
    { id: "stop-4", name: "Solang Valley Adventure", coords: { x: 70, y: 20 }, description: "ATV rides, paragliding & snow activities in Solang Valley.", tag: "PEAK DAY" },
    { id: "stop-5", name: "Kasol & Manikaran Sahib", coords: { x: 85, y: 50 }, description: "Hot springs of Manikaran Sahib & riverside bohemian vibe in Kasol.", tag: "CULTURE" }
  ],
  timelineItems: [
    {
      day: "Day 1",
      title: "Delhi Departure & Overnight Journey",
      quote: "The road is calling. Strangers assemble as night falls.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Assemble at New Delhi Metro Station Gate 1 by 06:30 PM",
        "Meet your lead trip captain & fellow traveler group",
        "Board luxury Volvo AC Semi-Sleeper Coach for overnight journey"
      ],
      telemetry: { loc: "Delhi ➔ Mandi", icon: "Bus", alt: "2,050m", temp: "18°C", distance: "530 km", iconType: "Bus" }
    },
    {
      day: "Day 2",
      title: "Manali Arrival, Hotel Check-in & Local Sightseeing",
      quote: "Wake up to towering pine forests & roaring Beas river.",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Morning arrival in Manali & check-in to Riverside Hotel",
        "Visit Hadimba Devi Temple amidst ancient cedar trees",
        "Evening stroll & cafe hopping at Old Manali & Mall Road",
        "Group dinner & icebreaker games at hotel"
      ],
      telemetry: { loc: "Manali Town", icon: "Hotel", alt: "2,050m", temp: "16°C", distance: "Local", iconType: "Hotel" }
    },
    {
      day: "Day 3",
      title: "Solang Valley Snow Point & Adventure Sports",
      quote: "Soar above alpine peaks & feel the adrenaline rush.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Excursion to Solang Valley for adventure activities",
        "Optional Paragliding, Zorbing & ATV Snow Rides",
        "Visit Atal Tunnel / Sissu (Subject to weather & permit)",
        "Bonfire party & acoustic music jam session at night"
      ],
      telemetry: { loc: "Solang Valley", icon: "Flame", alt: "2,560m", temp: "12°C", distance: "15 km", iconType: "Flame" }
    },
    {
      day: "Day 4",
      title: "Kasol Vibe, Manikaran Sahib Hot Springs & Parvati Valley",
      quote: "Sacred waters, bohemian cafes & Parvati River tranquility.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Check out from Manali & drive towards Parvati Valley",
        "Visit holy Manikaran Sahib Gurudwara & natural hot springs",
        "Explore Kasol flea markets & Israel-themed cafes",
        "Board Volvo Bus from Bhuntar for overnight trip back to Delhi"
      ],
      telemetry: { loc: "Kasol Parvati", icon: "Compass", alt: "1,580m", temp: "20°C", distance: "75 km", iconType: "Compass" }
    },
    {
      day: "Day 5",
      title: "Arrival in Delhi with Endless Memories",
      quote: "You leave as strangers, but return as family.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Early morning arrival in Delhi (around 07:00 AM - 08:00 AM)",
        "Exchange trip photos, contact details & warm hugs",
        "End of an unforgettable Himalayan expedition with TRAVO"
      ],
      telemetry: { loc: "Delhi Hub", icon: "Bus", alt: "216m", temp: "30°C", distance: "530 km", iconType: "Bus" }
    }
  ],
  experienceMoments: [
    { id: "exp-m1", title: "Solang Paragliding Flight", tag: "2,560M ALTITUDE", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
    { id: "exp-m2", title: "Old Manali Cafe Hopping", tag: "LIVE MUSIC & CREPES", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", icon: "Music" },
    { id: "exp-m3", title: "Manikaran Hot Springs", tag: "NATURAL HEALING WATERS", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
    { id: "exp-m4", title: "Riverside Bonfire Night", tag: "STARLIT ACOUSTIC JAM", image: "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=800&auto=format&fit=crop", icon: "Flame" }
  ],
  inclusions: [
    { text: "Delhi to Manali & Kasol to Delhi Volvo AC Bus Tickets", icon: "Check" },
    { text: "2 Nights Stay in 3-Star Deluxe Hotel in Manali", icon: "Check" },
    { text: "Daily Breakfast & Dinner (MAP Meal Plan Included)", icon: "Check" },
    { text: "Sightseeing in Private AC Cab / Tempo Traveler", icon: "Check" },
    { text: "Bonfire Night with Music & Group Games", icon: "Check" },
    { text: "24x7 Dedicated TRAVO Trip Captain Guidance", icon: "Check" }
  ],
  exclusions: [
    { text: "Lunch and personal food expenses" },
    { text: "Adventure activities (Paragliding, Zorbing, ATV, Rafting)" },
    { text: "Personal shopping & room heater charges if requested" },
    { text: "Any costs arising due to unexpected road blockages or weather delays" }
  ],
  packingChecklist: [
    { category: "Clothing & Layers", items: ["Heavy Jacket / Windcheater", "2-3 Warm Sweaters / Hoodies", "Thermal Innerwear Sets", "Comfortable Trekking Shoes with Good Grip"] },
    { category: "Essentials & Hygiene", items: ["Personal Medicines & Altitude Tabs", "Powerbank 10,000mAh+", "Sunscreen SPF 50+ & Lip Balm", "Valid Government Photo ID Card"] }
  ],
  termsAccordion: [
    { title: "1. Booking & Advance Policy", content: "A minimum 30% advance is required to lock your seat. Remaining balance is payable at the time of boarding in Delhi." },
    { title: "2. Cancellation & Refund Policy", content: "Cancellations made 15+ days prior receive 80% refund. 7-14 days prior receive 50% voucher. Less than 7 days is non-refundable." },
    { title: "3. Luggage & Vehicle Terms", content: "Maximum 1 stroller bag/backpack per person is permitted due to Volvo coach compartment space constraints." }
  ]
};

// 2. Valley of Flowers Original Trip
export const VALLEY_TRIP: TripDetails = {
  id: "valley-of-flowers",
  name: "Valley of Flowers & Hemkund Sahib Trek",
  subtitle: "UNESCO World Heritage Site, Alpine Meadows, Govindghat & Joshimath",
  price: "₹14,499",
  duration: "6 Days / 5 Nights",
  upcomingDeparture: "Aug 22, 2025 • Monsoon Blooming Season Batch",
  bannerImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
  heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
  routeStops: [
    { id: "vof-1", name: "Rishikesh Assembly", coords: { x: 10, y: 80 }, description: "Boarding at Rishikesh ISBT / Haridwar Station by 06:00 AM.", tag: "START" },
    { id: "vof-2", name: "Devprayag Sangam", coords: { x: 30, y: 65 }, description: "Confluence of Alaknanda & Bhagirathi forming holy Ganga.", tag: "SANGAM" },
    { id: "vof-3", name: "Joshimath Base Camp", coords: { x: 50, y: 50 }, description: "Check in to Joshimath hotel & gear check for trek.", tag: "BASE" },
    { id: "vof-4", name: "Ghangaria Base", coords: { x: 70, y: 30 }, description: "14 km trek from Pulna to Ghangaria village.", tag: "CAMP" },
    { id: "vof-5", name: "Valley of Flowers UNESCO Site", coords: { x: 90, y: 15 }, description: "Full day exploration in 500+ rare botanical bloom valley.", tag: "PEAK" }
  ],
  timelineItems: [
    {
      day: "Day 1",
      title: "Rishikesh / Haridwar to Joshimath Drive",
      quote: "Drive along the holy Panch Prayags of Garhwal Himalayas.",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Early morning departure from Rishikesh in AC Tempo Traveler",
        "Stop at Devprayag, Rudraprayag & Karnaprayag river confluences",
        "Evening arrival in Joshimath & hotel check-in"
      ],
      telemetry: { loc: "Rishikesh ➔ Joshimath", icon: "Bus", alt: "1,890m", temp: "18°C", distance: "275 km", iconType: "Bus" }
    },
    {
      day: "Day 2",
      title: "Joshimath to Govindghat & Trek to Ghangaria",
      quote: "Step onto the mountain trail alongside Lakshman Ganga.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Short drive from Joshimath to Pulna via Govindghat",
        "Begin 14 km gradual uphill trek to Ghangaria base camp",
        "Check-in to Ghangaria lodge & rest before high valley day"
      ],
      telemetry: { loc: "Ghangaria Base", icon: "Compass", alt: "3,050m", temp: "10°C", distance: "14 km Trek", iconType: "Compass" }
    },
    {
      day: "Day 3",
      title: "Ghangaria to Valley of Flowers National Park",
      quote: "A carpet of blue poppies, brahmakamals & 500 endemic species.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Cross entry bridge into UNESCO World Heritage National Park",
        "Trek through carpets of Blue Poppys, Cobra Lilies & Edelweiss",
        "Packed lunch by the Pushpawati River inside the valley",
        "Trek back to Ghangaria base for night stay"
      ],
      telemetry: { loc: "Valley of Flowers", icon: "Sparkles", alt: "3,650m", temp: "8°C", distance: "10 km Trek", iconType: "Sparkles" }
    },
    {
      day: "Day 4",
      title: "Ghangaria to Hemkund Sahib Holy Lake Trek",
      quote: "Reaching the highest Gurudwara in the world surrounded by 7 snow peaks.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Steep climb to Hemkund Sahib at 4,329 meters",
        "Dip in sacred Hemkund Sarovar & hot tea at Gurudwara Langar",
        "Descend back to Ghangaria for overnight stay"
      ],
      telemetry: { loc: "Hemkund Sahib", icon: "ShieldCheck", alt: "4,329m", temp: "4°C", distance: "12 km Trek", iconType: "ShieldCheck" }
    },
    {
      day: "Day 5",
      title: "Trek Down to Govindghat & Drive to Joshimath / Badrinath",
      quote: "Descending with hearts full of alpine wonder.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Descend 14 km trek from Ghangaria to Pulna",
        "Drive back to Joshimath / optional Badrinath temple darshan",
        "Celebration dinner & experience sharing"
      ],
      telemetry: { loc: "Joshimath", icon: "Hotel", alt: "1,890m", temp: "16°C", distance: "14 km Trek", iconType: "Hotel" }
    },
    {
      day: "Day 6",
      title: "Drive Back from Joshimath to Rishikesh",
      quote: "Return to plains carrying Garhwal mountain energy.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Morning drive back along Ganga river valley",
        "Reach Rishikesh / Haridwar ISBT by 07:00 PM",
        "End of Valley of Flowers expedition with TRAVO"
      ],
      telemetry: { loc: "Rishikesh ISBT", icon: "Bus", alt: "340m", temp: "28°C", distance: "275 km", iconType: "Bus" }
    }
  ],
  experienceMoments: [
    { id: "vof-m1", title: "Rare Blue Poppy Bloom", tag: "UNESCO HERITAGE SPECIES", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
    { id: "vof-m2", title: "Hemkund Sarovar Dip", tag: "4,329M HOLY LAKE", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
    { id: "vof-m3", title: "Devprayag River Sangam", tag: "HOLY GANGA ORIGIN", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
    { id: "vof-m4", title: "Ghangaria Alpine Camp", tag: "3,050M BASE CAMP", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Flame" }
  ],
  inclusions: [
    { text: "Rishikesh to Joshimath & return AC Tempo Traveler transfers", icon: "Check" },
    { text: "2 Nights Hotel Stay in Joshimath & 3 Nights Lodge Stay in Ghangaria", icon: "Check" },
    { text: "All meals during the trek (Breakfast, Lunch & Dinner)", icon: "Check" },
    { text: "Valley of Flowers National Park Entry Permit Fees", icon: "Check" },
    { text: "Certified Mountaineering Trek Leader & Local Guides", icon: "Check" },
    { text: "First Aid & Oxygen Cylinder Support on High Altitude Trail", icon: "Check" }
  ],
  exclusions: [
    { text: "Personal pony or porter charges for personal luggage" },
    { text: "Gharwal state entry taxes if applicable" },
    { text: "Personal trekking gear (Shoes, Poncho, Walking Sticks)" },
    { text: "Any expenses due to landslide road delays" }
  ],
  packingChecklist: [
    { category: "Trek Apparel", items: ["Waterproof Raincoat / Poncho", "Quick-dry Trekking Pants (2 Pairs)", "Thermal Layering & Fleece Jacket", "Ankle Support Waterproof Trek Shoes"] },
    { category: "Health & Gear", items: ["Trekking Pole / Walking Stick", "Personal Medicines & Diamox", "Water bottle / Hydration bladder 2L", "Valid Aadhaar / Passport Photo ID"] }
  ],
  termsAccordion: [
    { title: "1. Fitness Requirements", content: "This is a Moderate trek requiring basic cardiovascular stamina (capable of walking 10-14 km/day on mountain paths)." },
    { title: "2. Permit Requirements", content: "Government photo ID proof (Aadhaar or Passport) is mandatory for Forest Department National Park permits." },
    { title: "3. Weather & Safety Notice", content: "In case of heavy landslide or cloudburst, alternative safe routes will be executed by our lead certified captain." }
  ]
};

// 3. Udaipur Royal Expedition Trip (Scenic Highway Road Trip Layout)
export const UDAIPUR_TRIP: TripDetails = {
  id: "udaipur",
  name: "Udaipur & Kumbhalgarh Royal Road Trip",
  subtitle: "City of Lakes, Kumbhalgarh Great Wall, Ranakpur Marble Marvel & Mount Abu",
  price: "₹11,999",
  duration: "5 Days / 4 Nights",
  upcomingDeparture: "Sept 12, 2026 • Royal Rajasthan Autumn Departure",
  bannerImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop",
  heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop",
  routeStops: [
    { id: "ud-1", name: "Delhi / Jaipur Assembly", coords: { x: 10, y: 75 }, description: "Assembly and boarding in luxury AC Coach for royal Rajasthan highway road trip.", tag: "START" },
    { id: "ud-2", name: "Chittorgarh Fort", coords: { x: 35, y: 60 }, description: "UNESCO World Heritage Fort of Maharana Pratap & Vijay Stambha.", tag: "HERITAGE" },
    { id: "ud-3", name: "Udaipur Lake City", coords: { x: 55, y: 40 }, description: "City Palace, Lake Pichola sunset cruise & Gangaur Ghat folk evening.", tag: "LAKE PALACE" },
    { id: "ud-4", name: "Kumbhalgarh Great Wall", coords: { x: 75, y: 25 }, description: "36 km continuous fortress wall atop 3,600 ft Aravali ridge.", tag: "FORTRESS" },
    { id: "ud-5", name: "Ranakpur & Mount Abu", coords: { x: 90, y: 45 }, description: "1444 pillar marble marvel of Ranakpur & Nakki Lake sunset in Mount Abu.", tag: "FINISH" }
  ],
  timelineItems: [
    {
      day: "Day 1",
      title: "Delhi / Jaipur to Udaipur Highway Journey",
      quote: "The royal expressway unrolls across golden desert ridges.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Boarding at assembly point in luxury AC Tempo Traveler / Volvo coach",
        "Scenic highway drive across Aravali ranges with roadside Rajasthani dhabas",
        "Evening arrival in Udaipur & check-in to heritage boutique hotel"
      ],
      telemetry: { loc: "Express Highway ➔ Udaipur", icon: "Bus", alt: "598m", temp: "26°C", distance: "650 km", iconType: "Bus" }
    },
    {
      day: "Day 2",
      title: "City Palace, Lake Pichola Boat Cruise & Old City Ghats",
      quote: "Sunlight dancing across Venetian-style marble ghats.",
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Guided exploration of the monumental City Palace & museum",
        "Private boat cruise on Lake Pichola passing Jag Mandir & Taj Lake Palace",
        "Sunset tea at Gangaur Ghat & vibrant rooftop cafe dinner"
      ],
      telemetry: { loc: "Lake Pichola", icon: "Ship", alt: "598m", temp: "25°C", distance: "Local", iconType: "Ship" }
    },
    {
      day: "Day 3",
      title: "Udaipur to Kumbhalgarh Fort Expedition",
      quote: "Walking along the second longest stone fortress wall in the world.",
      image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Drive through dense Aravali forest sanctuary towards Kumbhalgarh",
        "Trek the massive ramparts and Badal Mahal offering 360° Mewar valley views",
        "Evening sound and light show illuminating the ancient battlements",
        "Bonfire dinner at Kumbhalgarh valley jungle resort"
      ],
      telemetry: { loc: "Kumbhalgarh Fort", icon: "ShieldCheck", alt: "1,100m", temp: "21°C", distance: "85 km", iconType: "ShieldCheck" }
    },
    {
      day: "Day 4",
      title: "Ranakpur Jain Marble Marvel & Mount Abu Hill Station",
      quote: "1,444 intricate hand-carved pillars where no two are alike.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Visit the architectural wonder of 15th-century Ranakpur Temple",
        "Drive up the winding hairpins to Mount Abu, Rajasthan's only hill station",
        "Boating at Nakki Lake and watching sunset from Honeymoon Point"
      ],
      telemetry: { loc: "Mount Abu", icon: "Compass", alt: "1,220m", temp: "18°C", distance: "160 km", iconType: "Compass" }
    },
    {
      day: "Day 5",
      title: "Dilwara Temples & Return Journey Home",
      quote: "Returning crowned with tales of Rajput valor and royal lakes.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Morning visit to world-famous Dilwara Jain Temples",
        "Begin highway return drive towards Delhi / Jaipur with group memories",
        "Arrival back by late evening with TRAVO farewell badges"
      ],
      telemetry: { loc: "Highway Hub", icon: "Bus", alt: "216m", temp: "28°C", distance: "680 km", iconType: "Bus" }
    }
  ],
  experienceMoments: [
    { id: "ud-exp-1", title: "Lake Pichola Sunset Cruise", tag: "JAG MANDIR PANORAMA", image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=800&auto=format&fit=crop", icon: "Ship" },
    { id: "ud-exp-2", title: "Kumbhalgarh 36km Great Wall", tag: "3,600 FT MOUNTAIN RIDGE", image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
    { id: "ud-exp-3", title: "Ranakpur 1444 Marble Pillars", tag: "15TH-CENTURY MARVEL", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
    { id: "ud-exp-4", title: "Mount Abu Nakki Lake", tag: "ARAVALI HILL STATION", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", icon: "Sun" }
  ],
  inclusions: [
    { text: "All transfers & sightseeing in dedicated Luxury AC Coach / Tempo Traveller", icon: "Check" },
    { text: "2 Nights Boutique Heritage Stay in Udaipur & 1 Night Resort Stay in Kumbhalgarh & 1 Night in Mount Abu", icon: "Check" },
    { text: "Daily Breakfast & Royal Rajasthani Dinners (MAP Plan Included)", icon: "Check" },
    { text: "Lake Pichola Private Boat Cruise Ticket Included", icon: "Check" },
    { text: "Kumbhalgarh Fort & Ranakpur Entry Monument Passes", icon: "Check" },
    { text: "24x7 Dedicated TRAVO Road Trip Captain & Chauffeur", icon: "Check" }
  ],
  exclusions: [
    { text: "Lunches and personal shopping" },
    { text: "Camera and video recording fees at historical monuments" },
    { text: "Personal watersports or horse rides" }
  ],
  packingChecklist: [
    { category: "Royal Attire & Shoes", items: ["Cotton breathable clothing for day tours", "Light jacket/hoodie for cool Mount Abu & Kumbhalgarh nights", "Comfortable walking shoes for fort ramparts", "Sunglasses & Sunscreen SPF 50+"] },
    { category: "Essentials & ID", items: ["Government Photo ID (Aadhaar / Passport / DL)", "Powerbank 10,000mAh+", "Personal medical kit"] }
  ],
  termsAccordion: [
    { title: "1. Advance Booking Policy", content: "30% advance deposit locks your seat. Remaining balance is payable at the time of boarding on Day 1." },
    { title: "2. Monument & Boat Timings", content: "Boat rides on Lake Pichola and monument entries are coordinated seamlessly by the trip captain." },
    { title: "3. Cancellation Terms", content: "15+ days prior: 80% refund. 7-14 days prior: 50% trip credit voucher. Under 7 days: Non-refundable." }
  ]
};

// Convert an AndamanPackage to TripDetails format
function convertAndamanToTripDetails(pkg: AndamanPackage): TripDetails {
  const baseCategory = pkg.categories[1] || pkg.categories[0]; // Deluxe 3 star default
  const samplePricing = baseCategory.pricing[2] || baseCategory.pricing[1];
  
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${samplePricing.perPersonPrice.toLocaleString('en-IN')}`,
    duration: pkg.duration,
    upcomingDeparture: "Daily Departure Available • Verified Operator",
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `dest-${idx}`,
      name: dest,
      coords: { x: 15 + idx * 18, y: 30 + (idx % 2) * 30 },
      description: `Island stop covered in ${pkg.title}`,
      tag: `STOP ${idx + 1}`
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: "Verified Island Ground Logistics",
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: "exp-1", title: "Radhanagar Beach Sunset", tag: "ASIA'S #7 BEACH", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", icon: "Waves" },
      { id: "exp-2", title: "Elephant Beach Snorkeling", tag: "COMPLIMENTARY SNORKELING", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: "exp-3", title: "Historic Cellular Jail", tag: "NATIONAL MEMORIAL", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
      { id: "exp-4", title: "Inter-Island Private Cruise", tag: "NAUTIKA / MAKRUZZ", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Compass" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Beachwear & Apparel", items: ["Cotton T-shirts & Shorts", "Swimwear & Rash Guards", "Sun Hat & Sunglasses", "Comfortable Sandals / Water Shoes"] },
      { category: "Documents & Health", items: ["Government ID Proof (Aadhaar/Passport)", "Sunscreen SPF 50+", "Personal Medicines & Motion Sickness Tabs", "Waterproof Mobile Pouch"] }
    ],
    termsAccordion: [
      { title: "1. Verified Concierge Network", content: "All Andaman packages are fulfilled strictly via our Verified Island Network. Transfers, ferry vouchers, and hotel vouchers carry official concierge confirmation." },
      { title: "2. Cruise & Ferry Ticket Policy", content: "Inter-island ferries (Nautika / Makruzz / Green Ocean) are subject to weather clearances from Port Authorities." },
      { title: "3. Hotel Check-in & Meal Plans", content: pkg.planType === "CP" ? "All hotel categories include CP meal plan (Breakfast Included). Standard check-in time is 09:00 AM / 12:00 PM." : "All hotel categories include MAP meal plan (Breakfast & Dinner). Standard check-in time is 09:00 AM / 12:00 PM." }
    ]
  };
}

// Convert a GoaPackage to TripDetails format
function convertGoaToTripDetails(pkg: GoaPackage): TripDetails {
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: "₹4,200",
    duration: pkg.duration,
    upcomingDeparture: "July - September 2026 Special Offer • Daily Departure",
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: [
      { id: "gstop-1", name: "Airport / Railway Station Pickup", coords: { x: 15, y: 70 }, description: "Private AC Cab pickup from Dabolim, MOPA airport or Madgaon, Thivim railway station.", tag: "START" },
      { id: "gstop-2", name: "Resort Stay", coords: { x: 35, y: 50 }, description: "Check in to 3★ / 4★ Resort in North Goa.", tag: "BASE" },
      { id: "gstop-3", name: "North Goa Beaches & Fort Aguada", coords: { x: 55, y: 30 }, description: "Baga, Calangute, Anjuna, Vagator, Candolim & Fort Aguada.", tag: "NORTH GOA" },
      { id: "gstop-4", name: "South Goa & Old Goa Churches", coords: { x: 80, y: 60 }, description: "Basilica of Bom Jesus, Se Cathedral, Miramar Beach & Panjim.", tag: "SOUTH GOA" }
    ],
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: "Verified Goa Holiday Experience",
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: "goa-exp-1", title: "Baga & Calangute Beach Shacks", tag: "NORTH GOA BEACHES", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", icon: "Sun" },
      { id: "goa-exp-2", title: "Historic Fort Aguada View", tag: "ARABIAN SEA CLIFFS", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: "goa-exp-3", title: "Old Goa Heritage Churches", tag: "UNESCO WORLD HERITAGE", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
      { id: "goa-exp-4", title: "Panjim City & Latin Quarter", tag: "FONTAINHAS ARCHITECTURE", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Goa Attire & Beachware", items: ["Cotton T-Shirts & Shorts", "Swimwear & Flip Flops", "Sunglasses & Sunscreen SPF 50+", "Light jacket for AC coach travel"] },
      { category: "Mandatory Documents", items: ["Government Photo ID (Aadhaar / Passport / Driving License)", "Personal Medications", "Camera & Power Bank"] }
    ],
    termsAccordion: [
      { title: "1. Payment Policy", content: "50% Advance Payment is required to confirm booking. Remaining 50% Balance is due 7 days before arrival." },
      { title: "2. Cancellation Policy", content: "30+ days prior: 20% charge | 15-30 days prior: 50% charge | 0-14 days prior: 100% charge (No Refund)." },
      { title: "3. Check-In & Check-Out", content: "Check-in time is 02:00 PM and Check-out time is 11:00 AM." }
    ]
  };
}

// Convert a NepalPackage to TripDetails format
function convertNepalToTripDetails(pkg: NepalPackage): TripDetails {
  const lowestPrice = pkg.hotelTiers[0].pricingByPax[pkg.hotelTiers[0].pricingByPax.length - 1].pricePerPerson;
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${lowestPrice.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: "2026 Special Tour Season • Daily Guaranteed Departures",
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `nstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 15 + idx * 18, y: 50 + (idx % 2 === 0 ? -15 : 15) },
      description: `Explore iconic spots & culture in ${dest}.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "DESTINATION"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || "Himalayan Exploration",
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `nep-exp-1-${pkg.id}`, title: "Pashupatinath & Boudhanath", tag: "UNESCO SACRED HERITAGE", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
      { id: `nep-exp-2-${pkg.id}`, title: "Pokhara Phewa Lake", tag: "ANNAPURNA REFLECTION", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: `nep-exp-3-${pkg.id}`, title: "Everest Mountain Flight", tag: "OPTIONAL 8,848M PEAK VIEW", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: `nep-exp-4-${pkg.id}`, title: "Chitwan Jungle Safari", tag: "RHINO & TIGER WILDLIFE", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", icon: "Sun" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Nepal Essentials", items: ["Warm Layers & Windproof Jacket", "Comfortable Walking / Trek Shoes", "Sunscreen & Polarized Sunglasses", "INR 100 Notes only (INR 200/500/2000 illegal in Nepal)"] },
      { category: "Documents & Permits", items: ["Valid Passport or Original Voter ID", "Hotel & Tour Voucher Copy", "Emergency Travel Insurance Details"] }
    ],
    termsAccordion: [
      { title: "1. Currency Regulations", content: "Indian Rupee notes of ₹200, ₹500, and ₹2,000 denominations are banned in Nepal by law. Carry INR 100 denomination notes or cards." },
      { title: "2. Payment Installments", content: "25% at booking confirmation, 25% 15 days prior to arrival, and 50% upon arrival in Kathmandu." },
      { title: "3. Hotel Check-In & Vehicles", content: "Standard check-in time is 01:00 PM / 02:00 PM. All transfers are in dedicated private AC vehicles (Sedan, Scorpio, HiAce, Coaster, or Bus based on PAX slab)." }
    ]
  };
}

// Convert a KeralaPackage to TripDetails format
function convertKeralaToTripDetails(pkg: KeralaPackage): TripDetails {
  const lowestPrice = pkg.hotelTiers[0].pricingByPax[pkg.hotelTiers[0].pricingByPax.length - 1].pricePerPerson;
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${lowestPrice.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: "01 APR 2026 – 30 SEPT 2026 • Off Season Special Rates",
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `kstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 15 + idx * 20, y: 55 + (idx % 2 === 0 ? -15 : 15) },
      description: `Scenic experience & sightseeing at ${dest}.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "DESTINATION"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || `Night Stay: ${day.nightStay}`,
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `ker-exp-1-${pkg.id}`, title: "Misty Munnar Tea Gardens", tag: "NILGIRI HIGHLANDS", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: `ker-exp-2-${pkg.id}`, title: "Alleppey Houseboat Cruise", tag: "ALL MEALS INCLUDED", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop", icon: "Ship" },
      { id: `ker-exp-3-${pkg.id}`, title: "Periyar Wildlife Sanctuary", tag: "SPICE & BOATING", image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: `ker-exp-4-${pkg.id}`, title: "Kovalam & Poovar Estuary", tag: "ARABIAN SEA BEACHES", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", icon: "Sun" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Kerala Attire & Footwear", items: ["Light breathable cottons & linen", "Light cardigan / shawl for Munnar evenings (cold region)", "Flip flops & comfortable walking sandals", "Sun hat & UV sunglasses"] },
      { category: "Travel Essentials", items: ["Mosquito repellent lotion", "Valid Government Photo ID Card", "Umbrella / light rain poncho", "Camera with extra memory card"] }
    ],
    termsAccordion: [
      { title: "1. Houseboat Policy & Meal Timings", content: "Check-in starts at 12:30 PM and cruising is until 05:00 PM as per Government safety regulations. Includes welcome drink, traditional Kerala lunch, tea & snacks, dinner, and morning breakfast. In A/C Deluxe boats, bedroom A/C operates 09:00 PM to 06:00 AM." },
      { title: "2. Payment Schedule", content: "1st Payment: ₹5,000/- Booking token advance. 2nd Payment: 50% of Tour Cost 20 days prior to departure. Final Payment: Remaining 50% 07 days prior to departure." },
      { title: "3. Vehicle Allocation by Group Size", content: "Dedicated Private AC vehicle assigned: Sedan for 2 PAX, Ertiga for 4 PAX, Innova for 6 PAX, 12-Seater Tempo Traveller for 8-10 PAX, and 17-Seater Tempo Traveller for 12 PAX. Toll, parking, fuel, driver bata included." }
    ]
  };
}

// Convert a BhutanPackage to TripDetails format
function convertBhutanToTripDetails(pkg: BhutanPackage): TripDetails {
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${pkg.pricePerPerson.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: `Fixed Departures: ${pkg.fixedDepartures.join(" • ")}`,
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `bstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 15 + idx * 16, y: 50 + (idx % 2 === 0 ? -12 : 12) },
      description: `Explore ${dest} with authorized guide & transport.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "HIGHLIGHT"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || "Kingdom of Bhutan Experience",
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `bht-exp-1-${pkg.id}`, title: "Paro Taktsang Tiger's Nest Hike", tag: "3,120M CLIFFSIDE MONASTERY", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Flame" },
      { id: `bht-exp-2-${pkg.id}`, title: "Dochula Pass 108 Chortens", tag: "HIMALAYAN PANORAMA", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: `bht-exp-3-${pkg.id}`, title: "Buddha Dordenma Thimphu", tag: "51.5M BRONZE STATUE", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop", icon: "ShieldCheck" },
      { id: `bht-exp-4-${pkg.id}`, title: "Punakha Dzong Valley", tag: "POH CHU & MO CHU RIVERS", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Bhutan Permit Documents", items: ["Original Valid Passport OR Original Voter ID (Mandatory for Indian Nationals)", "Children below 18 must carry Original Birth Certificate", "4 Passport size color photographs", "Double Entry Visa for Bangladesh Nationals"] },
      { category: "Clothing & Footwear", items: ["Modest clothing covering shoulders & knees for Dzongs/Temples", "Comfortable hiking shoes with ankle support for Tiger's Nest", "Warm layers & windbreaker jacket", "Daypack with water bottle for trek"] }
    ],
    termsAccordion: [
      { title: "1. Sustainable Development Fee (SDF)", content: "Government Sustainable Development Fee (SDF) of ₹1,200/day per person is already fully included in package price." },
      { title: "2. Payment & Confirmation Policy", content: "30% non-refundable advance required at booking confirmation. Remaining balance is payable on the day of arrival." },
      { title: "3. Bhutan Country Norms", content: "Bhutan is a 100% smoke-free country. Smoking and tobacco are strictly prohibited. Strict modest dress code inside Dzongs and religious monasteries." }
    ]
  };
}

// Convert a SikkimPackage to TripDetails format
function convertSikkimToTripDetails(pkg: SikkimPackage): TripDetails {
  const lowestPrice = pkg.hotelTiers[0].seasonPricing[pkg.hotelTiers[0].seasonPricing.length - 1].offSeasonPerPerson;
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${lowestPrice.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: "All Season 2026 • Private Luxury Departures Daily",
    bannerImage: pkg.heroImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `sstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 15 + idx * 16, y: 52 + (idx % 2 === 0 ? -14 : 14) },
      description: `High altitude beauty and mountain charm at ${dest}.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "PEAK"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || `${day.nightStay} Stay (${day.altitude || "Scenic"})`,
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `sik-exp-1-${pkg.id}`, title: "Tiger Hill Golden Sunrise", tag: "MT. KANCHENJUNGA 8,586M", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Sun" },
      { id: `sik-exp-2-${pkg.id}`, title: "Tsomgo Glacial Lake", tag: "12,400 FT ALTITUDE", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: `sik-exp-3-${pkg.id}`, title: "Gurudongmar / Pelling Skywalk", tag: "SACRED HIGH PEAKS", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: `sik-exp-4-${pkg.id}`, title: "Darjeeling Toy Train Joyride", tag: "UNESCO HERITAGE RAILWAY", image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop", icon: "Flame" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "High Altitude Warmth", items: ["Heavy fleece / down jacket", "Thermal innerwear sets", "Woolen gloves, beanie & woolen socks", "Sturdy walking / hiking shoes"] },
      { category: "Mandatory Permits & ID", items: ["Valid Voter ID OR Passport (Mandatory for Sikkim & Tsomgo/Nathula permits)", "4 Passport sized color photos", "Personal altitude medicines (Diamox/Avomine)"] }
    ],
    termsAccordion: [
      { title: "1. Meal Plan & Accommodations", content: "All packages include MAP Meal Plan (Daily Breakfast & Dinner at hotel). Hotel categories available in Super Deluxe (3-Star MMT rated) and Boutique 3-Star Luxury (Udaan / Summit / Yashshree properties)." },
      { title: "2. Vehicle Assignment", content: "Dedicated private vehicle for entire tour (WagonR / Dzire for 2-4 PAX Standard; Innova / Scorpio / Xylo for Deluxe & Premium 2-6 PAX). Driver bata, toll, parking and fuel included." },
      { title: "3. Special Permit Guidelines", content: "Tsomgo Lake & Nathula Pass require special permits. Indian Nationals must provide Voter ID/Passport at least 24 hours prior. Nathula Pass remains closed on Mondays & Tuesdays." }
    ]
  };
}

// Convert a KashmirPackage to TripDetails format
function convertKashmirToTripDetails(pkg: KashmirPackage): TripDetails {
  const lowestPrice = pkg.pricingByVehiclePax[0].pricePerPerson;
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${lowestPrice.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: "July 2025 to March 2027 • Private Daily Departures",
    bannerImage: pkg.bannerImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `kstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 18 + idx * 16, y: 48 + (idx % 2 === 0 ? -12 : 12) },
      description: `Paradise valley charm, pine forests & lakes at ${dest}.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "HIGHLIGHT"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || day.nightStay,
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `kash-exp-1-${pkg.id}`, title: "1-Hour Sunset Dal Lake Shikara", tag: "FLOATING GARDENS & MOUNTAINS", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop", icon: "Ship" },
      { id: `kash-exp-2-${pkg.id}`, title: "Gulmarg Gondola & Snow Slopes", tag: "WORLD'S 2ND HIGHEST CABLE CAR", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: `kash-exp-3-${pkg.id}`, title: "Sonamarg Thajiwas Glacier", tag: "MEADOW OF GOLD & SINDH RIVER", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop", icon: "Sun" },
      { id: `kash-exp-4-${pkg.id}`, title: "Deluxe Cedar Wood Houseboat Stay", tag: "TRADITIONAL KASHMIRI HOSPITALITY", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", icon: "Hotel" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "Warm Clothing & Layers", items: ["Heavy fleece / woolen sweater", "Thermal base layer (especially during Oct-March)", "Waterproof snow gloves & beanie", "Comfortable walking shoes"] },
      { category: "Essentials & Documents", items: ["Aadhaar / Voter ID / Passport for hotel & airport checkpoints", "Postpaid mobile connection (Prepaid SIM cards from other states do not work in J&K)", "Personal medications & power banks"] }
    ],
    termsAccordion: [
      { title: "1. Validity & B2B Rates", content: "Valid from July 2025 through March 2027. Rates are per person on double sharing basis based on minimum group size mentioned in pricing slabs." },
      { title: "2. Houseboat & Hotel Category", content: "Includes 3 Nights 3-Star Hotel in Srinagar and 1 Night Deluxe Houseboat on Dal Lake with buffet breakfast & dinner." },
      { title: "3. Cab & Local Sightseeing", content: "All sightseeing by dedicated private vehicle (Sedan / Ertiga / Tempo Traveller) including toll, parking, and driver allowance. Local union cabs in Sonamarg/Aru/Betaab valley are direct payable." }
    ]
  };
}

// Convert a LadakhPackage to TripDetails format
function convertLadakhToTripDetails(pkg: LadakhPackage): TripDetails {
  const lowestPrice = pkg.pricingByPax[0].pricePerPerson;
  return {
    id: pkg.id,
    name: pkg.title,
    subtitle: pkg.subtitle,
    price: `₹${lowestPrice.toLocaleString("en-IN")}`,
    duration: pkg.duration,
    upcomingDeparture: "May to October 2026 • Private Luxury Departures Daily",
    bannerImage: pkg.bannerImage,
    heroImage: pkg.heroImage,
    routeStops: pkg.destinationsCovered.map((dest, idx) => ({
      id: `lstop-${pkg.id}-${idx}`,
      name: dest,
      coords: { x: 14 + idx * 14, y: 46 + (idx % 2 === 0 ? -14 : 14) },
      description: `High-altitude passes and mystical landscapes at ${dest}.`,
      tag: idx === 0 ? "START" : idx === pkg.destinationsCovered.length - 1 ? "FINISH" : "HIGH PASS"
    })),
    timelineItems: pkg.itinerary.map((day) => ({
      day: `Day ${day.day}`,
      title: day.title,
      quote: day.timingSummary || day.nightStay,
      image: pkg.heroImage,
      highlights: day.activities
    })),
    experienceMoments: [
      { id: `lad-exp-1-${pkg.id}`, title: "Khardung La Pass Summit (18,380 ft)", tag: "HIGHEST MOTORABLE ROAD", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop", icon: "Compass" },
      { id: `lad-exp-2-${pkg.id}`, title: "Pangong Tso Blue Glacial Waters", tag: "14,270 FT COLOR-CHANGING LAKE", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", icon: "Sun" },
      { id: `lad-exp-3-${pkg.id}`, title: "Nubra Valley Hunder Sand Dunes", tag: "DOUBLE-HUMPED BACTRIAN CAMELS", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", icon: "Sparkles" },
      { id: `lad-exp-4-${pkg.id}`, title: "Magnetic Hill & Indus-Zanskar Sangam", tag: "NATURAL WONDERS OF LADAKH", image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop", icon: "Flame" }
    ],
    inclusions: pkg.inclusions.map(inc => ({ text: inc, icon: "Check" })),
    exclusions: pkg.exclusions.map(exc => ({ text: exc })),
    packingChecklist: [
      { category: "High Altitude Warmth", items: ["Heavy down feather jacket & windcheater", "Thermal base layer (top & bottom)", "UV 400 sunglasses & SPF 50+ sunscreen", "Sturdy waterproof hiking shoes"] },
      { category: "Mandatory Permits & Medical", items: ["Original Aadhaar Card / Passport for checkposts", "Inner Line Permit (included in package)", "Diamox for high altitude acclimatization & hydration ORS packets", "Postpaid Airtel / Jio SIM (Prepaid SIMs do not work in Ladakh)"] }
    ],
    termsAccordion: [
      { title: "1. Meal Plan & Accommodations", content: "MAPAI basis includes daily buffet breakfast and hot dinner. Stays in Deluxe Leh hotel, Nubra Valley luxury cottages/camps, and Pangong Lake deluxe camp." },
      { title: "2. Acclimatization Notice", content: "Day 1 complete rest in Leh is strictly mandatory to acclimatize to 11,500 ft elevation before crossing Khardung La Pass (18,380 ft)." },
      { title: "3. Vehicles & Permits", content: "Dedicated non-AC Scorpio / Xylo / Ertiga / Tempo Traveller with inner line permits, environmental fees, fuel, and experienced mountain drivers." }
    ]
  };
}

export const TRIPS_DATA: Record<string, TripDetails> = {
  "manali": MANALI_TRIP,
  "valley-of-flowers": VALLEY_TRIP,
  "udaipur": UDAIPUR_TRIP,
};

// Add converted Andaman packages into TRIPS_DATA
ANDAMAN_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertAndamanToTripDetails(pkg);
});

// Add converted Goa packages into TRIPS_DATA
GOA_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertGoaToTripDetails(pkg);
});

// Add converted Nepal packages into TRIPS_DATA
NEPAL_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertNepalToTripDetails(pkg);
});

// Add converted Kerala packages into TRIPS_DATA
KERALA_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertKeralaToTripDetails(pkg);
});

// Add converted Bhutan packages into TRIPS_DATA
BHUTAN_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertBhutanToTripDetails(pkg);
});

// Add converted Sikkim packages into TRIPS_DATA
SIKKIM_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertSikkimToTripDetails(pkg);
});

// Add converted Kashmir packages into TRIPS_DATA
KASHMIR_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertKashmirToTripDetails(pkg);
});

// Add converted Ladakh packages into TRIPS_DATA
LADAKH_PACKAGES.forEach((pkg) => {
  TRIPS_DATA[pkg.id] = convertLadakhToTripDetails(pkg);
});

export const TRIPS_LIST: TripDetails[] = Object.values(TRIPS_DATA);


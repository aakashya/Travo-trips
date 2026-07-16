import { TripDetails } from "./types";

export const DELHI_IMAGE = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=85";
export const MANALI_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg?width=1800";
export const BEAS_RIVER_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Beas%20River%20flowing%20through%20Manali.jpg?width=1800";
export const HADIMBA_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Hadimba%20Temple.jpg?width=1800";
export const SOLANG_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Solang%20Valley%20Manali.JPG?width=1800";
export const ROHTANG_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama%20at%20the%20other%20side%20of%20Rohtang%20Pass%20%2810441463105%29.jpg?width=1800";
export const JOGINI_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Jogini%20falls.jpg?width=1800";
export const KASOL_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Kasol-parvati%20valley%2C%20himachal%20pradesh.jpg?width=1800";
export const MANIKARAN_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Manikaran%20Sahib%20Gurudwara.jpg?width=1800";
export const RISHIKESH_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Rishikesh%27s%20ganga.jpg?width=1800";
export const DEVPRAYAG_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/A%20confluence%20of%20Alaknanda%20and%20Bhagirathi%20rivers%2C%20Devprayag%2C%20Uttarakhand.jpg?width=1800";
export const JOSHIMATH_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Bibekraj%20Joshimath%20Uttarakhand.jpg?width=1800";
export const GOVINDGHAT_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Govindghat%20%2829336213897%29.jpg?width=1800";
export const GHANGARIA_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Govind%20Ghat%2C%20Ghangaria%2C%20Chamoli%2C%20Uttarakhand%2C%20India%20%282012%29.jpg?width=1800";
export const FLOWERS_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Valley%20of%20flowers%20national%20park%2C%20Uttarakhand%2C%20India%2003.jpg?width=1800";
export const FLOWERS_STREAM_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Valley%20of%20Flowers%2C%20Uttarakhand.jpg?width=1800";
export const FLOWERS_CLOSEUP_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Flowers%20at%20Valley%20Of%20Flowers%20National%20Park.jpg?width=1800";
export const HEMKUND_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Hemkund%20sahib.jpg?width=1800";
export const BADRINATH_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Badrinath%20Temple%20Closeup%20View.jpg?width=1800";

export const TRIPS_DATA: Record<string, TripDetails> = {
  "manali": {
    id: "manali",
    name: "Manali Kasol Escape",
    subtitle: "Cozy riverside camping, majestic passes, and snow adventures",
    price: "Rs. 9,999/-",
    duration: "5 Days / 4 Nights",
    upcomingDeparture: "10th July 2026",
    bannerImage: HADIMBA_IMAGE,
    heroImage: MANALI_IMAGE,
    routeStops: [
      { id: "delhi", name: "Delhi", tag: "STARTING LINE", coords: { x: 10, y: 80 }, description: "The journey begins at 9:00 PM with a group briefing, warm introductions, curated playlists, and overnight road-trip energy." },
      { id: "manali", name: "Manali Arrival", tag: "DAY 1 STOP", coords: { x: 30, y: 55 }, description: "Wake up to snow mountains, check in, explore Hadimba Temple, wander Old Manali cafes, walk Mall Road, and gather for a cozy bonfire." },
      { id: "solang", name: "Solang Valley", tag: "DAY 2 MORNING", coords: { x: 45, y: 35 }, description: "The adventure stop for paragliding, ropeway rides, ATVs, ziplines, zorbing, and huge mountain views." },
      { id: "rohtang", name: "Rohtang / Snow Point", tag: "DAY 2 AFTERNOON", coords: { x: 60, y: 20 }, description: "Dash through snowy slopes on scooters, sledges, tubes, and skis at one of Himachal's most dramatic alpine ridges." },
      { id: "kasol", name: "Kasol Riverside Camps", tag: "DAY 3 STOP", coords: { x: 75, y: 50 }, description: "Enter Parvati Valley for riverside dome camping, DJ night, bonfire circles, warm meals, and stars overhead." },
      { id: "manikaran", name: "Manikaran Sahib", tag: "DAY 4 STOP", coords: { x: 90, y: 65 }, description: "A peaceful spiritual stop with natural hot springs, a local market walk, final cafes, and slow mountain strolls." },
      { id: "delhi_return", name: "Delhi Return", tag: "THE ARRIVAL", coords: { x: 100, y: 80 }, description: "Return with inside jokes, a new travel circle, loaded memory cards, and stories worth retelling." },
    ],
    timelineItems: [
      {
        day: "Day 0",
        title: "Departure from Delhi",
        quote: "The best stories of our lives always begin with an overnight road trip.",
        image: MANALI_IMAGE,
        highlights: [
          "Group assembles at our central pickup point in Delhi at 8:30 PM",
          "Meet your trip captains and co-travelers for ice-breaking activities",
          "9:00 PM: Step aboard our deluxe AC Tempo Traveller",
          "Music, travel games, midnight dhaba stops, and pure road-trip energy",
        ],
        telemetry: { loc: "DELHI SANSAD MARG", icon: "IN", alt: "210m Alt", temp: "32C Warmth", distance: "0 KM", iconType: "Clock" },
      },
      {
        day: "Day 1",
        title: "Manali Arrival and Cafe Hopping",
        quote: "Misty pine breezes, cozy wooden cafes, and a slow mountain rhythm.",
        image: HADIMBA_IMAGE,
        highlights: [
          "11:00 AM: Scenic drive into Manali, hotel check-in, and breakfast rest",
          "Visit the iconic wooden Hadimba Temple built in 1553",
          "Cafe-hop through the bohemian lanes of Old Manali",
          "Scout local handlooms and grab street treats at Mall Road",
          "Evening bonfire gathering with dinner at the hotel",
        ],
        telemetry: { loc: "OLD MANALI VILLAGE", icon: "HILL", alt: "2,050m Alt", temp: "12C Crisp", distance: "540 KM", iconType: "Compass" },
      },
      {
        day: "Day 2",
        title: "Rohtang Pass and Snow Thrills",
        quote: "To touch the snow valleys and feel the highest Himalayan heights.",
        image: ROHTANG_IMAGE,
        highlights: [
          "Early departure for Solang Valley and the Atal Tunnel route",
          "Paragliding, ATV rides, zorbing, and high-altitude activities",
          "Hike to the peaceful Anjani Mahadev waterfall temple",
          "Snow playtime at Snow Point or Rohtang as per permissions",
          "Drive back for dinner and inside games",
        ],
        telemetry: { loc: "SOLANG VALLEY TRAILS", icon: "SNOW", alt: "3,978m Alt", temp: "-3C Winter", distance: "572 KM", iconType: "Snowflake" },
      },
      {
        day: "Day 3",
        title: "Kasol Drive and DJ Camp Night",
        quote: "Sleep beside the roaring river Parvati, under a ceiling of infinite stars.",
        image: KASOL_IMAGE,
        highlights: [
          "Morning breakfast and check-out from Manali",
          "Breathtaking road trip down the sweeping Parvati Valley",
          "Optional rafting and valley paragliding assistance",
          "Check in at premium riverside Kasol domes or tents",
          "DJ night, bonfire, starry skies, and warm dinner",
        ],
        telemetry: { loc: "PARVATI RIVER CAMP", icon: "CAMP", alt: "1,580m Alt", temp: "8C Cold", distance: "645 KM", iconType: "Flame" },
      },
      {
        day: "Day 4",
        title: "Manikaran, Cafes, and Final Goodbye",
        quote: "We leave the valleys behind, but carry the mountains inside us forever.",
        image: MANIKARAN_IMAGE,
        highlights: [
          "Breakfast at the river edge in Kasol",
          "Visit Manikaran Sahib hot springs and Gurudwara",
          "Kasol market walk, cafe hopping, and souvenir hunting",
          "6:00 PM: Board the traveller for return overnight trip to Delhi",
        ],
        telemetry: { loc: "MANIKARAN HOT SPRINGS", icon: "SPRING", alt: "1,760m Alt", temp: "15C Steam", distance: "650 KM", iconType: "Sun" },
      },
      {
        day: "Day 5",
        title: "Return to Delhi with Lifetime Memories",
        quote: "Strangers on Day 0, a tight-knit family on Day 5. Until the next valley calls.",
        image: BEAS_RIVER_IMAGE,
        highlights: [
          "Scenic overnight drive back through Himalayan foothill roads",
          "Sunrise highway pitstop for masala chai and butter parathas",
          "8:00 AM: Smooth arrival in Delhi",
          "Exchange photos, inside jokes, and promises to meet again",
        ],
        telemetry: { loc: "DELHI ARRIVAL HUB", icon: "CREW", alt: "210m Alt", temp: "30C Sunny", distance: "1,220 KM", iconType: "Eye" },
      },
    ],
    experienceMoments: [
      { id: "snow", title: "Rohtang Snow Ridges", tag: "ROHTANG PASS", image: ROHTANG_IMAGE, icon: "Snowflake" },
      { id: "valley", title: "Solang Valley", tag: "MANALI ADVENTURE VALLEY", image: SOLANG_IMAGE, icon: "Compass" },
      { id: "trek", title: "Jogini Waterfall", tag: "MANALI FOREST TRAIL", image: JOGINI_IMAGE, icon: "Footprints" },
      { id: "cafe", title: "Hadimba Cedar Temple", tag: "OLD MANALI", image: HADIMBA_IMAGE, icon: "Home" },
      { id: "camp", title: "Kasol & Parvati Valley", tag: "RIVERSIDE HIMALAYAS", image: KASOL_IMAGE, icon: "Tent" },
      { id: "bonfire", title: "Parvati Valley Views", tag: "KASOL LANDSCAPE", image: KASOL_IMAGE, icon: "Flame" },
      { id: "dj", title: "Beas River Drive", tag: "MANALI HIGHWAY", image: BEAS_RIVER_IMAGE, icon: "Waves" },
      { id: "manikaran", title: "Manikaran Sahib Visit", tag: "GEOTHERMAL SPRINGS", image: MANIKARAN_IMAGE, icon: "Sun" },
    ],
    inclusions: [
      { text: "Delhi to Delhi travel by custom AC Tempo Traveller", icon: "Bus" },
      { text: "2 nights stay in premium Manali hotel on sharing basis", icon: "Hotel" },
      { text: "1 night stay in premium riverside Kasol camps", icon: "Tent" },
      { text: "3 breakfasts and 3 hot buffet dinners during the trip", icon: "Utensils" },
      { text: "Koksar or snow excursion via Atal Tunnel as permitted", icon: "Mountain" },
      { text: "Bonfire sessions in Manali and Kasol under cold skies", icon: "Flame" },
      { text: "Private DJ dance night at the Kasol campsite", icon: "Music" },
      { text: "Experienced and certified trip captains supervising", icon: "UserCheck" },
      { text: "Tolls, state taxes, green taxes, and driver allowances", icon: "ReceiptText" },
    ],
    exclusions: [
      { text: "Day 4 dinner and personal meals on the return bus journey to Delhi" },
      { text: "Adventure sports fees such as paragliding, ATV rides, or snow skating" },
      { text: "Dynamic entry tickets, national park fees, or local environment permits" },
      { text: "Lunch, evening tea, snacks, custom beverages, and extra ordering" },
      { text: "Unexpected expenses arising from weather, landslides, or blockades" },
      { text: "Personal care services, laundry, medicines, and shopping bills" },
    ],
    packingChecklist: [
      { category: "Clothing", items: ["Warm heavy jacket or hoodie", "Comfortable cotton T-shirts", "Waterproof track pants or cargo", "Extra change of underclothing"] },
      { category: "Winter Essentials", items: ["Insulated waterproof gloves", "3 pairs of thick woolen socks", "A cozy scarf or muffler", "Warm beanie or woolen cap"] },
      { category: "Footwear", items: ["Comfortable hiking shoes or sports sneakers", "Light slip-ons or slippers for campsite"] },
      { category: "Travel Essentials", items: ["Original government issued ID card", "Adequate cash for weak-network hills", "High-capacity power bank", "Reusable water bottle"] },
      { category: "Personal Care", items: ["Toothbrush, soap, and general toiletries", "Personal first-aid kit and motion sickness pills"] },
      { category: "Extras", items: ["LED torch or headlight", "Small light daypack for daytime strolls"] },
    ],
    termsAccordion: [
      { title: "1. Payment and Booking Transferability", content: "Full payment must be cleared before departure in Delhi. Seats are non-transferable unless verified and approved by TRAVO management at least 48 hours before the trip." },
      { title: "2. Cancellation and Refund Policy", content: "Advance slot booking amounts are non-refundable and non-transferable. No refund or price adjustment is available for unused itineraries or missed activities." },
      { title: "3. Behavior and Group Safety Guidelines", content: "Travelers are responsible for personal belongings. We hold a zero-tolerance policy toward misbehavior or safety violations. The trip captain may offload campers in case of serious violations." },
      { title: "4. Travel Delays and Weather Risks", content: "The Himalayas are subject to sudden weather, landslides, snowfall, and road blockages. TRAVO is not liable for changes, delays, or additional costs caused by factors outside operational control." },
      { title: "5. Logistics and Transportation", content: "Please gather at the designated Delhi pickup point 30 minutes before the 9:00 PM departure. For safety and engine regulation, AC may be turned off during steep mountain climbs." },
    ],
  },
  "valley-of-flowers": {
    id: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    subtitle: "UNESCO World Heritage trek, spiritual Hemkund Sahib, and Badrinath Darshan",
    price: "Rs. 14,999/-",
    duration: "6 Days / 5 Nights",
    upcomingDeparture: "17th July 2026",
    bannerImage: FLOWERS_IMAGE,
    heroImage: FLOWERS_IMAGE,
    routeStops: [
      { id: "delhi", name: "Delhi / Gurgaon", tag: "STARTING LINE", coords: { x: 10, y: 80 }, description: "The journey begins from Delhi NCR and Gurgaon with a comfortable overnight road journey toward Rishikesh." },
      { id: "rishikesh", name: "Rishikesh", tag: "YOGA CAPITAL", coords: { x: 25, y: 70 }, description: "Optional pickup point and the start of our beautiful drive into Uttarakhand's towering foothills." },
      { id: "govindghat", name: "Govindghat", tag: "TREK FOOTHILLS", coords: { x: 45, y: 55 }, description: "A valley settlement where we check in after crossing the majestic Panch Prayag river confluences." },
      { id: "ghangaria", name: "Ghangaria", tag: "BASE CAMP", coords: { x: 60, y: 40 }, description: "Drive to Pulna, then trek through Bhyundar Valley to Ghangaria, our pine-bordered high-altitude base camp." },
      { id: "vof", name: "Valley of Flowers", tag: "UNESCO SITE", coords: { x: 78, y: 20 }, description: "Trek into a breathtaking botanical paradise with rare species, waterfalls, and misty ridges." },
      { id: "hemkund", name: "Hemkund Sahib", tag: "GLACIAL LAKE", coords: { x: 88, y: 25 }, description: "A spiritual hike to the world's highest Gurudwara beside a crystal-clear mountain lake." },
      { id: "badrinath", name: "Badrinath Temple", tag: "CHAR DHAM DARSHAN", coords: { x: 72, y: 50 }, description: "Descend to Govindghat, then drive to Badrinath Temple and Tapt Kund hot springs." },
      { id: "joshimath", name: "Joshimath", tag: "SACRED FOOTSTEPS", coords: { x: 55, y: 65 }, description: "Settle into Joshimath, visit Narsingh Temple, and share final group stories." },
      { id: "delhi_return", name: "Delhi Return", tag: "THE ARRIVAL", coords: { x: 100, y: 80 }, description: "Overnight drive back with loaded memories and a changed mountain soul." },
    ],
    timelineItems: [
      { day: "Day 0", title: "Delhi to Rishikesh - Himalayan Gateway", quote: "And just like that, our mountain expedition begins under a starlit canopy.", image: RISHIKESH_IMAGE, highlights: ["Departure from Delhi with Gurgaon pickup options at 9:00 PM", "Meet certified trip captains and fellow travelers", "Premium deluxe AC Tempo Traveller with loaded playlist", "Overnight drive toward Rishikesh with highway dhaba stops"], telemetry: { loc: "DELHI SANSAD MARG", icon: "IN", alt: "210m Alt", temp: "32C Warmth", distance: "0 KM", iconType: "Clock" } },
      { day: "Day 1", title: "Rishikesh to Govindghat - Panch Prayag Route", quote: "Witnessing the sacred confluences where holy rivers collide.", image: DEVPRAYAG_IMAGE, highlights: ["Breakfast and lunch en route at hill eateries", "Witness Devprayag, Rudraprayag, Karnaprayag, Nandaprayag, and Vishnuprayag", "Drive into the Garhwal Himalayas", "Check in at Govindghat by early evening"], telemetry: { loc: "GOVINDGHAT VALLEY", icon: "PEAK", alt: "1,820m Alt", temp: "18C Pleasant", distance: "480 KM", iconType: "Compass" } },
      { day: "Day 2", title: "Govindghat to Ghangaria - Bhyundar Trek", quote: "Walking into the deep forest, leaving the modern world behind.", image: GHANGARIA_IMAGE, highlights: ["Start early with stretching exercises", "Quick 4 km drive to Pulna", "Begin the 10 km moderate trek along Bhyundar River", "Arrive at Ghangaria and settle into homestay or camp", "Visit the Valley of Flowers information centre"], telemetry: { loc: "GHANGARIA BASECAMP", icon: "CAMP", alt: "3,050m Alt", temp: "11C Chilly", distance: "490 KM", iconType: "Flame" } },
      { day: "Day 3", title: "Valley of Flowers Exploration", quote: "Walking inside a living postcard designed by nature's own brush.", image: FLOWERS_IMAGE, highlights: ["Trek 6 km one way to Valley of Flowers National Park", "Discover Brahmakamal, blue poppies, bellflowers, and orchids", "Cross wooden bridges, streams, and misty mountain sections", "Packed meal inside the blooming UNESCO valley", "Return to Ghangaria for dinner and group games"], telemetry: { loc: "VALLEY OF FLOWERS", icon: "BLOOM", alt: "3,658m Alt", temp: "14C Cool", distance: "496 KM", iconType: "Sun" } },
      { day: "Day 4", title: "Spiritual Trek to Hemkund Sahib", quote: "Standing high above the clouds at the world's highest shrine.", image: HEMKUND_IMAGE, highlights: ["Hike 6 km one way to Hemkund Sahib at 14,203 ft", "Walk alongside Laxman Ganga", "Visit the Laxman Temple beside the Gurudwara", "Sit beside emerald Hemkund Lake", "Warm up with langar served with love"], telemetry: { loc: "HEMKUND SAHIB LAKE", icon: "SNOW", alt: "4,300m Alt", temp: "4C Alpine", distance: "502 KM", iconType: "Snowflake" } },
      { day: "Day 5", title: "Ghangaria to Badrinath to Joshimath", quote: "Cleansing the soul in geothermal springs and bowing to ancient temples.", image: BADRINATH_IMAGE, highlights: ["Descend from Ghangaria to Pulna", "Drive to the iconic Badrinath Temple", "Take a warm dip in Tapt Kund", "Check in at Joshimath and visit Narsingh Temple", "Final-night feast, music, and group memories"], telemetry: { loc: "BADRINATH & JOSHIMATH", icon: "TEMPLE", alt: "1,875m Alt", temp: "15C Fresh", distance: "525 KM", iconType: "Compass" } },
      { day: "Day 6", title: "Joshimath to Rishikesh to Delhi", quote: "Strangers on Day 0, a lifetime family on Day 6. Till we meet again.", image: JOSHIMATH_IMAGE, highlights: ["Breakfast in Joshimath and downhill journey", "Scenic river gorges and roadside tea stops", "Say goodbye to Rishikesh-joining travelers", "Overnight return to Delhi with unforgettable bonds"], telemetry: { loc: "DELHI RETURN GATE", icon: "CREW", alt: "210m Alt", temp: "29C Warm", distance: "1,030 KM", iconType: "Eye" } },
    ],
    experienceMoments: [
      { id: "vof_meadow", title: "Valley of Flowers", tag: "UNESCO PARADISE", image: FLOWERS_IMAGE, icon: "Flower" },
      { id: "hemkund_lake", title: "Hemkund Glacial Lake", tag: "14,203 FT ALTITUDE", image: HEMKUND_IMAGE, icon: "Waves" },
      { id: "badrinath", title: "Badrinath Temple", tag: "CHAR DHAM SACRED", image: BADRINATH_IMAGE, icon: "Home" },
      { id: "confluences", title: "Devprayag Confluence", tag: "PANCH PRAYAG ROUTE", image: DEVPRAYAG_IMAGE, icon: "GitMerge" },
      { id: "trek_bhyundar", title: "Bhyundar Valley Trek", tag: "GHANGARIA TRAIL", image: GHANGARIA_IMAGE, icon: "Footprints" },
      { id: "rishikesh", title: "Rishikesh Gateway", tag: "GANGA FOOTHILLS", image: RISHIKESH_IMAGE, icon: "Waves" },
      { id: "govindghat", title: "Govindghat Trailhead", tag: "ALPINE STARTING POINT", image: GOVINDGHAT_IMAGE, icon: "Compass" },
      { id: "valley_stream", title: "Valley Streams", tag: "UNESCO WILDERNESS", image: FLOWERS_STREAM_IMAGE, icon: "Flower" },
    ],
    inclusions: [
      { text: "Pick-up and drop from Delhi or Rishikesh as selected", icon: "MapPin" },
      { text: "Comfortable Tempo Traveller for all hill transfers", icon: "Bus" },
      { text: "5 breakfasts, 5 dinners, and 2 packed lunches", icon: "Utensils" },
      { text: "Stay in hotel, guest house, homestay, or Swiss camp from Day 1 to Day 5", icon: "Hotel" },
      { text: "Experienced trek leader, guides, and local support crew", icon: "UserCheck" },
      { text: "Necessary forest permits for the national park", icon: "ReceiptText" },
    ],
    exclusions: [
      { text: "GST at 5% is applicable extra on booking amount" },
      { text: "Additional food and beverage charges not listed in inclusions" },
      { text: "Entry tickets to viewpoints or personal porter fees" },
      { text: "Anything not mentioned explicitly in inclusions" },
      { text: "Accommodation on Day 6 after the trek ends" },
      { text: "Personal expenses, shopping, snacks, or medication" },
    ],
    packingChecklist: [
      { category: "Waterproofs & Bags", items: ["Waterproof jacket or heavy poncho", "Rain cover for your backpack", "Ziploc bags for electronics"] },
      { category: "Footwear & Gear", items: ["Trekking shoes with deep-grooved grip", "3 pairs of thick athletic socks", "Light slippers or sandals", "Trekking pole highly recommended"] },
      { category: "Clothing", items: ["Heavy windcheater or fleece jacket", "Thermal innerwear upper and lower", "Quick-dry trekking pants", "Comfortable T-shirts"] },
      { category: "Health & Care", items: ["Personal first aid and altitude medicines", "Sunscreen SPF 50+ and lip balm", "Reusable water bottle 1L+", "Energy bars and electrolyte packets"] },
    ],
    termsAccordion: [
      { title: "1. High-Altitude Safety Guidelines", content: "Trekking above 10,000 ft carries AMS risk. Stay hydrated, walk steadily, and report headache or breathing discomfort immediately to the trek captain." },
      { title: "2. Weather and Monsoon Season Changes", content: "The Valley of Flowers is open during monsoon bloom season. Roads may face landslide blocks, so plans may shift dynamically for traveler safety." },
      { title: "3. Forest Department Rules and Permits", content: "The Valley of Flowers is a protected UNESCO World Heritage National Park. Littering, picking flowers, or staying inside the park overnight is prohibited." },
      { title: "4. Accommodations and Power Supply", content: "Ghangaria accommodations are simple homestays or Swiss tents with basic amenities. Electricity and cellular networks can be erratic; carry cash and charged power banks." },
      { title: "5. Payment, Booking, and Refunds", content: "Valley of Flowers expedition spots are non-refundable and non-transferable. Please clear dues before journey start in Delhi." },
    ],
  },
};

export const TRIPS_LIST = [TRIPS_DATA["manali"], TRIPS_DATA["valley-of-flowers"]];

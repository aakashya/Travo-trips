export interface KashmirPackage {
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
  validity: string;
  hotelCategory: string;
  pricingByVehiclePax: {
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

export const KASHMIR_PACKAGES: KashmirPackage[] = [
  {
    id: "kashmir-paradise-4n5d",
    title: "4N/5D Kashmir Tour Package (Srinagar, Sonamarg, Gulmarg & Pahalgam)",
    subtitle: "From July to March-2027 • 3 Nights Srinagar Hotel + 1 Night Deluxe Houseboat + 1 Hr Shikara Ride",
    duration: "5 Days / 4 Nights",
    nights: 4,
    days: 5,
    destinationsCovered: ["Srinagar", "Sonamarg", "Gulmarg", "Pahalgam", "Dal Lake Houseboat"],
    heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    badge: "SEASON SPECIAL • JULY TO MARCH 2027",
    shortDescription: "Experience the paradise on earth with luxury 3-Star hotel & deluxe Dal Lake houseboat stay, buffet breakfast & dinner, 1-hour Shikara ride, and private cab sightseeing.",
    validity: "Valid from July to March-2027",
    hotelCategory: "3-Star Hotel & Deluxe Houseboat",
    pricingByVehiclePax: [
      { paxSlab: "Min 12 Pax", minPax: 12, vehicleType: "Tempo Traveller", pricePerPerson: 6000 },
      { paxSlab: "Min 10 Pax", minPax: 10, vehicleType: "Tempo Traveller", pricePerPerson: 6300 },
      { paxSlab: "Min 8 Pax", minPax: 8, vehicleType: "Tempo Traveller", pricePerPerson: 6800 },
      { paxSlab: "Min 6 Pax", minPax: 6, vehicleType: "Ertiga", pricePerPerson: 6300 },
      { paxSlab: "Min 4 Pax", minPax: 4, vehicleType: "Ertiga", pricePerPerson: 7100 },
      { paxSlab: "Min 2 Pax", minPax: 2, vehicleType: "Sedan", pricePerPerson: 9200 }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Srinagar Airport / Railway Station & Local Sightseeing",
        nightStay: "Srinagar Hotel",
        timingSummary: "Pickup & Mughal Gardens Tour",
        activities: [
          "Warm welcome and pickup from Srinagar Airport / Railway Station with welcome drink on arrival",
          "Check-in at Srinagar 3-Star hotel and freshen up",
          "Visit the world-famous Mughal Gardens: Nishat Bagh (Garden of Pleasure) and Shalimar Bagh (Abode of Love)",
          "Explore Cheshma Shahi (Royal Spring) and Shankaracharya Temple perched on Gopadari Hill",
          "Evening stroll around Boulevard Road along the Dal Lake shoreline",
          "Delicious buffet dinner and overnight stay in Srinagar Hotel"
        ]
      },
      {
        day: 2,
        title: "Srinagar to Sonamarg Day Excursion to Srinagar",
        nightStay: "Srinagar Hotel",
        timingSummary: "Meadow of Gold Day Trip (85 km / 2.5 hrs each way)",
        activities: [
          "Healthy morning breakfast buffet at Srinagar hotel",
          "Full-day scenic drive through Sindh Valley towards Sonamarg ('Meadow of Gold' at 2,740m)",
          "Witness the gushing Sindh River and snow-clad Himalayan mountain peaks",
          "Optional pony ride or local union taxi to Thajiwas Glacier where snow remains year-round",
          "Enjoy trout fishing spots, local saffron tea (Kahwa) and alpine meadows",
          "Return drive to Srinagar in the evening, dinner buffet and overnight stay in Srinagar hotel"
        ]
      },
      {
        day: 3,
        title: "Srinagar to Gulmarg Day Excursion to Srinagar",
        nightStay: "Srinagar Hotel",
        timingSummary: "Meadow of Flowers & Gondola Ride (55 km / 2 hrs each way)",
        activities: [
          "Buffet breakfast at hotel and drive to picturesque Gulmarg ('Meadow of Flowers' at 2,650m)",
          "Pass through scenic countryside, willow trees, and Tangmarg pine forests",
          "Board the famous Gulmarg Gondola (World's 2nd highest operating cable car - Phase 1 Kongdoori & Phase 2 Apharwat)",
          "Enjoy snow activities, skiing slopes, sledge rides, and panoramic views of Nanga Parbat",
          "Visit the historic St. Mary's Church and Gulmarg Golf Course",
          "Return to Srinagar by evening, dinner buffet and overnight stay in Srinagar hotel"
        ]
      },
      {
        day: 4,
        title: "Srinagar to Pahalgam Day Excursion & Houseboat Stay",
        nightStay: "Deluxe Houseboat on Dal Lake",
        timingSummary: "Valley of Shepherds & Shikara Ride",
        activities: [
          "Breakfast at hotel and checkout, drive to Pahalgam ('Valley of Shepherds' at 2,130m)",
          "En-route visit the historic Avantipur Ruins and famous Pampore Saffron Fields & dry fruit markets",
          "Drive along the turquoise Lidder River, explore Betaab Valley, Aru Valley & Chandanwari",
          "Afternoon return to Srinagar and check-in to a traditional Deluxe Houseboat on Dal Lake",
          "Enjoy an iconic 1-Hour Shikara Ride at sunset on Dal Lake covering floating gardens & Char Chinar",
          "Traditional Kashmiri hospitality, grand dinner buffet, and peaceful night stay on the Houseboat"
        ]
      },
      {
        day: 5,
        title: "Houseboat Sunrise & Departure to Srinagar Airport / Station",
        nightStay: "Departure",
        timingSummary: "End of Tour with Sweet Memories",
        activities: [
          "Experience the tranquil floating morning market from the Houseboat deck",
          "Relish a warm breakfast with traditional Kashmiri Kahwa",
          "Checkout from the Deluxe Houseboat",
          "Timely private cab transfer to Srinagar Airport / Railway Station for your return journey",
          "Depart with lifetime memories of the Kashmir Paradise expedition"
        ]
      }
    ],
    inclusions: [
      "Srinagar Airport / Railway station Pickup & Drop ✈️",
      "Welcome Drink on Arrival 🍸",
      "3 Nights Stay in 3-Star Srinagar Hotel 🏩",
      "1 Night Stay in Deluxe Dal Lake Houseboat 🚢",
      "Daily Breakfast & Dinner (Buffet) 🍽️",
      "1 Hour Shikara Ride on Dal Lake 🚣🏻",
      "All Tour & Sightseeing by Private Cab (Sedan / Ertiga / Tempo Traveller as per group size) 🚘",
      "Toll Charges, Parking Charges, Driver Allowance & Fuel 🎟️",
      "24*7 Customer Support & On-ground Captain Assistance 📞"
    ],
    exclusions: [
      "Airfare / Train tickets to Srinagar",
      "Gondola cable car tickets at Gulmarg (to be booked online)",
      "Pony rides / local union vehicle charges in Sonamarg & Pahalgam (Betaab/Aru valley local taxis)",
      "Lunch, snacks, personal beverages and laundry",
      "Entry fees to monuments and gardens",
      "Anything not mentioned in the Package Inclusions list"
    ]
  }
];

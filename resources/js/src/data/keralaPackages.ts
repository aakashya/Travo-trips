export interface KeralaPackage {
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
    tierId: string;
    categoryName: string;
    badgeLabel: string;
    starRating: number;
    pricingByPax: {
      paxSlab: string;
      paxCount: number;
      pricePerPerson: number;
    }[];
    extraBedCost: number;
    childNoBedCost: number;
    hotels: Record<string, string>; // Cochin: "North Centre", Munnar: "Forest Haven", etc.
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

export const KERALA_HOTEL_MASTER = {
  "3_STAR_STANDARD": {
    categoryName: "3★ Standard",
    starRating: 3,
    badgeLabel: "VALUE COMFORT",
    hotels: {
      "Cochin": "North Centre",
      "Munnar": "Forest Haven",
      "Thekkady": "Sandra Palace",
      "Houseboat": "Deluxe A/C Houseboat",
      "Kovalam": "Jeevan Beach Resort"
    }
  },
  "3_STAR_DELUXE": {
    categoryName: "3★ Deluxe",
    starRating: 3,
    badgeLabel: "POPULAR CHOICE",
    hotels: {
      "Cochin": "Broadbean",
      "Munnar": "Lake N Hills",
      "Thekkady": "Jungle Park",
      "Houseboat": "Deluxe A/C Houseboat",
      "Kovalam": "Jasmine Palace"
    }
  },
  "4_STAR_CLASSIC": {
    categoryName: "4★ Classic",
    starRating: 4,
    badgeLabel: "PREMIUM STAY",
    hotels: {
      "Cochin": "Classik Fort",
      "Munnar": "Star Emirates",
      "Thekkady": "Crystals Cove",
      "Houseboat": "Deluxe A/C Houseboat",
      "Kovalam": "Aadisaktthi Ayurvedic Resort"
    }
  },
  "4_STAR_SUPERIOR": {
    categoryName: "4★ Superior",
    starRating: 4,
    badgeLabel: "HIGH COMFORT",
    hotels: {
      "Cochin": "Luxo Kochi",
      "Munnar": "Munnar Queen",
      "Thekkady": "Spice Grove",
      "Houseboat": "Premium A/C Houseboat",
      "Kovalam": "By The Bay"
    }
  },
  "5_STAR_PREMIUM": {
    categoryName: "5★ Premium",
    starRating: 5,
    badgeLabel: "LUXURY RESORT",
    hotels: {
      "Cochin": "Olive Downtown",
      "Munnar": "Era Resort",
      "Thekkady": "Elephant Court",
      "Houseboat": "Premium A/C Houseboat",
      "Kovalam": "Hycinth Hotel"
    }
  },
  "5_STAR_LUXURY": {
    categoryName: "5★ Luxury",
    starRating: 5,
    badgeLabel: "ULTRA LUXURY",
    hotels: {
      "Cochin": "Holiday Inn",
      "Munnar": "Leaf Munnar",
      "Thekkady": "Green Woods",
      "Houseboat": "Premium A/C Houseboat",
      "Kovalam": "Uday Samudra Leisure Beach Hotel"
    }
  }
};

export const KERALA_PACKAGES: KeralaPackage[] = [
  // 1. Munnar 02N + Alleppey 01N (3N/4D)
  {
    id: "kerala-munnar-alleppey-4d3n",
    title: "Munnar & Alleppey Backwaters Escape",
    subtitle: "Munnar 02N + Alleppey Houseboat 01N",
    duration: "3 Nights / 4 Days",
    nights: 3,
    days: 4,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Alleppey Houseboat (1N)", "Cochin"],
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    badge: "KERALA BESTSELLER",
    shortDescription: "Experience misty tea gardens of Munnar, Cheeyapara waterfalls, Kundala Arch Dam, and an overnight cruise in an authentic Alleppey backwater houseboat with all traditional meals included.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 2850,
        childNoBedCost: 2400,
        hotels: { "Munnar": "Forest Haven", "Houseboat": "Deluxe A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 9500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 7250 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 6500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 6750 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 6250 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 6000 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 3300,
        childNoBedCost: 2500,
        hotels: { "Munnar": "Lake N Hills", "Houseboat": "Deluxe A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 11000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 8750 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 7750 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 8000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 7500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 7350 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 3400,
        childNoBedCost: 3000,
        hotels: { "Munnar": "Star Emirates", "Houseboat": "Deluxe A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 12000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 9750 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 9000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 9250 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 8800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 8650 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 4300,
        childNoBedCost: 3300,
        hotels: { "Munnar": "Munnar Queen", "Houseboat": "Premium A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 13500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 11000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 10250 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 10500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 9750 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 9850 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 4400,
        childNoBedCost: 3300,
        hotels: { "Munnar": "Era Resort", "Houseboat": "Premium A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 14000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 12000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 11350 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 11500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 11000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 11000 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 4800,
        childNoBedCost: 3500,
        hotels: { "Munnar": "Leaf Munnar", "Houseboat": "Premium A/C Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 16000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 13500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 12750 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 12750 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 12500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 12350 }
        ]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Cochin Arrival to Munnar Hill Station (130 Km | 4.5 Hrs)",
        nightStay: "Munnar",
        timingSummary: "Scenic mountain transit via Cheeyapara & Valara waterfalls",
        activities: [
          "Meet TRAVO airport/station representative at Cochin Airport / Railway Station.",
          "Scenic road trip up the Western Ghats to Munnar.",
          "En-route stop at majestic Cheeyapara & Valara cascading waterfalls.",
          "Visit rolling lush green tea garden slopes and spice plantations.",
          "Check-in at hotel and evening relax amidst mist-clad hills."
        ]
      },
      {
        day: 2,
        title: "Full Day Munnar Sightseeing & High Range Exploration",
        nightStay: "Munnar",
        timingSummary: "Mattupetty Dam, Kundala Lake, Eco Point & Eravikulam National Park",
        activities: [
          "Visit Mattupetty Dam & reservoir - haven for alpine birds and elephants.",
          "Stroll along Kundala Lake & Asia's first Arch Dam.",
          "Shout out at scenic Eco Point with panoramic views of Nilgiri mountains.",
          "Afternoon visit to Eravikulam (Rajamala) National Park - home to endangered Nilgiri Tahr.",
          "Optional exploration of Blossom International Park & Tata Tea Heritage Museum."
        ]
      },
      {
        day: 3,
        title: "Munnar to Alleppey Houseboat Backwater Cruise (180 Km | 5 Hrs)",
        nightStay: "Houseboat",
        timingSummary: "Check-in 12:30 PM • Sunset Vembanad Lake Cruise • Traditional Kerala Cuisine",
        activities: [
          "Drive down through rubber estates and tropical palms to Alleppey backwaters.",
          "Board traditional thatched luxury houseboat with welcome tender coconut drink by 12:30 PM.",
          "Cruise through Vembanad Lake canals, lush paddy fields, and duck farms.",
          "Traditional Kerala banana leaf lunch and evening hot tea with banana fritters.",
          "Romantic anchor under starry skies with authentic Kerala dinner."
        ]
      },
      {
        day: 4,
        title: "Alleppey Houseboat Check-Out & Cochin City Departure",
        nightStay: "Departure",
        timingSummary: "Fort Kochi, Chinese Fishing Nets, Jew Town & Airport Drop",
        activities: [
          "Enjoy morning sunrise over backwater lagoons and hot South Indian breakfast on boat.",
          "Disembark at 09:00 AM and drive towards coastal Cochin.",
          "Optional stroll at pristine Marari Beach or Fort Kochi heritage streets.",
          "Visit iconic Chinese Fishing Nets, Santa Cruz Basilica, Jew Town & Mattancherry Palace.",
          "Transfer to Cochin Airport / Ernakulam Railway Station for onward journey."
        ]
      }
    ],
    inclusions: [
      "Continental Breakfast at all hotels and resorts.",
      "Certified category accommodation on twin sharing basis.",
      "All meals on Houseboat (Welcome drink, lunch, tea & snacks, dinner, breakfast).",
      "Private AC vehicle conveyance (Sedan for 2 pax, Ertiga for 4 pax, Innova for 6 pax, 12-Seater TT for 8-10 pax, 17-Seater TT for 12 pax).",
      "Experienced Hindi/English speaking chauffeur.",
      "All sightseeing tours, arrival/departure airport & railway transfers.",
      "Driver bata, toll taxes, parking fees, night halt charges, fuel, and GST."
    ],
    exclusions: [
      "Airfare / Train tickets.",
      "Personal expenses (telephone, laundry, beverages).",
      "Entrance tickets to National Parks, boating tickets & amusement parks.",
      "Gala dinner surcharges on Christmas and New Year Eve."
    ]
  },

  // 2. Munnar 02N + Thekkady 01N (3N/4D)
  {
    id: "kerala-munnar-thekkady-4d3n",
    title: "Munnar Hills & Thekkady Wildlife Sanctuary",
    subtitle: "Munnar 02N + Thekkady 01N",
    duration: "3 Nights / 4 Days",
    nights: 3,
    days: 4,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Thekkady (1N)", "Cochin"],
    heroImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    badge: "WILDLIFE & HILLS",
    shortDescription: "Combine Munnar's sprawling tea hills with the spice gardens and Periyar National Park wildlife boat safari in Thekkady.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 2600,
        childNoBedCost: 1700,
        hotels: { "Munnar": "Forest Haven", "Thekkady": "Sandra Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 9000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 6400 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 5500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 5500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 4950 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 4900 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 3200,
        childNoBedCost: 2000,
        hotels: { "Munnar": "Lake N Hills", "Thekkady": "Jungle Park" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 10200 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 7500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 6700 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 6600 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 6100 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 6000 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 3350,
        childNoBedCost: 2250,
        hotels: { "Munnar": "Star Emirates", "Thekkady": "Crystals Cove" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 12100 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 9300 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 8400 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 8400 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 7900 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 7800 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 4250,
        childNoBedCost: 3000,
        hotels: { "Munnar": "Munnar Queen", "Thekkady": "Spice Grove" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 12800 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 9700 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 8800 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 8700 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 8200 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 8100 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 5800,
        childNoBedCost: 3500,
        hotels: { "Munnar": "Era Resort", "Thekkady": "Elephant Court" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 15300 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 12200 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 11400 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 11400 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 10800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 10800 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 6000,
        childNoBedCost: 3750,
        hotels: { "Munnar": "Leaf Munnar", "Thekkady": "Green Woods" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 17100 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 13900 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 13000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 13000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 12500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 12500 }
        ]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Cochin Arrival to Munnar (130 Km | 4.5 Hrs)",
        nightStay: "Munnar",
        timingSummary: "Cheeyapara & Valara Waterfalls en route",
        activities: [
          "Meet chauffeur at Cochin Airport / Railway Station.",
          "Scenic transfer to Munnar via Cheeyapara & Valara waterfalls.",
          "Check-in at hotel and leisure evening."
        ]
      },
      {
        day: 2,
        title: "Munnar Full Day Tea Hills Sightseeing",
        nightStay: "Munnar",
        timingSummary: "Mattupetty Dam, Kundala Lake, Eco Point, Eravikulam National Park",
        activities: [
          "Explore Mattupetty Dam and Kundala Lake.",
          "Echo Point visit and tea garden photography.",
          "Afternoon excursion to Eravikulam National Park (Nilgiri Tahr)."
        ]
      },
      {
        day: 3,
        title: "Munnar to Thekkady Spice Sanctuary (110 Km | 3.5 Hrs)",
        nightStay: "Thekkady",
        timingSummary: "Periyar Lake Boating, Spice Plantation & Kathakali Show",
        activities: [
          "Scenic drive across cardamom hills to Thekkady.",
          "Periyar Wildlife Sanctuary visit with optional boat cruise.",
          "Optional Kathakali classical dance, Kalaripayattu martial arts, and elephant safari.",
          "Overnight stay at Thekkady."
        ]
      },
      {
        day: 4,
        title: "Thekkady to Cochin Departure (150 Km | 5 Hrs)",
        nightStay: "Departure",
        timingSummary: "Fort Kochi heritage and airport/railway drop",
        activities: [
          "Breakfast and scenic drive down to Cochin.",
          "Visit Fort Kochi, Jew Street & spice markets as time permits.",
          "Drop at Cochin Airport / Ernakulam Railway Station."
        ]
      }
    ],
    inclusions: [
      "Continental Breakfast at all hotels.",
      "Certified category accommodation on twin sharing basis.",
      "Private AC vehicle conveyance based on group size.",
      "Experienced Hindi/English speaking chauffeur.",
      "All driver bata, toll, parking, fuel and taxes."
    ],
    exclusions: ["Air/Train fare", "Personal expenses", "Boating & activity entry fees"]
  },

  // 3. Munnar 02N + Thekkady 01N + Houseboat 01N (4N/5D)
  {
    id: "kerala-munnar-thekkady-alleppey-5d4n",
    title: "Classic Kerala Hill & Backwater Trio",
    subtitle: "Munnar 02N + Thekkady 01N + Houseboat 01N",
    duration: "4 Nights / 5 Days",
    nights: 4,
    days: 5,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Thekkady (1N)", "Alleppey Houseboat (1N)", "Cochin"],
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
    badge: "MOST POPULAR TRIO",
    shortDescription: "The quintessential Kerala tour covering Munnar's rolling tea plantations, Thekkady's Periyar spice sanctuary, and an authentic Alleppey houseboat cruise.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 3500,
        childNoBedCost: 2350,
        hotels: { "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 11500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 9000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 8000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 8000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 7500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 7500 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 4250,
        childNoBedCost: 2750,
        hotels: { "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 13000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 10250 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 9350 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 9500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 8850 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 8850 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 4250,
        childNoBedCost: 2750,
        hotels: { "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 14500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 11750 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 10650 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 10750 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 10250 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 10250 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 5750,
        childNoBedCost: 3750,
        hotels: { "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 15500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 12750 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 12000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 12000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 11500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 11500 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 6250,
        childNoBedCost: 4000,
        hotels: { "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 18500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 15750 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 14850 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 15000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 14350 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 14350 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 6500,
        childNoBedCost: 4250,
        hotels: { "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 20000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 17250 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 16500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 16500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 16000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 16000 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Cochin Arrival to Munnar (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Airport/station pickup", "Cheeyapara & Valara Falls", "Tea garden visit"] },
      { day: 2, title: "Full Day Munnar Sightseeing", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Echo Point", "Eravikulam National Park"] },
      { day: 3, title: "Munnar to Thekkady Spice Hills (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Drive across cardamom plantations", "Periyar National Park visit", "Spice plantation tour"] },
      { day: 4, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Houseboat check-in at 12:30 PM", "Vembanad cruise", "All meals on boat", "Overnight stay"] },
      { day: 5, title: "Alleppey to Cochin Departure (70 Km | 2 Hrs)", nightStay: "Departure", activities: ["Morning cruise breakfast", "Fort Kochi sightseeing", "Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls, parking & taxes"],
    exclusions: ["Airfare", "Personal expenses", "Monuments & park entrance"]
  },

  // 4. Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N (5N/6D)
  {
    id: "kerala-cochin-munnar-thekkady-alleppey-6d5n",
    title: "Heritage Cochin, Hills, Wildlife & Houseboat",
    subtitle: "Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    destinationsCovered: ["Cochin (1N)", "Munnar (2N)", "Thekkady (1N)", "Alleppey Houseboat (1N)", "Cochin"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    badge: "HERITAGE & CRUISE",
    shortDescription: "Includes an extra night in colonial Cochin to explore Marine Drive sunset cruises, Jew Town, and Lulu Mall shopping, along with Munnar, Thekkady and Alleppey.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 4100,
        childNoBedCost: 3200,
        hotels: { "Cochin": "North Centre", "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 13900 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 11000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 10200 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 10300 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 9600 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 8900 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 4900,
        childNoBedCost: 3200,
        hotels: { "Cochin": "Broadbean", "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 15350 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 12300 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 11300 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 11400 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 10800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 10750 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 5300,
        childNoBedCost: 3200,
        hotels: { "Cochin": "Classik Fort", "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 16850 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 14050 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 13100 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 13200 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 12550 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 12500 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 6800,
        childNoBedCost: 5000,
        hotels: { "Cochin": "Luxo Kochi", "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 18750 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 15900 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 14950 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 15000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 14400 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 14400 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 7600,
        childNoBedCost: 5000,
        hotels: { "Cochin": "Olive Downtown", "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 21850 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 19000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 18100 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 18150 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 16800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 17500 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 7800,
        childNoBedCost: 5000,
        hotels: { "Cochin": "Holiday Inn", "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 24650 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 21800 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 20850 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 20900 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 19600 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 20200 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Cochin Arrival & City Leisure", nightStay: "Cochin", activities: ["Airport/station pickup", "Fort Kochi & Mattancherry", "Marine Drive sunset cruise (optional)", "Overnight in Cochin"] },
      { day: 2, title: "Cochin to Munnar (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Tea garden views", "Check-in at Munnar"] },
      { day: 3, title: "Full Day Munnar Exploration", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Eco Point", "Eravikulam National Park"] },
      { day: 4, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Wildlife Sanctuary", "Spice garden tour", "Kathakali cultural dance"] },
      { day: 5, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Board luxury houseboat at 12:30 PM", "Vembanad cruise", "All meals included"] },
      { day: 6, title: "Alleppey to Cochin Departure (70 Km | 2 Hrs)", nightStay: "Departure", activities: ["Breakfast on boat", "Lulu Mall shopping", "Cochin Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & driver charges"],
    exclusions: ["Air/train fare", "Personal expenses"]
  },

  // 5. Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 01N (5N/6D)
  {
    id: "kerala-hills-backwaters-kovalam-6d5n",
    title: "Kerala Hills, Backwaters & Kovalam Beach",
    subtitle: "Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 01N",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Thekkady (1N)", "Alleppey (1N)", "Kovalam (1N)", "Trivandrum"],
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop",
    badge: "BEACH & HILLS",
    shortDescription: "Experience the complete sweep of Kerala from misty Munnar hills to tranquil Alleppey backwaters and the golden sands of Kovalam Lighthouse Beach.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 4500,
        childNoBedCost: 3000,
        hotels: { "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jeevan Beach" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 16300 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 12600 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 11100 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 11350 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 10500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 10400 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 5250,
        childNoBedCost: 3500,
        hotels: { "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jasmine Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 17600 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 13900 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 12400 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 12650 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 11800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 11700 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 5250,
        childNoBedCost: 3500,
        hotels: { "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat", "Kovalam": "Aadisaktthi" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 20000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 16650 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 15200 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 15400 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 14500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 14400 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 7500,
        childNoBedCost: 4750,
        hotels: { "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat", "Kovalam": "By The Bay" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 21600 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 17900 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 16500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 16650 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 15800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 15700 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 9000,
        childNoBedCost: 5250,
        hotels: { "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat", "Kovalam": "Hycinth Hotel" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 24900 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 21300 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 19800 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 20000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 19200 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 19000 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 9000,
        childNoBedCost: 5250,
        hotels: { "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat", "Kovalam": "Uday Samudra" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 26600 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 22950 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 21500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 21800 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 20800 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 20700 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Tea hills arrival"] },
      { day: 2, title: "Munnar Full Day Sightseeing", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Echo Point", "Eravikulam National Park"] },
      { day: 3, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Wildlife Sanctuary", "Spice garden tour"] },
      { day: 4, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Houseboat check-in at 12:30 PM", "Vembanad backwater cruise", "All meals on boat"] },
      { day: 5, title: "Alleppey to Kovalam via Jatayu Earth's Center (170 Km | 5.5 Hrs)", nightStay: "Kovalam", activities: ["Visit monumental Jatayu Earth's Center sculpture", "Check-in at Kovalam beach resort", "Sunset at Lighthouse Beach"] },
      { day: 6, title: "Trivandrum Sightseeing & Departure", nightStay: "Departure", activities: ["Padmanabhaswamy Temple", "Napier Museum & Art Gallery", "Trivandrum Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & taxes"],
    exclusions: ["Airfare", "Personal expenses"]
  },

  // 6. Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N with Poovar (6N/7D)
  {
    id: "kerala-grand-circuit-poovar-7d6n",
    title: "Grand Kerala Panorama with Poovar Island",
    subtitle: "Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Thekkady (1N)", "Alleppey (1N)", "Kovalam (2N)", "Poovar Island", "Trivandrum"],
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    badge: "FULL PANORAMA",
    shortDescription: "Complete Kerala circuit featuring Munnar, Thekkady, Alleppey houseboat, Kovalam beaches, and an excursion to Poovar Island mangrove estuary.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 5300,
        childNoBedCost: 3800,
        hotels: { "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jeevan Beach" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 18000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 14000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 12500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 12500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 11500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 11500 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 5900,
        childNoBedCost: 4200,
        hotels: { "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jasmine Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 19000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 15000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 13500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 13750 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 12500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 12500 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 6300,
        childNoBedCost: 4200,
        hotels: { "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat", "Kovalam": "Aadisaktthi" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 22000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 18500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 16500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 17000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 16000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 16000 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 8700,
        childNoBedCost: 4500,
        hotels: { "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat", "Kovalam": "By The Bay" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 24000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 20500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 18500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 19000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 18000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 18000 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 9500,
        childNoBedCost: 5000,
        hotels: { "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat", "Kovalam": "Hycinth Hotel" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 29000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 25000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 23500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 23500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 22500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 22500 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 11900,
        childNoBedCost: 5700,
        hotels: { "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat", "Kovalam": "Uday Samudra" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 31000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 27500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 25500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 26000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 25000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 25000 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Cochin Arrival to Munnar (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Munnar check-in"] },
      { day: 2, title: "Munnar Sightseeing Tour", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Eco Point", "Eravikulam National Park"] },
      { day: 3, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Sanctuary", "Spice garden tour", "Kathakali show"] },
      { day: 4, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Board houseboat at 12:30 PM", "Vembanad cruise", "All meals included"] },
      { day: 5, title: "Alleppey to Kovalam via Jatayu Park (170 Km | 5.5 Hrs)", nightStay: "Kovalam", activities: ["Jatayu Earth's Center", "Kovalam Beach sunset"] },
      { day: 6, title: "Poovar Island Mangrove Excursion", nightStay: "Kovalam", activities: ["Poovar Island mangrove boat cruise along Neyyar river", "Golden Sand Beach", "Kovalam leisure"] },
      { day: 7, title: "Trivandrum Sightseeing & Departure", nightStay: "Departure", activities: ["Padmanabhaswamy Temple", "Napier Museum", "Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & taxes"],
    exclusions: ["Airfare", "Personal expenses", "Boating & activity entry fees"]
  },

  // 7. Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N with Kanyakumari (6N/7D)
  {
    id: "kerala-kanyakumari-grand-7d6n",
    title: "Kerala Circuit with Kanyakumari Cape Day Trip",
    subtitle: "Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N (Kanyakumari)",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    destinationsCovered: ["Cochin", "Munnar (2N)", "Thekkady (1N)", "Alleppey (1N)", "Kovalam (2N)", "Kanyakumari", "Trivandrum"],
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    badge: "SOUTHERNMOST TIP",
    shortDescription: "Includes all prime Kerala highlights plus a full day excursion to Kanyakumari to witness Vivekananda Rock Memorial where the Arabian Sea, Indian Ocean, and Bay of Bengal converge.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 5300,
        childNoBedCost: 3800,
        hotels: { "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jeevan Beach" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 20000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 15500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 13500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 13500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 12500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 12000 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 5900,
        childNoBedCost: 4200,
        hotels: { "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jasmine Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 21000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 16500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 14500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 14500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 13500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 13000 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 6300,
        childNoBedCost: 4200,
        hotels: { "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat", "Kovalam": "Aadisaktthi" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 24000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 19500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 17500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 18000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 16500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 16500 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 8700,
        childNoBedCost: 4500,
        hotels: { "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat", "Kovalam": "By The Bay" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 26000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 21500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 19500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 19500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 18500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 18500 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 9500,
        childNoBedCost: 5000,
        hotels: { "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat", "Kovalam": "Hycinth Hotel" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 31000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 26500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 24500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 24500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 23500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 23000 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 11900,
        childNoBedCost: 5700,
        hotels: { "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat", "Kovalam": "Uday Samudra" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 33000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 28500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 26500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 26500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 25500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 25000 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Munnar check-in"] },
      { day: 2, title: "Munnar Sightseeing Tour", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Eco Point", "Eravikulam National Park"] },
      { day: 3, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Sanctuary", "Spice garden tour", "Kathakali show"] },
      { day: 4, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Houseboat check-in at 12:30 PM", "Vembanad cruise", "All meals on boat"] },
      { day: 5, title: "Alleppey to Kovalam via Jatayu Park (170 Km | 5.5 Hrs)", nightStay: "Kovalam", activities: ["Jatayu Earth's Center", "Kovalam Beach sunset"] },
      { day: 6, title: "Kanyakumari Triveni Sangam Day Trip (95 Km | 2 Hrs)", nightStay: "Kovalam", activities: ["Vivekananda Rock Memorial & Gandhi Memorial", "Thiruvalluvar Statue & Suchindram Temple", "Devi Kanyakumari Temple", "Sunset over 3 seas", "Return to Kovalam"] },
      { day: 7, title: "Trivandrum Sightseeing & Departure", nightStay: "Departure", activities: ["Padmanabhaswamy Temple", "Napier Museum", "Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & taxes"],
    exclusions: ["Airfare", "Personal expenses"]
  },

  // 8. Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N with Poovar (7N/8D)
  {
    id: "kerala-cochin-munnar-thekkady-alleppey-kovalam-8d7n",
    title: "Complete Kerala Odyssey with Cochin & Poovar",
    subtitle: "Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    destinationsCovered: ["Cochin (1N)", "Munnar (2N)", "Thekkady (1N)", "Alleppey (1N)", "Kovalam (2N)", "Poovar Island", "Trivandrum"],
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    badge: "ULTIMATE 8-DAY TOUR",
    shortDescription: "The ultimate God's Own Country experience covering Cochin heritage, misty Munnar tea hills, Periyar wildlife, Alleppey houseboat, Kovalam beach, and Poovar mangrove cruise.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 6000,
        childNoBedCost: 3750,
        hotels: { "Cochin": "North Centre", "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jeevan Beach" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 21000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 16000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 14500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 14500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 13500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 13500 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 6500,
        childNoBedCost: 4000,
        hotels: { "Cochin": "Broadbean", "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jasmine Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 22500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 17500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 15500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 16000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 15000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 14500 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 6750,
        childNoBedCost: 4250,
        hotels: { "Cochin": "Classik Fort", "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat", "Kovalam": "Aadisaktthi" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 25000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 20500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 18500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 18500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 17750 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 17500 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 9000,
        childNoBedCost: 4500,
        hotels: { "Cochin": "Luxo Kochi", "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat", "Kovalam": "By The Bay" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 27500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 23000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 21500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 21500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 20500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 20500 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 12500,
        childNoBedCost: 6750,
        hotels: { "Cochin": "Olive Downtown", "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat", "Kovalam": "Hycinth Hotel" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 32500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 28500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 26500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 26500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 25500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 25500 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 14000,
        childNoBedCost: 7000,
        hotels: { "Cochin": "Holiday Inn", "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat", "Kovalam": "Uday Samudra" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 36000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 31500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 30000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 30000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 29000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 29000 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cochin Heritage City", nightStay: "Cochin", activities: ["Pickup at airport/railway", "Fort Kochi, Mattancherry & Jew Street", "Marine Drive sunset cruise (optional)", "Overnight in Cochin"] },
      { day: 2, title: "Cochin to Munnar Hills (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Tea garden visit"] },
      { day: 3, title: "Full Day Munnar Sightseeing", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Echo Point", "Eravikulam National Park"] },
      { day: 4, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Wildlife Sanctuary", "Spice garden tour"] },
      { day: 5, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Board houseboat at 12:30 PM", "Vembanad cruise", "All meals included"] },
      { day: 6, title: "Alleppey to Kovalam via Jatayu Park (170 Km | 5.5 Hrs)", nightStay: "Kovalam", activities: ["Jatayu Earth's Center", "Kovalam Beach sunset"] },
      { day: 7, title: "Poovar Mangrove Island Day Trip", nightStay: "Kovalam", activities: ["Poovar Island mangrove boat cruise along Neyyar river", "Golden Sand Beach", "Kovalam leisure"] },
      { day: 8, title: "Trivandrum Sightseeing & Departure", nightStay: "Departure", activities: ["Padmanabhaswamy Temple", "Napier Museum", "Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & taxes"],
    exclusions: ["Airfare", "Personal expenses"]
  },

  // 9. Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N with Kanyakumari (7N/8D)
  {
    id: "kerala-cochin-munnar-thekkady-alleppey-kanyakumari-8d7n",
    title: "Complete Kerala Circuit with Kanyakumari Cape",
    subtitle: "Cochin 01N + Munnar 02N + Thekkady 01N + Houseboat 01N + Kovalam 02N (Kanyakumari)",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    destinationsCovered: ["Cochin (1N)", "Munnar (2N)", "Thekkady (1N)", "Alleppey (1N)", "Kovalam (2N)", "Kanyakumari", "Trivandrum"],
    heroImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    badge: "CAPE & CRUISE SPECIAL",
    shortDescription: "Complete Kerala discovery with an added Kanyakumari day trip where the three oceans meet, plus Cochin heritage, Munnar tea hills, Periyar wildlife, and Alleppey houseboat.",
    hotelTiers: [
      {
        tierId: "3_STAR_STANDARD",
        categoryName: "3★ Standard",
        badgeLabel: "VALUE COMFORT",
        starRating: 3,
        extraBedCost: 6000,
        childNoBedCost: 3750,
        hotels: { "Cochin": "North Centre", "Munnar": "Forest Haven", "Thekkady": "Sandra Palace", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jeevan Beach" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 22000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 17000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 15000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 15000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 14000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 14000 }
        ]
      },
      {
        tierId: "3_STAR_DELUXE",
        categoryName: "3★ Deluxe",
        badgeLabel: "POPULAR CHOICE",
        starRating: 3,
        extraBedCost: 6500,
        childNoBedCost: 4000,
        hotels: { "Cochin": "Broadbean", "Munnar": "Lake N Hills", "Thekkady": "Jungle Park", "Houseboat": "Deluxe Houseboat", "Kovalam": "Jasmine Palace" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 24000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 18500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 16500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 16500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 15500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 15000 }
        ]
      },
      {
        tierId: "4_STAR_CLASSIC",
        categoryName: "4★ Classic",
        badgeLabel: "PREMIUM STAY",
        starRating: 4,
        extraBedCost: 6750,
        childNoBedCost: 4250,
        hotels: { "Cochin": "Classik Fort", "Munnar": "Star Emirates", "Thekkady": "Crystals Cove", "Houseboat": "Deluxe Houseboat", "Kovalam": "Aadisaktthi" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 27000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 21500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 19500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 19000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 18500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 18500 }
        ]
      },
      {
        tierId: "4_STAR_SUPERIOR",
        categoryName: "4★ Superior",
        badgeLabel: "HIGH COMFORT",
        starRating: 4,
        extraBedCost: 9000,
        childNoBedCost: 4500,
        hotels: { "Cochin": "Luxo Kochi", "Munnar": "Munnar Queen", "Thekkady": "Spice Grove", "Houseboat": "Premium Houseboat", "Kovalam": "By The Bay" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 29500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 24500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 22500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 22500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 21000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 21000 }
        ]
      },
      {
        tierId: "5_STAR_PREMIUM",
        categoryName: "5★ Premium",
        badgeLabel: "LUXURY RESORT",
        starRating: 5,
        extraBedCost: 12500,
        childNoBedCost: 6750,
        hotels: { "Cochin": "Olive Downtown", "Munnar": "Era Resort", "Thekkady": "Elephant Court", "Houseboat": "Premium Houseboat", "Kovalam": "Hycinth Hotel" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 34500 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 29500 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 27500 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 27500 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 26500 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 26000 }
        ]
      },
      {
        tierId: "5_STAR_LUXURY",
        categoryName: "5★ Luxury",
        badgeLabel: "ULTRA LUXURY",
        starRating: 5,
        extraBedCost: 14000,
        childNoBedCost: 7000,
        hotels: { "Cochin": "Holiday Inn", "Munnar": "Leaf Munnar", "Thekkady": "Green Woods", "Houseboat": "Premium Houseboat", "Kovalam": "Uday Samudra" },
        pricingByPax: [
          { paxSlab: "2 PAX (Sedan)", paxCount: 2, pricePerPerson: 38000 },
          { paxSlab: "4 PAX (Ertiga)", paxCount: 4, pricePerPerson: 33000 },
          { paxSlab: "6 PAX (Innova)", paxCount: 6, pricePerPerson: 31000 },
          { paxSlab: "8 PAX (12-Seater TT)", paxCount: 8, pricePerPerson: 31000 },
          { paxSlab: "10 PAX (12-Seater TT)", paxCount: 10, pricePerPerson: 30000 },
          { paxSlab: "12 PAX (17-Seater TT)", paxCount: 12, pricePerPerson: 29500 }
        ]
      }
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cochin Heritage City", nightStay: "Cochin", activities: ["Pickup at airport/railway", "Fort Kochi, Mattancherry & Jew Street", "Marine Drive sunset cruise (optional)", "Overnight in Cochin"] },
      { day: 2, title: "Cochin to Munnar Hills (130 Km | 4.5 Hrs)", nightStay: "Munnar", activities: ["Cheeyapara & Valara Falls", "Tea garden visit"] },
      { day: 3, title: "Full Day Munnar Sightseeing", nightStay: "Munnar", activities: ["Mattupetty Dam", "Kundala Lake", "Echo Point", "Eravikulam National Park"] },
      { day: 4, title: "Munnar to Thekkady (110 Km | 3.5 Hrs)", nightStay: "Thekkady", activities: ["Periyar Wildlife Sanctuary", "Spice garden tour"] },
      { day: 5, title: "Thekkady to Alleppey Houseboat (180 Km | 5 Hrs)", nightStay: "Houseboat", activities: ["Board houseboat at 12:30 PM", "Vembanad cruise", "All meals included"] },
      { day: 6, title: "Alleppey to Kovalam via Jatayu Park (170 Km | 5.5 Hrs)", nightStay: "Kovalam", activities: ["Jatayu Earth's Center", "Kovalam Beach sunset"] },
      { day: 7, title: "Kanyakumari Cape Day Trip (95 Km | 2 Hrs)", nightStay: "Kovalam", activities: ["Vivekananda Rock Memorial & Gandhi Memorial", "Thiruvalluvar Statue & Suchindram Temple", "Devi Kanyakumari Temple", "Sunset over 3 seas", "Return to Kovalam"] },
      { day: 8, title: "Trivandrum Sightseeing & Departure", nightStay: "Departure", activities: ["Padmanabhaswamy Temple", "Napier Museum", "Airport drop"] }
    ],
    inclusions: ["Breakfast at hotels", "All meals on Houseboat", "Private AC vehicle", "All tolls & taxes"],
    exclusions: ["Airfare", "Personal expenses"]
  }
];

export interface GoaHotelCategory {
  starRating: 2 | 3 | 4 | 5; // 3 = 3★ Budget, 3.5 = 3★ Deluxe, 4 = 4★ Deluxe
  categoryName: string;
  badgeLabel: string;
  hotels: string[];
  childPolicy: {
    childWithoutBedAge: string;
    childWithoutBedPrice: number;
    childWithBedAge: string;
    childWithBedPrice: number;
  };
  pricingByPax: {
    paxMin: number;
    sharingType: string;
    perPersonPrice: number;
  }[];
}

export interface GoaPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  daysCount: number;
  nightsCount: number;
  badge: string;
  validityOffer: string;
  heroImage: string;
  destinationsCovered: string[];
  shortDescription: string;
  northGoaSpotlights: string[];
  southGoaSpotlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
  whyChooseUs: string[];
  termsAndConditions: {
    bookingPolicy: string[];
    cancellationPolicy: string[];
    generalInfo: string[];
  };
  categories: GoaHotelCategory[];
}

export const GOA_PACKAGES: GoaPackage[] = [
  {
    id: "goa-coastal-escape-4d3n",
    title: "Goa Tropical Coast 🌴",
    subtitle: "North & South Goa Highlights, Resort Stay & Private Transfers",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    badge: "JULY-SEPT SPECIAL OFFER",
    validityOffer: "Special July to September 2026 Offer Period",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    destinationsCovered: [
      "North Goa Beaches (Baga, Calangute, Anjuna, Vagator)",
      "Fort Aguada & Sinquerim",
      "Old Goa Churches (Basilica of Bom Jesus & Se Cathedral)",
      "Panjim City & Dona Paula Point"
    ],
    shortDescription: "Complete 4D/3N Goa holiday experience with choice of 3★ Budget, 3★ Deluxe & 4★ Deluxe resorts, daily breakfast, North & South Goa AC Coach sightseeing, and private airport/railway station transfers.",
    northGoaSpotlights: [
      "Fort Aguada",
      "Sinquerim Beach",
      "Candolim Beach",
      "Calangute Beach",
      "Baga Beach",
      "Anjuna Beach",
      "Vagator Beach"
    ],
    southGoaSpotlights: [
      "Miramar Beach",
      "Dona Paula View Point",
      "Basilica of Bom Jesus",
      "Se Cathedral Church",
      "Old Goa Churches",
      "Panjim City Tour"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Goa & Resort Check-in",
        activities: [
          "Private AC Vehicle pickup from Goa Airport (Dabolim / MOPA) or Railway Station (Thivim / Madgaon / Vasco)",
          "Transfer to selected resort & welcome drink on arrival",
          "Hotel Check-in at 02:00 PM (Early check-in subject to room availability)",
          "Rest of the day free for relaxation by the pool or visiting nearby beaches",
          "Overnight stay at resort"
        ]
      },
      {
        day: 2,
        title: "North Goa Sightseeing Tour (AC Coach)",
        activities: [
          "Healthy breakfast at the resort restaurant",
          "Pickup for North Goa Full Day Sightseeing in AC Coach",
          "Visit historic Fort Aguada overlooking the vast Arabian Sea",
          "Explore Sinquerim Beach & Candolim Beach",
          "Visit vibrant Calangute Beach & famous Baga Beach",
          "Explore Anjuna Beach & Vagator Beach red cliffs",
          "Drop back to resort in the evening & overnight stay"
        ]
      },
      {
        day: 3,
        title: "South Goa Cultural & Heritage Tour (AC Coach)",
        activities: [
          "Breakfast at the resort restaurant",
          "Pickup for South Goa Heritage Tour in AC Coach",
          "Visit Miramar Beach & scenic Dona Paula View Point",
          "Visit UNESCO World Heritage Site - Basilica of Bom Jesus (casing St. Francis Xavier)",
          "Explore Se Cathedral Church & historic Old Goa Churches",
          "Panjim City Shopping Tour & Latin Quarter (Fontainhas)",
          "Optional evening Mandovi River Sunset Cruise (Tickets extra on direct payment)",
          "Drop back to resort & overnight stay"
        ]
      },
      {
        day: 4,
        title: "Checkout & Departure Drop",
        activities: [
          "Breakfast at resort & pack your bags",
          "Checkout from hotel by 11:00 AM",
          "Private AC Vehicle transfer to Airport or Railway station according to flight/train schedule",
          "Return home with unforgettable Goa holiday memories"
        ]
      }
    ],
    inclusions: [
      "ACCOMMODATION: 3 Nights AC Accommodation in 3★ / 4★ Hotel or Resort",
      "MEAL PLAN: Daily Breakfast included at the resort",
      "SIGHTSEEING: North Goa Sightseeing by AC Coach",
      "SIGHTSEEING: South Goa Sightseeing by AC Coach",
      "TRANSFERS: Private Airport / Railway Station Pickup & Drop in AC Vehicle",
      "TOUR SUPPORT: 24×7 On-Ground Support & Professional Tour Management",
      "Instant Hotel Confirmation & Verified Handpicked Properties"
    ],
    exclusions: [
      "Flight or Train Fares (Available at Best Competitive Rates on Request)",
      "Mandovi River Cruise Tickets",
      "Water Sports & Adventure Activities",
      "Monument Entry Fees & Camera Charges",
      "Lunch & Dinner",
      "Laundry, Tips, Insurance & Personal Expenses",
      "5% GST or any applicable Government taxes"
    ],
    whyChooseUs: [
      "Guaranteed Best Rates & Transparent Pricing",
      "Verified & Handpicked Resort Accommodations",
      "Instant Hotel Confirmation & Direct Resort Check-in",
      "Dedicated 24×7 On-Ground Support in Goa",
      "Professional AC Coach Drivers & Reliable Chauffeurs",
      "Best Flight & Train Travel Booking Assistance"
    ],
    termsAndConditions: {
      bookingPolicy: [
        "50% Advance Payment required to confirm booking.",
        "Remaining 50% Balance must be paid 7 days before arrival date.",
        "Rates are valid strictly for the July–September 2026 Offer Period and may vary during long weekends & festival periods."
      ],
      cancellationPolicy: [
        "30 Days or More prior to arrival: 20% Cancellation Charges apply.",
        "15–30 Days prior to arrival: 50% Cancellation Charges apply.",
        "0–14 Days prior to arrival: 100% Cancellation Charges apply (No Refund).",
        "Flight and Train ticket cancellations follow respective airline/railway rules."
      ],
      generalInfo: [
        "Hotel Check-in Time: 02:00 PM | Hotel Check-out Time: 11:00 AM.",
        "Similar category hotel will be assigned if listed hotel is fully booked.",
        "AC Coach sightseeing operates on fixed schedule.",
        "Valid Government-issued Photo ID (Aadhaar Card, Passport, Driving License) mandatory for all guests."
      ]
    },
    categories: [
      {
        starRating: 3,
        categoryName: "3★ Budget Stay",
        badgeLabel: "BUDGET SAVER",
        hotels: [
          "Village Royale Resort",
          "Royale Nirvana Resort",
          "Goveia Grand Resort",
          "Delta Residency Calangute",
          "Or Similar Category Resort"
        ],
        childPolicy: {
          childWithoutBedAge: "5–11 Years (Without Bed)",
          childWithoutBedPrice: 2400,
          childWithBedAge: "Above 11 Years (With Bed)",
          childWithBedPrice: 3600
        },
        pricingByPax: [
          { paxMin: 6, sharingType: "Minimum 6 Guests (3 Sharing)", perPersonPrice: 4200 },
          { paxMin: 4, sharingType: "Minimum 4 Guests (2 Sharing)", perPersonPrice: 4650 },
          { paxMin: 2, sharingType: "Minimum 2 Guests (2 Sharing)", perPersonPrice: 5700 }
        ]
      },
      {
        starRating: 3.5 as any,
        categoryName: "3★ Deluxe Stay",
        badgeLabel: "MOST POPULAR",
        hotels: [
          "WS Beach Resort & Spa",
          "The Mint Resort",
          "The Flora Residency",
          "Calangute Beach Resort",
          "Or Similar Category Resort"
        ],
        childPolicy: {
          childWithoutBedAge: "5–11 Years (Without Bed)",
          childWithoutBedPrice: 3300,
          childWithBedAge: "Above 11 Years (With Bed)",
          childWithBedPrice: 4200
        },
        pricingByPax: [
          { paxMin: 6, sharingType: "Minimum 6 Guests (3 Sharing)", perPersonPrice: 6100 },
          { paxMin: 4, sharingType: "Minimum 4 Guests (2 Sharing)", perPersonPrice: 6800 },
          { paxMin: 2, sharingType: "Minimum 2 Guests (2 Sharing)", perPersonPrice: 7550 }
        ]
      },
      {
        starRating: 4,
        categoryName: "4★ Deluxe Stay",
        badgeLabel: "PREMIUM COMFORT",
        hotels: [
          "Casa Pearl",
          "Estrela Do Mar Beach Resort",
          "Sinon Baga Retreat",
          "Neelams The Glitz",
          "Pride Premier Sun Village Resort",
          "Or Similar Category Resort"
        ],
        childPolicy: {
          childWithoutBedAge: "5–11 Years (Without Bed)",
          childWithoutBedPrice: 4500,
          childWithBedAge: "Above 11 Years (With Bed)",
          childWithBedPrice: 6200
        },
        pricingByPax: [
          { paxMin: 6, sharingType: "Minimum 6 Guests (3 Sharing)", perPersonPrice: 8950 },
          { paxMin: 4, sharingType: "Minimum 4 Guests (2 Sharing)", perPersonPrice: 9800 },
          { paxMin: 2, sharingType: "Minimum 2 Guests (2 Sharing)", perPersonPrice: 11350 }
        ]
      }
    ]
  }
];

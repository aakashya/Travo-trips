export interface RouteStop {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Percentage coords on our visual map canvas
  description: string;
  tag: string;
}

export interface DayTimelineItem {
  day: string;
  title: string;
  quote: string;
  image: string;
  highlights: string[];
  telemetry?: {
    loc: string;
    icon: string;
    alt: string;
    temp: string;
    distance: string;
    iconType: string;
  };
}

export interface ExperienceMoment {
  id: string;
  title: string;
  tag: string;
  image: string;
  icon: string;
}

export interface BookingDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  seats: number;
  promoCode?: string;
  specialRequests?: string;
}

export interface ReferredFriend {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: "joined_pending_booking" | "first_booking_completed";
  bookingTripName?: string;
  coinsEarned: number; // 300 when first_booking_completed
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipTier: "Silver Voyager" | "Gold Explorer" | "Platinum Nomad";
  travoCoins: number; // 1 Travo Coin = ₹1. Users earn 5 coins per ₹100 spent.
  walletBalance?: number; // Kept for backward compatibility
  loyaltyPoints?: number;
  referralCode?: string;
  referredBy?: string; // Referral code used during signup
  referredFriends?: ReferredFriend[];
  joinedDate: string;
  dietaryPreference?: string;
  city?: string;
  passportNumber?: string;
  passportExpiry?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  savedCoTravelers?: Array<{
    id: string;
    name: string;
    age: number;
    gender: string;
    relation: string;
  }>;
}

export interface CustomerBooking {
  id: string;
  bookingRef: string;
  tripId: string;
  tripName: string;
  destination: string;
  tripImage: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  paxCount: number;
  leadPassenger: {
    name: string;
    phone: string;
    email: string;
  };
  coTravelers?: string[];
  totalPrice: number;
  paidAmount: number;
  dueAmount: number;
  earnedCoins?: number; // Travo Coins earned on this booking (5 coins per ₹100)
  coinsRedeemed?: number; // Travo Coins used as discount
  hotelTier?: string;
  status: "confirmed" | "completed" | "in_review" | "cancelled";
  paymentMethod: string;
  paymentRef: string;
  bookedAt: string;
  specialRequests?: string;
  captainName?: string;
  captainPhone?: string;
}

export interface TripDetails {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  duration: string;
  upcomingDeparture: string;
  routeStops: RouteStop[];
  timelineItems: DayTimelineItem[];
  experienceMoments: ExperienceMoment[];
  inclusions: { text: string; icon: string }[];
  exclusions: { text: string }[];
  packingChecklist: { category: string; items: string[] }[];
  termsAccordion: { title: string; content: string }[];
  bannerImage: string;
  heroImage: string;
}

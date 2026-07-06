export interface RouteStop {
  id: string;
  name: string;
  coords: { x: number; y: number };
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

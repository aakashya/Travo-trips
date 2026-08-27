import React, { useState, useMemo, useEffect } from "react";
import { 
  Compass, Calendar, Timer, MapPin, Search, 
  ArrowRight, Check, ShieldCheck, Users, Ship,
  Flame, Sparkles, Filter, Shield, Utensils,
  Car, Hotel, Eye, X, SlidersHorizontal, ArrowUpDown,
  Grid, List, Globe2, RotateCcw, ChevronRight, Star,
  TrendingUp, CheckCircle2, Award, ArrowUpRight, Heart, MessageCircle
} from "lucide-react";
import { TRIPS_LIST } from "../data";
import { TripDetails } from "../types";
import { CountryFlag, IndiaFlagSvg, BhutanFlagSvg, NepalFlagSvg, GlobeFlagSvg } from "./CountryFlag";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface TripsShowcaseProps {
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
  initialCategory?: string;
}

// Available Countries
export type CountryCode = "all" | "india" | "bhutan" | "nepal";

// City / Region structure for the City Selector Big Grid
interface CityItem {
  id: string;
  name: string;
  state: string;
  country: "india" | "bhutan" | "nepal";
  countryLabel: string;
  countryFlag: string;
  tagline: string;
  image: string;
  keywords: string[];
  featuredTripId?: string;
}

const CITIES_DATA: CityItem[] = [
  {
    id: "munnar-kerala",
    name: "Munnar",
    state: "Kerala",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Misty Valleys, Tea Gardens & Mattupetty",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    keywords: ["munnar", "kerala", "tea", "mattupetty", "eravikulam", "hill"],
    featuredTripId: "kerala-munnar-thekkady-alleppey-4n5d"
  },
  {
    id: "alleppey-backwaters",
    name: "Alleppey",
    state: "Kerala",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Private AC Houseboats & Serene Lagoons",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    keywords: ["alleppey", "alappuzha", "houseboat", "backwater", "kerala", "punnamada"],
    featuredTripId: "kerala-munnar-alleppey-3n4d"
  },
  {
    id: "port-blair-havelock",
    name: "Port Blair",
    state: "Andaman & Nicobar",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Radhanagar Beach & Catamaran Cruises",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    keywords: ["andaman", "port blair", "havelock", "radhanagar", "swaraj dweep", "island", "cellular jail"],
    featuredTripId: "andaman-dream-4d3n"
  },
  {
    id: "gangtok-darjeeling",
    name: "Gangtok",
    state: "Sikkim",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Tiger Hill Sunrise & Kanchenjunga Vistas",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    keywords: ["gangtok", "darjeeling", "sikkim", "kanchenjunga", "tiger hill", "tsomgo"],
    featuredTripId: "sikkim-gangtok-darjeeling-5n6d"
  },
  {
    id: "goa-tropical",
    name: "Goa",
    state: "Goa",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Baga, Calangute, Old Goa & Ocean Sunsets",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    keywords: ["goa", "baga", "calangute", "anjuna", "panaji", "candolim", "dudhsagar", "beach"],
    featuredTripId: "goa-classic-4n5d"
  },
  {
    id: "paro-thimphu",
    name: "Paro",
    state: "Paro Valley",
    country: "bhutan",
    countryLabel: "Bhutan",
    countryFlag: "🇧🇹",
    tagline: "Tiger's Nest Monastery & Sacred Dzongs",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop",
    keywords: ["bhutan", "paro", "thimphu", "tiger's nest", "taktsang", "punakha", "dochula"],
    featuredTripId: "bhutan-classic-5n6d"
  },
  {
    id: "kathmandu-pokhara",
    name: "Kathmandu",
    state: "Bagmati Province",
    country: "nepal",
    countryLabel: "Nepal",
    countryFlag: "🇳🇵",
    tagline: "Phewa Lake, World Peace Pagoda & Stupas",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    keywords: ["nepal", "kathmandu", "pokhara", "phewa", "swayambhunath", "pashupatinath", "annapurna"],
    featuredTripId: "nepal-kathmandu-pokhara-5n6d"
  },
  {
    id: "manali-kasol",
    name: "Manali",
    state: "Himachal Pradesh",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Solang Snows, Parvati River & Pine Camps",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
    keywords: ["manali", "kasol", "solang", "manikaran", "parvati", "himachal", "tosh"],
    featuredTripId: "manali"
  },
  {
    id: "wayanad-nature",
    name: "Wayanad",
    state: "Kerala",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Banasura Sagar Dam, Edakkal Caves & Waterfalls",
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=800&auto=format&fit=crop",
    keywords: ["wayanad", "banasura", "edakkal", "chembra", "kerala", "vythiri"],
    featuredTripId: "kerala-wayanad-nature-3n4d"
  },
  {
    id: "chitwan-wildlife",
    name: "Chitwan",
    state: "Narayani Zone",
    country: "nepal",
    countryLabel: "Nepal",
    countryFlag: "🇳🇵",
    tagline: "One-horned Rhinos, Canoe Rides & Wilderness",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop",
    keywords: ["chitwan", "wildlife", "safari", "rhino", "nepal", "jungle"],
    featuredTripId: "nepal-chitwan-wildlife-6n7d"
  },
  {
    id: "pelling-lachung",
    name: "Pelling",
    state: "Sikkim",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Skywalk, Yumthang Flower Valley & Lachung",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    keywords: ["pelling", "lachung", "yumthang", "north sikkim", "skywalk", "gurudongmar"],
    featuredTripId: "sikkim-north-adventure-7n8d"
  },
  {
    id: "srinagar-kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Dal Lake Shikaras, Gulmarg Gondola & Houseboats",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop",
    keywords: ["kashmir", "srinagar", "gulmarg", "pahalgam", "sonamarg", "dal lake", "shikara", "houseboat", "b2b"],
    featuredTripId: "kashmir-paradise-4n5d"
  },
  {
    id: "leh-ladakh",
    name: "Leh Ladakh",
    state: "Ladakh",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Khardung La, Pangong Tso & Nubra Sand Dunes",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop",
    keywords: ["ladakh", "leh", "pangong", "nubra", "khardung la", "hunder", "diskit", "b2b"],
    featuredTripId: "leh-ladakh-b2b-5n6d"
  },
  {
    id: "udaipur-lakes",
    name: "Udaipur",
    state: "Rajasthan",
    country: "india",
    countryLabel: "India",
    countryFlag: "🇮🇳",
    tagline: "Lake Pichola, City Palace & Mount Abu",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
    keywords: ["udaipur", "pichola", "rajasthan", "mount abu", "kumbhalgarh", "palace"],
    featuredTripId: "udaipur-lakes"
  }
];

// Helper: Extract numeric price
function extractPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
}

// Helper: Extract numeric days
function extractDays(durationStr: string): number {
  const match = durationStr.match(/(\d+)\s*Days?/i);
  if (match) return parseInt(match[1], 10);
  const matchN = durationStr.match(/(\d+)\s*Nights?/i);
  if (matchN) return parseInt(matchN[1], 10) + 1;
  return 5;
}

// Helper: Extract country for a trip
function getTripCountry(tripId: string): "india" | "bhutan" | "nepal" {
  if (tripId.startsWith("bhutan-") || tripId === "bhutan") return "bhutan";
  if (tripId.startsWith("nepal-") || tripId === "nepal") return "nepal";
  return "india";
}

// Helper: Extract primary destination type
function getTripVibe(tripId: string): string {
  if (tripId.startsWith("andaman-")) return "Islands & Beaches";
  if (tripId.startsWith("goa-")) return "Tropical Beaches";
  if (tripId.startsWith("kerala-")) return "Backwaters & Hills";
  if (tripId.startsWith("bhutan-")) return "Kingdom & Heritage";
  if (tripId.startsWith("sikkim-")) return "Himalayan Vistas";
  if (tripId.startsWith("nepal-")) return "Sacred Peaks & Wildlife";
  if (tripId === "manali") return "Scenic Roadtrip";
  if (tripId === "valley-of-flowers") return "Alpine Valley Trek";
  if (tripId === "udaipur-lakes") return "Royal Heritage";
  return "Curated Getaway";
}

// Helper: Meal plan label from a trip's inclusions text.
// Different data sources phrase this inconsistently (some say "MAP", some "MAPAI", some never
// mention the plan code at all and just say "Breakfast" or "Breakfast & Dinner") — matching on
// the actual meal words is far more reliable than matching the MAP/CP abbreviations themselves.
function getMealPlanLabel(trip: TripDetails): string {
  const text = trip.inclusions.map((i) => i.text).join(" ").toLowerCase();
  const isSelectablePlan = /cp\s*\/\s*map|map\s*\/\s*cp|selected plan/.test(text);
  const hasBreakfast = /breakfast/.test(text);
  const hasDinner = /dinner/.test(text);
  if (isSelectablePlan) return "Meal Plans";
  if (hasBreakfast && hasDinner) return "B & D";
  if (hasBreakfast) return "Breakfast";
  if (hasDinner) return "Dinner";
  return "Meals Included";
}

export default function TripsShowcase({ onNavigate, onOpenBooking }: TripsShowcaseProps) {
  const { wishlist, toggleWishlist, isLoggedIn, openAuthModal } = useCustomerAuth();

  // Filter States
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("all");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const [vibeFilter, setVibeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Quick View Modal State
  const [quickViewTrip, setQuickViewTrip] = useState<TripDetails | null>(null);

  const handleBookExpedition = (tripId: string) => {
    if (!isLoggedIn) {
      openAuthModal("Login required to reserve this expedition and receive e-tickets");
    } else {
      onOpenBooking(tripId);
    }
  };

  // Filter available cities based on selected country, sorted by country then city name
  const visibleCities = useMemo(() => {
    const cities = selectedCountry === "all"
      ? CITIES_DATA
      : CITIES_DATA.filter((city) => city.country === selectedCountry);
    return [...cities].sort((a, b) => {
      const countryCompare = a.countryLabel.localeCompare(b.countryLabel);
      if (countryCompare !== 0) return countryCompare;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCountry]);

  // Count trips per country
  const countryCounts = useMemo(() => {
    const counts = { all: TRIPS_LIST.length, india: 0, bhutan: 0, nepal: 0 };
    TRIPS_LIST.forEach((trip) => {
      const country = getTripCountry(trip.id);
      counts[country]++;
    });
    return counts;
  }, []);

  // Calculate count of trips per city
  const cityTripCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CITIES_DATA.forEach((city) => {
      const matched = TRIPS_LIST.filter((trip) => {
        const text = `${trip.name} ${trip.subtitle} ${trip.routeStops.map(s => s.name).join(" ")}`.toLowerCase();
        return city.keywords.some(k => text.includes(k.toLowerCase()));
      });
      counts[city.id] = matched.length;
    });
    return counts;
  }, []);

  // Filter and Sort Trips
  const filteredAndSortedTrips = useMemo(() => {
    let result = TRIPS_LIST.filter((trip) => {
      const tripCountry = getTripCountry(trip.id);

      // 1. Country Filter
      if (selectedCountry !== "all" && tripCountry !== selectedCountry) {
        return false;
      }

      // 2. City Selector on Big Grid Filter
      if (selectedCityId) {
        const activeCity = CITIES_DATA.find((c) => c.id === selectedCityId);
        if (activeCity) {
          const tripText = `${trip.name} ${trip.subtitle} ${trip.routeStops.map(s => s.name).join(" ")}`.toLowerCase();
          const matchesCity = activeCity.keywords.some((keyword) => 
            tripText.includes(keyword.toLowerCase())
          );
          if (!matchesCity) return false;
        }
      }

      // 3. Search Query Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const tripText = `${trip.name} ${trip.subtitle} ${trip.price} ${trip.duration} ${trip.routeStops.map(s => s.name).join(" ")}`.toLowerCase();
        if (!tripText.includes(query)) return false;
      }

      // 4. Duration Filter
      const days = extractDays(trip.duration);
      if (durationFilter === "short" && (days < 2 || days > 4)) return false;
      if (durationFilter === "classic" && (days < 5 || days > 6)) return false;
      if (durationFilter === "grand" && days < 7) return false;

      // 5. Budget Filter
      const price = extractPrice(trip.price);
      if (budgetFilter === "under12k" && price > 12000) return false;
      if (budgetFilter === "12kTo20k" && (price < 12000 || price > 20000)) return false;
      if (budgetFilter === "20kTo30k" && (price < 20000 || price > 30000)) return false;
      if (budgetFilter === "above30k" && price < 30000) return false;

      // 6. Travel Vibe Filter
      if (vibeFilter !== "all") {
        if (vibeFilter === "beaches" && !trip.id.startsWith("andaman-") && !trip.id.startsWith("goa-") && !trip.name.toLowerCase().includes("kovalam")) return false;
        if (vibeFilter === "himalayas" && !trip.id.startsWith("bhutan-") && !trip.id.startsWith("sikkim-") && !trip.id.startsWith("nepal-") && trip.id !== "manali" && trip.id !== "valley-of-flowers") return false;
        if (vibeFilter === "backwaters" && !trip.id.startsWith("kerala-")) return false;
        if (vibeFilter === "roadtrips" && trip.id !== "manali" && trip.id !== "valley-of-flowers" && trip.id !== "udaipur-lakes") return false;
        if (vibeFilter === "heritage" && trip.id !== "udaipur-lakes" && !trip.id.startsWith("bhutan-") && !trip.id.includes("heritage")) return false;
      }

      return true;
    });

    // Sort Trips
    return result.sort((a, b) => {
      const priceA = extractPrice(a.price);
      const priceB = extractPrice(b.price);
      const daysA = extractDays(a.duration);
      const daysB = extractDays(b.duration);

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "duration-asc":
          return daysA - daysB;
        case "duration-desc":
          return daysB - daysA;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "featured":
        default:
          return 0; // maintain default curated order
      }
    });
  }, [selectedCountry, selectedCityId, searchQuery, durationFilter, budgetFilter, vibeFilter, sortBy]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSelectedCountry("all");
    setSelectedCityId(null);
    setSearchQuery("");
    setSortBy("featured");
    setDurationFilter("all");
    setBudgetFilter("all");
    setVibeFilter("all");
  };

  const hasActiveFilters = selectedCountry !== "all" || selectedCityId !== null || searchQuery !== "" || durationFilter !== "all" || budgetFilter !== "all" || vibeFilter !== "all" || sortBy !== "featured";

  // Handle City Selector selection
  const handleSelectCity = (cityId: string) => {
    if (selectedCityId === cityId) {
      setSelectedCityId(null); // toggle off
    } else {
      setSelectedCityId(cityId);
      // Auto-match country if not all
      const city = CITIES_DATA.find(c => c.id === cityId);
      if (city && selectedCountry !== "all" && city.country !== selectedCountry) {
        setSelectedCountry(city.country);
      }
      // Carry the traveler straight to the filtered packages below, rather than leaving them
      // to notice the results changed further down the page on their own.
      document.getElementById("trip-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="trips-catalog-view" className="py-8 sm:py-12 px-4 sm:px-6 bg-[#FAF9F6] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* ========================================================================= */}
        {/* 1. FILTER SECTION: Country Selector + Search Bar + Sort + Advanced Filters */}
        {/* ========================================================================= */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          
          {/* A. COUNTRY SELECTOR TABS (Inside Filter Section) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#9C753B]" /> Select Country / Region:
              </span>
              {selectedCountry !== "all" && (
                <button
                  onClick={() => { setSelectedCountry("all"); setSelectedCityId(null); }}
                  className="text-[11px] font-semibold text-[#9C753B] hover:underline"
                >
                  View All Countries ({countryCounts.all})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                {
                  id: "all",
                  label: "All Destinations",
                  flag: <span className="text-xl shrink-0">🌍</span>,
                  count: countryCounts.all
                },
                {
                  id: "india",
                  label: "India Getaways",
                  flag: <IndiaFlagSvg className="w-6 h-4" />,
                  count: countryCounts.india
                },
                {
                  id: "bhutan",
                  label: "Kingdom of Bhutan",
                  flag: <BhutanFlagSvg className="w-6 h-4" />,
                  count: countryCounts.bhutan
                },
                {
                  id: "nepal",
                  label: "Nepal Expeditions",
                  flag: <NepalFlagSvg className="w-5 h-4.5" />,
                  count: countryCounts.nepal
                }
              ].map((c) => {
                const isActive = selectedCountry === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCountry(c.id as CountryCode);
                      // If the currently selected city doesn't belong to the newly selected country, reset city selection
                      if (c.id !== "all" && selectedCityId) {
                        const cityObj = CITIES_DATA.find(ci => ci.id === selectedCityId);
                        if (cityObj && cityObj.country !== c.id) {
                          setSelectedCityId(null);
                        }
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 ${
                      isActive 
                        ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md scale-[1.01]" 
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0 flex items-center">{c.flag}</div>
                      <p className={`text-xs font-black uppercase tracking-tight ${isActive ? "text-white" : "text-neutral-900"}`}>
                        {c.label}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
                    }`}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. SEARCH & PRIMARY CONTROLS (Search Bar, Sort By, View Mode) */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
            
            {/* Search Box */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search by city (Munnar, Gangtok, Paro, Goa), duration, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#9C753B] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center bg-neutral-50 border border-neutral-200 rounded-2xl px-3 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#9C753B] mr-2 shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-500 mr-2 shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-neutral-900 focus:outline-none cursor-pointer pr-2"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                  <option value="name-asc">Alphabetical (A - Z)</option>
                  <option value="name-desc">Alphabetical (Z - A)</option>
                </select>
              </div>

              {/* Advanced Filter Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                  showAdvancedFilters || (durationFilter !== "all" || budgetFilter !== "all" || vibeFilter !== "all")
                    ? "bg-[#9C753B]/10 border-[#9C753B] text-[#9C753B]"
                    : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === "grid" ? "bg-white text-neutral-900 shadow-2xs font-bold" : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Detailed List View"
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === "list" ? "bg-white text-neutral-900 shadow-2xs font-bold" : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* C. EXPANDABLE ADVANCED FILTERS (Vibe, Duration, Budget) */}
          {showAdvancedFilters && (
            <div className="p-4 sm:p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                
                {/* 1. Travel Vibe Filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Travel Vibe / Category
                  </label>
                  <select
                    value={vibeFilter}
                    onChange={(e) => setVibeFilter(e.target.value)}
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                  >
                    <option value="all">All Travel Styles</option>
                    <option value="beaches">🏖️ Tropical Beaches & Islands (Andaman, Goa)</option>
                    <option value="himalayas">🏔️ Himalayan Peaks & Snow (Sikkim, Bhutan, Nepal, Manali)</option>
                    <option value="backwaters">🛶 Backwaters & Tea Hills (Kerala)</option>
                    <option value="roadtrips">🛣️ Scenic Road Expeditions (Volvo AC)</option>
                    <option value="heritage">🏰 Royal Heritage & Palaces (Udaipur, Nepal)</option>
                  </select>
                </div>

                {/* 2. Duration Filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Trip Duration
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                  >
                    <option value="all">All Durations (3 - 8 Days)</option>
                    <option value="short">⚡ Weekend & Quick (2 - 4 Days)</option>
                    <option value="classic">✨ Classic Getaway (5 - 6 Days)</option>
                    <option value="grand">🌟 Grand Expedition (7+ Days)</option>
                  </select>
                </div>

                {/* 3. Budget Filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    Budget Range (Per Person)
                  </label>
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                  >
                    <option value="all">All Budget Ranges</option>
                    <option value="under12k">Pocket Friendly (Under ₹12,000)</option>
                    <option value="12kTo20k">Value Deluxe (₹12,000 – ₹20,000)</option>
                    <option value="20kTo30k">Premium Luxury (₹20,000 – ₹30,000)</option>
                    <option value="above30k">Grand Elite (₹30,000+)</option>
                  </select>
                </div>

              </div>

              {/* Reset filters button inside advanced view */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
                <span className="text-[11px] text-neutral-500">
                  Showing <strong>{filteredAndSortedTrips.length}</strong> matching tour packages
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#9C753B] font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset All Filters
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 3. BIG GRID CITY SELECTOR: Prominent Visual City Grid Cards */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center gap-2">
            <div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#9C753B]" />
                <h2 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-neutral-900">
                  Select A Destination City
                </h2>
              </div>
              <p className="text-xs text-neutral-500 font-light">
                Click any city to filter itineraries instantly, or browse all circuits below.
              </p>
            </div>

            {/* Clear city filter shortcut if one is selected */}
            {selectedCityId && (
              <button
                onClick={() => setSelectedCityId(null)}
                className="px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Viewing: {CITIES_DATA.find(c => c.id === selectedCityId)?.name}</span>
                <X className="w-3.5 h-3.5 text-neutral-600" />
              </button>
            )}
          </div>

          {/* Big Visual Grid of Cities */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
            
            {/* "All Cities" Reset Card */}
            <div
              onClick={() => setSelectedCityId(null)}
              className={`group relative rounded-2xl p-4 cursor-pointer border transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[140px] ${
                selectedCityId === null
                  ? "bg-neutral-900 text-white border-neutral-900 ring-2 ring-[#9C753B] shadow-lg"
                  : "bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200 hover:border-neutral-300 shadow-xs"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg">🗺️</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    selectedCityId === null ? "bg-[#9C753B] text-white" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    {countryCounts[selectedCountry]} Trips
                  </span>
                </div>
                <h3 className={`text-sm font-black uppercase tracking-tight font-display pt-2 ${
                  selectedCityId === null ? "text-white" : "text-neutral-900"
                }`}>
                  All Cities
                </h3>
                <p className={`text-[11px] font-semibold ${
                  selectedCityId === null ? "text-amber-200/90" : "text-[#9C753B]"
                }`}>
                  All States & Regions
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] font-bold text-[#9C753B]">
                <span>{selectedCityId === null ? "✓ Active View" : "Browse All"}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Individual City Cards */}
            {visibleCities.map((city) => {
              const isSelected = selectedCityId === city.id;
              const tripCount = cityTripCounts[city.id] || 0;

              return (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city.id)}
                  className={`group relative rounded-2xl cursor-pointer border overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[140px] shadow-xs ${
                    isSelected
                      ? "ring-2 ring-[#9C753B] border-[#9C753B] shadow-xl scale-[1.02]"
                      : "border-neutral-200 hover:border-[#9C753B]/50 hover:shadow-md"
                  }`}
                >
                  {/* Background Image with Gradient */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7] group-hover:brightness-[0.6]"
                    />
                    <div className={`absolute inset-0 transition-opacity ${
                      isSelected 
                        ? "bg-gradient-to-t from-black/95 via-black/60 to-black/40" 
                        : "bg-gradient-to-t from-black/90 via-black/40 to-black/20"
                    }`} />
                  </div>

                  {/* Top Badges */}
                  <div className="relative z-10 p-3 flex items-center justify-between gap-1">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white font-bold border border-white/10 flex items-center gap-1.5">
                      <CountryFlag country={city.country} size="xs" />
                      <span className="uppercase text-[9px]">{city.countryLabel}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isSelected ? "bg-[#9C753B] text-white" : "bg-white/90 text-neutral-900"
                    }`}>
                      {tripCount} {tripCount === 1 ? "Trip" : "Trips"}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-3 pt-0 space-y-0.5">
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-[11px] text-amber-200/95 font-semibold line-clamp-1 leading-tight">
                      {city.state}
                    </p>
                    
                    {isSelected && (
                      <div className="pt-1 flex items-center gap-1 text-[10px] font-black text-amber-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Filter Active</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. RESULTS BAR: Active Filter Badges & Count */}
        {/* ========================================================================= */}
        <div id="trip-results" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-neutral-200 scroll-mt-6">
          
          {/* Left: Active filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Active Country Filter Badge */}
            {selectedCountry !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-300 rounded-full text-[10px] font-bold text-neutral-800">
                <CountryFlag country={selectedCountry} size="xs" />
                <span>{selectedCountry === "bhutan" ? "Bhutan" : selectedCountry === "nepal" ? "Nepal" : "India"}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-red-500 ml-0.5" onClick={() => setSelectedCountry("all")} />
              </span>
            )}

            {/* Active City Filter Badge */}
            {selectedCityId && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#9C753B]/10 border border-[#9C753B]/30 rounded-full text-[10px] font-bold text-[#9C753B]">
                City: {CITIES_DATA.find(c => c.id === selectedCityId)?.name}, {CITIES_DATA.find(c => c.id === selectedCityId)?.state}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500 ml-0.5" onClick={() => setSelectedCityId(null)} />
              </span>
            )}

            {/* Active Search Query */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 border border-neutral-300 rounded-full text-[10px] font-bold text-neutral-800">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSearchQuery("")} />
              </span>
            )}

            {/* Clear All Shortcut */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-[#9C753B] hover:underline ml-1"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Right: Results Count */}
          <div className="text-xs font-bold text-neutral-900 shrink-0">
            Showing <span className="text-[#9C753B] font-black">{filteredAndSortedTrips.length}</span> of {TRIPS_LIST.length} Curated Expeditions
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. TRIP CARDS DISPLAY: Rich Grid Mode vs. List Mode */}
        {/* ========================================================================= */}
        {filteredAndSortedTrips.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 bg-neutral-100 text-[#9C753B] rounded-full flex items-center justify-center mx-auto">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 font-display">
              No matching itineraries found
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              We couldn't find any tour packages matching your current filter selections. Try clearing your search query or selecting "All Cities".
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#9C753B] hover:bg-amber-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredAndSortedTrips.map((trip) => {
              const country = getTripCountry(trip.id);
              const vibe = getTripVibe(trip.id);
              const numericPrice = extractPrice(trip.price);

              let countryBadge = "🇮🇳 India";
              if (country === "bhutan") countryBadge = "🇧🇹 Bhutan";
              if (country === "nepal") countryBadge = "🇳🇵 Nepal";

              return (
                <div 
                  key={trip.id}
                  className="bg-white border border-neutral-200/90 rounded-3xl overflow-hidden hover:border-[#9C753B] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Image Banner */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={trip.bannerImage || trip.heroImage} 
                        alt={trip.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Left Destination Badges */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                        <span className="px-3 py-1 bg-black/65 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-full border border-white/15 shadow-sm flex items-center gap-1.5">
                          <CountryFlag country={country} size="xs" />
                          <span>{country === "bhutan" ? "Bhutan" : country === "nepal" ? "Nepal" : "India"}</span>
                        </span>
                        <span className="px-3 py-1 bg-black/65 backdrop-blur-md text-amber-200 text-[10px] font-black uppercase tracking-wider rounded-full border border-white/15 shadow-sm">
                          {vibe}
                        </span>
                      </div>

                      {/* Floating Wishlist & Quick View Buttons on Image */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(trip.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 ${
                            wishlist.includes(trip.id)
                              ? "bg-rose-500 text-white"
                              : "bg-black/50 text-white hover:bg-black/75"
                          }`}
                          title={wishlist.includes(trip.id) ? "Saved in Wishlist" : "Add to Wishlist"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlist.includes(trip.id) ? "fill-white" : ""}`} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewTrip(trip);
                          }}
                          className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-md active:scale-90"
                          title="Quick View Highlights"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Image Bottom Details */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-300">
                          <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                            <Timer className="w-3 h-3" /> {trip.duration}
                          </span>
                          <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                            <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> 4.9/5
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black font-display uppercase tracking-wide leading-tight line-clamp-1 group-hover:text-amber-200 transition-colors">
                          {trip.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-light">
                        {trip.subtitle}
                      </p>

                      {/* Circuit Stops Covered — kept for possible reuse elsewhere later, not rendered here for now.
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                          Destinations Covered:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {trip.routeStops.slice(0, 4).map((stop) => (
                            <span
                              key={stop.id}
                              className="px-2 py-0.5 bg-neutral-100 border border-neutral-200/80 rounded-lg text-[10px] text-neutral-700 font-medium"
                            >
                              📍 {stop.name}
                            </span>
                          ))}
                          {trip.routeStops.length > 4 && (
                            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200/80 rounded-lg text-[10px] text-neutral-500 font-medium">
                              +{trip.routeStops.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      */}

                      {/* Key Inclusions Strip */}
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-100 text-[10px] text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Hotel className="w-3 h-3 text-[#9C753B]" />
                          <span className="truncate">Star Stays</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="w-3 h-3 text-[#9C753B]" />
                          <span className="truncate">Private AC</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-[#9C753B]" />
                          <span className="truncate">{getMealPlanLabel(trip)}</span>
                        </div>
                      </div>

                      {/* Upcoming departure */}
                      <div className="p-2.5 bg-[#FAF9F6] border border-neutral-200/80 rounded-xl space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-800">
                          <Calendar className="w-3 h-3 text-[#9C753B]" />
                          <span className="text-[10px] uppercase tracking-wider text-neutral-500">Departure:</span>
                        </div>
                        <p className="text-[10px] text-neutral-700 font-medium line-clamp-1 pl-4">
                          {trip.upcomingDeparture}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Price & Action Buttons */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-bold">Starting From</p>
                      <p className="text-lg sm:text-xl font-black text-neutral-900 font-display">
                        {trip.price} <span className="text-[10px] text-neutral-500 font-normal">/ adult</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onNavigate(trip.id)}
                        className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all"
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => handleBookExpedition(trip.id)}
                        className="px-3.5 py-2 bg-[#9C753B] hover:bg-amber-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1 shadow-sm"
                      >
                        Book <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* DETAILED LIST VIEW */
          <div className="space-y-4">
            {filteredAndSortedTrips.map((trip) => {
              const country = getTripCountry(trip.id);
              const vibe = getTripVibe(trip.id);

              let countryBadge = "🇮🇳 India";
              if (country === "bhutan") countryBadge = "🇧🇹 Bhutan";
              if (country === "nepal") countryBadge = "🇳🇵 Nepal";

              return (
                <div 
                  key={trip.id}
                  className="bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:border-[#9C753B] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col md:flex-row items-stretch justify-between group p-4 sm:p-5 gap-5"
                >
                  {/* List Thumbnail Banner */}
                  <div className="relative w-full md:w-64 md:shrink-0 h-48 md:h-56 rounded-2xl overflow-hidden">
                    <img 
                      src={trip.bannerImage || trip.heroImage} 
                      alt={trip.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full flex items-center gap-1.5 border border-white/10">
                        <CountryFlag country={country} size="xs" />
                        <span>{country === "bhutan" ? "Bhutan" : country === "nepal" ? "Nepal" : "India"}</span>
                      </span>
                    </div>

                    {/* Wishlist & Quick View on List card */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(trip.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all z-10 active:scale-90 ${
                          wishlist.includes(trip.id)
                            ? "bg-rose-500 text-white"
                            : "bg-black/50 text-white hover:bg-black/75"
                        }`}
                        title={wishlist.includes(trip.id) ? "Saved in Wishlist" : "Add to Wishlist"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes(trip.id) ? "fill-white" : ""}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewTrip(trip);
                        }}
                        className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-md active:scale-90"
                        title="Quick View Highlights"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                        <Timer className="w-3 h-3" /> {trip.duration}
                      </span>
                    </div>
                  </div>

                  {/* List Body Content */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#9C753B]/10 text-[#9C753B] text-[10px] font-black uppercase tracking-wider rounded-md">
                          {vibe}
                        </span>
                        <span className="text-[11px] text-neutral-400">•</span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          {trip.upcomingDeparture}
                        </span>
                      </div>

                      <h3 className="text-lg font-black font-display uppercase tracking-wide text-neutral-900 group-hover:text-[#9C753B] transition-colors">
                        {trip.name}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 font-light">
                        {trip.subtitle}
                      </p>
                    </div>

                    {/* Circuit Stops */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase mr-1">Route:</span>
                      {trip.routeStops.map((stop) => (
                        <span 
                          key={stop.id}
                          className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-md text-[10px] text-neutral-700"
                        >
                          {stop.name}
                        </span>
                      ))}
                    </div>

                    {/* Inclusions summary */}
                    <div className="flex items-center gap-4 text-[11px] text-neutral-600 pt-2 border-t border-neutral-100">
                      <span className="flex items-center gap-1"><Hotel className="w-3 h-3 text-[#9C753B]" /> Star Accommodations</span>
                      <span className="flex items-center gap-1"><Car className="w-3 h-3 text-[#9C753B]" /> Dedicated AC Vehicle</span>
                      <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-[#9C753B]" /> {getMealPlanLabel(trip)}</span>
                    </div>
                  </div>

                  {/* List Price & CTAs */}
                  <div className="md:w-52 md:shrink-0 flex md:flex-col justify-between md:justify-center items-end md:items-end border-t md:border-t-0 md:border-l border-neutral-100 pt-4 md:pt-0 md:pl-5 space-y-3">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-bold uppercase text-neutral-400">Starting From</span>
                      <p className="text-2xl font-black text-neutral-900 font-display">
                        {trip.price}
                      </p>
                      <span className="text-[10px] text-neutral-500">Per Adult (Taxes Incl.)</span>
                    </div>

                    <div className="flex md:flex-col items-center gap-2 w-full">
                      <button
                        onClick={() => onNavigate(trip.id)}
                        className="w-full px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all text-center"
                      >
                        View Itinerary
                      </button>
                      <button
                        onClick={() => handleBookExpedition(trip.id)}
                        className="w-full px-4 py-2 bg-[#9C753B] hover:bg-amber-700 text-white text-xs font-black rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                      >
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. TRAVO TRUST & CUSTOMIZATION CONCIERGE BANNER */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 bg-neutral-900 text-white rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
          {/* Ambient background styling */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9C753B]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-[#9C753B] text-white text-[10px] font-black uppercase tracking-wider rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> CUSTOM ITINERARY CONCIERGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
              Need A Customized Circuit Or Private Group Batch?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              We customize any itinerary with private Volvo buses, luxury Innova Crysta transfers, 4-star boutique heritage stays, and custom departure dates for corporate retreats, family groups, and friends.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => onNavigate("about")}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md text-center"
            >
              Request Custom Quote
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#9C753B] hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md text-center"
            >
              Talk To Travel Captain
            </button>
            <a
              href={`https://wa.me/919996965697?text=${encodeURIComponent("Hi TRAVO! I'd like to talk to your team about a customized circuit or private group batch.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Talk To Team Directly
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 7. QUICK VIEW MODAL: Instant preview without leaving catalog */}
      {/* ========================================================================= */}
      {quickViewTrip && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto p-4 py-8 bg-black/70 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setQuickViewTrip(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full mx-auto border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              onClick={() => setQuickViewTrip(null)}
              className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#9C753B]">
                <span className="flex items-center gap-1.5">
                  <CountryFlag country={getTripCountry(quickViewTrip.id)} size="xs" />
                  <span className="uppercase">{getTripCountry(quickViewTrip.id)}</span>
                </span>
                <span>•</span>
                <span>{quickViewTrip.duration}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-neutral-900">
                {quickViewTrip.name}
              </h3>
              <p className="text-xs text-neutral-600 font-light">
                {quickViewTrip.subtitle}
              </p>
            </div>

            {/* Image Preview */}
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden">
              <img 
                src={quickViewTrip.bannerImage || quickViewTrip.heroImage} 
                alt={quickViewTrip.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold">
                Starting: <strong className="text-amber-300 text-sm font-black">{quickViewTrip.price}</strong> / adult
              </div>
            </div>

            {/* Itinerary Snapshot */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9C753B]" /> Day-by-Day Itinerary Snapshot
              </h4>
              <div className="space-y-2">
                {quickViewTrip.timelineItems.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs">
                    <div className="flex items-center justify-between font-bold text-neutral-900">
                      <span>{item.day}: {item.title}</span>
                    </div>
                    {item.quote && (
                      <p className="text-[11px] text-neutral-500 font-light mt-0.5 line-clamp-1">
                        {item.quote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" /> Package Verified Inclusions:
              </p>
              <p className="text-[11px] text-emerald-800 font-light">
                Private AC transfers, MMT rated 3★/4★ accommodations, MAP daily breakfast & dinner, driver charges, toll taxes & all state permits.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-200">
              <button
                onClick={() => {
                  const tripId = quickViewTrip.id;
                  setQuickViewTrip(null);
                  onNavigate(tripId);
                }}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all"
              >
                View Full Itinerary Page
              </button>
              <button
                onClick={() => {
                  const tripId = quickViewTrip.id;
                  setQuickViewTrip(null);
                  onOpenBooking(tripId);
                }}
                className="px-5 py-2.5 bg-[#9C753B] hover:bg-amber-700 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                Book This Package <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

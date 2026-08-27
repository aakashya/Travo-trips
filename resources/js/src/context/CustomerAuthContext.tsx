import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { CustomerUser, CustomerBooking } from "../types";
import { getJson, postJson, patchJson, deleteJson, setCsrfToken, ApiError } from "../api";
import { TRIPS_DATA } from "../data";

// The backend only knows booking facts (trip_id, price, dates, status, coins) — it has no
// idea what a trip's catalogue image or destination label is, since that's frontend-only
// presentation data. This fills those two fields in from the static trip catalogue so every
// booking (freshly created or fetched from the server) still renders correctly in the
// dashboard, without duplicating this lookup at every call site.
function enrichBooking(booking: CustomerBooking): CustomerBooking {
  if (booking.destination && booking.tripImage) return booking;
  const trip = TRIPS_DATA[booking.tripId];
  return {
    ...booking,
    destination: booking.destination || trip?.routeStops?.[0]?.name || trip?.name || booking.tripName,
    tripImage: booking.tripImage || trip?.bannerImage || trip?.heroImage || ""
  };
}

// The real, backend-verified identity of a signed-in customer (from the `users` table).
interface BackendIdentity {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

// Pre-seeded sample accounts
const DEMO_USERS: Record<string, CustomerUser> = {
  alex: {
    id: "usr_alex_8842",
    name: "Alex Varma",
    email: "alex.varma@travomail.com",
    phone: "+91 98450 12890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    travoCoins: 4420, // 4,420 Travo Coins (= ₹4,420 INR)
    walletBalance: 4420,
    loyaltyPoints: 3450,
    referralCode: "ALEX300",
    joinedDate: "October 2024",
    dietaryPreference: "Vegetarian",
    city: "Bengaluru, Karnataka",
    passportNumber: "T9284102A",
    passportExpiry: "2031-08-14",
    emergencyContact: {
      name: "Rohit Varma",
      phone: "+91 98450 99882",
      relation: "Brother"
    },
    savedCoTravelers: [
      { id: "co_1", name: "Pooja Varma", age: 28, gender: "Female", relation: "Spouse" },
      { id: "co_2", name: "Rohan Iyer", age: 31, gender: "Male", relation: "Friend" }
    ],
    referredFriends: [
      {
        id: "ref_1",
        name: "Vikram Malhotra",
        email: "vikram.m@gmail.com",
        joinedDate: "12 May 2026",
        status: "first_booking_completed",
        bookingTripName: "Kashmir Paradise 4N/5D Expedition",
        coinsEarned: 300
      },
      {
        id: "ref_2",
        name: "Neha Gupta",
        email: "neha.gupta@outlook.com",
        joinedDate: "04 Aug 2026",
        status: "joined_pending_booking",
        coinsEarned: 0
      }
    ]
  },
  priya: {
    id: "usr_priya_1092",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 97112 44321",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    travoCoins: 1200, // 1,200 Travo Coins (= ₹1,200 INR)
    walletBalance: 1200,
    loyaltyPoints: 1200,
    referralCode: "PRIYA300",
    joinedDate: "January 2025",
    dietaryPreference: "Jain Vegetarian",
    city: "Mumbai, Maharashtra",
    emergencyContact: {
      name: "Sanjay Sharma",
      phone: "+91 98200 11223",
      relation: "Father"
    },
    referredFriends: [
      {
        id: "ref_3",
        name: "Ananya Deshmukh",
        email: "ananya.d@gmail.com",
        joinedDate: "18 Jun 2026",
        status: "first_booking_completed",
        bookingTripName: "Kerala Backwaters & Mist Highlands",
        coinsEarned: 300
      }
    ]
  }
};

// Initial realistic pre-seeded customer bookings for demo user Alex
const INITIAL_DEMO_BOOKINGS: CustomerBooking[] = [
  {
    id: "bk_sk_2026_01",
    bookingRef: "TRV-SK-84920",
    tripId: "sikkim-himalayan-6d5n",
    tripName: "Sikkim Himalayan Panorama (Gangtok, Lachen & Gurudongmar Lake)",
    destination: "Sikkim, India",
    tripImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    departureDate: "14 Oct 2026",
    returnDate: "19 Oct 2026",
    duration: "6 Days / 5 Nights",
    paxCount: 2,
    leadPassenger: {
      name: "Alex Varma",
      phone: "+91 98450 12890",
      email: "alex.varma@travomail.com"
    },
    coTravelers: ["Pooja Varma"],
    totalPrice: 49998,
    paidAmount: 49998,
    dueAmount: 0,
    earnedCoins: 2500, // 5 coins per ₹100
    coinsCredited: true, // already reflected in the seeded demo wallet balance
    hotelTier: "Super Deluxe Luxury Heritage",
    status: "confirmed",
    paymentMethod: "UPI Instant Payment (Google Pay)",
    paymentRef: "UPI/260821/TRAVO992",
    bookedAt: "18 Aug 2026",
    specialRequests: "Twin bed high-floor mountain view room requested. Jain breakfast required.",
    captainName: "Captain Tenzing Dorjee",
    captainPhone: "+91 94340 77123"
  },
  {
    id: "bk_kr_2026_02",
    bookingRef: "TRV-KR-41029",
    tripId: "kerala-backwaters-5d4n",
    tripName: "Kerala Backwaters & Mist Highlands (Munnar & Alleppey Luxury Cruise)",
    destination: "Kerala, India",
    tripImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    departureDate: "05 Apr 2026",
    returnDate: "09 Apr 2026",
    duration: "5 Days / 4 Nights",
    paxCount: 2,
    leadPassenger: {
      name: "Alex Varma",
      phone: "+91 98450 12890",
      email: "alex.varma@travomail.com"
    },
    coTravelers: ["Pooja Varma"],
    totalPrice: 38400,
    paidAmount: 38400,
    dueAmount: 0,
    earnedCoins: 1920, // 5 coins per ₹100
    coinsCredited: true, // already reflected in the seeded demo wallet balance
    hotelTier: "4-Star Luxury Tea Estate & Houseboat",
    status: "completed",
    paymentMethod: "HDFC Credit Card (Visa Signature)",
    paymentRef: "CC/4491/260401",
    bookedAt: "12 Mar 2026",
    captainName: "Captain Mathew Joseph",
    captainPhone: "+91 98470 33812"
  }
];

const INITIAL_WISHLIST = [
  "bhutan-cultural-5d4n",
  "andaman-island-hopper-5d4n",
  "nepal-annapurna-6d5n",
  "kashmir-paradise-4n5d",
  "leh-ladakh-b2b-5n6d"
];

interface CustomerAuthContextType {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  bookings: CustomerBooking[];
  wishlist: string[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: { name: string; email: string; phone: string; referralCode?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  demoLogin: (preset?: "alex" | "priya") => void;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  confirmPasswordReset: (data: { token: string; email: string; password: string; passwordConfirmation: string }) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<CustomerUser>) => Promise<boolean>;
  addBooking: (booking: CustomerBooking, updatedTravoCoins?: number) => void;
  cancelBooking: (bookingId: string, reason?: string) => Promise<boolean>;
  toggleWishlist: (tripId: string) => Promise<boolean>;
  isWishlisted: (tripId: string) => boolean;
  addCoTraveler: (coTraveler: { name: string; age: number; gender: string; relation: string }) => Promise<boolean>;
  removeCoTraveler: (id: string) => Promise<boolean>;
  redeemTravoCoins: (coinsToUse: number) => { success: boolean; discountAmount: number };
  // Modal control
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string, onLoginCallback?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (actionDescription: string, callback: () => void) => boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "travo_customer_user_v3",
  BOOKINGS: "travo_customer_bookings_v3",
  WISHLIST: "travo_customer_wishlist_v3",
  IS_DEMO: "travo_customer_is_demo_v1"
};

// The `users` table only stores real identity (name/email/phone). Everything else on
// CustomerUser (Travo Coins, membership tier, referrals, etc.) is now backed by real tables
// (user_profiles, wishlists, co_travelers, coin_transactions) — this only builds a rough
// placeholder shape for the instant paint from cache, before hydrateFromServer() replaces it
// with the real thing.
function buildPlaceholderProfile(identity: BackendIdentity): CustomerUser {
  return {
    id: identity.id,
    name: identity.name,
    email: identity.email,
    phone: identity.phone || "",
    travoCoins: 0,
    walletBalance: 0,
    joinedDate: ""
  };
}

// Restore the locally-cached profile for this exact backend identity, if any (e.g. right
// after a page reload, before the server round-trip resolves), otherwise start a placeholder.
function resolveProfile(identity: BackendIdentity): CustomerUser {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      const cached = JSON.parse(saved);
      if (cached && cached.id === identity.id) {
        return {
          ...cached,
          name: identity.name,
          email: identity.email,
          phone: identity.phone || cached.phone
        };
      }
    }
  } catch {
    // fall through to a placeholder
  }
  return buildPlaceholderProfile(identity);
}

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  // 1. Initial State from localStorage — visitors start logged out until the
  // /auth/me bootstrap check below confirms (or clears) a real backend session.
  // Demo accounts (with their sample bookings/wishlist) are only loaded via demoLogin().
  const [user, setUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.travoCoins && parsed.walletBalance) {
          parsed.travoCoins = parsed.walletBalance;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [bookings, setBookings] = useState<CustomerBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState("Please sign in to access your customer account.");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Sync to localStorage — this is a cache now, not the source of truth. It exists purely so
  // the dashboard paints instantly on the next visit, before hydrateFromServer() confirms
  // (and corrects) it against the real tables.
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [wishlist]);

  const isDemoRef = useRef(false);

  // Fetches the real profile/wishlist/bookings for a signed-in (non-demo) account and makes
  // them the new truth — called on bootstrap, and again right after login/signup so the
  // customer never sees a stale/placeholder profile once "signed in" actually happens.
  const hydrateFromServer = async () => {
    try {
      const [profileRes, wishlistRes, bookingsRes] = await Promise.all([
        getJson<{ user: CustomerUser }>("/api/account/profile"),
        getJson<{ wishlist: string[] }>("/api/account/wishlist"),
        getJson<{ bookings: CustomerBooking[] }>("/api/account/bookings")
      ]);
      setUser(profileRes.user);
      setWishlist(wishlistRes.wishlist);
      setBookings(bookingsRes.bookings.map(enrichBooking));
    } catch (e) {
      // The cached/placeholder profile stays on screen — the next successful hydrate
      // (e.g. on the next page load) will catch it up.
      console.warn("Unable to load account data from the server", e);
    }
  };

  // 2. Bootstrap: verify any real backend session on load. Demo sessions (started via
  // demoLogin) are purely local and never touch the backend, so they're left alone here.
  // hasBootstrappedRef guards against React StrictMode's dev-mode double effect invocation
  // firing this whole sequence twice — a ref mutation is synchronous and shared across both
  // invocations. Deliberately no `cancelled`-style abort here: StrictMode calls this same
  // cleanup on the *first* invocation too (the one doing the real work, not just the
  // discarded one), so an abort flag would cancel the legitimate bootstrap before it ever
  // reached hydrateFromServer() — the ref guard alone is enough to prevent duplicate runs.
  const hasBootstrappedRef = useRef(false);
  useEffect(() => {
    if (hasBootstrappedRef.current) return;
    hasBootstrappedRef.current = true;

    (async () => {
      if (localStorage.getItem(STORAGE_KEYS.IS_DEMO) === "1") {
        isDemoRef.current = true;
        setIsAuthLoading(false);
        return;
      }
      try {
        const res = await getJson<{ user: BackendIdentity | null }>("/auth/me");
        if (res.user) {
          setUser(resolveProfile(res.user));
          setIsAuthLoading(false);
          await hydrateFromServer();
        } else {
          setUser(null);
          setIsAuthLoading(false);
        }
      } catch {
        setUser(null);
        setIsAuthLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auth methods — real, backend-verified accounts
  const login = async (email: string, password: string) => {
    try {
      const res = await postJson<{ user: BackendIdentity; csrf_token?: string }>("/auth/login", {
        email: email.trim().toLowerCase(),
        password
      });
      // Login rotates the session's CSRF token server-side; the SPA never reloads the page to
      // pick that up on its own, so the next POST (e.g. submitting a booking) would otherwise
      // be rejected with a stale-token mismatch — see api.ts's setCsrfToken.
      setCsrfToken(res.csrf_token);
      localStorage.removeItem(STORAGE_KEYS.IS_DEMO);
      isDemoRef.current = false;
      setUser(resolveProfile(res.user));
      await hydrateFromServer();
      setIsAuthModalOpen(false);
      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
      return { success: true };
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Unable to sign in right now. Please try again.";
      return { success: false, error: message };
    }
  };

  const signup = async (userData: { name: string; email: string; phone: string; referralCode?: string; password: string }) => {
    try {
      const res = await postJson<{ user: BackendIdentity; csrf_token?: string }>("/auth/register", {
        name: userData.name.trim(),
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone.trim(),
        password: userData.password,
        referral_code: userData.referralCode?.trim() || undefined
      });
      setCsrfToken(res.csrf_token);
      localStorage.removeItem(STORAGE_KEYS.IS_DEMO);
      isDemoRef.current = false;
      setUser(resolveProfile(res.user));
      await hydrateFromServer();
      setIsAuthModalOpen(false);
      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
      return { success: true };
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Unable to create your account right now. Please try again.";
      return { success: false, error: message };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const res = await postJson<{ message: string }>("/auth/forgot-password", {
        email: email.trim().toLowerCase()
      });
      return { success: true, message: res.message };
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Unable to send the reset link right now. Please try again.";
      return { success: false, message };
    }
  };

  const confirmPasswordReset = async (data: { token: string; email: string; password: string; passwordConfirmation: string }) => {
    try {
      const res = await postJson<{ message: string }>("/auth/reset-password", {
        token: data.token,
        email: data.email.trim().toLowerCase(),
        password: data.password,
        password_confirmation: data.passwordConfirmation
      });
      return { success: true, message: res.message };
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Unable to reset your password right now. Please try again.";
      return { success: false, message };
    }
  };

  const demoLogin = (preset: "alex" | "priya" = "alex") => {
    // Demo accounts are a local-only sandbox — they never create a real backend
    // session, so the /auth/me bootstrap on future loads must not try to verify them.
    localStorage.setItem(STORAGE_KEYS.IS_DEMO, "1");
    isDemoRef.current = true;
    setUser(DEMO_USERS[preset] || DEMO_USERS.alex);
    // Seed the sample bookings/wishlist that narrate this demo account, so the
    // dashboard has something to show without pre-loading them for real visitors.
    if (preset === "alex") {
      setBookings(INITIAL_DEMO_BOOKINGS);
      setWishlist(INITIAL_WISHLIST);
    } else {
      setBookings([]);
      setWishlist([]);
    }
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  const logout = () => {
    const wasDemo = localStorage.getItem(STORAGE_KEYS.IS_DEMO) === "1";
    localStorage.removeItem(STORAGE_KEYS.IS_DEMO);
    isDemoRef.current = false;
    setUser(null);
    setBookings([]);
    setWishlist([]);
    if (!wasDemo) {
      postJson<{ csrf_token?: string }>("/auth/logout", {})
        .then((res) => setCsrfToken(res.csrf_token))
        .catch(() => {
          // Best-effort — the local session is already cleared either way.
        });
    }
  };

  // Only genuine profile scalar fields go through here now — coins, wishlist, and
  // co-travelers each have their own real-backed mutators below.
  const updateProfile = async (updates: Partial<CustomerUser>): Promise<boolean> => {
    if (!user || isDemoRef.current) {
      // Demo accounts stay purely local, matching every other demo mutation.
      if (user) setUser(prev => prev ? { ...prev, ...updates } : null);
      return true;
    }

    const previous = user;
    setUser(prev => prev ? { ...prev, ...updates } : null);

    try {
      const payload: Record<string, unknown> = {};
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.dietaryPreference !== undefined) payload.dietary_preference = updates.dietaryPreference;
      if (updates.city !== undefined) payload.city = updates.city;
      if (updates.passportNumber !== undefined) payload.passport_number = updates.passportNumber;
      if (updates.passportExpiry !== undefined) payload.passport_expiry = updates.passportExpiry;
      if (updates.emergencyContact !== undefined) {
        payload.emergency_contact_name = updates.emergencyContact?.name;
        payload.emergency_contact_phone = updates.emergencyContact?.phone;
        payload.emergency_contact_relation = updates.emergencyContact?.relation;
      }

      const res = await patchJson<{ user: CustomerUser }>("/api/account/profile", payload);
      setUser(res.user);
      return true;
    } catch (e) {
      console.warn("Unable to save profile changes", e);
      setUser(previous);
      return false;
    }
  };

  // Records a booking the server already created (via postJson("/forms/booking-inquiries", ...)
  // in BookNowPage) — the server is the source of truth for the coin math and reference code,
  // this just reflects that result into local state.
  const addBooking = (booking: CustomerBooking, updatedTravoCoins?: number) => {
    setBookings(prev => [enrichBooking(booking), ...prev]);
    if (updatedTravoCoins !== undefined) {
      setUser(prev => prev ? { ...prev, travoCoins: updatedTravoCoins, walletBalance: updatedTravoCoins } : null);
    }
  };

  const cancelBooking = async (bookingId: string, reason?: string): Promise<boolean> => {
    const previous = bookings;
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "cancellation_requested",
          specialRequests: `${b.specialRequests || ""} [Cancellation Requested: ${reason || "Customer request"}]`
        };
      }
      return b;
    }));

    if (isDemoRef.current) return true;

    try {
      await patchJson(`/api/account/bookings/${bookingId}/cancel`, { reason });
      return true;
    } catch (e) {
      console.warn("Unable to cancel this booking", e);
      setBookings(previous);
      return false;
    }
  };

  const toggleWishlist = async (tripId: string): Promise<boolean> => {
    const wasWishlisted = wishlist.includes(tripId);
    setWishlist(prev => wasWishlisted ? prev.filter(id => id !== tripId) : [...prev, tripId]);

    if (isDemoRef.current) return !wasWishlisted;

    try {
      if (wasWishlisted) {
        await deleteJson(`/api/account/wishlist/${tripId}`);
      } else {
        await postJson("/api/account/wishlist", { trip_id: tripId });
      }
      return !wasWishlisted;
    } catch (e) {
      console.warn("Unable to update your wishlist", e);
      setWishlist(prev => wasWishlisted ? [...prev, tripId] : prev.filter(id => id !== tripId));
      return wasWishlisted;
    }
  };

  const isWishlisted = (tripId: string) => {
    return wishlist.includes(tripId);
  };

  const addCoTraveler = async (coTraveler: { name: string; age: number; gender: string; relation: string }): Promise<boolean> => {
    if (!user) return false;

    if (isDemoRef.current) {
      const item = { ...coTraveler, id: `co_${Date.now()}` };
      setUser(prev => prev ? { ...prev, savedCoTravelers: [...(prev.savedCoTravelers || []), item] } : null);
      return true;
    }

    try {
      const res = await postJson<{ coTraveler: NonNullable<CustomerUser["savedCoTravelers"]>[number] }>("/api/account/co-travelers", coTraveler);
      setUser(prev => prev ? { ...prev, savedCoTravelers: [...(prev.savedCoTravelers || []), res.coTraveler] } : null);
      return true;
    } catch (e) {
      console.warn("Unable to add this co-traveler", e);
      return false;
    }
  };

  const removeCoTraveler = async (id: string): Promise<boolean> => {
    if (!user || !user.savedCoTravelers) return false;
    const previous = user.savedCoTravelers;
    setUser(prev => prev ? { ...prev, savedCoTravelers: (prev.savedCoTravelers || []).filter(c => c.id !== id) } : null);

    if (isDemoRef.current) return true;

    try {
      await deleteJson(`/api/account/co-travelers/${id}`);
      return true;
    } catch (e) {
      console.warn("Unable to remove this co-traveler", e);
      setUser(prev => prev ? { ...prev, savedCoTravelers: previous } : null);
      return false;
    }
  };

  const redeemTravoCoins = (coinsToUse: number) => {
    if (!user) return { success: false, discountAmount: 0 };
    const currentCoins = user.travoCoins || 0;
    if (coinsToUse <= 0 || coinsToUse > currentCoins) {
      return { success: false, discountAmount: 0 };
    }
    // 1 Travo Coin = ₹1. This is a client-side pre-check only — the server re-validates and
    // clamps the actual redemption against the real balance when the booking is submitted.
    const discountAmount = coinsToUse;
    return { success: true, discountAmount };
  };

  const openAuthModal = (reason = "Please sign in to access your customer account.", onLoginCallback?: () => void) => {
    setAuthModalReason(reason);
    if (onLoginCallback) {
      setPendingCallback(() => onLoginCallback);
    } else {
      setPendingCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const requireAuth = (actionDescription: string, callback: () => void): boolean => {
    if (user) {
      callback();
      return true;
    }
    openAuthModal(actionDescription, callback);
    return false;
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAuthLoading,
        bookings,
        wishlist,
        login,
        signup,
        demoLogin,
        logout,
        requestPasswordReset,
        confirmPasswordReset,
        updateProfile,
        addBooking,
        cancelBooking,
        toggleWishlist,
        isWishlisted,
        addCoTraveler,
        removeCoTraveler,
        redeemTravoCoins,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        requireAuth
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
}

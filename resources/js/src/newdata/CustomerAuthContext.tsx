import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CustomerUser, CustomerBooking } from "../types";

// Pre-seeded sample accounts
const DEMO_USERS: Record<string, CustomerUser> = {
  alex: {
    id: "usr_alex_8842",
    name: "Alex Varma",
    email: "alex.varma@travomail.com",
    phone: "+91 98450 12890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    membershipTier: "Gold Explorer",
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
    membershipTier: "Silver Voyager",
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
  bookings: CustomerBooking[];
  wishlist: string[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (userData: { name: string; email: string; phone: string; referralCode?: string; password?: string }) => { success: boolean; error?: string };
  demoLogin: (preset?: "alex" | "priya") => void;
  logout: () => void;
  updateProfile: (updates: Partial<CustomerUser>) => void;
  addBooking: (booking: Omit<CustomerBooking, "id" | "bookingRef" | "bookedAt">) => CustomerBooking;
  cancelBooking: (bookingId: string, reason?: string) => boolean;
  toggleWishlist: (tripId: string) => boolean;
  isWishlisted: (tripId: string) => boolean;
  addCoTraveler: (coTraveler: { name: string; age: number; gender: string; relation: string }) => void;
  removeCoTraveler: (id: string) => void;
  claimReferralBonus: (referralCode: string) => { success: boolean; message: string; coinsAwarded?: number };
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
  WISHLIST: "travo_customer_wishlist_v3"
};

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  // 1. Initial State from localStorage
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
      return DEMO_USERS.alex;
    } catch {
      return DEMO_USERS.alex;
    }
  });

  const [bookings, setBookings] = useState<CustomerBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState("Please sign in to access your customer account.");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Sync to localStorage
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

  // Auth methods
  const login = (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if matches known demo or create/restore user
    if (cleanEmail.includes("priya")) {
      setUser(DEMO_USERS.priya);
    } else if (cleanEmail.includes("alex") || cleanEmail === "alex.varma@travomail.com") {
      setUser(DEMO_USERS.alex);
    } else {
      // Dynamic customer login
      const randomCode = `TRV${Math.floor(100 + Math.random() * 900)}`;
      const newUser: CustomerUser = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        email: cleanEmail,
        phone: "+91 98000 12345",
        membershipTier: "Silver Voyager",
        travoCoins: 600, // 600 Travo Coins welcome
        walletBalance: 600,
        referralCode: randomCode,
        loyaltyPoints: 600,
        joinedDate: "August 2026"
      };
      setUser(newUser);
    }

    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    return { success: true };
  };

  const signup = (userData: { name: string; email: string; phone: string; referralCode?: string }) => {
    const hasReferral = !!userData.referralCode && userData.referralCode.trim().length > 2;
    const cleanReferralCode = hasReferral ? userData.referralCode!.trim().toUpperCase() : undefined;
    // Referee gets 300 instant bonus coins upon signing up with a referral code (+ 300 base welcome coins = 600 total)
    const initialCoins = hasReferral ? 600 : 300; 

    const myReferralCode = `${userData.name.trim().toUpperCase().slice(0, 4)}${Math.floor(100 + Math.random() * 900)}`;

    const newUser: CustomerUser = {
      id: `usr_${Date.now()}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
      membershipTier: "Silver Voyager",
      travoCoins: initialCoins,
      walletBalance: initialCoins,
      referralCode: myReferralCode,
      referredBy: cleanReferralCode,
      loyaltyPoints: initialCoins,
      joinedDate: "August 2026",
      savedCoTravelers: [],
      referredFriends: []
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    return { success: true };
  };

  const demoLogin = (preset: "alex" | "priya" = "alex") => {
    setUser(DEMO_USERS[preset] || DEMO_USERS.alex);
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<CustomerUser>) => {
    if (!user) return;
    setUser(prev => prev ? { 
      ...prev, 
      ...updates,
      travoCoins: updates.travoCoins !== undefined ? updates.travoCoins : (updates.walletBalance !== undefined ? updates.walletBalance : prev.travoCoins),
      walletBalance: updates.travoCoins !== undefined ? updates.travoCoins : (updates.walletBalance !== undefined ? updates.walletBalance : prev.walletBalance)
    } : null);
  };

  // Travo Coins Reward: 5 coins per ₹100 spent
  const addBooking = (newBookingData: Omit<CustomerBooking, "id" | "bookingRef" | "bookedAt">): CustomerBooking => {
    const refCode = `TRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const earnedCoins = Math.floor((newBookingData.totalPrice / 100) * 5); // 5 Coins per ₹100 spent

    const newBooking: CustomerBooking = {
      ...newBookingData,
      id: `bk_${Date.now()}`,
      bookingRef: refCode,
      earnedCoins: earnedCoins,
      bookedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "confirmed"
    };

    setBookings(prev => [newBooking, ...prev]);

    // Credit Travo Coins to user's account
    if (user) {
      const updatedCoins = (user.travoCoins || 0) + earnedCoins - (newBookingData.coinsRedeemed || 0);
      updateProfile({
        travoCoins: Math.max(0, updatedCoins),
        walletBalance: Math.max(0, updatedCoins),
        loyaltyPoints: (user.loyaltyPoints || 0) + earnedCoins
      });
    }

    return newBooking;
  };

  const cancelBooking = (bookingId: string, reason?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "cancelled",
          specialRequests: `${b.specialRequests || ""} [Cancelled: ${reason || "Customer request"}]`
        };
      }
      return b;
    }));
    return true;
  };

  const toggleWishlist = (tripId: string) => {
    let isAdded = false;
    setWishlist(prev => {
      if (prev.includes(tripId)) {
        isAdded = false;
        return prev.filter(id => id !== tripId);
      } else {
        isAdded = true;
        return [...prev, tripId];
      }
    });
    return isAdded;
  };

  const isWishlisted = (tripId: string) => {
    return wishlist.includes(tripId);
  };

  const addCoTraveler = (coTraveler: { name: string; age: number; gender: string; relation: string }) => {
    if (!user) return;
    const item = { ...coTraveler, id: `co_${Date.now()}` };
    const list = [...(user.savedCoTravelers || []), item];
    updateProfile({ savedCoTravelers: list });
  };

  const removeCoTraveler = (id: string) => {
    if (!user || !user.savedCoTravelers) return;
    const list = user.savedCoTravelers.filter(c => c.id !== id);
    updateProfile({ savedCoTravelers: list });
  };

  // Referral System: 300 Travo Coins for referrer (on friend's first booking) & referee (instantly on signup/claim)
  const claimReferralBonus = (referralCode: string) => {
    if (!user) {
      return { success: false, message: "Please sign in to apply referral codes" };
    }
    const clean = referralCode.trim().toUpperCase();
    if (!clean || clean.length < 3) {
      return { success: false, message: "Please enter a valid referral code" };
    }
    if (clean === user.referralCode) {
      return { success: false, message: "You cannot use your own referral code" };
    }
    if (user.referredBy) {
      return { success: false, message: `You have already redeemed a referral code (${user.referredBy})` };
    }

    const BONUS_COINS = 300;
    const updatedCoins = (user.travoCoins || 0) + BONUS_COINS;
    updateProfile({
      travoCoins: updatedCoins,
      walletBalance: updatedCoins,
      referredBy: clean
    });

    return {
      success: true,
      coinsAwarded: BONUS_COINS,
      message: `🎉 Referral code '${clean}' applied! 300 instant Travo Coins added to your account. Your friend will receive 300 Travo Coins when you make your first booking!`
    };
  };

  const redeemTravoCoins = (coinsToUse: number) => {
    if (!user) return { success: false, discountAmount: 0 };
    const currentCoins = user.travoCoins || 0;
    if (coinsToUse <= 0 || coinsToUse > currentCoins) {
      return { success: false, discountAmount: 0 };
    }
    // 1 Travo Coin = ₹1
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
        bookings,
        wishlist,
        login,
        signup,
        demoLogin,
        logout,
        updateProfile,
        addBooking,
        cancelBooking,
        toggleWishlist,
        isWishlisted,
        addCoTraveler,
        removeCoTraveler,
        claimReferralBonus,
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


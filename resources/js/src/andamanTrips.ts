import type { ShowcaseTrip } from "./catalogueTrips";
import {
  ANDAMAN_PACKAGES,
  applyAndamanPrice,
  type AndamanPackage,
} from "./website/andamanPackages";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const getAndamanStartingFare = (pkg: AndamanPackage) => {
  const standardCategory = pkg.categories.find((category) => category.starRating === 2)
    || pkg.categories[0];
  const twoAdultPrice = standardCategory?.pricing[2];
  const firstPrice = standardCategory
    ? Object.values(standardCategory.pricing)[0]
    : undefined;

  return applyAndamanPrice(twoAdultPrice?.perPersonPrice || firstPrice?.perPersonPrice || 0);
};

export const ANDAMAN_SHOWCASE_TRIPS: ShowcaseTrip[] = ANDAMAN_PACKAGES.map((pkg) => ({
  id: pkg.id,
  hasFullItinerary: true,
  name: pkg.title,
  subtitle: pkg.subtitle,
  category: "islands",
  price: formatCurrency(getAndamanStartingFare(pkg)),
  duration: pkg.duration,
  difficulty: "Easy",
  rating: 0,
  reviewsCount: 0,
  image: pkg.heroImage,
  badge: pkg.badge,
  startPoint: "Port Blair Airport",
  upcomingDeparture: "Custom dates available",
  shortDesc: pkg.shortDescription,
  itinerarySummary: pkg.itinerary.map(
    (day) => `Day ${day.day}: ${day.title}`,
  ),
  inclusions: pkg.inclusions,
}));

export const findAndamanPackage = (packageId: string) =>
  ANDAMAN_PACKAGES.find((pkg) => pkg.id === packageId);

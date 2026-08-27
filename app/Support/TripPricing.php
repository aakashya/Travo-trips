<?php

namespace App\Support;

/**
 * Mirrors resources/js/src/pricing.ts exactly — the internal markup applied on top of the
 * raw operator cost figures in config/trips.php. Manali, Valley of Flowers, and Udaipur are
 * excluded; their listed price is the real price. Keep both copies in sync if the rule changes.
 */
class TripPricing
{
    private const NO_MARKUP_TRIP_IDS = ['manali', 'valley-of-flowers', 'udaipur-lakes'];

    private const MARKUP_MULTIPLIER = 1.5;

    public static function applyMarkup(int $basePrice, string $tripId): int
    {
        if (in_array($tripId, self::NO_MARKUP_TRIP_IDS, true)) {
            return $basePrice;
        }

        return (int) round($basePrice * self::MARKUP_MULTIPLIER);
    }
}

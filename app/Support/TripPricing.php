<?php

namespace App\Support;

/**
 * Mirrors resources/js/src/pricing.ts exactly — the internal markup applied on top of the
 * raw operator cost figures in config/trips.php. The ids listed below are excluded; their
 * listed price is already the real advertised price. Keep both copies in sync if this changes.
 */
class TripPricing
{
    private const NO_MARKUP_TRIP_IDS = [
        'manali',
        'valley-of-flowers',
        'udaipur-lakes',
        'chopta-tungnath-3d2n',
        'manali-sissu-kasol-4d3n',
    ];

    private const MARKUP_MULTIPLIER = 1.5;

    public static function applyMarkup(int $basePrice, string $tripId): int
    {
        if (in_array($tripId, self::NO_MARKUP_TRIP_IDS, true)) {
            return $basePrice;
        }

        return (int) round($basePrice * self::MARKUP_MULTIPLIER);
    }
}

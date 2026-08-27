<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingInquiryRequest;
use App\Models\BookingInquiry;
use App\Models\CoinTransaction;
use App\Models\UserProfile;
use App\Support\TripPricing;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingInquiryController extends Controller
{
    /** Coins earned per ₹100 spent — mirrors CustomerAuthContext.tsx's addBooking(). */
    private const COINS_PER_100 = 5;

    /** Days after payment before earned coins mature — mirrors COINS_MATURITY_DAYS. */
    private const COINS_MATURITY_DAYS = 30;

    public function store(StoreBookingInquiryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $trip = config("trips.{$validated['trip_id']}");
        $seats = (int) $validated['seats'];
        $farePerSeat = TripPricing::applyMarkup((int) $trip['price'], $validated['trip_id']);
        $subtotal = $farePerSeat * $seats;
        $user = $request->user();
        $requestedRedemption = (int) ($validated['coins_redeemed'] ?? 0);

        [$inquiry, $newBalance] = DB::transaction(function () use ($validated, $trip, $seats, $farePerSeat, $subtotal, $user, $request, $requestedRedemption) {
            $isAccountBooking = $user !== null;
            $profile = $isAccountBooking ? UserProfile::where('user_id', $user->id)->lockForUpdate()->first() : null;

            // Redeemed coins are already-available balance being spent now — clamp to what the
            // account actually holds server-side (never trust the client's claimed amount).
            $redeemed = $profile ? min($requestedRedemption, $profile->travo_coins_balance, $subtotal) : 0;
            $totalAmount = $subtotal - $redeemed;

            $earnedCoins = $isAccountBooking ? (int) floor(($totalAmount / 100) * self::COINS_PER_100) : null;
            $coinsCreditOn = $isAccountBooking ? now()->addDays(self::COINS_MATURITY_DAYS)->toDateString() : null;

            $inquiry = BookingInquiry::create([
                'user_id' => $user?->id,
                // Denormalized from the profile already loaded above — lets a booking be found
                // directly by the customer's account code, without joining through users.
                'customer_code' => $profile?->customer_code,
                'reference_code' => $this->uniqueReference($validated['trip_id']),
                'trip_id' => $validated['trip_id'],
                'trip_name' => $trip['name'],
                'full_name' => trim($validated['full_name']),
                'phone' => trim($validated['phone']),
                'email' => strtolower(trim($validated['email'])),
                'seats' => $seats,
                'fare_per_seat' => $farePerSeat,
                'subtotal' => $subtotal,
                'discount_amount' => $redeemed,
                'total_amount' => $totalAmount,
                'promo_code' => null,
                'special_requests' => $validated['special_requests'] ?? null,
                // Matches the existing frontend simplification: an authenticated submission is
                // treated as confirmed immediately (there's no separate payment-gateway step
                // yet); anonymous inquiries stay pending, same as before this change.
                'status' => $isAccountBooking ? 'confirmed' : 'pending',
                'ip_address' => $request->ip(),
                'user_agent' => Str::limit((string) $request->userAgent(), 1000, ''),
                'departure_date' => $validated['departure_date'] ?? null,
                'return_date' => $validated['return_date'] ?? null,
                'duration' => $validated['duration'] ?? null,
                'hotel_tier' => $validated['hotel_tier'] ?? null,
                'co_travelers' => $validated['co_travelers'] ?? null,
                'earned_coins' => $earnedCoins,
                'coins_credit_on' => $coinsCreditOn,
                'coins_credited' => false,
                'payment_method' => $validated['payment_method'] ?? null,
                'payment_ref' => null,
                'captain_name' => null,
                'captain_phone' => null,
            ]);

            if ($isAccountBooking && $earnedCoins > 0) {
                CoinTransaction::create([
                    'user_id' => $user->id,
                    'type' => 'earn',
                    'amount' => $earnedCoins,
                    'booking_id' => $inquiry->id,
                    'credit_on' => $coinsCreditOn,
                    'credited_at' => null,
                ]);
            }

            if ($redeemed > 0) {
                CoinTransaction::create([
                    'user_id' => $user->id,
                    'type' => 'redeem',
                    'amount' => -$redeemed,
                    'booking_id' => $inquiry->id,
                    'credit_on' => null,
                    'credited_at' => now(),
                ]);
                $profile->decrement('travo_coins_balance', $redeemed);
            }

            return [$inquiry, $profile?->fresh()->travo_coins_balance];
        });

        return response()->json([
            'message' => 'Booking inquiry submitted successfully.',
            'reference_code' => $inquiry->reference_code,
            'subtotal' => $inquiry->subtotal,
            'discount_amount' => $inquiry->discount_amount,
            'total_amount' => $inquiry->total_amount,
            'booking' => $user ? $this->presentBooking($inquiry) : null,
            'travoCoins' => $newBalance,
        ], 201);
    }

    public static function presentBooking(BookingInquiry $inquiry): array
    {
        return [
            'id' => (string) $inquiry->id,
            'bookingRef' => $inquiry->reference_code,
            'tripId' => $inquiry->trip_id,
            'tripName' => $inquiry->trip_name,
            'departureDate' => $inquiry->departure_date,
            'returnDate' => $inquiry->return_date,
            'duration' => $inquiry->duration,
            'paxCount' => $inquiry->seats,
            'leadPassenger' => [
                'name' => $inquiry->full_name,
                'phone' => $inquiry->phone,
                'email' => $inquiry->email,
            ],
            'coTravelers' => $inquiry->co_travelers ?? [],
            'totalPrice' => $inquiry->total_amount,
            'paidAmount' => 0,
            'dueAmount' => $inquiry->total_amount,
            'earnedCoins' => $inquiry->earned_coins,
            'coinsCreditOn' => $inquiry->coins_credit_on?->toIso8601String(),
            'coinsCredited' => $inquiry->coins_credited,
            'hotelTier' => $inquiry->hotel_tier,
            'status' => $inquiry->status,
            'paymentMethod' => $inquiry->payment_method,
            'paymentRef' => $inquiry->payment_ref,
            'bookedAt' => $inquiry->created_at->format('d M Y'),
            'specialRequests' => $inquiry->special_requests,
            'captainName' => $inquiry->captain_name,
            'captainPhone' => $inquiry->captain_phone,
        ];
    }

    private function uniqueReference(string $tripId): string
    {
        $prefix = match (true) {
            $tripId === 'manali' => 'MNL',
            $tripId === 'valley-of-flowers' => 'VOF',
            $tripId === 'udaipur-lakes' => 'UDR',
            str_starts_with($tripId, 'andaman-') => 'AND',
            str_starts_with($tripId, 'goa-') => 'GOA',
            str_starts_with($tripId, 'nepal-') => 'NEP',
            str_starts_with($tripId, 'kerala-') => 'KER',
            str_starts_with($tripId, 'bhutan-') => 'BHU',
            str_starts_with($tripId, 'sikkim-') => 'SIK',
            str_starts_with($tripId, 'kashmir-') => 'KAS',
            str_starts_with($tripId, 'leh-ladakh-') => 'LEH',
            default => 'TRV',
        };

        do {
            $reference = 'TRV-'.$prefix.'-'.Str::upper(Str::random(8));
        } while (BookingInquiry::where('reference_code', $reference)->exists());

        return $reference;
    }
}

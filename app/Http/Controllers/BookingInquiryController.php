<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingInquiryRequest;
use App\Models\BookingInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class BookingInquiryController extends Controller
{
    public function store(StoreBookingInquiryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $trip = config("trips.{$validated['trip_id']}");
        $seats = (int) $validated['seats'];
        $subtotal = $trip['price'] * $seats;
        $promoCode = $validated['promo_code'] ?? null;
        $discountAmount = match ($promoCode) {
            'TRAVO1000' => 1000 * $seats,
            'MOUNTAINLOVE' => (int) round($subtotal * 0.10),
            default => 0,
        };

        $inquiry = BookingInquiry::create([
            'reference_code' => $this->uniqueReference($validated['trip_id']),
            'trip_id' => $validated['trip_id'],
            'trip_name' => $trip['name'],
            'full_name' => trim($validated['full_name']),
            'phone' => trim($validated['phone']),
            'email' => strtolower(trim($validated['email'])),
            'seats' => $seats,
            'fare_per_seat' => $trip['price'],
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total_amount' => max(1, $subtotal - $discountAmount),
            'promo_code' => $promoCode,
            'special_requests' => $validated['special_requests'] ?? null,
            'status' => 'pending',
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 1000, ''),
        ]);

        return response()->json([
            'message' => 'Booking inquiry submitted successfully.',
            'reference_code' => $inquiry->reference_code,
            'subtotal' => $inquiry->subtotal,
            'discount_amount' => $inquiry->discount_amount,
            'total_amount' => $inquiry->total_amount,
        ], 201);
    }

    private function uniqueReference(string $tripId): string
    {
        $prefix = match ($tripId) {
            'manali' => 'MNL',
            'valley-of-flowers' => 'VOF',
            'udaipur-lakes' => 'UDR',
        };

        do {
            $reference = 'TRV-'.$prefix.'-'.Str::upper(Str::random(8));
        } while (BookingInquiry::where('reference_code', $reference)->exists());

        return $reference;
    }
}

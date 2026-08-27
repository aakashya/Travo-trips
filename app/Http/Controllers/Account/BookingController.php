<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\BookingInquiryController;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $bookings = $request->user()->bookings()->orderByDesc('created_at')->get();

        return response()->json([
            'bookings' => $bookings->map(fn ($b) => BookingInquiryController::presentBooking($b))->values(),
        ]);
    }

    public function cancel(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $booking = $request->user()->bookings()->findOrFail($id);
        $booking->status = 'cancellation_requested';
        $booking->special_requests = trim(($booking->special_requests ?? '')
            ." [Cancellation Requested: ".($validated['reason'] ?? 'Customer request')."]");
        $booking->save();

        return response()->json(['booking' => BookingInquiryController::presentBooking($booking->fresh())]);
    }
}

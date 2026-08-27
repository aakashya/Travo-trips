<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'trip_id' => ['required', 'string', Rule::in(array_keys(config('trips')))],
            'full_name' => ['required', 'string', 'min:2', 'max:120'],
            'phone' => ['required', 'string', 'regex:/^[0-9+()\-\s]{8,30}$/'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'seats' => ['required', 'integer', 'min:1', 'max:20'],
            'special_requests' => ['nullable', 'string', 'max:2000'],

            // Optional trip-selection detail — only meaningful (and only stored) when the
            // requester is signed in, so their "My Bookings" dashboard has something to show.
            'departure_date' => ['nullable', 'string', 'max:60'],
            'return_date' => ['nullable', 'string', 'max:60'],
            'duration' => ['nullable', 'string', 'max:60'],
            'hotel_tier' => ['nullable', 'string', 'max:255'],
            'co_travelers' => ['nullable', 'array', 'max:20'],
            'co_travelers.*' => ['string', 'max:120'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'coins_redeemed' => ['nullable', 'integer', 'min:0'],
        ];
    }
}

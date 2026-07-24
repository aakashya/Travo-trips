<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingInquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_inquiry_is_validated_priced_and_saved(): void
    {
        $response = $this->postJson('/forms/booking-inquiries', [
            'trip_id' => 'udaipur-lakes',
            'full_name' => 'Test Traveler',
            'phone' => '+91 9876543210',
            'email' => 'Traveler@example.com',
            'seats' => 2,
            'promo_code' => 'mountainlove',
            'special_requests' => 'Vegetarian meals',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('subtotal', 20998)
            ->assertJsonPath('discount_amount', 2100)
            ->assertJsonPath('total_amount', 18898);

        $this->assertStringStartsWith('TRV-UDR-', $response->json('reference_code'));
        $this->assertDatabaseHas('booking_inquiries', [
            'trip_id' => 'udaipur-lakes',
            'trip_name' => 'Udaipur Lakes & Palaces',
            'email' => 'traveler@example.com',
            'seats' => 2,
            'fare_per_seat' => 10499,
            'promo_code' => 'MOUNTAINLOVE',
            'status' => 'pending',
        ]);
    }

    public function test_booking_inquiry_rejects_unknown_trips_and_invalid_seat_counts(): void
    {
        $this->postJson('/forms/booking-inquiries', [
            'trip_id' => 'unknown-trip',
            'full_name' => 'Test Traveler',
            'phone' => '+91 9876543210',
            'email' => 'traveler@example.com',
            'seats' => 20,
        ])->assertUnprocessable()->assertJsonValidationErrors(['trip_id', 'seats']);

        $this->assertDatabaseCount('booking_inquiries', 0);
    }
}

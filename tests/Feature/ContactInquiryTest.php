<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactInquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_inquiry_is_validated_and_saved(): void
    {
        $response = $this->postJson('/forms/contact-inquiries', [
            'name' => 'Test Traveler',
            'email' => 'Traveler@example.com',
            'phone' => '+91 9876543210',
            'trip_interest' => 'manali',
            'message' => 'Please share the full itinerary.',
        ]);

        $response->assertCreated();
        $this->assertStringStartsWith('INQ-', $response->json('reference_code'));
        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Test Traveler',
            'email' => 'traveler@example.com',
            'trip_interest' => 'manali',
            'status' => 'new',
        ]);
    }

    public function test_contact_inquiry_rejects_invalid_data(): void
    {
        $this->postJson('/forms/contact-inquiries', [
            'name' => 'T',
            'email' => 'not-an-email',
            'phone' => '123',
            'trip_interest' => 'ladakh',
            'message' => 'No',
        ])->assertUnprocessable()->assertJsonValidationErrors([
            'name',
            'email',
            'phone',
            'trip_interest',
            'message',
        ]);

        $this->assertDatabaseCount('contact_inquiries', 0);
    }
}

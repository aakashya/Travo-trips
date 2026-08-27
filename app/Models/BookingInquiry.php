<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingInquiry extends Model
{
    protected $fillable = [
        'user_id',
        'customer_code',
        'reference_code',
        'trip_id',
        'trip_name',
        'full_name',
        'phone',
        'email',
        'seats',
        'fare_per_seat',
        'subtotal',
        'discount_amount',
        'total_amount',
        'promo_code',
        'special_requests',
        'status',
        'ip_address',
        'user_agent',
        'departure_date',
        'return_date',
        'duration',
        'hotel_tier',
        'co_travelers',
        'earned_coins',
        'coins_credit_on',
        'coins_credited',
        'payment_method',
        'payment_ref',
        'captain_name',
        'captain_phone',
    ];

    protected function casts(): array
    {
        return [
            'seats' => 'integer',
            'fare_per_seat' => 'integer',
            'subtotal' => 'integer',
            'discount_amount' => 'integer',
            'total_amount' => 'integer',
            'co_travelers' => 'array',
            'earned_coins' => 'integer',
            'coins_credit_on' => 'date',
            'coins_credited' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingInquiry extends Model
{
    protected $fillable = [
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
    ];

    protected function casts(): array
    {
        return [
            'seats' => 'integer',
            'fare_per_seat' => 'integer',
            'subtotal' => 'integer',
            'discount_amount' => 'integer',
            'total_amount' => 'integer',
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoinTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'booking_id',
        'credit_on',
        'credited_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'credit_on' => 'date',
            'credited_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(BookingInquiry::class, 'booking_id');
    }
}

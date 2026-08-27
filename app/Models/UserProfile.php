<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'customer_code',
        'dietary_preference',
        'city',
        'passport_number',
        'passport_expiry',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
        'referral_code',
        'referred_by_code',
        'travo_coins_balance',
    ];

    protected function casts(): array
    {
        return [
            'passport_expiry' => 'date',
            'travo_coins_balance' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

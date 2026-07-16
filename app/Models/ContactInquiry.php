<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInquiry extends Model
{
    protected $fillable = [
        'reference_code',
        'name',
        'email',
        'phone',
        'trip_interest',
        'message',
        'status',
        'ip_address',
        'user_agent',
    ];
}

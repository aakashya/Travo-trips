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
            'seats' => ['required', 'integer', 'min:1', 'max:10'],
            'special_requests' => ['nullable', 'string', 'max:2000'],
        ];
    }
}

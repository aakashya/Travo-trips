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

    protected function prepareForValidation(): void
    {
        $this->merge([
            'promo_code' => $this->filled('promo_code')
                ? strtoupper(trim((string) $this->input('promo_code')))
                : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'trip_id' => ['required', 'string', Rule::in(array_keys(config('trips')))],
            'full_name' => ['required', 'string', 'min:2', 'max:120'],
            'phone' => ['required', 'string', 'regex:/^[0-9+()\-\s]{8,30}$/'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'seats' => ['required', 'integer', 'min:1', 'max:10'],
            'promo_code' => ['nullable', 'string', Rule::in(['TRAVO1000', 'MOUNTAINLOVE'])],
            'special_requests' => ['nullable', 'string', 'max:2000'],
        ];
    }
}

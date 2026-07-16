<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^[0-9+()\-\s]{8,30}$/'],
            'trip_interest' => [
                'required',
                'string',
                Rule::in(['general', 'manali', 'valley-of-flowers', 'udaipur-lakes', 'corporate']),
            ],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
        ];
    }
}

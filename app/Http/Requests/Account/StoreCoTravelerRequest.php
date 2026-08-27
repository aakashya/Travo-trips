<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class StoreCoTravelerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'age' => ['required', 'integer', 'min:0', 'max:120'],
            'gender' => ['required', 'string', 'max:20'],
            'relation' => ['required', 'string', 'max:40'],
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): JsonResponse
    {
        $validated = $request->validated();

        do {
            $reference = 'INQ-'.Str::upper(Str::random(10));
        } while (ContactInquiry::where('reference_code', $reference)->exists());

        $inquiry = ContactInquiry::create([
            'reference_code' => $reference,
            'name' => trim($validated['name']),
            'email' => strtolower(trim($validated['email'])),
            'phone' => trim($validated['phone']),
            'trip_interest' => $validated['trip_interest'],
            'message' => trim($validated['message']),
            'status' => 'new',
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 1000, ''),
        ]);

        return response()->json([
            'message' => 'Contact inquiry submitted successfully.',
            'reference_code' => $inquiry->reference_code,
        ], 201);
    }
}

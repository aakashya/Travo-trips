<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\UpdateProfileRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user, 401);

        return response()->json(['user' => $this->present($user)]);
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        if (isset($validated['name']) || isset($validated['phone'])) {
            $user->fill(array_intersect_key($validated, array_flip(['name', 'phone'])));
            $user->save();
        }

        $profile = $user->profile;
        $profileFields = array_intersect_key($validated, array_flip([
            'dietary_preference', 'city', 'passport_number', 'passport_expiry',
            'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation',
        ]));
        if (! empty($profileFields)) {
            $profile->fill($profileFields);
            $profile->save();
        }

        return response()->json(['user' => $this->present($user->fresh())]);
    }

    public static function present(User $user): array
    {
        $profile = $user->profile ?? self::ensureProfile($user);
        $coTravelers = $user->coTravelers()->orderBy('created_at')->get();

        return [
            'id' => (string) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'travoCoins' => $profile->travo_coins_balance,
            'walletBalance' => $profile->travo_coins_balance,
            'loyaltyPoints' => $profile->travo_coins_balance,
            'customerCode' => $profile->customer_code,
            'referralCode' => $profile->referral_code,
            'referredBy' => $profile->referred_by_code,
            'referredFriends' => [],
            'joinedDate' => $profile->created_at->format('F Y'),
            'dietaryPreference' => $profile->dietary_preference,
            'city' => $profile->city,
            'passportNumber' => $profile->passport_number,
            'passportExpiry' => $profile->passport_expiry?->toDateString(),
            'emergencyContact' => $profile->emergency_contact_name ? [
                'name' => $profile->emergency_contact_name,
                'phone' => $profile->emergency_contact_phone,
                'relation' => $profile->emergency_contact_relation,
            ] : null,
            'savedCoTravelers' => $coTravelers->map(fn ($c) => [
                'id' => (string) $c->id,
                'name' => $c->name,
                'age' => $c->age,
                'gender' => $c->gender,
                'relation' => $c->relation,
            ])->values(),
        ];
    }

    /**
     * A user_profiles row should always exist from registration onward (see
     * AuthController::register), but this is a safety net for any account that predates it.
     */
    public static function ensureProfile(User $user): UserProfile
    {
        return $user->profile ?: $user->profile()->create([
            'customer_code' => self::generateCustomerCode(),
            'referral_code' => self::generateReferralCode(),
            'travo_coins_balance' => 0,
        ]);
    }

    public static function generateReferralCode(): string
    {
        do {
            $code = 'TRV'.random_int(100, 999);
        } while (UserProfile::where('referral_code', $code)->exists());

        return $code;
    }

    /**
     * A stable, human-shareable account reference — e.g. for a customer to quote over WhatsApp
     * so support can look up their account/bookings directly, without exposing internal ids.
     */
    public static function generateCustomerCode(): string
    {
        do {
            $code = 'TRAVO-'.str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        } while (UserProfile::where('customer_code', $code)->exists());

        return $code;
    }
}

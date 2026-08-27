<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginCustomerRequest;
use App\Http\Requests\Auth\RegisterCustomerRequest;
use App\Models\CoinTransaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterCustomerRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $referredByCode = isset($validated['referral_code']) && strlen(trim($validated['referral_code'])) > 2
            ? strtoupper(trim($validated['referral_code']))
            : null;
        // Referee gets 300 instant bonus coins for signing up with a referral code
        // (+300 base welcome coins = 600 total) — mirrors CustomerAuthContext.tsx's signup().
        $welcomeCoins = $referredByCode ? 600 : 300;

        $user = DB::transaction(function () use ($validated, $referredByCode, $welcomeCoins) {
            $user = User::create([
                'name' => trim($validated['name']),
                'email' => strtolower(trim($validated['email'])),
                'phone' => trim($validated['phone']),
                'password' => Hash::make($validated['password']),
            ]);

            $profile = $user->profile()->create([
                'customer_code' => ProfileController::generateCustomerCode(),
                'referral_code' => ProfileController::generateReferralCode(),
                'referred_by_code' => $referredByCode,
                'travo_coins_balance' => $welcomeCoins,
            ]);

            CoinTransaction::create([
                'user_id' => $user->id,
                'type' => $referredByCode ? 'referral_signup' : 'welcome',
                'amount' => $welcomeCoins,
                'credit_on' => null,
                'credited_at' => now(),
            ]);

            return $user;
        });

        Auth::login($user);
        $request->session()->regenerate();
        // Force the session row to be written now rather than waiting for the kernel's
        // terminate() phase, which runs after the response (and its Set-Cookie header) has
        // already reached the browser — without this, a client that fires its next request
        // fast enough can arrive before the new session actually exists in the sessions
        // table, and get treated as logged out.
        $request->session()->save();

        return response()->json([
            'user' => $this->presentUser($user),
            // session()->regenerate() above just rotated the CSRF token — the SPA never
            // reloads the page, so it needs the new value handed back directly to keep using.
            'csrf_token' => csrf_token(),
        ], 201);
    }

    public function login(LoginCustomerRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! Auth::attempt(['email' => strtolower(trim($credentials['email'])), 'password' => $credentials['password']], true)) {
            return response()->json([
                'message' => 'These credentials do not match our records.',
            ], 422);
        }

        $request->session()->regenerate();
        $request->session()->save();

        return response()->json([
            'user' => $this->presentUser(Auth::user()),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out.',
            'csrf_token' => csrf_token(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => $user ? $this->presentUser($user) : null,
        ]);
    }

    private function presentUser(User $user): array
    {
        return [
            'id' => (string) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
        ];
    }
}

<?php

use App\Http\Controllers\Account\BookingController as AccountBookingController;
use App\Http\Controllers\Account\CoTravelerController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Account\WishlistController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\BookingInquiryController;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

// Lets the SPA silently recover from a stale CSRF token (session expiry, another tab logging
// in/out) without the visitor ever seeing a "CSRF token mismatch" error — see api.ts's
// requestWithCsrfRetry, which calls this and retries once whenever a request comes back 419.
// Read-only: doesn't touch the session, just reads the current token off it.
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::post('/forms/booking-inquiries', [BookingInquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('booking-inquiries.store');

Route::post('/forms/contact-inquiries', [ContactInquiryController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact-inquiries.store');

Route::prefix('/auth')->name('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1')->name('register');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1')->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/me', [AuthController::class, 'me'])->name('me');
    Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])->middleware('throttle:5,1')->name('forgot-password');
    Route::post('/reset-password', [PasswordResetController::class, 'reset'])->middleware('throttle:5,1')->name('reset-password');
});

// Signed-in customer account data — replaces the localStorage-only wishlist/profile/bookings
// with real, server-backed records that follow the account across browsers and devices.
// Namespaced under /api because the SPA's own client-side router already owns bare
// /account/* as page URLs (see FIXED_VIEW_PATHS in App.tsx) — a bare /account/* route here
// would hijack direct loads/refreshes of those dashboard pages with a raw JSON response
// instead of the SPA shell.
Route::prefix('/api/account')->name('api.account.')->middleware('auth:web')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{tripId}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::post('/co-travelers', [CoTravelerController::class, 'store'])->name('co-travelers.store');
    Route::delete('/co-travelers/{id}', [CoTravelerController::class, 'destroy'])->name('co-travelers.destroy');

    Route::get('/bookings', [AccountBookingController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{id}/cancel', [AccountBookingController::class, 'cancel'])->name('bookings.cancel');
});

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/', function () {
    return view('welcome');
});

// SPA shell fallback — every path renders the same view (App.tsx's own client-side router takes
// it from there), but a path this app doesn't actually recognize gets a real HTTP 404 rather than
// silently answering 200 with the homepage. Kept in sync by hand with FIXED_VIEW_PATHS in App.tsx
// and TRIPS_DATA's ids (proxied here via config('trips'), the same canonical list
// BookingInquiryController prices bookings against) — App.tsx makes the identical known/unknown
// call client-side so the visible page always agrees with the status code sent for it.
Route::get('/{path}', function (string $path = '') {
    $normalized = '/' . trim($path, '/');

    $knownPaths = [
        '/', '/trips', '/team', '/about-us', '/contact-us', '/book-now', '/reset-password',
        '/account', '/account/bookings', '/account/wishlist', '/account/wallet',
        '/account/profile', '/account/support',
    ];

    if (in_array($normalized, $knownPaths, true)) {
        return view('welcome');
    }

    if (str_starts_with($normalized, '/trips/')) {
        $tripId = substr($normalized, strlen('/trips/'));
        $trip = config('trips')[$tripId] ?? null;
        if ($trip) {
            return view('welcome', ['tripName' => $trip['name']]);
        }
    }

    return response()->view('welcome', [], 404);
})->where('path', '.*');

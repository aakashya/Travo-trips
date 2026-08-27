<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreWishlistRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tripIds = $request->user()->wishlists()->pluck('trip_id');

        return response()->json(['wishlist' => $tripIds]);
    }

    public function store(StoreWishlistRequest $request): JsonResponse
    {
        $request->user()->wishlists()->firstOrCreate([
            'trip_id' => $request->validated('trip_id'),
        ]);

        return response()->json([
            'wishlist' => $request->user()->wishlists()->pluck('trip_id'),
        ], 201);
    }

    public function destroy(Request $request, string $tripId): JsonResponse
    {
        $request->user()->wishlists()->where('trip_id', $tripId)->delete();

        return response()->json([
            'wishlist' => $request->user()->wishlists()->pluck('trip_id'),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreCoTravelerRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoTravelerController extends Controller
{
    public function store(StoreCoTravelerRequest $request): JsonResponse
    {
        $coTraveler = $request->user()->coTravelers()->create($request->validated());

        return response()->json(['coTraveler' => $this->present($coTraveler)], 201);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $request->user()->coTravelers()->where('id', $id)->delete();

        return response()->json(['message' => 'Removed.']);
    }

    private function present($coTraveler): array
    {
        return [
            'id' => (string) $coTraveler->id,
            'name' => $coTraveler->name,
            'age' => $coTraveler->age,
            'gender' => $coTraveler->gender,
            'relation' => $coTraveler->relation,
        ];
    }
}

<?php

namespace App\Console\Commands;

use App\Models\BookingInquiry;
use App\Models\CoinTransaction;
use App\Models\UserProfile;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Runs daily (see bootstrap/app.php) and credits any coin_transactions whose maturity date
 * has passed — the real, always-on version of the 30-day coin delay. Previously this only
 * happened client-side, in a browser, whenever a customer happened to reopen the site.
 */
class CreditMaturedCoins extends Command
{
    protected $signature = 'coins:credit-matured';

    protected $description = 'Credit pending Travo Coin transactions whose maturity date has passed.';

    public function handle(): int
    {
        $matured = CoinTransaction::whereNull('credited_at')
            ->whereNotNull('credit_on')
            ->where('credit_on', '<=', now()->toDateString())
            ->get()
            ->groupBy('user_id');

        if ($matured->isEmpty()) {
            $this->info('No matured coin transactions to credit.');

            return self::SUCCESS;
        }

        DB::transaction(function () use ($matured) {
            foreach ($matured as $userId => $transactions) {
                $total = $transactions->sum('amount');

                CoinTransaction::whereIn('id', $transactions->pluck('id'))
                    ->update(['credited_at' => now()]);

                UserProfile::where('user_id', $userId)
                    ->increment('travo_coins_balance', $total);

                BookingInquiry::whereIn('id', $transactions->pluck('booking_id')->filter())
                    ->update(['coins_credited' => true]);
            }
        });

        $this->info("Credited matured coins for {$matured->count()} customer(s).");

        return self::SUCCESS;
    }
}

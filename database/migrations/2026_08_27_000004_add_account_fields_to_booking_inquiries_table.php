<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('booking_inquiries', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('departure_date', 60)->nullable();
            $table->string('return_date', 60)->nullable();
            $table->string('duration', 60)->nullable();
            $table->string('hotel_tier')->nullable();
            $table->json('co_travelers')->nullable();
            $table->unsignedInteger('earned_coins')->nullable();
            $table->date('coins_credit_on')->nullable();
            $table->boolean('coins_credited')->default(false);
            $table->string('payment_method')->nullable();
            $table->string('payment_ref')->nullable();
            $table->string('captain_name')->nullable();
            $table->string('captain_phone', 30)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('booking_inquiries', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn([
                'departure_date',
                'return_date',
                'duration',
                'hotel_tier',
                'co_travelers',
                'earned_coins',
                'coins_credit_on',
                'coins_credited',
                'payment_method',
                'payment_ref',
                'captain_name',
                'captain_phone',
            ]);
        });
    }
};

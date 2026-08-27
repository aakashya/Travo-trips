<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coin_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 32); // welcome | referral_signup | earn | redeem
            $table->integer('amount'); // signed — positive for credits, negative for redemptions
            $table->foreignId('booking_id')->nullable()->constrained('booking_inquiries')->nullOnDelete();
            $table->date('credit_on')->nullable(); // maturity date; null = immediate
            $table->timestamp('credited_at')->nullable()->index(); // null = still pending
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coin_transactions');
    }
};

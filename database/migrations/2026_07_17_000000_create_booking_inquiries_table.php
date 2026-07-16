<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code', 32)->unique();
            $table->string('trip_id', 64)->index();
            $table->string('trip_name', 160);
            $table->string('full_name', 120);
            $table->string('phone', 30);
            $table->string('email');
            $table->unsignedTinyInteger('seats');
            $table->unsignedInteger('fare_per_seat');
            $table->unsignedInteger('subtotal');
            $table->unsignedInteger('discount_amount')->default(0);
            $table->unsignedInteger('total_amount');
            $table->string('promo_code', 50)->nullable();
            $table->text('special_requests')->nullable();
            $table->string('status', 32)->default('pending')->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['email', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_inquiries');
    }
};

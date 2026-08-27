<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('customer_code')->nullable()->unique()->after('referral_code');
        });

        // Denormalized copy for direct lookup ("find this customer's bookings by their
        // TRAVO-XXXXXX code") without joining through users/user_profiles — null for guest
        // bookings, same as this table's existing user_id handling.
        Schema::table('booking_inquiries', function (Blueprint $table) {
            $table->string('customer_code')->nullable()->index()->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('booking_inquiries', function (Blueprint $table) {
            $table->dropColumn('customer_code');
        });

        Schema::table('user_profiles', function (Blueprint $table) {
            $table->dropColumn('customer_code');
        });
    }
};

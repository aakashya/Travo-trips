<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code', 32)->unique();
            $table->string('name', 120);
            $table->string('email');
            $table->string('phone', 30);
            $table->string('trip_interest', 64)->default('general')->index();
            $table->text('message');
            $table->string('status', 32)->default('new')->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['email', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('co_travelers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 120);
            $table->unsignedTinyInteger('age');
            $table->string('gender', 20);
            $table->string('relation', 40);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('co_travelers');
    }
};

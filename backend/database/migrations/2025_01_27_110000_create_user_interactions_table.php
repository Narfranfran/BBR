<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Favorites: Many-to-Many (Users <-> Bars)
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('bar_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            // Prevent duplicate favorites from same user
            $table->unique(['user_id', 'bar_id']);
        });

        // Reviews: One-to-Many (User -> Reviews -> Bar)
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('bar_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned()->comment('1-5 Stars');
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('favorites');
    }
};

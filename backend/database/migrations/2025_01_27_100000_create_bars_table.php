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
        Schema::create('bars', function (Blueprint $table) {
            $table->id();
            $table->string('registry_number')->unique()->comment('Identificador único del dataset JCyL');
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('municipality')->nullable();
            $table->string('province')->nullable();
            $table->string('type')->nullable();

            // Coordinates for easy frontend access
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Spatial column for Database-level 'Nearest Neighbor' queries
            // MariaDB requires SRID 4326 for GPS coordinates
            $table->geometry('location', subtype: 'point', srid: 4326);

            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('web')->nullable();
            $table->text('description')->nullable();

            $table->integer('seats')->nullable()->comment('Plazas');
            $table->timestamp('api_updated_at')->nullable();

            $table->timestamps();

            // Spatial Index for performance
            $table->spatialIndex('location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bars');
    }
};

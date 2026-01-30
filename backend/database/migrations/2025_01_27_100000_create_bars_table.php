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
            $table->string('fuente_id')->unique()->comment('Identificador único del dataset JCyL (N.Registro)');
            $table->string('nombre');
            $table->string('tipo')->nullable();
            $table->string('provincia')->nullable();
            $table->string('municipio')->nullable();
            $table->string('direccion')->nullable();

            // Coordinates
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lon', 11, 8)->nullable();

            $table->integer('plazas')->nullable();

            // Strange characters handling (keep as location or maybe hidden)
            $table->geometry('location', subtype: 'point', srid: 4326);

            $table->timestamp('updated_api_at')->nullable();
            $table->timestamps();

            // Spatial Index
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

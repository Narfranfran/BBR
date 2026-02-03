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
        Schema::table('bars', function (Blueprint $table) {
            $table->string('telefono')->nullable()->after('plazas');
            $table->string('web')->nullable()->after('telefono');
            $table->string('accesible')->nullable()->after('web'); // "Si"/"No" or boolean
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bars', function (Blueprint $table) {
            $table->dropColumn(['telefono', 'web', 'accesible']);
        });
    }
};

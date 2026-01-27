<?php
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status'    => 'ok',
        'app'       => 'BBr - BuscaBares',
        'timestamp' => now(),
    ]);
});

// Public Bar Routes
Route::get('/bars', [\App\Http\Controllers\Api\BarController::class, 'index'])->name('api.bars.index');
Route::get('/bars/{id}', [\App\Http\Controllers\Api\BarController::class, 'show'])->name('api.bars.show');

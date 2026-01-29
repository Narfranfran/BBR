<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'BBr - BuscaBares',
        'timestamp' => now(),
    ]);
});

// Public Bar Routes
Route::get('/bars', [\App\Http\Controllers\Api\BarController::class, 'index'])->name('api.bars.index');
Route::get('/bars/{id}', [\App\Http\Controllers\Api\BarController::class, 'show'])->name('api.bars.show');

// Auth Routes
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [\App\Http\Controllers\Api\AuthController::class, 'user']);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
});

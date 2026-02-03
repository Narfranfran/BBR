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
Route::get('/reviews/random', [\App\Http\Controllers\Api\InteractionController::class, 'getRandom']);

// Auth Routes
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [\App\Http\Controllers\Api\AuthController::class, 'user']);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);

    // Interactions
    Route::post('/favorites/toggle', [\App\Http\Controllers\Api\InteractionController::class, 'toggleFavorite']);
    Route::post('/reviews', [\App\Http\Controllers\Api\InteractionController::class, 'storeReview']);
    Route::put('/reviews/{id}', [\App\Http\Controllers\Api\InteractionController::class, 'updateReview']);
    Route::delete('/reviews/{id}', [\App\Http\Controllers\Api\InteractionController::class, 'deleteReview']);

    // User Danger Zone
    Route::delete('/user/data', [\App\Http\Controllers\Api\UserController::class, 'clearData']);
    Route::delete('/user/account', [\App\Http\Controllers\Api\AuthController::class, 'deleteAccount']);
});

// Password Reset Routes
Route::post('/password/email', [\App\Http\Controllers\Api\PasswordResetController::class, 'sendResetCode']);
Route::post('/password/code/check', [\App\Http\Controllers\Api\PasswordResetController::class, 'verifyResetCode']);
Route::post('/password/reset', [\App\Http\Controllers\Api\PasswordResetController::class, 'resetPassword']);

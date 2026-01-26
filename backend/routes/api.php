<?php
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'BBr - BuscaBares',
        'timestamp' => now(),
    ]);
});

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Clear all user data (reviews and favorites)
    public function clearData(Request $request)
    {
        $user = $request->user();

        // Delete all reviews
        $user->reviews()->delete();

        // Delete all favorites (assuming Many-to-Many via pivot table, but defined as 'favorites' table in schema)
        // Check migration: 'favorites' table has 'user_id' and 'bar_id'.
        // If Favorites is a relationship on User model:
        $user->favorites()->detach();

        return response()->json(['message' => 'Todos los datos (reseñas y favoritos) han sido eliminados.']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class InteractionController extends Controller
{
    /**
     * Toggle favorite status for a bar
     */
    public function toggleFavorite(Request $request)
    {
        $request->validate([
            'bar_id' => 'required|exists:bars,id',
        ]);

        $user = $request->user();
        $barId = $request->bar_id;

        // Toggle attachment
        $changes = $user->favorites()->toggle($barId);

        // inclusive logic: if attached is not empty, it was added
        $isFavorite = !empty($changes['attached']);

        return response()->json([
            'status' => 'success',
            'is_favorite' => $isFavorite,
            'message' => $isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos'
        ]);
    }

    /**
     * Store a new review
     */
    public function storeReview(Request $request)
    {
        $request->validate([
            'bar_id' => 'required|exists:bars,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'bar_id' => $request->bar_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Reseña enviada correctamente',
            'review' => $review
        ]);
    }
}

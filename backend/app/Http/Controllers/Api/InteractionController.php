<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Log;

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

    /**
     * Update an existing review
     */
    public function updateReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($request->user()->id !== $review->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Reseña actualizada',
            'review' => $review
        ]);
    }

    /**
     * Delete a review
     */
    public function deleteReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($request->user()->id !== $review->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Reseña eliminada'
        ]);
    }

    /**
     * Get random high-rated reviews
     */
    public function getRandom(Request $request)
    {
        Log::info('getRandom reviews called');
        try {
            $reviews = Review::with(['user', 'bar'])
                ->where('rating', '>=', 4)
                ->whereNotNull('comment')
                ->where('comment', '!=', '')
                ->inRandomOrder()
                ->limit(10)
                ->get();

            return response()->json([
                'status' => 'success',
                'reviews' => $reviews
            ], 200, [], JSON_INVALID_UTF8_SUBSTITUTE);
        } catch (\Exception $e) {
            Log::error('getRandom error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}

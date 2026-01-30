<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BarResource;
use App\Models\Bar;
use Illuminate\Http\Request;

class BarController extends Controller
{
    /**
     * List bars with pagination and optional filters.
     */
    public function index(Request $request)
    {
        $query = Bar::query();

        // Search by name
        if ($search = $request->input('search')) {
            $query->where('nombre', 'like', "%{$search}%");
        }

        // Filter by Municipality
        if ($municipality = $request->input('municipality')) {
            $query->where('municipio', $municipality);
        }

        // Filter by Province
        if ($province = $request->input('province')) {
            // Flexible match or exact match. Using like for flexibility with dirty data
            $query->where('provincia', 'like', "%{$province}%");
        }

        // Filter by Type
        if ($type = $request->input('type')) {
            $query->where('tipo', 'like', "%{$type}%");
        }

        // Geospatial Search (Bars near a point)
        // usage: ?lat=40.9&lon=-5.6&radius_km=10
        if ($request->has(['lat', 'lon'])) {
            $lat          = $request->input('lat');
            $lon          = $request->input('lon');
            $radiusKm     = $request->input('radius_km', 10);
            $radiusMeters = $radiusKm * 1000;

            // Using ST_Distance_Sphere is accurate for Earth distances
            $query->whereRaw(
                "ST_Distance_Sphere(location, ST_GeomFromText('POINT(? ?)', 4326)) <= ?",
                [$lon, $lat, $radiusMeters]
            );

            // Order by distance
            $query->orderByRaw(
                "ST_Distance_Sphere(location, ST_GeomFromText('POINT(? ?)', 4326)) ASC",
                [$lon, $lat]
            );
        } elseif ($request->input('sort') === 'rating') {
            $query->withAvg('reviews', 'rating')
                ->orderByDesc('reviews_avg_rating');
        } else {
            $query->orderBy('nombre');
        }

        return BarResource::collection($query->paginate(20));
    }

    /**
     * Show details of a specific bar.
     */
    public function show($id)
    {
        $bar = Bar::findOrFail($id);

        return new BarResource($bar);
    }
}

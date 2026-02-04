<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'type'       => 'bars',
            'attributes' => [
                'name'         => $this->nombre,
                'address'      => $this->direccion,
                'municipality' => $this->municipio,
                'province'     => $this->provincia,
                'type'         => $this->tipo,
                'rating'       => $this->reviews_avg_rating ? round((float)$this->reviews_avg_rating, 1) : null,
                'reviews_count'=> $this->reviews_count,
                'latest_reviews' => $this->relationLoaded('reviews') ? $this->reviews->map(function($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'date' => $review->created_at->format('Y-m-d'),
                        'user' => $review->user ? $review->user->name : 'Anónimo'
                    ];
                }) : [],
                'coordinates'  => [
                    'lat' => $this->lat,
                    'lon' => $this->lon,
                ],
                // Formatting seats nicely
                'seats'        => $this->plazas,
                'telefono'     => $this->telefono,
                'web'          => $this->web,
                'accesible'    => $this->accesible,
                'contact'      => null, // Legacy?
                'description'  => null,
            ],
            'links'      => [
                'self' => route('api.bars.show', $this->id),
            ],
        ];
    }
}

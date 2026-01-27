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
                'name'         => $this->name,
                'address'      => $this->address,
                'municipality' => $this->municipality,
                'province'     => $this->province,
                'type'         => $this->type,
                'rating'       => $this->whenNotNull($this->reviews_avg_rating),
                'coordinates'  => [
                    'lat' => $this->latitude,
                    'lon' => $this->longitude,
                ],
                // Formatting seats nicely
                'seats'        => $this->seats,
                'contact'      => [
                    'phone' => $this->phone,
                    'email' => $this->email,
                    'web'   => $this->web,
                ],
                'description'  => $this->description,
            ],
            'links'      => [
                'self' => route('api.bars.show', $this->id),
            ],
        ];
    }
}

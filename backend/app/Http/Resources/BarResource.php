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
                'rating'       => $this->reviews_avg_rating ? (float)$this->reviews_avg_rating : null,
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

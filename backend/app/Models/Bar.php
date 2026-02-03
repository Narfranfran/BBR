<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bar extends Model
{
    use HasFactory;

    protected $fillable = [
        'fuente_id',
        'nombre',
        'tipo',
        'provincia',
        'municipio',
        'direccion',
        'lat',
        'lon',
        'location',
        'plazas',
        'telefono',
        'web',
        'accesible',
        'updated_api_at',
    ];

    protected $casts = [
        'lat'            => 'float',
        'lon'            => 'float',
        'plazas'         => 'integer',
        'updated_api_at' => 'datetime',
    ];

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

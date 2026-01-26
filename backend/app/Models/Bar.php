<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bar extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'nombre',
        'tipo',
        'provincia',
        'municipio',
        'direccion',
        'lat',
        'lon',
        'plazas',
        'fuente_id',
        'updated_api_at',
    ];
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bar extends Model
{
    use HasFactory;

    protected $fillable = [
        'registry_number',
        'name',
        'address',
        'municipality',
        'province',
        'type',
        'latitude',
        'longitude',
        // 'location' handled by spatial logic usually
        'phone',
        'email',
        'web',
        'description',
        'seats',
        'api_updated_at',
    ];

    protected $casts = [
        'latitude'       => 'float',
        'longitude'      => 'float',
        'seats'          => 'integer',
        'api_updated_at' => 'datetime',
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

<?php
namespace App\Console\Commands;

use App\Models\Bar;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SyncBars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-bars';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sincroniza los bares desde el dataset de Open Data JCyL';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Iniciando sincronización de Bares CyL...');

        $baseUrl = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/registro-de-turismo-de-castilla-y-leon/records';

        // Filter for "Bares" or similar establishments
        $queryParams = [
            'where'  => 'establecimiento LIKE "Bar%" OR establecimiento LIKE "Cafeter%"',
            'limit'  => 100,
            'offset' => 0,
        ];

        $totalProcessed = 0;
        $hasMore        = true;

        while ($hasMore) {
            $response = Http::get($baseUrl, $queryParams);

            if ($response->failed()) {
                $this->error('Error conectando con la API: ' . $response->status());
                return;
            }

            $data       = $response->json();
            $records    = $data['results'] ?? [];
            $totalCount = $data['total_count'] ?? 0;

            if (empty($records)) {
                $hasMore = false;
                break;
            }

            foreach ($records as $record) {
                $signatura = $record['signatura'] ?? null;
                if (! $signatura) {
                    continue;
                }

                $name         = $record['nombre'] ?? 'Sin nombre';
                $address      = $record['direccion'] ?? null;
                $municipality = $record['municipio'] ?? null;
                $province     = $record['provincia'] ?? null;
                $type         = $record['establecimiento'] ?? 'Bar';
                $seats        = isset($record['plazas']) ? (int) $record['plazas'] : null;

                                                        // Geo
                $geo = $record['geo_point_2d'] ?? null; // usually {lon: x, lat: y}
                $lat = $geo['lat'] ?? null;
                $lon = $geo['lon'] ?? null;

                $barData = [
                    'registry_number' => $signatura,
                    'name'            => $name,
                    'address'         => $address,
                    'municipality'    => $municipality,
                    'province'        => $province,
                    'type'            => $type,
                    'latitude'        => $lat,
                    'longitude'       => $lon,
                    'seats'           => $seats,
                    'api_updated_at'  => now(),
                ];

                $bar = Bar::updateOrCreate(
                    ['registry_number' => $signatura],
                    $barData
                );

                // Update Spatial Column separately using raw SQL if coordinates exist
                if ($lat && $lon) {
                    $id = $bar->id;
                    DB::statement("UPDATE bars SET location = ST_GeomFromText('POINT($lon $lat)', 4326) WHERE id = ?", [$id]);
                }

                $totalProcessed++;
            }

            $this->info("Procesados: $totalProcessed / $totalCount");

            $queryParams['offset'] += 100;
            if ($queryParams['offset'] >= $totalCount) {
                $hasMore = false;
            }

            sleep(1);
        }

        $this->info('Sincronización completada exitosamente.');
    }
}

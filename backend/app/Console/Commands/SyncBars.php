<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Bar;

class SyncBars extends Command
{
    protected $signature = 'bars:sync';
    protected $description = 'Sync bars from JCyl open data API';

    public function handle()
    {
        $this->info('Starting bars sync...');

        $url = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/registro-de-turismo-de-castilla-y-leon/records';

        $response = Http::get($url, [
            'limit' => 100,
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch data from API');
            return Command::FAILURE;
        }

        $results = $response->json('results');

        if (empty($results)) {
            $this->error('No results returned from API');
            return Command::FAILURE;
        }

        $count = 0;

        foreach ($results as $item) {

            // ID único del dataset
            if (empty($item['n_registro'])) {
                continue;
            }

            Bar::updateOrCreate(
                ['fuente_id' => $item['n_registro']],
                [
                    'nombre'     => $item['nombre'] ?? 'Sin nombre',
                    'tipo'       => $item['tipo'] ?? null,
                    'provincia'  => $item['provincia'] ?? 'Desconocida',
                    'municipio'  => $item['municipio'] ?? 'Desconocido',
                    'direccion'  => $item['direccion'] ?? null,
                    'plazas'     => $item['plazas'] ?? null,
                    'lat'        => $item['gps_latitud'] ?? null,
                    'lon'        => $item['gps_longitud'] ?? null,
                    'updated_api_at' => now(),
                ]
            );

            $count++;
        }

        $this->info("Bars synced successfully: {$count}");

        return Command::SUCCESS;
    }
}

<?php

use Illuminate\Support\Facades\Http;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$url = "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/registro-de-turismo-de-castilla-y-leon/records";
$queryParams = [
    'limit' => 20,
    // 'offset' => 300,
];

echo "Fetching with params: " . json_encode($queryParams) . "\n";

$response = Http::withOptions(['verify' => false])->get($url, $queryParams);
$data = $response->json();
$records = $data['results'] ?? [];

echo "Found " . count($records) . " records.\n";

foreach ($records as $i => $rec) {
    echo "Record #$i:\n";
    foreach ($rec as $key => $val) {
        if (str_contains($key, 'geo') || str_contains($key, 'coord') || str_contains($key, 'lat') || str_contains($key, 'posicion')) {
            echo "  HIT [$key]: " . json_encode($val) . "\n";
        }
    }
    // Also check deeper nesting? NO, JCyL is usually flat or 1 level.
}

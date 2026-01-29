<?php

use Illuminate\Support\Facades\Http;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$url = "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/relacion-de-bares-cafeterias-y-restaurantes-en-castilla-y-leon/records?limit=1";
$response = Http::withOptions(['verify' => false])->get($url);
$data = $response->json();
$record = $data['results'][0] ?? null;

if ($record) {
    echo "Keys available:\n";
    print_r(array_keys($record));
    echo "\n\nFull Record:\n";
    print_r($record);
} else {
    echo "No records found.";
}

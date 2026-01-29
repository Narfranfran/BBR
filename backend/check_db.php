<?php
use App\Models\Bar;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$countWith = Bar::whereNotNull('latitude')->count();
$countTotal = Bar::count();

echo "Total Bars: $countTotal\n";
echo "Bars with Coordinates: $countWith\n";

if ($countWith > 0) {
    $bar = Bar::whereNotNull('latitude')->first();
    echo "Example Valid Bar:\n";
    echo "ID: " . $bar->id . "\n";
    echo "Name: " . $bar->name . "\n";
    echo "Lat: " . $bar->latitude . "\n";
    echo "Lon: " . $bar->longitude . "\n";
} else {
    echo "CRITICAL: No bars have coords yet.\n";
}

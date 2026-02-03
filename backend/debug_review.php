<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Testing Review model...\n";
    $count = \App\Models\Review::count();
    echo "Total Reviews: $count\n";

    $reviews = \App\Models\Review::with(['user', 'bar'])
        ->where('rating', '>=', 4)
        ->inRandomOrder()
        ->limit(10)
        ->get();

    echo "Fetched Random Reviews: " . $reviews->count() . "\n";

    if ($reviews->isNotEmpty()) {
        $first = $reviews->first();
        echo "Sample: " . json_encode($first) . "\n";
        echo "User relation: " . ($first->user ? 'OK' : 'NULL') . "\n";
        echo "Bar relation: " . ($first->bar ? 'OK' : 'NULL') . "\n";
    }

} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getFile() . ":" . $e->getLine() . "\n";
}

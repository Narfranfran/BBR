<?php
$file = 'storage/app/RegistroTuristicoCompleto.csv';
if (! file_exists($file)) {
    die("File not found at $file");
}
$handle = fopen($file, 'r');
$header = fgetcsv($handle, 0, ';');
// Loop until we find a Bar to check real data (hotels might have different schema?)
// No, header is global. Just read first row.
$data = fgetcsv($handle, 0, ';');
fclose($handle);

echo "Headers (indices):\n";
foreach ($header as $i => $h) {
    echo "[$i] => $h\n";
}

echo "\nData (indices):\n";
foreach ($data as $i => $d) {
    echo "[$i] => $d\n";
}

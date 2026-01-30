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
        $this->info('Iniciando sincronización de Bares CyL desde archivo CSV...');

        $filePath = storage_path('app/RegistroTuristicoCompleto.csv');

        if (!file_exists($filePath)) {
            $this->error('El archivo RegistroTuristicoCompleto.csv no se encuentra en storage/app/.');
            $this->error('Por favor, descarga el archivo desde https://datosabiertos.jcyl.es/web/jcyl/risp/es/plantilla100/1284201406867/_/RegistroTuristicoCompleto.csv y guárdalo en esa ubicación.');
            return 1;
        }

        if (($handle = fopen($filePath, 'r')) === FALSE) {
            $this->error('No se pudo abrir el archivo CSV.');
            return 1;
        }

        // Get header and find column indexes
        $header = fgetcsv($handle, 0, ';');
        if ($header === false) {
             $this->error('No se pudo leer la cabecera del archivo CSV.');
             fclose($handle);
             return 1;
        }
        $columnMap = array_flip($header);
        
        $requiredColumns = ['N.Registro', 'Nombre', 'Dirección', 'Municipio', 'Provincia', 'Tipo', 'Plazas', 'GPS.Latitud', 'GPS.Longitud'];
        foreach ($requiredColumns as $column) {
            if (!isset($columnMap[$column])) {
                $this->error("La columna requerida '{$column}' no se encuentra en el archivo CSV.");
                fclose($handle);
                return 1;
            }
        }

        $totalProcessed = 0;
        
        // Count total lines for progress bar
        $lineCount = 0;
        $countHandle = fopen($filePath, 'r');
        while (fgets($countHandle) !== false) {
            $lineCount++;
        }
        fclose($countHandle);
        $totalInFile = $lineCount > 0 ? $lineCount - 1 : 0; // Exclude header

        $this->info("Archivo CSV encontrado con aproximadamente {$totalInFile} registros. Procesando...");
        $this->getOutput()->progressStart($totalInFile);

        DB::transaction(function () use ($handle, $columnMap, &$totalProcessed, $header) {
            // Re-open handle to read from the start after counting
            fclose($handle);
            $handle = fopen(storage_path('app/RegistroTuristicoCompleto.csv'), 'r');
            fgetcsv($handle, 0, ';'); // Skip header row again

            while (($data = fgetcsv($handle, 0, ';')) !== FALSE) {
                // Ensure data array has the same number of elements as header
                if (count($data) !== count($header)) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }
                $record = array_combine($header, $data);

                // Filter for "Bares" or similar establishments
                $type = $record['Tipo'] ?? '';
                if (!preg_match('/^(Bar|Cafeter|Restaurante)/i', $type)) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $signatura = $record['N.Registro'] ?? null;
                if (!$signatura) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $name = $record['Nombre'] ?? 'Sin nombre';
                $address = $record['Dirección'] ?? ($record['Municipio'] ?? null);
                $municipality = $record['Municipio'] ?? null;
                $province = $record['Provincia'] ?? null;
                $seats = isset($record['Plazas']) && is_numeric($record['Plazas']) ? (int) $record['Plazas'] : null;

                $lat = !empty($record['GPS.Latitud']) ? (float) $record['GPS.Latitud'] : null;
                $lon = !empty($record['GPS.Longitud']) ? (float) $record['GPS.Longitud'] : null;

                if (is_null($lat) || is_null($lon)) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $barData = [
                    'registry_number' => $signatura,
                    'name' => $name,
                    'address' => $address,
                    'municipality' => $municipality,
                    'province' => $province,
                    'type' => $type,
                    'latitude' => $lat,
                    'longitude' => $lon,
                    'seats' => $seats,
                    'api_updated_at' => now(),
                    'location' => DB::raw("ST_PointFromText('POINT($lon $lat)', 4326)"),
                ];
                
                Bar::updateOrCreate(
                    ['registry_number' => $signatura],
                    $barData
                );
                
                $totalProcessed++;
                $this->getOutput()->progressAdvance();
            }
        });

        $this->getOutput()->progressFinish();

        $this->info("Sincronización completada. Se han procesado {$totalProcessed} bares, cafeterías y restaurantes.");
    }
}

<?php
namespace App\Console\Commands;

use App\Models\Bar;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

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
        $this->info('Iniciando sincronización de Bares CyL (Modo Robusto)...');

        $filePath = storage_path('app/RegistroTuristicoCompleto.csv');

        if (! file_exists($filePath)) {
            $this->error('ERROR: Archivo no encontrado en ' . $filePath);
            return 1;
        }

        if (($handle = fopen($filePath, 'r')) === false) {
            $this->error('ERROR: No se pudo abrir el archivo CSV.');
            return 1;
        }

        // Get header
        $header = fgetcsv($handle, 0, ';');
        if ($header === false) {
            $this->error('ERROR: Cabecera vacía o ilegible.');
            fclose($handle);
            return 1;
        }

        // --- ROBUST INDEX DETECTION ---
        // We find the index of columns by searching for keywords, avoiding encoding issues.
        $findIndex = function ($patterns) use ($header) {
            foreach ($header as $index => $col) {
                foreach ((array) $patterns as $p) {
                    // mb_stripos handles case-insensitive search safely
                    if (mb_stripos($col, $p) !== false) {
                        return $index;
                    }

                }
            }
            return false;
        };

        $idxRegistro = $findIndex(['N.Registro', 'Registro']);
        $idxNombre   = $findIndex(['Nombre']);
        $idxDirecc   = $findIndex(['Direcci', 'Direccion']); // Matches Dirección/Direccion
        $idxMuni     = $findIndex(['Municipio']);
        $idxProv     = $findIndex(['Provincia']);
        $idxTipo     = $findIndex(['Tipo']);
        $idxPlazas   = $findIndex(['Plazas']);
        $idxLat      = $findIndex(['Latitud', 'GPS.Latitud']);
        $idxLon      = $findIndex(['Longitud', 'GPS.Longitud']);

        $missing = [];
        if ($idxRegistro === false) {
            $missing[] = 'N.Registro';
        }

        if ($idxLat === false) {
            $missing[] = 'Latitud';
        }

        if (! empty($missing)) {
            $this->error('Faltan columnas críticas: ' . implode(', ', $missing));
            $this->info('Cabeceras encontradas: ' . implode(' | ', $header));
            return 1;
        }

        // Count lines
        $lineCount   = 0;
        $countHandle = fopen($filePath, 'r');
        while (fgets($countHandle) !== false) {
            $lineCount++;
        }

        fclose($countHandle);
        $totalInFile = max(0, $lineCount - 1);

        $this->info("Procesando {$totalInFile} registros detectados...");
        $this->getOutput()->progressStart($totalInFile);

        $totalProcessed = 0;

        DB::transaction(function () use ($handle, &$totalProcessed, $idxRegistro, $idxNombre, $idxDirecc, $idxMuni, $idxProv, $idxTipo, $idxPlazas, $idxLat, $idxLon) {
            // Reset checking pointer (we kept it open? better close and reopen to be safe)
            fclose($handle);
            $handle = fopen(storage_path('app/RegistroTuristicoCompleto.csv'), 'r');
            fgetcsv($handle, 0, ';'); // Skip header

            while (($data = fgetcsv($handle, 0, ';')) !== false) {
                // Ensure we have enough columns for the max index we need (approx check)
                if (count($data) < 5) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                // Filter Type
                $type = ($idxTipo !== false && isset($data[$idxTipo])) ? $data[$idxTipo] : '';
                // Strict filter for Bar/Restaurant/Cafeteria
                if (! preg_match('/^(Bar|Cafeter|Restaurante)/i', $type)) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $signatura = $data[$idxRegistro] ?? null;
                if (! $signatura) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $name    = ($idxNombre !== false && isset($data[$idxNombre])) ? $data[$idxNombre] : 'Sin nombre';
                $muni    = ($idxMuni !== false && isset($data[$idxMuni])) ? $data[$idxMuni] : null;
                $prov    = ($idxProv !== false && isset($data[$idxProv])) ? $data[$idxProv] : null;
                $addrRaw = ($idxDirecc !== false && isset($data[$idxDirecc])) ? $data[$idxDirecc] : null;
                $address = $addrRaw ?: $muni;

                $seatsRaw = ($idxPlazas !== false && isset($data[$idxPlazas])) ? $data[$idxPlazas] : 0;
                $seats    = is_numeric($seatsRaw) ? (int) $seatsRaw : null;

                $latStr = ($idxLat !== false && isset($data[$idxLat])) ? str_replace(',', '.', $data[$idxLat]) : null;
                $lonStr = ($idxLon !== false && isset($data[$idxLon])) ? str_replace(',', '.', $data[$idxLon]) : null;

                $lat = is_numeric($latStr) ? (float) $latStr : null;
                $lon = is_numeric($lonStr) ? (float) $lonStr : null;

                if (is_null($lat) || is_null($lon) || ($lat == 0 && $lon == 0)) {
                    $this->getOutput()->progressAdvance();
                    continue;
                }

                $barData = [
                    'fuente_id'      => $signatura,
                    'nombre'         => $name,
                    'direccion'      => $address,
                    'municipio'      => $muni,
                    'provincia'      => $prov,
                    'tipo'           => $type,
                    'lat'            => $lat,
                    'lon'            => $lon,
                    'plazas'         => $seats,
                    'updated_api_at' => now(),
                    'location'       => DB::raw("ST_PointFromText('POINT($lon $lat)', 4326)"),
                ];

                Bar::updateOrCreate(
                    ['fuente_id' => $signatura],
                    $barData
                );

                $totalProcessed++;
                $this->getOutput()->progressAdvance();
            }
        });

        $this->getOutput()->progressFinish();
        $this->info("Hecho. {$totalProcessed} bares importados correctamente.");
    }
}

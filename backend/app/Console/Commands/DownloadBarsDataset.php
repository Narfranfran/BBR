<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;

class DownloadBarsDataset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:download-bars-dataset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Descarga el dataset de bares de JCyL Open Data en formato CSV.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Iniciando la descarga del dataset de bares...');

        $url = 'https://datosabiertos.jcyl.es/web/jcyl/risp/es/plantilla100/1284201406867/_/RegistroTuristicoCompleto.csv';
        $destinationPath = Storage::disk('local')->path('RegistroTuristicoCompleto.csv');

        $process = new Process(['curl', '-L', '-o', $destinationPath, $url]);
        $process->setTimeout(3600); // 1 hour timeout for download

        $this->info("Descargando desde: $url");
        $this->info("Guardando en: $destinationPath");

        $process->run(function ($type, $buffer) {
            if (Process::ERR === $type) {
                $this->error($buffer);
            } else {
                $this->output->write($buffer);
            }
        });

        if ($process->isSuccessful()) {
            $this->info('Descarga completada exitosamente.');
            return 0;
        } else {
            $this->error('La descarga ha fallado.');
            $this->error('Por favor, revisa la salida del comando para más detalles.');
            return 1;
        }
    }
}

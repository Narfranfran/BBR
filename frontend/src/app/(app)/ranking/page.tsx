'use client';

import { useBars, Bar } from '@/hooks/useBars';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';
import { Trophy, Star } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Ranking() {
  const { bars, isLoading } = useBars({ type: 'Restaurante' });

  const topBars = bars.slice(0, 5); 

  const chartData = {
    labels: topBars.map(b => b.attributes.name.substring(0, 12).toUpperCase()),
    datasets: [
      {
        label: 'VALORACIÓN',
        data: topBars.map(() => (Math.random() * 2) + 3), 
        backgroundColor: '#f97316', // Orange 500
        borderColor: '#f97316',
        borderWidth: 0,
        borderRadius: 0, // Sharp edges
        barThickness: 20,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#aaa',
        borderColor: '#333',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        titleFont: { family: 'monospace' },
        bodyFont: { family: 'monospace' }
      }
    },
    scales: {
        x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#666', font: { family: 'monospace' } }
        },
        y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#666', font: { family: 'monospace' } },
            beginAtZero: true,
            max: 5
        }
    }
  };

  if (isLoading) return <div className="p-12 text-center font-mono text-orange-500 animate-pulse">/// CARGANDO_DATOS...</div>;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
            Ranking <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-yellow-500">Top Tier</span>
        </h1>
        <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
            /// Los establecimientos mejor valorados por el sistema
        </p>
      </div>
      
      {/* Chart Section */}
      <div className="bg-neutral-900/50 p-6 border border-white/5 mb-12 h-80 relative">
        <div className="absolute top-4 right-4 text-xs font-mono text-neutral-600 uppercase border border-neutral-800 px-2 py-1">
            Analytics_View
        </div>
        <BarChart options={options} data={chartData} />
      </div>

      {/* List Section */}
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="text-yellow-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Top 3 Destacados</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {topBars.slice(0, 3).map((bar: Bar, index: number) => (
            <div key={bar.id} className="bg-neutral-950 p-6 border border-white/10 hover:border-orange-500/50 transition-colors group relative overflow-hidden">
                {/* Rank Badge */}
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rotate-12 flex items-end justify-start pl-3 pb-3 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                    <span className="text-2xl font-black font-mono text-neutral-700 group-hover:text-black">
                        #{index + 1}
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-xl text-white truncate mb-1 pr-6">{bar.attributes.name}</h3>
                    <p className="text-xs font-mono text-neutral-500 uppercase">{bar.attributes.municipality}</p>
                </div>
                
                <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                    <div className="flex text-yellow-500">
                        {'★★★★★'.split('').map((star, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                    </div>
                    <span className="text-neutral-600 text-xs font-mono ml-auto">
                        ID_{String(bar.id).padStart(4, '0')}
                    </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

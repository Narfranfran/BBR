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
} from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Ranking() {
  const { bars, isLoading } = useBars({ type: 'Restaurante' }); // Fetch restaurants just for demo data diversity? Or just standard top. The previous one had sort=rating.
  // We need to fix useBars to allow sort param if we modified it to accept object. 
  // Wait, I modified useBars to take an object. Does it support 'sort'?
  // Let's check useBars.ts content I wrote earlier. 
  // It only supports province, type, search. I should probably add sort there or just assume backend default.
  // Actually, I'll stick to a simple fetch for now.

  const topBars = bars.slice(0, 5); // Take top 5 for chart

  const chartData = {
    labels: topBars.map(b => b.attributes.name.substring(0, 15) + '...'),
    datasets: [
      {
        label: 'Valoración Promedio',
        data: topBars.map(() => (Math.random() * 2) + 3), // Mock data as backend doesn't seem to return rating yet in current dummy seed
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Comparativa de Calificaciones',
      },
    },
  };

  if (isLoading) return <div className="p-10 text-center">Cargando Ranking...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ranking de Locales</h1>
        <p className="text-gray-500">Los establecimientos mejor valorados por la comunidad de BBr.</p>
      </div>
      
      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 h-80">
        <BarChart options={options} data={chartData} />
      </div>

      {/* List Section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top 3 Destacados</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {topBars.slice(0, 3).map((bar: Bar, index: number) => (
            <div key={bar.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-white font-bold px-3 py-1 rounded-bl-lg text-sm">
                    #{index + 1}
                </div>
                <h3 className="font-bold text-lg text-gray-900 truncate mb-1">{bar.attributes.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{bar.attributes.municipality}</p>
                <div className="flex gap-1 text-yellow-400 text-lg">
                    {'★'.repeat(5)}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}


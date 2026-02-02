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
import { useState, useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ESTABLISHMENT_TYPES = [
    "Todos", "Restaurante", "Bar", "Cafetería"
];

export default function Ranking() {
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedProvince, setSelectedProvince] = useState('Todas');
  
  const { bars, isLoading } = useBars({ 
    type: selectedType === 'Todos' ? undefined : selectedType,
    province: selectedProvince === 'Todas' ? undefined : selectedProvince,
    sort: 'rating'
  });

    const filteredBars = useMemo(() => {
    return bars.filter(bar => typeof bar.attributes.rating === 'number' && !isNaN(bar.attributes.rating));
  }, [bars]);

  const provinces = useMemo(() => {
    const allProvinces = filteredBars.map(bar => bar.attributes.province);
    return ['Todas', ...Array.from(new Set(allProvinces)).sort()];
  }, [filteredBars]);

  const topBars = filteredBars.slice(0, 10); 

  const chartData = {
    labels: topBars.map(b => b.attributes.name.substring(0, 15).toUpperCase()),
    datasets: [
      {
        label: 'VALORACIÓN',
        data: topBars.map(b => b.attributes.rating), 
        backgroundColor: '#f97316',
        borderColor: '#f97316',
        borderWidth: 0,
        borderRadius: 2,
        barThickness: 'flex' as 'flex',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
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
            ticks: { color: '#888', font: { family: 'monospace', size: 10 } }
        },
        y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#666', font: { family: 'monospace' } },
            beginAtZero: true,
            max: 5
        }
    }
  };

  const renderStars = (rating: number) => {
    if (typeof rating !== 'number' || isNaN(rating)) {
      return [...Array(5)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-700 fill-current" />);
    }
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" />)}
        {halfStar && <Star key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500/50" />}
        {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-700 fill-current" />)}
      </>
    );
  };

  if (isLoading && bars.length === 0) return <div className="p-12 text-center font-mono text-orange-500 animate-pulse">/// CARGANDO_DATOS...</div>;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8 pb-6 border-b border-white/10">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-2">
            Ranking <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Top Tier</span>
        </h1>
        <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
            /// Los establecimientos mejor valorados por la comunidad
        </p>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 bg-neutral-900/50 border border-white/5 rounded-sm">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">TIPO_ESTABLECIMIENTO</label>
          <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType} className="w-full bg-neutral-950 border border-neutral-700 text-white p-2 font-mono focus:outline-none focus:border-orange-500">
            {ESTABLISHMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">PROVINCIA</label>
          <select onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince} className="w-full bg-neutral-950 border border-neutral-700 text-white p-2 font-mono focus:outline-none focus:border-orange-500">
            {provinces.map(province => <option key={province} value={province}>{province}</option>)}
          </select>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-neutral-900/50 p-4 sm:p-6 border border-white/5 mb-12 h-[30rem] relative">
        <div className="absolute top-4 right-4 text-xs font-mono text-neutral-600 uppercase border border-neutral-800 px-2 py-1">
            Analytics_View
        </div>
        {topBars.length > 0 ? <BarChart options={options} data={chartData} /> : <div className="flex items-center justify-center h-full text-neutral-600 font-mono">NO_DATA_AVAILABLE_FOR_SELECTION</div>}
      </div>

      {/* List Section */}
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="text-yellow-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Top {Math.min(3, topBars.length)} Destacados</h2>
      </div>

      {topBars.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {topBars.slice(0, 3).map((bar: Bar, index: number) => (
              <div key={bar.id} className="bg-neutral-950 p-6 border border-white/10 hover:border-orange-500/50 transition-colors group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rotate-12 flex items-end justify-start pl-3 pb-3 group-hover:bg-orange-500 transition-colors">
                      <span className="text-2xl font-black font-mono text-neutral-700 group-hover:text-black transition-colors">
                          #{index + 1}
                      </span>
                  </div>

                  <div className="mb-4">
                      <h3 className="font-bold text-xl text-white truncate mb-1 pr-6">{bar.attributes.name}</h3>
                      <p className="text-xs font-mono text-neutral-500 uppercase">{bar.attributes.province} // {bar.attributes.municipality}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                      <div className="flex">
                          {renderStars(bar.attributes.rating!)}
                      </div>
                      <span className="text-neutral-500 text-xs font-mono ml-auto">
                          {typeof bar.attributes.rating === 'number' ? `(${bar.attributes.rating.toFixed(2)})` : '(N/A)'}
                      </span>                  </div>
              </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500 font-mono">
          <p>No se encontraron establecimientos con los filtros seleccionados.</p>
        </div>
      )}
      
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { BarsFilters } from '@/hooks/useBars';

interface MapControlsProps {
    filters: BarsFilters;
    onFilterChange: (newFilters: BarsFilters) => void;
    totalResults: number;
}

export default function MapControls({ filters, onFilterChange, totalResults }: MapControlsProps) {
    const [localSearch, setLocalSearch] = useState(filters.search || '');

    useEffect(() => {
        setLocalSearch(filters.search || '');
    }, [filters.search]);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...filters, province: e.target.value });
    };

    const handleTypeChange = (type: string) => {
        // Toggle logic if we want multi-select, but for now simple switch to match API
        const newType = filters.type === type ? '' : type;
        onFilterChange({ ...filters, type: newType });
    };

    const executeSearch = () => {
        onFilterChange({ ...filters, search: localSearch });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    return (
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-4 w-full max-w-sm pointer-events-auto">
            {/* Status Panel - Industrial Style */}
            <div className="bg-neutral-950/90 border border-white/10 backdrop-blur-md p-4 shadow-xl">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-white font-black tracking-tighter uppercase text-lg">
                        Filtros de Exploración
                    </h2>
                    <span className="bg-orange-600 text-black text-[0.65rem] font-bold px-2 py-0.5 font-mono">
                        {totalResults} RESULTADOS
                    </span>
                </div>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                    <button 
                        onClick={executeSearch}
                        className="absolute left-3 top-2.5 text-orange-500 hover:text-white transition-colors z-10"
                        aria-label="Buscar"
                        type="button"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                    <input 
                        type="text" 
                        placeholder="BUSCAR (ENTER)..." 
                        className="w-full bg-neutral-900 border border-white/20 text-white pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-600 uppercase transition-all"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Province Selector */}
                <div className="relative mb-4 group">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    <select
                        className="w-full bg-neutral-900 border border-white/20 text-neutral-300 pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-orange-500 appearance-none uppercase cursor-pointer hover:border-white/40 transition-colors"
                        value={filters.province || ''}
                        onChange={handleProvinceChange}
                    >
                        <option value="">-- Todas las Zonas --</option>
                        {['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'].map(p => (
                            <option key={p} value={p}>{p.toUpperCase()}</option>
                        ))}
                    </select>
                </div>

                {/* Type Toggles (Street Style) */}
                <div className="grid grid-cols-3 gap-2">
                    {['Bar', 'Cafetería', 'Restaurante'].map((t) => (
                        <button
                            key={t}
                            onClick={() => handleTypeChange(t)}
                            className={`
                                text-[0.65rem] font-bold uppercase py-2 border transition-all duration-200
                                ${filters.type === t 
                                    ? 'bg-orange-500 border-orange-500 text-black' 
                                    : 'bg-neutral-900 border-white/10 text-neutral-500 hover:border-white/30 hover:text-white'
                                }
                            `}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Quick Helper */}
            <div className="bg-neutral-900/80 border border-white/5 p-2 flex gap-2 items-center backdrop-blur text-[0.6rem] text-neutral-500 font-mono uppercase">
                <Filter className="w-3 h-3 text-orange-500" />
                <span>Usa los filtros para refinar el mapa</span>
            </div>
        </div>
    );
}

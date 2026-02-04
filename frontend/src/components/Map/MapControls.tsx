'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { BarsFilters } from '@/hooks/useBars';

interface MapControlsProps {
    filters: BarsFilters;
    onFilterChange: (newFilters: BarsFilters) => void;
    totalResults: number;
}

export default function MapControls({ filters, onFilterChange, totalResults }: MapControlsProps) {
    const [localSearch, setLocalSearch] = useState(filters.search || '');
    const [showTip, setShowTip] = useState(true);

    useEffect(() => {
        setLocalSearch(filters.search || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Helpler for color classes based on Type
    const getTypeStyles = (type: string, isSelected: boolean) => {
        const baseStyle = "text-[0.65rem] font-bold uppercase py-2 border transition-all duration-200";
        
        if (!isSelected) {
            return `${baseStyle} bg-neutral-900 border-white/10 text-neutral-500 hover:border-white/30 hover:text-white`;
        }

        switch(type) {
            case 'Bar':
                return `${baseStyle} bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]`;
            case 'Cafetería':
                return `${baseStyle} bg-amber-500 border-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]`;
            case 'Restaurante':
                return `${baseStyle} bg-rose-500 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]`;
            default:
                return `${baseStyle} bg-white text-black`;
        }
    };

    return (
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-4 w-full max-w-sm pointer-events-auto">
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
                            className={getTypeStyles(t, filters.type === t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Quick Helper */}
            {showTip && (
                <div className="bg-neutral-900/80 border border-white/5 p-2 flex gap-2 items-center justify-between backdrop-blur text-[0.6rem] text-neutral-500 font-mono uppercase transition-all">
                    <div className="flex gap-2 items-center">
                        <Filter className="w-3 h-3 text-orange-500" />
                        <span>Usa los filtros para refinar el mapa</span>
                    </div>
                    <button 
                        onClick={() => setShowTip(false)}
                        className="hover:text-white transition-colors"
                        aria-label="Cerrar consejo"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    );
}

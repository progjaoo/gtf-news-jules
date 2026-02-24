import React from 'react';
import { MapPin } from 'lucide-react';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';
import { StationSelector } from './StationSelector';
import { useStation } from '@/contexts/StationContext';

export function TopHeader() {
  const { currentStation } = useStation();
  const stationName = currentStation.id === 'fatopopular' ? 'FATO POPULAR' : currentStation.name;
  return (
    <header className="bg-card border-b border-border">
      <div className="container flex items-center justify-between h-12">

        <div className="flex items-center gap-3">
          <StationSelector />
          <span className="text-sm text-muted-foreground mx-1 hidden sm:inline">|</span>

          {/* 🔥 AQUI: cor dinâmica da emissora */}
          <span
            className="text-sm font-semibold hidden sm:inline"
            style={{ color: currentStation.color }}
          >
            BRASIL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MapPin size={14} />
            <span className="hidden sm:inline">Rio de Janeiro</span>
          </button>
        </div>

      </div>
    </header>
  );
}

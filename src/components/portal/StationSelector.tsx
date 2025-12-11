import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Emissoras - serão alimentadas via API
interface Station {
  id: string;
  name?: string;
  frequency?: string;
  color: string;
}

const stations: Station[] = [
  { id: 'gtf-news', name: 'GTF NEWS',color: 'text-primary' },
  { id: 'maravilha-news', name: 'MARAVILHA NEWS', color: 'text-orange-500' },
  { id: '88fm', name: '88 FM', color: 'text-primary' },
  { id: '89maravilha', name: '89 MARAVILHA', color: 'text-orange-400' },
];

export function StationSelector() {
  const [currentStation, setCurrentStation] = useState(stations[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          {currentStation.frequency && (
            <span className="text-sm text-muted-foreground">{currentStation.frequency}</span>
          )}
          <span className={cn('text-sm font-bold', currentStation.color)}>
            {currentStation.name}
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-card border-border z-50">
        {stations.map((station) => (
          <DropdownMenuItem
            key={station.id}
            onClick={() => setCurrentStation(station)}
            className={cn(
              'cursor-pointer',
              currentStation.id === station.id && 'bg-muted'
            )}
          >
            <div className="flex items-center gap-2">
              {station.frequency && (
                <span className="text-xs text-muted-foreground">{station.frequency}</span>
              )}
              <span className={cn('font-semibold', station.color)}>{station.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

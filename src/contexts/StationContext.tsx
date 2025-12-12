import React, { createContext, useContext, useState, ReactNode } from 'react';

export type StationType = 'radio88fm' | 'radio89maravilha' | 'gtfnews';

export interface StationInfo {
  id: StationType;
  name: string;
  color: string;
  logo: string;
}

export const stations: StationInfo[] = [
  { id: 'radio88fm', name: '88 FM', color: 'bg-station-88fm', logo: '/src/assets/logo88.svg' },
  { id: 'radio89maravilha', name: '89 MARAVILHA', color: 'bg-station-maravilha', logo: '/src/assets/logoMaravilha.svg' },
  { id: 'gtfnews', name: 'GTF NEWS', color: 'bg-station-gtfnews', logo: '/src/assets/logo88.svg' },
];

interface StationContextType {
  currentStation: StationInfo;
  setStation: (stationId: StationType) => void;
  getStationClass: () => string;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export function StationProvider({ children }: { children: ReactNode }) {
  const [currentStation, setCurrentStation] = useState<StationInfo>(stations[0]);

  const setStation = (stationId: StationType) => {
    const station = stations.find(s => s.id === stationId);
    if (station) {
      setCurrentStation(station);
    }
  };

  const getStationClass = () => `station-${currentStation.id}`;

  return (
    <StationContext.Provider value={{ currentStation, setStation, getStationClass }}>
      <div className={getStationClass()}>
        {children}
      </div>
    </StationContext.Provider>
  );
}

export function useStation() {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStation must be used within a StationProvider');
  }
  return context;
}

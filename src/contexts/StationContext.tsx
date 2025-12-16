// StationContext.tsx
import React, { createContext, useContext, useState } from "react";

export type StationType = "radio88fm" | "radio89maravilha" | "gtfnews";

export const stations = [
  { id: "radio88fm", name: "88 FM", color: "#038CE4" ,homePath: "/radio88fm"},
  { id: "radio89maravilha", name: "89 MARAVILHA", color: "#FF8000", homePath: "/radio89maravilha"},
  { id: "gtfnews", name: "GTF NEWS", color: "#000000", homePath: "/gtfnews"},
];

interface StationContextType {
  currentStation: (typeof stations)[number];
  setStation: (id: StationType) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export function StationProvider({ children }: { children: React.ReactNode }) {
  const [currentStation, setCurrentStationState] = useState(stations[0]);

  const setStation = (id: StationType) => {
    const s = stations.find(x => x.id === id);
    if (s) setCurrentStationState(s);
  };

  return (
    <StationContext.Provider value={{ currentStation, setStation }}>
      <div style={{ "--station-color": currentStation.color } as React.CSSProperties}>
        {children}
      </div>
    </StationContext.Provider>
  );
}

export const useStation = () => {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error("useStation must be used inside StationProvider");
  return ctx;
};

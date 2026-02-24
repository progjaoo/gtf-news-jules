// StationContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmissora, EmissoraApi } from "@/services/dotnetApi";

export type StationType = "radio88fm" | "radio89maravilha" | "gtfnews" | "fatopopular";

// Mapeamento station → ID na API .NET
const stationApiIds: Record<StationType, number> = {
  radio88fm: 1,
  radio89maravilha: 4,
  gtfnews: 4,
  fatopopular: 5,
};

// Fallback local caso API esteja offline
const fallbackStations = [
  { id: "radio88fm", name: "88 FM", color: "#038CE4", homePath: "/radio88fm" },
  { id: "radio89maravilha", name: "89 MARAVILHA", color: "#FF8000", homePath: "/radio89maravilha" },
  { id: "gtfnews", name: "GTF NEWS", color: "#000000", homePath: "/gtfnews" },
  { id: "fatopopular", name: "FATO POPULAR", color: "#132D52", homePath: "/fatopopular" },
];

export const stations = fallbackStations;

interface StationData {
  id: string;
  name: string;
  color: string;
  homePath: string;
  apiData?: EmissoraApi;
}

interface StationContextType {
  currentStation: StationData;
  setStation: (id: StationType) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export function StationProvider({ children }: { children: React.ReactNode }) {
  const [stationId, setStationId] = useState<StationType>("radio88fm");

  const apiId = stationApiIds[stationId];

  const { data: emissoraData } = useQuery({
    queryKey: ["emissora", apiId],
    queryFn: () => fetchEmissora(apiId),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const fallback = fallbackStations.find((s) => s.id === stationId)!;

  const currentStation: StationData = emissoraData
    ? {
        id: stationId,
        name: emissoraData.nomeSocial,
        color: emissoraData.temaPrincipal,
        homePath: `/${stationId}`,
        apiData: emissoraData,
      }
    : fallback;

  const setStation = (id: StationType) => {
    setStationId(id);
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

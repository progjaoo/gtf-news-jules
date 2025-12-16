import { useEffect } from "react";
import { useStation, StationType } from "@/contexts/StationContext";

interface StationRouteProps {
  stationId: StationType;
  children: React.ReactNode;
}

export function StationRoute({ stationId, children }: StationRouteProps) {
  const { setStation } = useStation();

  useEffect(() => {
    setStation(stationId);
  }, [stationId, setStation]);

  return <>{children}</>;
}

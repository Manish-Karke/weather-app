import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface MapUpdaterProps {
  lat: number;
  lon: number;
}

const MapUpdater = ({ lat, lon }: MapUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 10); // setView with desired zoom
    }
  }, [lat, lon, map]);

  return null;
};
export default MapUpdater;

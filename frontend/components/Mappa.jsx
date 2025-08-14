import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix per icone rotte dei marker Leaflet in Vite/React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Mappa({ viaggi }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Inizializza la mappa solo una volta
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([41.8719, 12.5674], 6); // centro Italia
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
      }).addTo(mapInstance.current);
    }

    // Rimuovi tutti i marker precedenti
    if (mapInstance.current._markersLayer) {
      mapInstance.current.removeLayer(mapInstance.current._markersLayer);
    }
    const markersLayer = L.layerGroup();
    viaggi.forEach(v => {
      // Conversione a numero per sicurezza!
      const lat = Number(v.latitude);
      const lng = Number(v.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        L.marker([lat, lng])
          .addTo(markersLayer)
          .bindPopup(`<b>${v.place}</b><br/>${v.description || ""}`);
      }
    });
    markersLayer.addTo(mapInstance.current);
    mapInstance.current._markersLayer = markersLayer;
  }, [viaggi]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ height: "400px", width: "100%", marginBottom: "2rem", borderRadius: "10px", border: "1px solid #ccc" }}
    ></div>
  );
}
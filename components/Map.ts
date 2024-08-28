import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const latitude = 12.934425;
      const longitude = 77.605890;
      const zoomLevel = 18;

      const map = L.map(mapRef.current).setView([latitude, longitude], zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Use default Leaflet icon
      const marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup("TeachShare Location").openPopup();

      return () => {
        map.remove();
      };
    }
  }, []);

  return React.createElement('div', {
    ref: mapRef,
    style: { width: '100%', height: '100%' }
  });
};

export default Map;
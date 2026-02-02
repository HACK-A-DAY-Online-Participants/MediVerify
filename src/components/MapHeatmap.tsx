import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface FraudLocation {
  city: string;
  lat: number;
  lng: number;
  count: number;
}

const fraudData: FraudLocation[] = [
  { city: "New York", lat: 40.7128, lng: -74.006, count: 23 },
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437, count: 18 },
  { city: "Chicago", lat: 41.8781, lng: -87.6298, count: 12 },
  { city: "Houston", lat: 29.7604, lng: -95.3698, count: 8 },
  { city: "Phoenix", lat: 33.4484, lng: -112.074, count: 5 },
  { city: "Miami", lat: 25.7617, lng: -80.1918, count: 14 },
  { city: "Boston", lat: 42.3601, lng: -71.0589, count: 9 },
  { city: "San Francisco", lat: 37.7749, lng: -122.4194, count: 11 },
  { city: "Seattle", lat: 47.6062, lng: -122.3321, count: 7 },
  { city: "Denver", lat: 39.7392, lng: -104.9903, count: 6 },
];

const MapHeatmap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers for each location with size based on fraud count
    const maxCount = Math.max(...fraudData.map((d) => d.count));
    fraudData.forEach((location) => {
      const intensity = location.count / maxCount;
      let circleColor: string;
      let fillOpacity: number;

      if (intensity > 0.7) {
        circleColor = "#ff0000";
        fillOpacity = 0.8;
      } else if (intensity > 0.4) {
        circleColor = "#ff8800";
        fillOpacity = 0.7;
      } else {
        circleColor = "#ffff00";
        fillOpacity = 0.6;
      }

      const radius = Math.sqrt(location.count) * 3;

      L.circleMarker([location.lat, location.lng], {
        radius: radius,
        fillColor: circleColor,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: fillOpacity,
      })
        .bindPopup(
          `<div class="text-sm font-semibold">${location.city}</div><div class="text-xs">Frauds: ${location.count}</div>`
        )
        .addTo(map);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const totalFrauds = fraudData.reduce((sum, location) => sum + location.count, 0);
  const highRiskCities = fraudData.filter((d) => d.count > 15).length;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-counterfeit" />
            <div>
              <CardTitle>Fraud Hotspots Map</CardTitle>
              <CardDescription>Real-time geographic distribution of counterfeit detections</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-counterfeit">{totalFrauds}</div>
            <p className="text-xs text-muted-foreground">{highRiskCities} high-risk zones</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border border-border overflow-hidden"
          style={{ minHeight: "400px" }}
        />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {fraudData.slice(0, 4).map((location) => (
            <div key={location.city} className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm">{location.city}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {location.count} {location.count === 1 ? "detection" : "detections"}
              </p>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-counterfeit"
                  style={{ width: `${(location.count / 23) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapHeatmap;

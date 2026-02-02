import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface FraudLocation {
  city: string;
  lat: number;
  lng: number;
  count: number;
  severity: "low" | "medium" | "high";
}

const fraudData: FraudLocation[] = [
  { city: "New York", lat: 40.7128, lng: -74.006, count: 23, severity: "high" },
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437, count: 18, severity: "high" },
  { city: "Chicago", lat: 41.8781, lng: -87.6298, count: 12, severity: "medium" },
  { city: "Houston", lat: 29.7604, lng: -95.3698, count: 8, severity: "medium" },
  { city: "Phoenix", lat: 33.4484, lng: -112.074, count: 5, severity: "low" },
  { city: "Miami", lat: 25.7617, lng: -80.1918, count: 14, severity: "medium" },
  { city: "Boston", lat: 42.3601, lng: -71.0589, count: 9, severity: "medium" },
  { city: "San Francisco", lat: 37.7749, lng: -122.4194, count: 11, severity: "medium" },
];

const FraudHeatmap: React.FC = () => {
  const [sortedData, setSortedData] = useState<FraudLocation[]>([]);

  useEffect(() => {
    setSortedData([...fraudData].sort((a, b) => b.count - a.count));
  }, []);

  const getHeatmapColor = (count: number) => {
    const maxCount = Math.max(...fraudData.map((d) => d.count));
    const intensity = count / maxCount;
    if (intensity > 0.7) return "bg-counterfeit";
    if (intensity > 0.4) return "bg-warning";
    return "bg-muted";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-counterfeit";
      case "medium":
        return "text-warning";
      case "low":
        return "text-genuine";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-counterfeit" />
          <CardTitle>Fraud Hotspots</CardTitle>
        </div>
        <CardDescription>Geographic distribution of counterfeit medicine detections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* ASCII Heatmap Grid */}
          <div className="bg-background rounded-lg p-6 overflow-x-auto">
            <div className="text-xs text-muted-foreground mb-4 font-mono">
              <div className="mb-2">Fraud Detection Density Map</div>
              <div className="grid grid-cols-8 gap-1">
                {fraudData.map((location, idx) => {
                  const maxCount = Math.max(...fraudData.map((d) => d.count));
                  const intensity = location.count / maxCount;
                  const blockChar =
                    intensity > 0.7 ? "██" : intensity > 0.4 ? "▓▓" : intensity > 0.2 ? "▒▒" : "░░";

                  return (
                    <div
                      key={idx}
                      className={`h-12 rounded flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-all hover:scale-110 ${getHeatmapColor(location.count)}`}
                      title={`${location.city}: ${location.count} detections`}
                    >
                      <span className="text-center">{location.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 justify-center mt-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-counterfeit rounded"></div>
                <span>High (16+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span>Medium (8-15)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span>Low (&lt;8)</span>
              </div>
            </div>
          </div>

          {/* Detailed List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold mb-3">Detections by Location</h4>
            {sortedData.map((location) => (
              <div key={location.city} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{location.city}</p>
                  <p className="text-xs text-muted-foreground">Lat: {location.lat.toFixed(2)}, Lng: {location.lng.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getHeatmapColor(location.count)}`}></div>
                    <span className={`font-semibold ${getSeverityColor(location.severity)}`}>{location.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{location.severity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudHeatmap;

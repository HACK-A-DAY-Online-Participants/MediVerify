import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, Image as ImageIcon, CheckCircle, XCircle, AlertCircle, WifiOff, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";

interface ScanResult {
  status: "genuine" | "counterfeit" | "unknown";
  data: {
    name?: string;
    brand?: string;
    batch?: string;
    expiry?: string;
    hash?: string;
  };
}

const mockDatabase: Record<string, ScanResult> = {
  "DEMO-GEN-001": {
    status: "genuine",
    data: {
      name: "Paracetamol 500mg",
      brand: "PharmaCare",
      batch: "PCM2024-001",
      expiry: "2026-12-31",
      hash: "DEMO-GEN-001",
    },
  },
  "DEMO-GEN-002": {
    status: "genuine",
    data: {
      name: "Amoxicillin 500mg",
      brand: "MediLife",
      batch: "AMX2024-002",
      expiry: "2025-08-15",
      hash: "DEMO-GEN-002",
    },
  },
  "DEMO-GEN-003": {
    status: "genuine",
    data: {
      name: "Metformin 850mg",
      brand: "DiabetCare",
      batch: "MET2024-003",
      expiry: "2026-03-20",
      hash: "DEMO-GEN-003",
    },
  },
  "DEMO-GEN-004": {
    status: "genuine",
    data: {
      name: "Azithromycin 250mg",
      brand: "AntiBio Plus",
      batch: "AZI2024-004",
      expiry: "2025-11-30",
      hash: "DEMO-GEN-004",
    },
  },
  "DEMO-FAKE-001": {
    status: "counterfeit",
    data: {
      hash: "DEMO-FAKE-001",
    },
  },
  "DEMO-FAKE-002": {
    status: "counterfeit",
    data: {
      hash: "DEMO-FAKE-002",
    },
  },
  "DEMO-UNKNOWN-001": {
    status: "unknown",
    data: {
      hash: "DEMO-UNKNOWN-001",
    },
  },
};

const Scan = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [activeTab, setActiveTab] = useState("camera");
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      if (!html5QrcodeRef.current && videoRef.current) {
        html5QrcodeRef.current = new Html5Qrcode("qr-reader");
      }

      const qrScanner = html5QrcodeRef.current;
      if (qrScanner) {
        await qrScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleScanSuccess(decodedText);
            stopScanning();
          },
          () => {
            // Error callback - ignore
          }
        );
        setScanning(true);
      }
    } catch (err) {
      console.error("Error starting scanner:", err);
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current.clear();
      }
      setScanning(false);
    } catch (err) {
      console.error("Error stopping scanner:", err);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    const scanResult = mockDatabase[decodedText] || {
      status: "unknown" as const,
      data: { hash: decodedText },
    };
    
    setResult(scanResult);
    
    if (scanResult.status === "genuine") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#38bdf8"],
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!html5QrcodeRef.current) {
        html5QrcodeRef.current = new Html5Qrcode("qr-reader");
      }

      const qrScanner = html5QrcodeRef.current;
      const result = await qrScanner.scanFile(file, true);
      handleScanSuccess(result);
    } catch (err) {
      console.error("Error scanning file:", err);
    }
  };

  const resetScan = () => {
    setResult(null);
    setScanning(false);
  };

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        {result.status === "genuine" && (
          <div className="w-full max-w-2xl text-center animate-scale-in">
            <div className="mb-8">
              <CheckCircle className="w-32 h-32 mx-auto text-genuine glow-genuine animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-genuine mb-4">Medicine Verified</h1>
            <p className="text-xl text-muted-foreground mb-8">This medicine is genuine and safe</p>
            
            <Card className="bg-card border-genuine/50 mb-8">
              <CardContent className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-muted-foreground">Medicine Name</p>
                    <p className="text-lg font-semibold">{result.data.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="text-lg font-semibold">{result.data.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch Number</p>
                    <p className="text-lg font-semibold">{result.data.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry Date</p>
                    <p className="text-lg font-semibold">{result.data.expiry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={resetScan} size="lg" className="bg-primary hover:bg-primary/90">
              Scan Another Medicine
            </Button>
          </div>
        )}

        {result.status === "counterfeit" && (
          <div className="w-full max-w-2xl text-center shake">
            <div className="mb-8 pulse-warning">
              <XCircle className="w-32 h-32 mx-auto text-counterfeit glow-counterfeit" />
            </div>
            <h1 className="text-5xl font-bold text-counterfeit mb-4">COUNTERFEIT DETECTED</h1>
            <p className="text-2xl text-counterfeit-foreground mb-4 font-bold">⚠️ DO NOT PURCHASE ⚠️</p>
            <p className="text-lg text-muted-foreground mb-8">
              This medicine failed authentication. It may be dangerous.
            </p>
            
            <div className="flex gap-4 justify-center mb-8">
              <Button variant="destructive" size="lg">
                Report Counterfeit
              </Button>
              <Button onClick={resetScan} variant="outline" size="lg">
                Scan Another
              </Button>
            </div>
          </div>
        )}

        {result.status === "unknown" && (
          <div className="w-full max-w-2xl text-center">
            <div className="mb-8">
              <AlertCircle className="w-32 h-32 mx-auto text-warning" />
            </div>
            <h1 className="text-5xl font-bold text-warning mb-4">Not in Database</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This QR code is not registered in our system. Please verify with the manufacturer.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={resetScan} size="lg" className="bg-primary hover:bg-primary/90">
                Scan Another Medicine
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Scan Medicine</h1>
          <Badge variant={isOnline ? "default" : "secondary"} className="gap-2">
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="camera" className="gap-2">
              <Camera className="w-4 h-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="photo" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Photo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera">
            <Card>
              <CardContent className="p-8">
                <div 
                  id="qr-reader" 
                  ref={videoRef}
                  className="mb-6 rounded-lg overflow-hidden"
                  style={{ minHeight: scanning ? "auto" : "300px" }}
                />
                
                {!scanning && (
                  <div className="text-center">
                    <Button 
                      onClick={startScanning} 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Tap to Scan
                    </Button>
                  </div>
                )}
                
                {scanning && (
                  <div className="text-center">
                    <Button 
                      onClick={stopScanning} 
                      variant="outline"
                      size="lg"
                    >
                      Stop Scanning
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photo">
            <Card>
              <CardContent className="p-8">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <input
                    type="file"
                    id="qr-file-input"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="qr-file-input"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <ImageIcon className="w-16 h-16 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold mb-2">Upload QR Code Image</p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to select
                      </p>
                    </div>
                    <Button type="button" className="bg-primary hover:bg-primary/90">
                      Choose File
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Scan;

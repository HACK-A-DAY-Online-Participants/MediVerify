import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Copy, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DemoQRCode {
  id: string;
  hash: string;
  label: string;
  status: "genuine" | "counterfeit" | "unknown";
}

const demoQRCodes: DemoQRCode[] = [
  { id: "1", hash: "DEMO-GEN-001", label: "Paracetamol 500mg", status: "genuine" },
  { id: "2", hash: "DEMO-GEN-002", label: "Amoxicillin 500mg", status: "genuine" },
  { id: "3", hash: "DEMO-GEN-003", label: "Metformin 850mg", status: "genuine" },
  { id: "4", hash: "DEMO-FAKE-001", label: "Fake Insulin", status: "counterfeit" },
  { id: "5", hash: "DEMO-FAKE-002", label: "Fake Amlodipine", status: "counterfeit" },
  { id: "6", hash: "DEMO-UNKNOWN-001", label: "Unknown Medicine", status: "unknown" },
  { id: "7", hash: "DEMO-GEN-004", label: "Azithromycin 250mg", status: "genuine" },
];

const DemoQR = () => {
  const [selectedQR, setSelectedQR] = useState<DemoQRCode | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "genuine":
        return "bg-genuine";
      case "counterfeit":
        return "bg-counterfeit";
      case "unknown":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const downloadQR = (hash: string) => {
    const svg = document.getElementById(`qr-${hash}`) as any;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `${hash}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    toast({
      title: "QR Code Downloaded",
      description: `${hash}.png saved successfully`,
    });
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Hash Copied",
      description: `${hash} copied to clipboard`,
    });
  };

  const printAll = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Select your printer to print all QR codes",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Demo QR Codes</h1>
            <p className="text-muted-foreground">Test the scanning functionality with these sample codes</p>
          </div>
          <Button onClick={printAll} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoQRCodes.map((qrCode) => (
            <Card
              key={qrCode.id}
              className="hover-lift cursor-pointer transition-all duration-300 hover:border-primary"
              onClick={() => setSelectedQR(qrCode)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge className={getStatusColor(qrCode.status)}>
                    {qrCode.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{qrCode.label}</CardTitle>
                <CardDescription className="font-mono text-xs">{qrCode.hash}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4 bg-white p-4 rounded">
                  <QRCodeSVG
                    id={`qr-${qrCode.hash}`}
                    value={qrCode.hash}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadQR(qrCode.hash);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Download className="w-3 h-3" />
                    PNG
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyHash(qrCode.hash);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Copy className="w-3 h-3" />
                    Hash
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedQR && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedQR(null)}
          >
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedQR.label}</CardTitle>
                    <CardDescription className="font-mono">{selectedQR.hash}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedQR.status)}>
                    {selectedQR.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center bg-white p-8 rounded-lg">
                  <QRCodeSVG
                    value={selectedQR.hash}
                    size={400}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadQR(selectedQR.hash);
                    }}
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyHash(selectedQR.hash);
                    }}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Hash
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoQR;

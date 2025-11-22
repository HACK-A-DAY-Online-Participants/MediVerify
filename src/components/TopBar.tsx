import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Wifi, WifiOff, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const TopBar = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const userRole = localStorage.getItem("userRole") || "patient";

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-warning text-warning-foreground";
      case "pharmacy":
        return "bg-genuine text-genuine-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-genuine bg-clip-text text-transparent">
              MediVerify
            </span>
          </div>
          <Badge className={getRoleColor(userRole) + " capitalize"}>
            {userRole}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant={isOnline ? "default" : "secondary"} className="gap-2">
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

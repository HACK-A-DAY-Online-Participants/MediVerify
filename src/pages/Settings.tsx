import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Shield, Wifi } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "patient";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your current role and access level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Current Role</p>
                  <Badge className="capitalize">{userRole}</Badge>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Change Role
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="scan-alerts">Scan Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of scan results</p>
                  </div>
                </div>
                <Switch id="scan-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Counterfeit detection warnings</p>
                  </div>
                </div>
                <Switch id="security-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Configure application behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="offline-mode">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable offline scanning</p>
                  </div>
                </div>
                <Switch id="offline-mode" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-counterfeit/50">
            <CardHeader>
              <CardTitle className="text-counterfeit">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleLogout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

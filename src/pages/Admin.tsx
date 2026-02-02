import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Users, Shield, Activity } from "lucide-react";
import MapHeatmap from "@/components/MapHeatmap";

const Admin = () => {
  const adminStats = [
    {
      title: "Total Medicines",
      value: "2,456",
      icon: Database,
      color: "text-primary",
    },
    {
      title: "Registered Users",
      value: "15,234",
      icon: Users,
      color: "text-genuine",
    },
    {
      title: "Active Pharmacies",
      value: "342",
      icon: Shield,
      color: "text-warning",
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: Activity,
      color: "text-genuine",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">System administration and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <MapHeatmap />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Manage medicine records and verification data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">Medicine Database</p>
                  <p className="text-sm text-muted-foreground">2,456 active records</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">Verification Logs</p>
                  <p className="text-sm text-muted-foreground">125,432 total verifications</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">Counterfeit Reports</p>
                  <p className="text-sm text-muted-foreground">145 flagged products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
              <CardDescription>Performance and usage metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">Daily Active Users</p>
                  <p className="text-sm text-muted-foreground">8,234 users today</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">Scan Success Rate</p>
                  <p className="text-sm text-muted-foreground">98.5% successful scans</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-2">API Response Time</p>
                  <p className="text-sm text-muted-foreground">45ms average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;

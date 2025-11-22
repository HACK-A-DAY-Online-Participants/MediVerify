import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Scans",
      value: "1,234",
      change: "+12%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Genuine Medicines",
      value: "1,089",
      change: "+8%",
      icon: CheckCircle,
      color: "text-genuine",
    },
    {
      title: "Counterfeits Detected",
      value: "23",
      change: "-5%",
      icon: XCircle,
      color: "text-counterfeit",
    },
    {
      title: "Unknown Codes",
      value: "122",
      change: "+3%",
      icon: AlertCircle,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of verification statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest medicine verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <CheckCircle className="w-8 h-8 text-genuine" />
                <div className="flex-1">
                  <p className="font-semibold">Paracetamol 500mg - Verified</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <CheckCircle className="w-8 h-8 text-genuine" />
                <div className="flex-1">
                  <p className="font-semibold">Amoxicillin 500mg - Verified</p>
                  <p className="text-sm text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <XCircle className="w-8 h-8 text-counterfeit" />
                <div className="flex-1">
                  <p className="font-semibold">Unknown Product - Counterfeit Detected</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

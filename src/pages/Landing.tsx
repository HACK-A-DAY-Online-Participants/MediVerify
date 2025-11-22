import { useNavigate } from "react-router-dom";
import { UserRound, Building2, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Verify medicines before purchase to ensure authenticity",
      icon: UserRound,
      color: "primary",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      description: "Scan medicines to verify stock and provide customer assurance",
      icon: Building2,
      color: "genuine",
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Manage medicine database and view system analytics",
      icon: ShieldCheck,
      color: "warning",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    localStorage.setItem("userRole", roleId);
    navigate("/scan");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-genuine bg-clip-text text-transparent">
            MediVerify
          </h1>
          <p className="text-xl text-muted-foreground">
            Secure Medicine Authentication System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="hover-lift cursor-pointer border-2 border-border hover:border-primary transition-all duration-300 bg-card hover:glow-primary"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-6 rounded-full bg-background-lighter w-fit">
                    <Icon className={`w-12 h-12 text-${role.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Select your role to continue</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

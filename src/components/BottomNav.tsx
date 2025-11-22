import { NavLink } from "@/components/NavLink";
import { ScanLine, LayoutDashboard, ShieldCheck, QrCode, Settings } from "lucide-react";

const BottomNav = () => {
  const userRole = localStorage.getItem("userRole") || "patient";

  const navItems = [
    { to: "/scan", icon: ScanLine, label: "Scan" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/demo-qr", icon: QrCode, label: "Demo" },
  ];

  if (userRole === "admin") {
    navItems.splice(2, 0, { to: "/admin", icon: ShieldCheck, label: "Admin" });
  }

  navItems.push({ to: "/settings", icon: Settings, label: "Settings" });

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground transition-colors"
              activeClassName="text-primary"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

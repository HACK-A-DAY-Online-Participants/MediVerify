import { NavLink } from "@/components/NavLink";
import { ScanLine, LayoutDashboard, ShieldCheck, QrCode, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userRole = localStorage.getItem("userRole") || "patient";

  const navItems = [
    { to: "/scan", icon: ScanLine, label: "Scan Medicine" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/demo-qr", icon: QrCode, label: "Demo QR" },
  ];

  if (userRole === "admin") {
    navItems.splice(2, 0, { to: "/admin", icon: ShieldCheck, label: "Admin Panel" });
  }

  navItems.push({ to: "/settings", icon: Settings, label: "Settings" });

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <nav className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  activeClassName="bg-primary/10 text-primary font-medium"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

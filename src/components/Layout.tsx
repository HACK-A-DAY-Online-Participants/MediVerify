import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar />}
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Layout;

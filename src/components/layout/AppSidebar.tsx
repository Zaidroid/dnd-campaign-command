
import { Link, useLocation } from "react-router-dom";
import {
  BookOpenText,
  CalendarDays,
  Dice5,
  Hammer,
  Home,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme/ThemeSelector";

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Characters",
      path: "/characters",
      icon: ScrollText,
    },
    {
      name: "Campaigns",
      path: "/campaigns",
      icon: Hammer,
    },
    {
      name: "Sessions",
      path: "/sessions",
      icon: CalendarDays,
    },
    {
      name: "Party",
      path: "/party",
      icon: Users,
    },
    {
      name: "Compendium",
      path: "/compendium",
      icon: BookOpenText,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border w-64 fixed left-0 top-0 z-10">
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Dice5 size={28} className="text-sidebar-primary" />
          <span className="font-medieval text-sidebar-foreground text-2xl">
            D&D Companion
          </span>
        </Link>
      </div>
      
      <nav className="p-2 flex-1 overflow-auto scrollbar-none">
        {sidebarLinks.map((link) => {
          const isActive = currentPath === link.path || 
            (link.path !== "/dashboard" && currentPath.startsWith(link.path));
            
          return (
            <Link to={link.path} key={link.path}>
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "w-full justify-start mb-1 font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <link.icon size={18} className="mr-3" />
                {link.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border flex justify-between items-center">
        <Link to="/settings">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              currentPath === "/settings" &&
                "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
        </Link>
        
        <ThemeSelector />
      </div>
    </div>
  );
};

export default AppSidebar;

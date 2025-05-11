import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpenText,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Dice5,
  Hammer,
  Home,
  Menu,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Handle responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

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

  // Mobile hamburger button that's always visible
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 bg-sidebar text-sidebar-foreground"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu size={24} />
    </Button>
  );

  // Calculate sidebar width
  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  
  return (
    <>
      <MobileMenuButton />
      
      <div
        className={cn(
          "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border fixed left-0 top-0 z-40 transition-all duration-300",
          sidebarWidth,
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className={cn(
          "p-4 border-b border-sidebar-border flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Dice5 size={28} className="text-sidebar-primary" />
              <span className="font-medieval text-sidebar-foreground text-xl">
                D&D Companion
              </span>
            </Link>
          )}
          
          {collapsed && (
            <Link to="/dashboard">
              <Dice5 size={28} className="text-sidebar-primary" />
            </Link>
          )}
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-2"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          )}
        </div>
        
        <nav className="p-2 flex-1 overflow-auto scrollbar-none">
          <TooltipProvider>
            {sidebarLinks.map((link) => {
              const isActive = currentPath === link.path || 
                (link.path !== "/dashboard" && currentPath.startsWith(link.path));
              
              const buttonContent = (
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "lg"}
                  className={cn(
                    "w-full justify-start mb-1 font-medium",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    collapsed && "justify-center p-2"
                  )}
                >
                  <link.icon size={18} className={collapsed ? "" : "mr-3"} />
                  {!collapsed && link.name}
                </Button>
              );
                
              return collapsed ? (
                <Tooltip key={link.path}>
                  <TooltipTrigger asChild>
                    <Link to={link.path}>
                      {buttonContent}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link to={link.path} key={link.path}>
                  {buttonContent}
                </Link>
              );
            })}
          </TooltipProvider>
        </nav>
        
        <div className={cn(
          "p-4 border-t border-sidebar-border",
          collapsed ? "flex flex-col items-center gap-4" : "flex justify-between items-center"
        )}>
          {collapsed ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/settings">
                      <Button variant="ghost" size="icon">
                        <Settings size={18} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Settings
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ThemeSelector />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      
      {/* Add main content padding based on sidebar state */}
      <div className={cn(
        "transition-all duration-300",
        isMobile ? "ml-0" : (collapsed ? "ml-16" : "ml-64")
      )}>
        {/* Your main content goes here */}
      </div>
      
      {/* Dark overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AppSidebar;

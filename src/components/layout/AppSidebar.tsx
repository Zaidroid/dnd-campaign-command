
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Calendar, 
  BookOpen, 
  Users, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('dnd-authenticated');
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const sidebarItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/characters", icon: <User size={20} />, label: "Characters" },
    { to: "/campaigns", icon: <BookOpen size={20} />, label: "Campaigns" },
    { to: "/sessions", icon: <Calendar size={20} />, label: "Sessions" },
    { to: "/party", icon: <Users size={20} />, label: "Party" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" }
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar transition-all duration-300 relative border-r border-dnd-gold flex flex-col",
      isExpanded ? "w-64" : "w-16"
    )}>
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sidebar-foreground"
        >
          {isExpanded ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      <div className="p-4 flex items-center justify-center border-b border-dnd-gold">
        <h2 className={cn(
          "font-medieval text-2xl text-dnd-gold transition-opacity",
          isExpanded ? "opacity-100" : "opacity-0 hidden"
        )}>
          D&D Companion
        </h2>
        {!isExpanded && <span className="text-dnd-gold font-medieval text-2xl">D&D</span>}
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.to + item.label}>
              <NavLink 
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors",
                  isActive ? "bg-sidebar-accent/20 text-dnd-gold" : "",
                  !isExpanded ? "justify-center" : ""
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {isExpanded && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-dnd-gold">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20",
            !isExpanded && "justify-center"
          )}
        >
          <LogOut size={20} className="mr-3" />
          {isExpanded && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;

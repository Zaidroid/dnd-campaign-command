import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Moon, Sun, Laptop, Palette, CheckCircle2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeSelector = ({ collapsed = false }) => {
  const { theme, accentColor, setTheme, setAccentColor, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedAccent, setSelectedAccent] = useState(accentColor);
  
  // When theme context updates, update local state
  useEffect(() => {
    setSelectedTheme(theme);
    setSelectedAccent(accentColor);
  }, [theme, accentColor]);
  
  const handleSave = () => {
    setTheme(selectedTheme);
    setAccentColor(selectedAccent);
    toast.success("Theme preferences saved");
    setOpen(false);
  };

  // Define color variables for the accent colors
  const accentColors = {
    purple: {
      bg: "bg-dnd-purple",
      text: "text-dnd-purple",
      hover: "hover:bg-dnd-purple/90",
      border: "border-dnd-purple",
      textContrast: resolvedTheme === "dark" ? "text-white" : "text-black"
    },
    red: {
      bg: "bg-dnd-red",
      text: "text-dnd-red",
      hover: "hover:bg-dnd-red/90",
      border: "border-dnd-red",
      textContrast: resolvedTheme === "dark" ? "text-white" : "text-black"
    },
    green: {
      bg: "bg-dnd-green",
      text: "text-dnd-green",
      hover: "hover:bg-dnd-green/90",
      border: "border-dnd-green",
      textContrast: resolvedTheme === "dark" ? "text-white" : "text-black"
    },
    blue: {
      bg: "bg-blue-600",
      text: "text-blue-600",
      hover: "hover:bg-blue-600/90",
      border: "border-blue-600",
      textContrast: resolvedTheme === "dark" ? "text-white" : "text-black"
    },
    gold: {
      bg: "bg-dnd-gold",
      text: "text-dnd-gold",
      hover: "hover:bg-dnd-gold/90",
      border: "border-dnd-gold",
      textContrast: "text-black"
    }
  };
  
  // Get current accent color styles
  const currentAccent = accentColors[accentColor];
  
  return (
    <>
      <Button 
        variant="outline" 
        size={collapsed ? "icon" : "icon"}
        onClick={() => setOpen(true)}
        className={`rounded-full ${currentAccent.border} ${currentAccent.text}`}
        title="Theme Settings"
      >
        <Palette size={18} />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={`font-medieval ${currentAccent.text}`}>
              Theme Settings
            </DialogTitle>
            <DialogDescription>
              Customize the appearance of your D&D Companion
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <Label>Theme Mode</Label>
              <RadioGroup
                value={selectedTheme}
                onValueChange={(value) => setSelectedTheme(value as typeof theme)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="light"
                    id="light"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="light"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:${currentAccent.border} [&:has([data-state=checked])]:${currentAccent.border}`}
                  >
                    <Sun size={28} className="mb-3" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="dark"
                    id="dark"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="dark"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:${currentAccent.border} [&:has([data-state=checked])]:${currentAccent.border}`}
                  >
                    <Moon size={28} className="mb-3" />
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="system"
                    id="system"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="system"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:${currentAccent.border} [&:has([data-state=checked])]:${currentAccent.border}`}
                  >
                    <Laptop size={28} className="mb-3" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <Label>Accent Color</Label>
              <RadioGroup
                value={selectedAccent}
                onValueChange={(value) => setSelectedAccent(value as typeof accentColor)}
                className="grid grid-cols-5 gap-4 theme-selector-grid"
              >
                {Object.entries(accentColors).map(([colorName, styles]) => (
                  <div key={colorName}>
                    <RadioGroupItem
                      value={colorName}
                      id={colorName}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={colorName}
                      className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:${styles.border} [&:has([data-state=checked])]:${styles.border}`}
                    >
                      <div className={`w-6 h-6 rounded-full ${styles.bg} mb-2 relative`}>
                        {selectedAccent === colorName && (
                          <CheckCircle2 
                            className={`absolute -right-2 -top-2 ${
                              colorName === "gold" ? "text-dnd-purple" : "text-dnd-gold"
                            }`} 
                            size={16} 
                          />
                        )}
                      </div>
                      <span className={selectedAccent === colorName ? styles.text : ""}>
                        {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className={`${accentColors[selectedAccent].bg} ${accentColors[selectedAccent].hover} ${
                selectedAccent === "gold" ? "text-black" : "text-white"
              }`}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThemeSelector;

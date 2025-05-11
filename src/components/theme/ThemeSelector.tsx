
import { useState } from "react";
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

export const ThemeSelector = () => {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedAccent, setSelectedAccent] = useState(accentColor);
  
  const handleSave = () => {
    setTheme(selectedTheme);
    setAccentColor(selectedAccent);
    toast.success("Theme preferences saved");
    setOpen(false);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setOpen(true)}
        className="rounded-full"
      >
        <Palette size={18} />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Theme Settings</DialogTitle>
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
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
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
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
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
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
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
                className="grid grid-cols-5 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="purple"
                    id="purple"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="purple"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
                  >
                    <div className="w-6 h-6 rounded-full bg-dnd-purple mb-2 relative">
                      {selectedAccent === "purple" && (
                        <CheckCircle2 className="absolute -right-2 -top-2 text-dnd-gold" size={16} />
                      )}
                    </div>
                    Purple
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="red"
                    id="red"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="red"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
                  >
                    <div className="w-6 h-6 rounded-full bg-dnd-red mb-2 relative">
                      {selectedAccent === "red" && (
                        <CheckCircle2 className="absolute -right-2 -top-2 text-dnd-gold" size={16} />
                      )}
                    </div>
                    Red
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="green"
                    id="green"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="green"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
                  >
                    <div className="w-6 h-6 rounded-full bg-dnd-green mb-2 relative">
                      {selectedAccent === "green" && (
                        <CheckCircle2 className="absolute -right-2 -top-2 text-dnd-gold" size={16} />
                      )}
                    </div>
                    Green
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="blue"
                    id="blue"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="blue"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 mb-2 relative">
                      {selectedAccent === "blue" && (
                        <CheckCircle2 className="absolute -right-2 -top-2 text-dnd-gold" size={16} />
                      )}
                    </div>
                    Blue
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="gold"
                    id="gold"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="gold"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dnd-purple [&:has([data-state=checked])]:border-dnd-purple"
                  >
                    <div className="w-6 h-6 rounded-full bg-dnd-gold mb-2 relative">
                      {selectedAccent === "gold" && (
                        <CheckCircle2 className="absolute -right-2 -top-2 text-dnd-purple" size={16} />
                      )}
                    </div>
                    Gold
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-dnd-purple hover:bg-dnd-purple/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThemeSelector;

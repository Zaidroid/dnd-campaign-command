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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, ArrowUpDown, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface DescriptionGeneratorProps {
  initialDescription: string;
  onApply: (newDescription: string) => void;
}

export const DescriptionGenerator = ({ initialDescription, onApply }: DescriptionGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription || "");
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock function for generating description
  // In a real app, this would call an actual AI API
  const generateDescription = async (userPrompt: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let result = "";
    
    if (userPrompt.includes("forest")) {
      result = "A mysterious forest where ancient trees whisper secrets of forgotten magic. Adventurers tell tales of fey creatures that lead travelers astray and hidden groves where time flows differently. The local villages live in harmony with the woodland spirits, but lately, dark energies have been corrupting the heart of the forest.";
    } else if (userPrompt.includes("mountain")) {
      result = "Towering peaks shrouded in mist and legend, where dragons make their lairs and dwarven kingdoms carve elaborate halls beneath the stone. The treacherous paths are known only to the most seasoned mountaineers, and avalanches regularly reshape the landscape. Ancient prophecies speak of a treasure hidden at the highest summit.";
    } else if (userPrompt.includes("city")) {
      result = "A sprawling metropolis where intrigue and opportunity await at every corner. Noble houses vie for political power while thieves' guilds control the shadows. The city's diverse districts range from opulent marble palaces to cramped, dangerous slums. A centuries-old magical university draws scholars from across the realms.";
    } else if (userPrompt.includes("dungeon")) {
      result = "A labyrinthine dungeon of forgotten origin, rumored to contain artifacts of immense power. Its shifting walls confound mapmakers, and strange echoes suggest you're never truly alone within its depths. Previous expeditions have failed to return, but the promise of treasure continues to lure brave adventurers.";
    } else {
      result = "An epic adventure awaits your party in a world of magic and danger. Ancient evils stir in the shadows while kingdoms teeter on the brink of war. Heroes must rise to face these challenges, forging alliances and discovering powers within themselves they never knew existed. The fate of the realm hangs in the balance.";
    }
    
    setGeneratedText(result);
    setIsLoading(false);
  };
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }
    
    generateDescription(prompt);
  };
  
  const handleEnhance = () => {
    if (!description.trim()) {
      toast.error("Please enter some text to enhance");
      return;
    }
    
    setPrompt(`Enhance this D&D campaign description: ${description}`);
    generateDescription(`Enhance: ${description}`);
  };
  
  const handleApply = () => {
    onApply(generatedText);
    setDescription(generatedText);
    setOpen(false);
    toast.success("Description applied successfully");
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-2 top-8 text-dnd-purple hover:bg-dnd-purple/10"
        onClick={() => setOpen(true)}
        title="Generate AI description"
      >
        <Wand2 size={16} />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">
              <Sparkles className="inline-block mr-2" size={18} />
              AI Campaign Description Generator
            </DialogTitle>
            <DialogDescription>
              Use AI to create or enhance your campaign description
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate New</TabsTrigger>
              <TabsTrigger value="enhance">Enhance Existing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe what kind of campaign you want</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A political intrigue campaign set in a renaissance-inspired city state..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={handleGenerate} 
                className="w-full bg-dnd-purple hover:bg-dnd-purple/90"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Description"}
                {!isLoading && <Wand2 size={16} className="ml-2" />}
              </Button>
              
              {generatedText && (
                <div className="space-y-2">
                  <Label htmlFor="generated">Generated Description</Label>
                  <Textarea
                    id="generated"
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="enhance" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Description</Label>
                <Textarea
                  id="current"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your current description here..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={handleEnhance} 
                className="w-full bg-dnd-purple hover:bg-dnd-purple/90"
                disabled={isLoading || !description.trim()}
              >
                {isLoading ? "Enhancing..." : "Enhance Description"}
                {!isLoading && <ArrowUpDown size={16} className="ml-2" />}
              </Button>
              
              {generatedText && (
                <div className="space-y-2">
                  <Label htmlFor="enhanced">Enhanced Description</Label>
                  <Textarea
                    id="enhanced"
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              disabled={!generatedText} 
              onClick={handleApply}
              className="bg-dnd-purple hover:bg-dnd-purple/90"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DescriptionGenerator;

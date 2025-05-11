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
import { UserPlus, MapPin, Sword, ScrollText } from "lucide-react";
import { toast } from "sonner";

interface DmToolsProps {
  campaignId: string;
}

export const DmTools = ({ campaignId }: DmToolsProps) => {
  const [openTool, setOpenTool] = useState<string | null>(null);
  
  const handleClose = () => {
    setOpenTool(null);
  };
  
  const handleSaveNpc = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("NPC saved successfully");
    handleClose();
  };
  
  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Location saved successfully");
    handleClose();
  };
  
  const handleStartCombat = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Combat tracker initialized");
    handleClose();
  };
  
  return (
    <>
      <div className="space-y-3">
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={() => setOpenTool('npcs')}
        >
          <UserPlus size={16} className="mr-2" />
          Manage NPCs
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={() => setOpenTool('combat')}
        >
          <Sword size={16} className="mr-2" />
          Combat Tracker
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={() => setOpenTool('maps')}
        >
          <MapPin size={16} className="mr-2" />
          Manage Maps
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={() => setOpenTool('notes')}
        >
          <ScrollText size={16} className="mr-2" />
          DM Notes
        </Button>
      </div>
      
      {/* NPC Management Dialog */}
      <Dialog open={openTool === 'npcs'} onOpenChange={() => openTool === 'npcs' && handleClose()}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Manage NPCs</DialogTitle>
            <DialogDescription>
              Create and manage non-player characters for your campaign.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create NPC</TabsTrigger>
              <TabsTrigger value="list">NPC List</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <form onSubmit={handleSaveNpc} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="npc-name">Name</Label>
                  <Input id="npc-name" placeholder="Gundren Rockseeker" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="npc-description">Description</Label>
                  <Textarea 
                    id="npc-description" 
                    placeholder="A stout dwarf merchant from Neverwinter..." 
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="npc-role">Role in Campaign</Label>
                  <Input id="npc-role" placeholder="Quest giver, Villain, Ally..." />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                  <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">Save NPC</Button>
                </DialogFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="py-4">
                <p className="text-center text-gray-500">No NPCs added yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Combat Tracker Dialog */}
      <Dialog open={openTool === 'combat'} onOpenChange={() => openTool === 'combat' && handleClose()}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Combat Tracker</DialogTitle>
            <DialogDescription>
              Track initiative, hitpoints and status effects during combat.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleStartCombat} className="space-y-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medieval mb-2">Add Combatants</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input placeholder="Goblin 1" className="flex-1" />
                  <Input placeholder="Initiative" className="w-20" type="number" />
                  <Input placeholder="HP" className="w-16" type="number" />
                </div>
                <Button type="button" variant="outline" size="sm" className="w-full">+ Add Combatant</Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">Start Combat</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Maps Dialog */}
      <Dialog open={openTool === 'maps'} onOpenChange={() => openTool === 'maps' && handleClose()}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Manage Maps</DialogTitle>
            <DialogDescription>
              Add and organize maps for your campaign locations.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveLocation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location-name">Location Name</Label>
              <Input id="location-name" placeholder="Cragmaw Hideout" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location-description">Description</Label>
              <Textarea 
                id="location-description" 
                placeholder="A cave system used as a hideout by the Cragmaw goblins..." 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Upload Map Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500">Drag and drop an image, or click to select</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">Upload Image</Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">Save Location</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* DM Notes Dialog */}
      <Dialog open={openTool === 'notes'} onOpenChange={() => openTool === 'notes' && handleClose()}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">DM Notes</DialogTitle>
            <DialogDescription>
              Private notes only visible to you as the Dungeon Master.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dm-note-title">Note Title</Label>
              <Input id="dm-note-title" placeholder="Secret plot twist" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dm-note-content">Content</Label>
              <Textarea 
                id="dm-note-content" 
                placeholder="The blacksmith is actually working for the villain..." 
                className="min-h-[150px]"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">Save Note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DmTools;

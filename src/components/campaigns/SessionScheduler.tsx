
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

interface SessionSchedulerProps {
  campaignId: string;
  isDM: boolean;
}

export const SessionScheduler = ({ campaignId, isDM }: SessionSchedulerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 1 week from now
  );
  const [time, setTime] = useState("19:00"); // Default to 7 PM
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Session scheduled successfully!");
    setOpen(false);
  };
  
  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className={isDM ? "bg-dnd-purple hover:bg-dnd-purple/90" : "w-full bg-dnd-purple hover:bg-dnd-purple/90"}
      >
        {isDM && <CalendarIcon size={16} className="mr-2" />}
        Schedule Session
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Schedule a Session</DialogTitle>
            <DialogDescription>
              Plan your next game session and notify your players.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-title">Session Title</Label>
              <Input id="session-title" placeholder="The Final Confrontation" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session-description">Description (Optional)</Label>
              <Textarea 
                id="session-description" 
                placeholder="Prepare for the final battle against the necromancer..." 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-time">Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="session-time" 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session-location">Location (Optional)</Label>
              <Input 
                id="session-location" 
                placeholder="Discord, Roll20, or physical address..." 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">Schedule Session</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SessionScheduler;

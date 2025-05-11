
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

interface DiceRollerProps {
  onRoll?: (type: number, result: number) => void;
}

interface DiceType {
  sides: number;
  icon: React.ReactNode;
  color: string;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll }) => {
  const [open, setOpen] = useState(false);
  const [rolls, setRolls] = useState<{ type: number; result: number; timestamp: Date }[]>([]);

  const diceTypes: DiceType[] = [
    { sides: 4, icon: <Dice1 size={28} />, color: "bg-blue-500" },
    { sides: 6, icon: <Dice2 size={28} />, color: "bg-red-500" },
    { sides: 8, icon: <Dice3 size={28} />, color: "bg-green-500" },
    { sides: 10, icon: <Dice4 size={28} />, color: "bg-yellow-500" },
    { sides: 12, icon: <Dice5 size={28} />, color: "bg-purple-500" },
    { sides: 20, icon: <Dice6 size={28} />, color: "bg-dnd-red" },
    { sides: 100, icon: "d100", color: "bg-dnd-gold" }
  ];

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    
    const newRoll = {
      type: sides,
      result,
      timestamp: new Date()
    };
    
    setRolls(prev => [newRoll, ...prev.slice(0, 9)]); // Keep last 10 rolls
    
    if (onRoll) {
      onRoll(sides, result);
    }
    
    toast.success(`You rolled a d${sides} and got ${result}!`, {
      icon: <div className="animate-dice-roll">{getDiceIcon(sides)}</div>,
    });
  };
  
  const getDiceIcon = (sides: number) => {
    const dice = diceTypes.find(d => d.sides === sides);
    return dice ? dice.icon : <Dice5 />;
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-dnd-red hover:bg-dnd-red/90 fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg">
          <Dice5 size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh] sm:h-[55vh]">
        <DrawerHeader>
          <DrawerTitle className="font-medieval text-2xl text-dnd-purple">Dice Roller</DrawerTitle>
          <DrawerDescription>Roll your digital dice for your adventures</DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 py-2">
          <div className="grid grid-cols-7 gap-3 mb-8">
            {diceTypes.map((dice) => (
              <Button
                key={dice.sides}
                className={`${dice.color} hover:opacity-90 rounded-lg h-16 flex flex-col justify-center items-center`}
                onClick={() => rollDice(dice.sides)}
              >
                <div className="flex items-center justify-center">
                  {dice.icon}
                </div>
                <div className="text-xs font-bold mt-1">d{dice.sides}</div>
              </Button>
            ))}
          </div>
          
          <div className="border-t border-dnd-gold pt-4">
            <h3 className="text-lg font-medieval mb-2">Roll History</h3>
            <div className="max-h-[20vh] overflow-y-auto">
              {rolls.length > 0 ? (
                <ul className="space-y-2">
                  {rolls.map((roll, index) => (
                    <li key={index} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/60">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-md ${diceTypes.find(d => d.sides === roll.type)?.color || 'bg-gray-400'} flex items-center justify-center text-white mr-3`}>
                          {getDiceIcon(roll.type)}
                        </div>
                        <span>
                          d{roll.type} = <span className="font-bold">{roll.result}</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{formatTime(roll.timestamp)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">No rolls yet</p>
              )}
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" className="border-dnd-gold text-dnd-purple" onClick={() => setRolls([])}>
            Clear History
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DiceRoller;

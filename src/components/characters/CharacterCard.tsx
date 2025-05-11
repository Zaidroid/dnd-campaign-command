import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();
  
  const classColors = {
    Barbarian: "bg-red-700",
    Bard: "bg-pink-600",
    Cleric: "bg-gray-300",
    Druid: "bg-green-700",
    Fighter: "bg-orange-700",
    Monk: "bg-blue-500",
    Paladin: "bg-yellow-500",
    Ranger: "bg-green-500",
    Rogue: "bg-slate-800",
    Sorcerer: "bg-red-500",
    Warlock: "bg-purple-800",
    Wizard: "bg-blue-800",
    Artificer: "bg-amber-600",
  };
  
  const classColor = classColors[character.class as keyof typeof classColors] || "bg-gray-500";
  
  return (
    <Card className="dnd-card overflow-hidden border-2 hover:border-dnd-purple transition-all">
      <div className={`h-2 w-full ${classColor}`} />
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medieval text-dnd-purple">
          {character.name}
        </CardTitle>
        <CardDescription>
          {character.race} {character.class}, Level {character.level}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <div>
            <span className="font-bold">Background:</span> {character.background}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((ability) => (
            <div key={ability} className="flex flex-col items-center justify-center bg-white/70 border border-dnd-gold rounded-md p-1 w-12 h-16">
              <span className="text-xs font-bold">{ability}</span>
              <span className="text-lg">
                {character.abilityScores[ability.toLowerCase() as keyof typeof character.abilityScores]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="bg-dnd-purple hover:bg-dnd-purple/90 w-full" 
          onClick={() => navigate(`/character/${character.id}`)}
        >
          View Sheet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;

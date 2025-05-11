import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Character } from "@/types/character";
import AbilityScoreSection from "./sections/AbilityScoreSection";
import SkillsSection from "./sections/SkillsSection";
import InventorySection from "./sections/InventorySection";
import SpellsSection from "./sections/SpellsSection";
import FeaturesSection from "./sections/FeaturesSection";
import { Dice5 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const navigate = useNavigate();
  
  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    toast.success(`You rolled a d${sides} and got ${result}!`, {
      icon: <Dice5 className="animate-dice-roll" />,
    });
  };
  
  return (
    <div className="character-sheet max-w-6xl mx-auto my-6">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-medieval text-dnd-purple">{character.name}</h1>
            <p className="text-gray-600">
              {character.race} {character.class}, Level {character.level} • {character.background}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => rollDice(20)} className="bg-dnd-red hover:bg-dnd-red/90">Roll d20</Button>
            <Button onClick={() => navigate('/dashboard')} variant="outline">Back to Dashboard</Button>
          </div>
        </div>
        
        <Tabs defaultValue="abilities" className="w-full">
          <div className="mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="spells">Spells</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
          </div>
          
          <Card className="border-dnd-gold">
            <CardContent className="p-6">
              <TabsContent value="abilities" className="mt-0">
                <AbilityScoreSection character={character} />
              </TabsContent>
              <TabsContent value="skills" className="mt-0">
                <SkillsSection character={character} />
              </TabsContent>
              <TabsContent value="inventory" className="mt-0">
                <InventorySection character={character} />
              </TabsContent>
              <TabsContent value="spells" className="mt-0">
                <SpellsSection character={character} />
              </TabsContent>
              <TabsContent value="features" className="mt-0">
                <FeaturesSection character={character} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default CharacterSheet;


import { useState } from "react";
import CharacterCard from "./CharacterCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Character } from "@/types/character";

interface CharacterGridProps {
  characters: Character[];
  showHeader?: boolean;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, showHeader = false }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      {showHeader && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medieval text-dnd-purple">Your Characters</h2>
          <Button 
            onClick={() => navigate('/character/create')}
            className="bg-dnd-purple hover:bg-dnd-purple/90"
          >
            <Plus className="mr-2" size={16} />
            Create Character
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
        
        {characters.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
            <p className="text-center mb-4 text-gray-500">You haven't created any characters yet</p>
            <Button 
              onClick={() => navigate('/character/create')}
              className="bg-dnd-purple hover:bg-dnd-purple/90"
            >
              <Plus className="mr-2" size={16} />
              Create Your First Character
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterGrid;

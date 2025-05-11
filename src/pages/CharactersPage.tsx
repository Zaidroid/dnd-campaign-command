import DashboardLayout from "@/components/layout/DashboardLayout";
import CharacterGrid from "@/components/characters/CharacterGrid";
import { mockCharacters } from "@/data/mockCharacters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CharactersPage = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-medieval text-dnd-purple mb-2">Your Characters</h1>
        <p className="text-gray-600">Manage your D&D characters and create new ones.</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medieval text-dnd-purple">Character Library</h2>
        <Button 
          onClick={() => navigate('/character/create')}
          className="bg-dnd-purple hover:bg-dnd-purple/90 transition-colors"
        >
          <Plus className="mr-2" size={16} />
          Create Character
        </Button>
      </div>
      
      <CharacterGrid characters={mockCharacters} />
    </DashboardLayout>
  );
};

export default CharactersPage;

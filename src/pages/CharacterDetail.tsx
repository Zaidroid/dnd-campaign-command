import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CharacterSheet from "@/components/characters/CharacterSheet";
import { mockCharacters } from "@/data/mockCharacters";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const character = mockCharacters.find((char) => char.id === id);
  
  if (!character) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-medieval mb-4">Character Not Found</h1>
          <p className="mb-6 text-gray-500">The character you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <CharacterSheet character={character} />
    </DashboardLayout>
  );
};

export default CharacterDetail;

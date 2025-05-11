
import DashboardLayout from "@/components/layout/DashboardLayout";
import CharacterGrid from "@/components/characters/CharacterGrid";
import { mockCharacters } from "@/data/mockCharacters";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <CharacterGrid characters={mockCharacters} />
    </DashboardLayout>
  );
};

export default Dashboard;

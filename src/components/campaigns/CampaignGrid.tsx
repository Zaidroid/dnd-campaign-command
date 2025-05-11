
import { useState } from "react";
import CampaignCard from "./CampaignCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Campaign } from "@/types/campaign";

interface CampaignGridProps {
  dmCampaigns: Campaign[];
  playerCampaigns: Campaign[];
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ dmCampaigns, playerCampaigns }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dm' | 'player'>('dm');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medieval text-dnd-purple">Your Campaigns</h2>
        <Button 
          onClick={() => navigate('/campaign/create')}
          className="bg-dnd-purple hover:bg-dnd-purple/90"
        >
          <Plus className="mr-2" size={16} />
          Create Campaign
        </Button>
      </div>
      
      <div className="flex border-b border-dnd-gold mb-6">
        <button
          className={`py-2 px-4 font-medieval ${
            activeTab === 'dm'
              ? 'border-b-2 border-dnd-purple text-dnd-purple'
              : 'text-gray-500 hover:text-dnd-purple'
          }`}
          onClick={() => setActiveTab('dm')}
        >
          DM Campaigns
        </button>
        <button
          className={`py-2 px-4 font-medieval ${
            activeTab === 'player'
              ? 'border-b-2 border-dnd-purple text-dnd-purple'
              : 'text-gray-500 hover:text-dnd-purple'
          }`}
          onClick={() => setActiveTab('player')}
        >
          Player Campaigns
        </button>
      </div>
      
      {activeTab === 'dm' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dmCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} isDM={true} />
          ))}
          
          {dmCampaigns.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
              <p className="text-center mb-4 text-gray-500">You haven't created any campaigns as a DM yet</p>
              <Button 
                onClick={() => navigate('/campaign/create')}
                className="bg-dnd-purple hover:bg-dnd-purple/90"
              >
                <Plus className="mr-2" size={16} />
                Create Your First Campaign
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playerCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} isDM={false} />
          ))}
          
          {playerCampaigns.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
              <p className="text-center mb-4 text-gray-500">You aren't a player in any campaigns yet</p>
              <p className="text-gray-500">Ask your DM for an invitation code</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignGrid;

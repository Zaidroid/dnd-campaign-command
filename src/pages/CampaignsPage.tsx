import DashboardLayout from "@/components/layout/DashboardLayout";
import CampaignGrid from "@/components/campaigns/CampaignGrid";
import { mockCampaigns } from "@/data/mockCampaigns";

const CampaignsPage = () => {
  // Filter campaigns where user is DM and player
  const dmCampaigns = mockCampaigns.filter(campaign => campaign.dmId === "user1");
  const playerCampaigns = mockCampaigns.filter(campaign => 
    campaign.dmId !== "user1" && campaign.players.some(player => player.id === "user1")
  );
  
  return (
    <DashboardLayout>
      <CampaignGrid 
        dmCampaigns={dmCampaigns} 
        playerCampaigns={playerCampaigns} 
      />
    </DashboardLayout>
  );
};

export default CampaignsPage;


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
  isDM: boolean;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, isDM }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="dnd-card border-2 hover:border-dnd-purple transition-all overflow-hidden">
      <div className={`h-2 w-full ${isDM ? 'bg-dnd-purple' : 'bg-dnd-green'}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-medieval text-dnd-purple">
              {campaign.name}
            </CardTitle>
            <CardDescription>
              {isDM ? 'Dungeon Master' : 'Player'}
            </CardDescription>
          </div>
          {campaign.active && (
            <div className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full border border-green-200">
              Active
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700 line-clamp-2">{campaign.description}</p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={16} />
            <span>{campaign.players.length} players</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar size={16} />
            <span>{campaign.sessions.length} sessions</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="bg-dnd-purple hover:bg-dnd-purple/90 w-full" 
          onClick={() => navigate(`/campaign/${campaign.id}`)}
        >
          {isDM ? 'Manage Campaign' : 'View Campaign'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;


import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CharacterGrid from "@/components/characters/CharacterGrid";
import { mockCharacters } from "@/data/mockCharacters";
import { mockCampaigns } from "@/data/mockCampaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen, Users, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Get upcoming sessions (next 3)
  const allSessions = mockCampaigns.flatMap(campaign => 
    campaign.sessions.map(session => ({
      ...session,
      campaignName: campaign.name,
      campaignId: campaign.id,
    }))
  );
  
  const currentDate = new Date();
  const upcomingSessions = allSessions
    .filter(session => new Date(session.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Get active campaigns (limit to 2)
  const activeCampaigns = mockCampaigns
    .filter(campaign => campaign.active)
    .slice(0, 2);
  
  // Get recent characters (limit to 4)
  const recentCharacters = [...mockCharacters]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 4);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-medieval text-dnd-purple mb-2">Welcome, Adventurer!</h1>
        <p className="text-gray-600">Your D&D journey awaits. Here's your adventure summary.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="dnd-card col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-medieval text-dnd-purple text-xl">Upcoming Sessions</CardTitle>
            <CardDescription>Your next scheduled adventures</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="flex justify-between items-center p-3 bg-white/70 rounded-md hover:bg-white/90 transition-all border border-dnd-gold cursor-pointer"
                    onClick={() => navigate(`/sessions`)}
                  >
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-gray-600">
                        Campaign: {session.campaignName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medieval text-dnd-purple">{formatDate(session.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 mb-2">No upcoming sessions</p>
                <Button
                  onClick={() => navigate('/sessions')}
                  variant="outline"
                  className="border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                >
                  Schedule a Session
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-dnd-gold"
              onClick={() => navigate('/sessions')}
            >
              View All Sessions
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="dnd-card">
          <CardHeader>
            <CardTitle className="font-medieval text-dnd-purple text-xl">Active Campaigns</CardTitle>
            <CardDescription>Campaigns you're currently part of</CardDescription>
          </CardHeader>
          <CardContent>
            {activeCampaigns.length > 0 ? (
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="p-3 bg-white/70 rounded-md hover:bg-white/90 transition-all border border-dnd-gold cursor-pointer"
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                  >
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {campaign.dmId === "user1" 
                        ? 'You are the DM' 
                        : `DM: ${campaign.dmId === "user1" ? "You" : "Another DM"}`}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users size={14} className="mr-1" />
                      <span>{campaign.players.length} players</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 mb-2">No active campaigns</p>
                <Button
                  onClick={() => navigate('/campaigns')}
                  variant="outline"
                  className="border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                >
                  Browse Campaigns
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-dnd-gold"
              onClick={() => navigate('/campaigns')}
            >
              View All Campaigns
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medieval text-dnd-purple">Recent Characters</h2>
          <Button 
            onClick={() => navigate('/characters')}
            variant="outline"
            className="border-dnd-gold"
          >
            View All Characters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentCharacters.map((character) => (
            <Card key={character.id} className="dnd-card overflow-hidden border-2 hover:border-dnd-purple transition-all cursor-pointer"
                  onClick={() => navigate(`/character/${character.id}`)}>
              <div className="h-2 w-full bg-dnd-purple" />
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medieval text-dnd-purple">
                  {character.name}
                </CardTitle>
                <CardDescription>
                  {character.race} {character.class}, Level {character.level}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button 
                  className="bg-dnd-purple hover:bg-dnd-purple/90 w-full transition-colors" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/character/${character.id}`);
                  }}
                >
                  View Sheet
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

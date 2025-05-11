
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCampaigns } from "@/data/mockCampaigns";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SessionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  
  // Get all sessions from all campaigns
  const allSessions = mockCampaigns.flatMap(campaign => 
    campaign.sessions.map(session => ({
      ...session,
      campaignName: campaign.name,
      campaignId: campaign.id,
      isDM: campaign.dmId === "user1"
    }))
  );
  
  // Sort sessions by date and filter by upcoming/past
  const currentDate = new Date();
  const upcomingSessions = allSessions
    .filter(session => new Date(session.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  const pastSessions = allSessions
    .filter(session => new Date(session.date) < currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medieval text-dnd-purple">Game Sessions</h1>
        <Button 
          onClick={() => navigate('/session/create')}
          className="bg-dnd-purple hover:bg-dnd-purple/90"
        >
          <Plus className="mr-2" size={16} />
          Schedule Session
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-2 w-[200px] mb-6">
          <TabsTrigger 
            value="upcoming"
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger 
            value="past"
            onClick={() => setActiveTab("past")}
          >
            Past
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="dnd-card hover:border-dnd-purple transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medieval text-dnd-purple">
                    {session.title}
                  </CardTitle>
                  <CardDescription>
                    {session.campaignName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-dnd-purple" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-dnd-purple" />
                    <span>{formatTime(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-dnd-purple" />
                    <span>{session.isDM ? 'You are the DM' : 'You are a player'}</span>
                  </div>
                  {session.description && (
                    <p className="mt-2 text-gray-600">{session.description}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dnd-purple hover:bg-dnd-purple/90">
                    {new Date(session.date).toDateString() === new Date().toDateString() 
                      ? 'Join Session' 
                      : 'View Details'
                    }
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {upcomingSessions.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
                <p className="text-center mb-4 text-gray-500">No upcoming sessions scheduled</p>
                <Button 
                  onClick={() => navigate('/session/create')}
                  className="bg-dnd-purple hover:bg-dnd-purple/90"
                >
                  <Plus className="mr-2" size={16} />
                  Schedule Your First Session
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastSessions.map((session) => (
              <Card key={session.id} className="dnd-card hover:border-dnd-purple transition-all opacity-80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medieval text-dnd-purple">
                    {session.title}
                  </CardTitle>
                  <CardDescription>
                    {session.campaignName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-dnd-purple" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-dnd-purple" />
                    <span>{formatTime(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-dnd-purple" />
                    <span>{session.isDM ? 'You were the DM' : 'You were a player'}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                  >
                    View Notes
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {pastSessions.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
                <p className="text-center text-gray-500">No past sessions yet</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SessionsPage;

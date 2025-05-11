import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, MessageSquare } from "lucide-react";
import { mockCampaigns } from "@/data/mockCampaigns";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Friend {
  id: string;
  name: string;
  status: "online" | "offline" | "in-game";
  character?: {
    id: string;
    name: string;
    race: string;
    class: string;
  };
}

const mockFriends: Friend[] = [
  { 
    id: "friend1", 
    name: "Elminster", 
    status: "online",
    character: {
      id: "char1",
      name: "Gandalf",
      race: "Human",
      class: "Wizard"
    }
  },
  { 
    id: "friend2", 
    name: "Drizzt", 
    status: "in-game",
    character: {
      id: "char2",
      name: "Legolas",
      race: "Elf",
      class: "Ranger"
    }
  },
  { 
    id: "friend3", 
    name: "Bruenor", 
    status: "offline",
    character: {
      id: "char3",
      name: "Gimli",
      race: "Dwarf",
      class: "Fighter"
    }
  },
  { 
    id: "friend4", 
    name: "Tasha", 
    status: "online" 
  },
];

const PartyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get all players from all campaigns
  const partyMembers = mockCampaigns
    .filter(campaign => campaign.players.some(player => player.id === "user1") || campaign.dmId === "user1")
    .flatMap(campaign => {
      return campaign.players
        .filter(player => player.id !== "user1") // Exclude current user
        .map(player => ({
          id: player.id,
          name: player.name,
          campaignName: campaign.name,
          campaignId: campaign.id,
          isDM: campaign.dmId === player.id,
          characterId: player.characterId
        }));
    });
    
  // Remove duplicates based on player ID
  const uniquePartyMembers = Array.from(
    new Map(partyMembers.map(member => [member.id, member])).values()
  );
  
  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medieval text-dnd-purple">Party & Friends</h1>
        <Button 
          onClick={() => navigate('/friends/add')}
          className="bg-dnd-purple hover:bg-dnd-purple/90"
        >
          <Plus className="mr-2" size={16} />
          Add Friend
        </Button>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            className="pl-10 pr-4 py-2 border-dnd-gold focus:border-dnd-purple"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px] mb-6">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="party-members">Party Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="friends" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map((friend) => (
              <Card key={friend.id} className="dnd-card hover:border-dnd-purple transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-medieval text-dnd-purple flex items-center">
                        {friend.name}
                        <div className={`ml-2 w-2 h-2 rounded-full ${
                          friend.status === "online" ? "bg-green-500" :
                          friend.status === "in-game" ? "bg-blue-500" :
                          "bg-gray-400"
                        }`} />
                      </CardTitle>
                      <CardDescription>
                        {friend.status === "online" ? "Online" :
                         friend.status === "in-game" ? "In Game Session" :
                         "Offline"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {friend.character && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Main Character:</p>
                      <p className="font-medium">{friend.character.name}</p>
                      <p className="text-sm">{friend.character.race} {friend.character.class}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1 bg-dnd-gold hover:bg-dnd-gold/90 text-dnd-dark"
                    onClick={() => toast.success(`Message sent to ${friend.name}`)}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                    onClick={() => navigate(`/profile/${friend.id}`)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredFriends.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
                <p className="text-center mb-4 text-gray-500">No friends found matching your search</p>
                <Button 
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="party-members" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniquePartyMembers.map((member) => (
              <Card key={member.id} className="dnd-card hover:border-dnd-purple transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medieval text-dnd-purple">
                    {member.name}
                  </CardTitle>
                  <CardDescription>
                    From campaign: {member.campaignName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {member.isDM ? 'Dungeon Master' : 'Player'}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1 bg-dnd-gold hover:bg-dnd-gold/90 text-dnd-dark"
                    onClick={() => toast.success(`Friend request sent to ${member.name}`)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Friend
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-dnd-purple text-dnd-purple hover:bg-dnd-purple/10"
                    onClick={() => navigate(`/campaign/${member.campaignId}`)}
                  >
                    View Campaign
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {uniquePartyMembers.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-dnd-gold rounded-lg">
                <p className="text-center mb-4 text-gray-500">You're not in any campaigns with other players yet</p>
                <Button 
                  onClick={() => navigate('/campaigns')}
                  className="bg-dnd-purple hover:bg-dnd-purple/90"
                >
                  Browse Campaigns
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default PartyPage;

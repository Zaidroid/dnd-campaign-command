import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { mockCampaigns } from "@/data/mockCampaigns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Users, ArrowLeft, Plus, Copy } from "lucide-react";
import { toast } from "sonner";

// Import our new components
import { DmTools } from "@/components/campaigns/DmTools";
import { SessionScheduler } from "@/components/campaigns/SessionScheduler";
import { FriendManager } from "@/components/friends/FriendManager";

const generateInviteCode = () => {
  return `DND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [inviteCode, setInviteCode] = useState("");
  
  const campaign = mockCampaigns.find((c) => c.id === id);
  
  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-medieval mb-4 text-dnd-purple">Campaign Not Found</h1>
          <p className="mb-6">The campaign you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/campaigns")}>Return to Campaigns</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const isDM = campaign.dmId === "user1";
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleGenerateInvite = () => {
    const code = generateInviteCode();
    setInviteCode(code);
  };
  
  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success("Invite code copied to clipboard");
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center mb-6 gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/campaigns")}
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-3xl font-medieval text-dnd-purple">{campaign.name}</h1>
          <p className="text-gray-600">
            {isDM ? "You are the Dungeon Master" : "You are a player"}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medieval text-dnd-purple">Campaign Details</CardTitle>
                  <CardDescription>Overview of your campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medieval text-lg mb-2">Description</h3>
                      <p className="text-gray-700">{campaign.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medieval text-lg mb-2">Campaign Status</h3>
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${campaign.active ? "bg-green-500" : "bg-gray-400"}`}></span>
                        <span>{campaign.active ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medieval text-lg mb-2">Campaign Settings</h3>
                      <p>Setting: {campaign.setting || 'Not specified'}</p>
                      <p>Start Date: {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'Not specified'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sessions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-medieval text-dnd-purple">Sessions</CardTitle>
                    <CardDescription>Upcoming and past game sessions</CardDescription>
                  </div>
                  {isDM && (
                    <SessionScheduler campaignId={campaign.id} isDM={true} />
                  )}
                </CardHeader>
                <CardContent>
                  {campaign.sessions.length > 0 ? (
                    <div className="space-y-4 divide-y divide-dnd-gold/30">
                      {campaign.sessions.map((session) => (
                        <div key={session.id} className="pt-4 first:pt-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medieval text-lg">{session.title}</h3>
                              <p className="text-sm text-gray-500">{formattedDate(session.date)}</p>
                            </div>
                            {new Date(session.date) > new Date() && (
                              <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Upcoming
                              </div>
                            )}
                          </div>
                          <p className="mt-2 text-gray-700">{session.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Calendar size={40} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 mb-4">No sessions scheduled yet</p>
                      {isDM && (
                        <SessionScheduler campaignId={campaign.id} isDM={false} />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="players">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-medieval text-dnd-purple">Players</CardTitle>
                    <CardDescription>Adventurers in your party</CardDescription>
                  </div>
                  {isDM && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-dnd-purple hover:bg-dnd-purple/90">
                          <Plus size={16} className="mr-2" />
                          Invite Player
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite New Player</DialogTitle>
                          <DialogDescription>
                            Generate a code to invite a new player to join your campaign
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4">
                          {inviteCode ? (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium">Invite Code:</label>
                              <div className="flex gap-2">
                                <Input value={inviteCode} readOnly className="font-mono" />
                                <Button size="icon" variant="outline" onClick={copyInviteCode}>
                                  <Copy size={16} />
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500">Share this code with your players. It expires in 24 hours.</p>
                            </div>
                          ) : (
                            <Button className="w-full" onClick={handleGenerateInvite}>
                              Generate Invite Code
                            </Button>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setInviteCode("")}>
                            Close
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-dnd-purple/10 rounded-md">
                      <div className="w-8 h-8 bg-dnd-purple rounded-full flex items-center justify-center text-white font-medieval mr-3">
                        DM
                      </div>
                      <div>
                        <p className="font-medium">{campaign.dmId === "user1" ? "You" : "DM Name"}</p>
                        <p className="text-xs text-gray-500">Dungeon Master</p>
                      </div>
                    </div>
                    
                    {campaign.players.map((player) => (
                      <div key={player.id} className="flex items-center p-3 bg-white/70 rounded-md border border-dnd-gold/30">
                        <div className="w-8 h-8 bg-dnd-gold rounded-full flex items-center justify-center text-dnd-dark font-medieval mr-3">
                          {player.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{player.id === "user1" ? "You" : player.name}</p>
                          <p className="text-xs text-gray-500">Player</p>
                        </div>
                        {player.character && (
                          <div className="ml-auto text-right">
                            <p className="text-sm">{player.character.name}</p>
                            <p className="text-xs text-gray-500">
                              {player.character.race} {player.character.class}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medieval text-dnd-purple">Campaign Notes</CardTitle>
                  <CardDescription>Important information about your adventure</CardDescription>
                </CardHeader>
                <CardContent>
                  {campaign.notes && campaign.notes.length > 0 ? (
                    <div className="space-y-4">
                      {campaign.notes.map((note, index) => (
                        <div key={index} className="p-4 bg-white/70 rounded-md border border-dnd-gold/30">
                          <h3 className="font-medieval text-lg mb-1">{note.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Added by {note.author || 'Unknown'} on {note.date ? new Date(note.date).toLocaleDateString() : new Date(note.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">No notes have been added yet</p>
                      <Button className="bg-dnd-purple hover:bg-dnd-purple/90">
                        <Plus size={16} className="mr-2" />
                        Add First Note
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Campaign Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Users size={16} className="mr-2" />
                    Players
                  </span>
                  <span className="font-medium">{campaign.players.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Sessions
                  </span>
                  <span className="font-medium">{campaign.sessions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`inline-flex items-center ${campaign.active ? "text-green-600" : "text-gray-500"}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${campaign.active ? "bg-green-500" : "bg-gray-400"}`}></span>
                    {campaign.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isDM && (
            <Card>
              <CardHeader>
                <CardTitle className="font-medieval text-dnd-purple">DM Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <DmTools campaignId={campaign.id} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Party Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <FriendManager />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetail;

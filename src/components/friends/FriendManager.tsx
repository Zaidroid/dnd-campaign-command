
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Search, Check, X, Mail } from "lucide-react";
import { toast } from "sonner";

export const FriendManager = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - would come from API in a real app
  const friendRequests = [
    { id: "1", username: "Elminster", avatar: "E", pending: true },
    { id: "2", username: "Drizzt", avatar: "D", pending: true }
  ];
  
  const friends = [
    { id: "3", username: "Minsc", avatar: "M", status: "online" },
    { id: "4", username: "Jaheira", avatar: "J", status: "offline" }
  ];
  
  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast.success(`Friend request sent to ${searchQuery}`);
    setSearchQuery("");
  };
  
  const handleAcceptRequest = (username: string) => {
    toast.success(`You are now friends with ${username}`);
  };
  
  const handleRejectRequest = (username: string) => {
    toast.info(`Friend request from ${username} declined`);
  };
  
  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-dnd-purple hover:bg-dnd-purple/90"
      >
        <UserPlus size={16} className="mr-2" />
        Add Friend
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-medieval text-dnd-purple">Friend Manager</DialogTitle>
            <DialogDescription>
              Connect with other adventurers in the realm.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="add">Add Friend</TabsTrigger>
              <TabsTrigger value="requests">Requests {friendRequests.length > 0 && `(${friendRequests.length})`}</TabsTrigger>
              <TabsTrigger value="list">My Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add">
              <form onSubmit={handleAddFriend} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="friend-username">Find by Username</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="friend-username" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter username..." 
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-dnd-purple hover:bg-dnd-purple/90">
                      <Search size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Or invite via email</Label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="friend@example.com" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Mail size={16} />
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="requests">
              <div className="py-4 space-y-3">
                {friendRequests.length > 0 ? (
                  friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-white/70 rounded-md border border-dnd-gold/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-dnd-purple rounded-full flex items-center justify-center text-white">
                          {request.avatar}
                        </div>
                        <span>{request.username}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0" 
                          onClick={() => handleAcceptRequest(request.username)}
                        >
                          <Check size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-400 text-red-600 hover:bg-red-50 hover:text-red-600 h-8 w-8 p-0" 
                          onClick={() => handleRejectRequest(request.username)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No pending friend requests</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="py-4 space-y-3">
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-white/70 rounded-md border border-dnd-gold/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-dnd-gold rounded-full flex items-center justify-center text-dnd-dark">
                          {friend.avatar}
                        </div>
                        <div>
                          <p>{friend.username}</p>
                          <p className="text-xs text-gray-500">
                            {friend.status === "online" ? (
                              <span className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> 
                                Online
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                                Offline
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Message</Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Your friends list is empty</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FriendManager;

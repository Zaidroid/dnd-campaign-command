import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Adventurer1");
  const [email, setEmail] = useState("adventurer@example.com");
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    sessionReminders: true,
    friendRequests: true,
    soundEffects: true,
    diceAnimations: true,
    autoSave: true,
  });
  const [diceTheme, setDiceTheme] = useState("fantasy");
  
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };
  
  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };
  
  const handleDeleteAccount = () => {
    // In real app, we would have a confirmation dialog here
    toast.error("Account deletion requested");
    
    // In a real app we would handle actual deletion
    setTimeout(() => {
      localStorage.removeItem('dnd-authenticated');
      navigate('/auth');
    }, 2000);
  };
  
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-medieval text-dnd-purple">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-[300px] mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-0">
          <Card className="border-dnd-gold">
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-dnd-gold focus:border-dnd-purple"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-dnd-gold focus:border-dnd-purple" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-dnd-purple flex items-center justify-center text-white text-xl">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <Button variant="outline" className="border-dnd-gold">Change Avatar</Button>
                </div>
              </div>
              
              <Button 
                onClick={handleSaveProfile}
                className="bg-dnd-purple hover:bg-dnd-purple/90"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0">
          <Card className="border-dnd-gold">
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email updates about your campaigns</p>
                  </div>
                  <Switch 
                    checked={preferences.emailNotifications}
                    onCheckedChange={() => togglePreference('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session Reminders</h4>
                    <p className="text-sm text-gray-600">Get notifications before scheduled sessions</p>
                  </div>
                  <Switch 
                    checked={preferences.sessionReminders}
                    onCheckedChange={() => togglePreference('sessionReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Friend Requests</h4>
                    <p className="text-sm text-gray-600">Allow other users to send you friend requests</p>
                  </div>
                  <Switch 
                    checked={preferences.friendRequests}
                    onCheckedChange={() => togglePreference('friendRequests')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sound Effects</h4>
                    <p className="text-sm text-gray-600">Play sound effects for dice rolls and actions</p>
                  </div>
                  <Switch 
                    checked={preferences.soundEffects}
                    onCheckedChange={() => togglePreference('soundEffects')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dice Animations</h4>
                    <p className="text-sm text-gray-600">Show animations when rolling dice</p>
                  </div>
                  <Switch 
                    checked={preferences.diceAnimations}
                    onCheckedChange={() => togglePreference('diceAnimations')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Save</h4>
                    <p className="text-sm text-gray-600">Automatically save character and campaign changes</p>
                  </div>
                  <Switch 
                    checked={preferences.autoSave}
                    onCheckedChange={() => togglePreference('autoSave')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dice-theme">Dice Theme</Label>
                <Select value={diceTheme} onValueChange={setDiceTheme}>
                  <SelectTrigger className="border-dnd-gold">
                    <SelectValue placeholder="Select a dice theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="futuristic">Futuristic</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSavePreferences}
                className="bg-dnd-purple hover:bg-dnd-purple/90"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-0">
          <Card className="border-dnd-gold">
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Account Management</CardTitle>
              <CardDescription>Manage your account settings and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password"
                  placeholder="••••••••"
                  className="border-dnd-gold focus:border-dnd-purple" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder="••••••••"
                  className="border-dnd-gold focus:border-dnd-purple" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="••••••••"
                  className="border-dnd-gold focus:border-dnd-purple" 
                />
              </div>
              
              <Button 
                onClick={() => toast.success("Password updated successfully")}
                className="bg-dnd-purple hover:bg-dnd-purple/90"
              >
                Update Password
              </Button>
              
              <div className="pt-6 border-t border-dnd-gold">
                <h3 className="text-lg font-medieval text-destructive mb-4">Danger Zone</h3>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;

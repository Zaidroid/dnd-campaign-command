
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const settings = [
  "Forgotten Realms",
  "Eberron",
  "Ravenloft",
  "Greyhawk",
  "Dragonlance",
  "Homebrew"
];

const CampaignCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    setting: "Forgotten Realms",
    description: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSettingChange = (value: string) => {
    setFormData(prev => ({ ...prev, setting: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }
    
    // We'd normally save the data to the server here
    toast.success("Campaign created successfully!");
    navigate("/campaigns");
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
          <h1 className="text-3xl font-medieval text-dnd-purple">Create New Campaign</h1>
          <p className="text-gray-600">Begin your journey as a Dungeon Master</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Campaign Details</CardTitle>
              <CardDescription>Enter the information about your new adventure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="The Lost Mine of Phandelver"
                  className="bg-white/70 border-dnd-gold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="setting">Campaign Setting</Label>
                <Select value={formData.setting} onValueChange={handleSettingChange}>
                  <SelectTrigger className="bg-white/70 border-dnd-gold">
                    <SelectValue placeholder="Select a setting" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-dnd-gold">
                    {settings.map((setting) => (
                      <SelectItem key={setting} value={setting}>
                        {setting}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Describe your campaign and what players can expect..."
                  className="min-h-[150px] bg-white/70 border-dnd-gold"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/campaigns")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-dnd-purple hover:bg-dnd-purple/90">
                <Save size={16} className="mr-2" />
                Create Campaign
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-medieval text-dnd-purple">Tips for DMs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold">Prepare, but be flexible</h3>
                <p className="text-gray-600">Players will always surprise you. Have your key plots and locations prepared but be ready to improvise.</p>
              </div>
              <div>
                <h3 className="font-bold">Make NPCs memorable</h3>
                <p className="text-gray-600">Give each important NPC a unique trait or quirk that makes them stand out to your players.</p>
              </div>
              <div>
                <h3 className="font-bold">Keep the pace moving</h3>
                <p className="text-gray-600">Try to keep combat and decision-making flowing to maintain engagement and excitement.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignCreate;

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Dice5, 
  MapPin, 
  MessageSquare 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem('dnd-authenticated');
  
  const featureItems = [
    {
      icon: <BookOpen size={40} className="text-dnd-purple mb-4" />,
      title: "Campaign Management",
      description: "Create and manage campaigns as a Dungeon Master or join existing ones as a player"
    },
    {
      icon: <Users size={40} className="text-dnd-purple mb-4" />,
      title: "Character Creation",
      description: "Build characters with an intuitive creation wizard following D&D 5e rules"
    },
    {
      icon: <Calendar size={40} className="text-dnd-purple mb-4" />,
      title: "Session Scheduling",
      description: "Schedule game sessions with your party and get notifications"
    },
    {
      icon: <Dice5 size={40} className="text-dnd-purple mb-4" />,
      title: "Interactive Dice Rolling",
      description: "Roll dice in real-time with your party members during gameplay"
    },
    {
      icon: <MapPin size={40} className="text-dnd-purple mb-4" />,
      title: "Map Management",
      description: "Create and share maps with fog of war control for immersive gameplay"
    },
    {
      icon: <MessageSquare size={40} className="text-dnd-purple mb-4" />,
      title: "Party Chat",
      description: "Communicate with your party members in real-time during and between sessions"
    }
  ];
  
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-tavern bg-cover bg-center min-h-screen flex items-center relative">
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-medieval text-5xl md:text-7xl text-dnd-gold mb-6">
                D&D Companion
              </h1>
              <p className="text-white text-xl md:text-2xl mb-12">
                The ultimate digital toolset for Dungeons & Dragons players and Dungeon Masters
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {isAuthenticated ? (
                  <Button 
                    className="bg-dnd-purple hover:bg-dnd-purple/90 text-white font-medieval py-6 px-8 text-lg"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      className="bg-dnd-purple hover:bg-dnd-purple/90 text-white font-medieval py-6 px-8 text-lg"
                      onClick={() => navigate("/auth")}
                    >
                      Start Your Adventure
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-dnd-gold text-dnd-gold hover:bg-dnd-gold/20 font-medieval py-6 px-8 text-lg"
                    >
                      Learn More
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-24 bg-parchment">
          <div className="container mx-auto px-6">
            <h2 className="font-medieval text-4xl text-dnd-purple text-center mb-16">
              Enhance Your D&D Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featureItems.map((feature, index) => (
                <div key={index} className="dnd-card text-center p-8 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-medieval text-2xl text-dnd-purple mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-dnd-purple py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-medieval text-4xl text-dnd-gold mb-8">
              Ready to Begin Your Quest?
            </h2>
            <p className="text-white text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of players and Dungeon Masters who are elevating their D&D experience with our comprehensive digital toolset.
            </p>
            <Button 
              className="bg-dnd-gold hover:bg-dnd-gold/90 text-dnd-purple font-medieval py-6 px-8 text-lg"
              onClick={() => navigate("/auth")}
            >
              {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-dnd-dark py-12 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="font-medieval text-2xl text-dnd-gold">D&D Companion</h2>
              </div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-dnd-gold transition-colors">About</a>
                <a href="#" className="hover:text-dnd-gold transition-colors">Features</a>
                <a href="#" className="hover:text-dnd-gold transition-colors">Support</a>
                <a href="#" className="hover:text-dnd-gold transition-colors">Privacy</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-gray-400">
              <p>© 2025 D&D Companion. All rights reserved. Not affiliated with Wizards of the Coast.</p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
};

export default Index;

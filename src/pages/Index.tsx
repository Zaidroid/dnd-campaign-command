
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Hero section with background */}
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/tavern-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="relative z-10 text-center px-6 py-20 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-medieval text-white mb-4">
            D&D Companion
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-fantasy">
            The ultimate web application for Dungeons & Dragons players and Dungeon Masters
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-dnd-purple hover:bg-dnd-purple/90 text-lg py-6 px-8"
              onClick={() => navigate("/auth")}
            >
              Start Your Adventure
            </Button>
            <Button 
              variant="outline" 
              className="border-dnd-gold text-dnd-gold hover:bg-dnd-gold/20 text-lg py-6 px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-medieval text-dnd-purple text-center mb-12">
            Everything You Need for Your Adventures
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Character Management",
                description: "Create and manage your D&D 5e characters with an intuitive character sheet that handles all calculations for you.",
                icon: "🧙‍♂️"
              },
              {
                title: "Campaign Tools",
                description: "Organize your campaigns, track sessions, take notes, and manage your party whether you're a player or the DM.",
                icon: "🗺️"
              },
              {
                title: "Quick Reference",
                description: "Access rules, spells, items, and monsters from the D&D 5e ruleset at your fingertips during gameplay.",
                icon: "📚"
              },
            ].map((feature, index) => (
              <div key={index} className="dnd-card p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medieval text-dnd-purple mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="py-16 px-6 bg-dnd-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-medieval mb-4">Begin Your Quest Today</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of adventurers already using D&D Companion for their tabletop roleplaying games.
          </p>
          <Button 
            className="bg-dnd-gold text-dnd-dark hover:bg-dnd-gold/90 text-lg py-6 px-8"
            onClick={() => navigate("/auth")}
          >
            Create Your Free Account
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-medieval text-xl text-dnd-gold">D&D Companion</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Features</a>
              <a href="#" className="hover:text-white">Pricing</a>
              <a href="#" className="hover:text-white">Support</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>D&D Companion is not affiliated with Wizards of the Coast. Dungeons & Dragons and D&D are trademarks of Wizards of the Coast.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

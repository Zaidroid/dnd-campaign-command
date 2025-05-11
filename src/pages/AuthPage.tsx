
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("dnd-authenticated") === "true");
  
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-tavern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-md w-full p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-dnd-gold">
          <h1 className="font-medieval text-3xl text-dnd-purple text-center mb-6">You're Already Logged In</h1>
          <p className="text-gray-700 mb-8 text-center">
            You're already logged into your D&D Companion account. Would you like to continue to your dashboard?
          </p>
          <div className="flex flex-col gap-4">
            <Button
              className="bg-dnd-purple hover:bg-dnd-purple/90 w-full py-6"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-dnd-gold text-dnd-dark w-full"
              onClick={() => {
                localStorage.removeItem("dnd-authenticated");
                setIsAuthenticated(false);
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-tavern bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-medieval text-5xl text-dnd-gold mb-4">D&D Companion</h1>
          <p className="text-white text-lg">Your digital toolset for tabletop adventures</p>
        </div>
        
        <AuthForm />
        
        <div className="mt-6 text-center">
          <Button
            variant="link"
            className="text-dnd-gold hover:text-dnd-gold/90"
            onClick={() => navigate("/")}
          >
            Return to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CharacterDetail from "./pages/CharacterDetail";
import CharacterCreate from "./pages/CharacterCreate";
import CampaignsPage from "./pages/CampaignsPage";
import SessionsPage from "./pages/SessionsPage";
import PartyPage from "./pages/PartyPage";
import SettingsPage from "./pages/SettingsPage";
import DiceRoller from "./components/dice/DiceRoller";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/character/create" element={<CharacterCreate />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DiceRoller />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

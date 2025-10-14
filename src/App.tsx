import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BusinessDetails from "./pages/onboarding/BusinessDetails";
import VoiceSelection from "./pages/onboarding/VoiceSelection";
import AgentSettings from "./pages/onboarding/AgentSettings";
import PhoneNumber from "./pages/onboarding/PhoneNumber";
import Success from "./pages/onboarding/Success";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding/business" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding/business" element={<BusinessDetails />} />
          <Route path="/onboarding/voice" element={<VoiceSelection />} />
          <Route path="/onboarding/settings" element={<AgentSettings />} />
          <Route path="/onboarding/phone" element={<PhoneNumber />} />
          <Route path="/onboarding/success" element={<Success />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

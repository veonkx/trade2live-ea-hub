import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import EADetailPage from "./pages/EADetailPage";
import CopyTradePage from "./pages/CopyTradePage";
import VPSServicePage from "./pages/VPSServicePage";
import PricingPage from "./pages/PricingPage";
import PerformancePage from "./pages/PerformancePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import TermsPage from "./pages/TermsPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import MyVPSPage from "./pages/MyVPSPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminVPSPage from "./pages/AdminVPSPage";
import AdminVPSSubscriptionsPage from "./pages/AdminVPSSubscriptionsPage";
import AdminPerformancePage from "./pages/AdminPerformancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ea/:id" element={<EADetailPage />} />
              <Route path="/copy-trade" element={<CopyTradePage />} />
              <Route path="/vps-service" element={<VPSServicePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/my-vps" element={<MyVPSPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/vps" element={<AdminVPSPage />} />
              <Route path="/admin/vps-subscriptions" element={<AdminVPSSubscriptionsPage />} />
              <Route path="/admin/performance" element={<AdminPerformancePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

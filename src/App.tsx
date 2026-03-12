import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import GlobalNews from "@/pages/GlobalNews";
import Economy from "@/pages/Economy";
import Markets from "@/pages/Markets";
import Conflicts from "@/pages/Conflicts";
import Disasters from "@/pages/Disasters";
import AIReports from "@/pages/AIReports";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<GlobalNews />} />
            <Route path="/economy" element={<Economy />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/conflicts" element={<Conflicts />} />
            <Route path="/disasters" element={<Disasters />} />
            <Route path="/ai-reports" element={<AIReports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtigoPage from "./pages/ArtigoPage";
import EditorialPage from "./pages/EditorialPage";
import Radio88FMPage from "./pages/Radio88FMPage";
import { EditorialProvider } from "@/contexts/EditorialContext";
import { StationProvider } from "@/contexts/StationContext";
import { StationRoute } from "./contexts/StationRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StationProvider>
        <EditorialProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/radio88fm" replace />} />
              <Route
                path="/radio88fm"
                element={
                  <StationRoute stationId="radio88fm">
                    <Radio88FMPage />
                  </StationRoute>
                }
              />
              <Route
                path="/fatopopular"
                element={
                  <StationRoute stationId="fatopopular">
                    <Index />
                  </StationRoute>
                }
              />
              <Route
                path="/radio89maravilha"
                element={
                  <StationRoute stationId="radio89maravilha">
                    <Index />
                  </StationRoute>
                }
              />
              <Route
                path="/gtfnews"
                element={
                  <StationRoute stationId="gtfnews">
                    <Index />
                  </StationRoute>
                }
              />
              <Route path="/editorial/:editorialId" element={<EditorialPage />} />
              <Route path="/noticia/:id" element={<ArtigoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </EditorialProvider>
      </StationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

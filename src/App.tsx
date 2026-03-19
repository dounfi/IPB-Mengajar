import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index.tsx";
import Programs from "./pages/Programs.tsx";
import Gallery from "./pages/Gallery.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Wrapper yang handle page transition
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      style={{ animation: "pageEnter 0.65s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/galeri" element={<Gallery />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
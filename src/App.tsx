import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/cookies" element={<Cookies />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;

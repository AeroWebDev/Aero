import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const timeout = window.setTimeout(resetScroll, 100);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;

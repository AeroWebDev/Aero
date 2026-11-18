import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition
 * Wraps every route in a fade + slide-up entrance animation.
 * On route change the old page fades out, the new page fades in.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Reset to invisible-shifted state, then animate in
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";

    // Let the browser paint the reset frame, then start the transition
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} style={{ opacity: 0, transform: "translateY(18px)" }}>
      {children}
    </div>
  );
}

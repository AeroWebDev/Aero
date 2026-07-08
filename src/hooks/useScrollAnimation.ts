import { useEffect, useRef } from "react";

/**
 * useScrollAnimation
 *
 * Attaches an IntersectionObserver to a container element.
 * When the element enters the viewport it adds `in-view` to the element,
 * which CSS animations then target.
 *
 * @param threshold  - 0–1, how much of the element must be visible (default 0.15)
 * @param rootMargin - margin around the viewport (default "0px")
 */
export function useScrollAnimation(
  threshold: number = 0.15,
  rootMargin: string = "0px"
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            // Stop observing once animated – keeps it a one-shot animation
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

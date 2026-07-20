import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
            autoRaf: false,
            anchors: true,
        });

        let animationFrameId = 0;

        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return null;
}

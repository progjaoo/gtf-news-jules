import { useEffect, useRef, useState } from "react";

export function useScrollHeader() {
  const [showTop, setShowTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        // Only toggle when crossing the threshold with hysteresis
        if (currentY < 20) {
          setShowTop(true);
        } else if (currentY > 80) {
          setShowTop(false);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showTop };
}

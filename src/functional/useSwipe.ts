import { useState, useEffect } from "react";

const useSwipe = (onSwipe: (direction: string) => void) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleTouchStart = (e: any) => {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = (e: any) => {
      setTouchEnd({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });

      const dx = touchEnd.x - touchStart.x;
      const dy = touchEnd.y - touchStart.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 50) onSwipe("right");
        else if (dx < -50) onSwipe("left");
      } else {
        if (dy > 50) onSwipe("down");
        else if (dy < -50) onSwipe("up");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStart, touchEnd, onSwipe]);

  return null;
};

export default useSwipe;

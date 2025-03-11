import { useEffect } from "react";

const useKeyboardControls = (onMove: (direction: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          onMove("up");
          break;
        case "w":
          onMove("up");
          break;
        case "ArrowDown":
          onMove("down");
          break;
        case "s":
            onMove("down");
            break;   
        case "ArrowLeft":
          onMove("left");
          break;
        case "a":
            onMove("left");
            break;
        case "ArrowRight":
          onMove("right");
          break;
        case "d":
            onMove("right");
            break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMove]);
};

export default useKeyboardControls
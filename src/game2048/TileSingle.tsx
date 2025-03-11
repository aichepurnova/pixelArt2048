import { TileProps } from "./types";
import CSS from "./game2048.module.css";
import { AnimatePresence, motion, Variants } from "framer-motion";

function TileSingle({ x, y, value, isNew }: TileProps) {
  return (
    <motion.div
      key={x + "-" + y}
      className={
        CSS["tile"] + " " + (value === 0 ? CSS["empty"] : CSS["value"])
      }
      layout
      initial={isNew ? { scale: 0.5, opacity: 0 } : {}}
      animate={{
        scale: 1,
        opacity: 1,
        backgroundColor: `var(--tile-${value}-color)`,
      }}
      transition={{
        layout: { type: "spring", stiffness: 200, damping: 15, duration: 3 }, // 👈 Smooth tile movement
        scale: { type: "spring", stiffness: 200, damping: 12, duration: 3 },
        opacity: { duration: 0.3 },
        backgroundColor: { duration: 0.1, ease: "easeInOut" },
      }}
    >
      {value}
    </motion.div>
  );
}
export default TileSingle;

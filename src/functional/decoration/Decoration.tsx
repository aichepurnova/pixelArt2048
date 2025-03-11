import { motion, Variants } from "framer-motion";
import CSS from "./decoration.module.css";

interface Props {
  type: string;
}

const getRandomY = () => Math.random() * 80 + 10; // Keep clouds in a good range
const getRandomX = () => Math.random() * 200 - 210; // Start off-screen

const cloudVariants: Variants = {
  animate: ({
    delay,
    startX,
    startY,
  }: {
    delay: number;
    startX: number;
    startY: number;
  }) => ({
    x: [`${startX}vw`, "110vw"], // Moves from near left edge to just past right edge
    y: [startY, startY + 15, startY - 15, startY], // Smooth up-down movement

    transition: {
      x: {
        ease: "linear",
        duration: 40, // Adjust speed
        repeat: Infinity,
        repeatType: "loop",
        delay,
      },
      y: {
        ease: "easeInOut",
        duration: 6, // Controls vertical wave speed
        repeat: Infinity,
        repeatType: "mirror", // Moves up & down smoothly
      },
    },
  }),
};

const decorationVariants = {
  cloud: cloudVariants,
};

function Decoration({ type }: Props) {
  return (
    <div className={CSS[type + "s"]}>
      {Array.from({ length: 5 }).map((_, i) => {
        const startY = getRandomY(); // Random height
        const startX = getRandomX(); // Random X position (slightly off-screen)
        const delay = Math.random() * 5; // Random delay for realism

        return (
          <motion.div
            key={i}
            variants={
              decorationVariants[type as keyof typeof decorationVariants]
            }
            className={CSS[type]}
            data-value={i + 1}
            animate="animate"
            initial={{ x: `${startX}vw`, y: `${startY}vh` }}
            custom={{ delay: delay, startX: startX, startY: startY }}
          ></motion.div>
        );
      })}
    </div>
  );
}

export default Decoration;

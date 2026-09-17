import { motion } from "motion/react";

const transition = { type: "spring", stiffness: 120, damping: 15 };

export const ScatterplotDot = ({ x, y }) => {
  return (
    <g>
        <motion.circle
          r={10}
          stroke="rgb(60, 60, 60)"
          fill={"#3B3561"}
          fillOpacity={0.4}
          animate={{ cx: x, cy: y }}
          transition={transition}
        />
    </g>
  );
};
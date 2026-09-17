import { motion } from "motion/react";

const transition = { type: "spring", stiffness: 80, damping: 20 };

export const ScatterplotItem = ({ x, y }) => {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={10}
        stroke="rgb(60, 60, 60)"
        fill={"#3B3561"}
        fillOpacity={0.4}
      />
    </g>
  );
};
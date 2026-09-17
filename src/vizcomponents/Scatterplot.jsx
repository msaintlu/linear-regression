import * as d3 from "d3";
import { useRef, useState, useMemo } from "react";
import { useDimensions } from "./useDimensions";
//import { ScatterplotDot } from "./ScatterplotDot";
import { motion, AnimatePresence } from "motion/react";


export const ResponsiveScatterplot = (props) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);
  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
      <Scatterplot
        height={chartSize.height}
        width={chartSize.width}
        {...props} // pass all the props
      />
    </div>
  );
};

const Scatterplot = ({ width, height, data, MARGIN, showLine }) => {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);

  // Slope and intercept of the linear regression line (y = slope * x + intercept)
  const linearRegression = (data) => {
    const xMean = d3.mean(data, (d) => d.x);
    const yMean = d3.mean(data, (d) => d.y);
    const slope =
      d3.sum(data, (d) => (d.x - xMean) * (d.y - yMean)) /
      d3.sum(data, (d) => (d.x - xMean) ** 2);
    const intercept = yMean - slope * xMean;
    return { slope, intercept };
  };
  // Coefficient of determination R²
  const computeR2 = (data, slope, intercept) => {
    const yMean = d3.mean(data, (d) => d.y);
    const ssTotal = d3.sum(data, (d) => (d.y - yMean) ** 2);
    const ssResidual = d3.sum(
      data,
      (d) => (d.y - (slope * d.x + intercept)) ** 2
    );
    return 1 - ssResidual / ssTotal;
  };

  const f_x = (x) => {
    return linearRegression(data).intercept + linearRegression(data).slope * x;
  };
  
  const transition = { type: "spring", stiffness: 120, damping: 15 };

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <g transform={`translate( ${MARGIN.left}, ${MARGIN.top} )`}>
          <AnimatePresence>
            {data.map((d, i) => (
              <motion.circle
                key={i}
                r={10}
                stroke="rgb(60, 60, 60)"
                fill={"#3B3561"}
                fillOpacity={0.4}
                initial={{ cx: xScale(5), cy: yScale(5) }}
                animate={{ cx: xScale(d.x), cy: yScale(d.y) }}
                transition={transition}
              />
            ))}
          </AnimatePresence>
          {showLine && (
            <>
              <motion.line
                x1={xScale(1)}
                x2={xScale(10)}
                y1={yScale(f_x(1))}
                y2={yScale(f_x(10))}
                stroke="black"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <text x={xScale(9)} y={yScale(0)}>
                R
                <tspan dy="-5" fontSize="0.7em">
                  2
                </tspan>
                <tspan dy="5" fontSize="1em">
                  {" "}
                  ={" "}
                  {computeR2(
                    data,
                    linearRegression(data).slope,
                    linearRegression(data).intercept
                  ).toFixed(2)}
                </tspan>
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
import * as d3 from "d3";
import { useRef, useState, useMemo } from "react";
import { useDimensions } from "./useDimensions";
import { ScatterplotDot } from "./ScatterplotDot";
import { motion } from "motion/react";


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

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <g transform={`translate( ${MARGIN.left}, ${MARGIN.top} )`}>
          {data.map((d, i) => (
            <ScatterplotDot key={i} x={xScale(d.x)} y={yScale(d.y)} />
          ))}
          {showLine && (
            <motion.line
              x1={xScale(0)}
              x2={xScale(10)}
              y1={yScale(linearRegression(data).intercept)}
              y2={yScale(
                linearRegression(data).intercept +
                  linearRegression(data).slope * 10
              )}
              stroke="black"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </g>
      </svg>
    </div>
  );
};
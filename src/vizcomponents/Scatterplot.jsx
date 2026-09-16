import * as d3 from "d3";
import { useRef, useState, useMemo } from "react";
import { useDimensions } from "./useDimensions";


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

const Scatterplot = ({ width, height, data, MARGIN }) => {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g transform={`translate( ${MARGIN.left}, ${MARGIN.top} )`}>
        </g>
      </svg>
    </div>
  );
};
import * as d3 from "d3";
import { useRef, useState, useMemo } from "react";
import { useDimensions } from "./useDimensions";
import { ScatterplotItem } from "./ScatterplotItem";


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

  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <g transform={`translate( ${MARGIN.left}, ${MARGIN.top} )`}>
          {data.map((d, i) => (
            <ScatterplotItem key={i} x={xScale(d.x)} y={yScale(d.y)} />
          ))}
        </g>
      </svg>
    </div>
  );
};
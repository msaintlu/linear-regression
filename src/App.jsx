import { useState } from 'react';
import { ResponsiveScatterplot } from './vizcomponents/Scatterplot';
import * as d3 from "d3";


const MARGIN = { top: 15, right: 50, bottom: 70, left: 92 };
const width = 1000;

const generateData = (numberOfPoints = 13) => {
  const randomX = d3.randomInt(1, 11);
  const randomNoise = d3.randomNormal(0, 2.5);

  return Array.from({ length: numberOfPoints }, () => {
    const x = randomX();

    const y = 0.8 * x + randomNoise();

    return {
      x,
      y: Math.max(1, Math.min(10, y)),
    };
  });
};

function App() {
  const [data, setData] = useState(() => generateData(13));
  const [showLine, setShowLine] = useState(false);


  const handleShuffle = () => {
    setData(generateData(13));
    setShowLine(false);
  };

  return (
    <>
      <div
        style={{
          marginTop: 50,
          marginBottom: 20,
          marginLeft: 15,
        }}
      >
        <p style={{ fontWeight: "bolder", fontSize: 32 }}>
          Where would you draw the line?
        </p>
        <p style={{ fontSize: 18, fontStyle: "italic", marginTop: -25 }}>
          Can you guess the correlation?
        </p>
      </div>

      <div
        style={{
          width: { width },
          height: "1px",
          backgroundColor: "black",
          marginLeft: 15,
          marginBottom: 20,
          marginTop: -10
        }}
      />

      <div style={{ padding: 16 }}>
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={() => setShowLine(true)}>Show correlation</button>
      </div>

      <div className="heatmap-container" style={{ height: 600 }}>
        <ResponsiveScatterplot data={data} MARGIN={MARGIN} showLine={showLine} />
      </div>
    </>
  );
}


export default App

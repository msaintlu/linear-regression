import { useState } from 'react';
import { ResponsiveScatterplot } from './vizcomponents/Scatterplot';
import * as d3 from "d3";
import { translateAxis } from 'motion';


const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };

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
    <div className="main-container">
 
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontWeight: "bolder", fontSize: 32 }}>
          Where would you draw the line?
        </p>
        <p style={{ fontSize: 18, marginTop: -25 }}>
          Guess the correlation
        </p>
      </div>

      <div className="line"/>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="button" onClick={handleShuffle}>
          Shuffle
        </button>
        <p
          style={{
            fontSize: 18,
            fontStyle: "italic",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          Click on the graph to show the correlation
        </p>
      </div>

      <div
        style={{
          height: 500,
          marginTop: 50,
        }}
        onClick={() => setShowLine(true)}
      >
        <ResponsiveScatterplot
          data={data}
          MARGIN={MARGIN}
          showLine={showLine}
        />
      </div>
    </div>
  );
}


export default App

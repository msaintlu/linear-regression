import { linear, curve, badRepartition, outlier } from './data';
import { useState } from 'react';
import { ResponsiveScatterplot } from './vizcomponents/Scatterplot';

const MARGIN = { top: 15, right: 50, bottom: 70, left: 92 };
const width = 1000;

function App() {

  const [data, setData] = useState(linear);

  return (
    <>
      <div>
        <p
          style={{
            fontWeight: "bolder",
            fontSize: 26,
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          Where would you draw the line?
        </p>
        <div
          style={{
            width: { width },
            height: "1px",
            backgroundColor: "black",
            marginTop: -10,
          }}
        />
      </div>

      <div style={{ padding: 16 }}>

        <button onClick={() => setData(linear)}>
          Linear
        </button>

        <ResponsiveScatterplot data={data} MARGIN={MARGIN} />
      </div>

      <div>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: 0 }}>
          Blablabla.
        </p>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: -20 }} >
          Blabla.
        </p>
      </div>
    </>
  );
}


export default App

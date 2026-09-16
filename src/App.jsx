const width = 1000;

function App() {
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
          Life expectancy drops for countries with lower GDP per capita
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
      <div>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: 0 }}>
          Each bubble is a country. Bubble size proportional to population.
        </p>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: -20 }} >
          Source: Gapminder.
        </p>
      </div>
    </>
  );
}


export default App

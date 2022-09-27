
function App() {
  //const url ="https://api.openweathermap.org/data/2.5/weather?lat=32.76876910387183&lon=-97.06689230629766&appid=0f86c0f97f4a62686b4859344ba72ac1";

  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Dallas</p>
          </div>
          <div className="temp">
            <h1>65 F</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
        <div className="feels"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

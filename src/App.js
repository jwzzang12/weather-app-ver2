import "./App.css";
import { useState, useEffect } from "react";
import useGeoLocation from "./hooks/useGeolocation";
import axios from "axios";

function App() {
  const location = useGeoLocation();
  const lat = JSON.stringify(location.coordinates.lat);
  const lon = JSON.stringify(location.coordinates.lon);
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`).then((res) => {
      console.log(res.data);
    });
  });
/* if lat && lon === city.list[4].value 
Return city.list[1].value */
  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{}</p>
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

import "./App.css";
import "./css/layout.css";
import { useState, useEffect } from "react";
import useGeoLocation from "./hooks/useGeolocation";
import axios from "axios";
import Moment from "react-moment";
import { clear } from "@testing-library/user-event/dist/clear";

function App() {
  const location = useGeoLocation();
  const lat = JSON.stringify(location.coordinates.lat);
  const lon = JSON.stringify(location.coordinates.lon);
  const [name, setName] = useState([]);
  const [sky, setSky] = useState([]);
  const [icon, setIcon] = useState([]);
  const [temp, setTemp] = useState([]);
  const today = new Date();

  let bg = "";
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`).then((res) => {
      setName(res.data.name);
      setSky(res.data.weather[0].main);
      setIcon(res.data.weather[0].icon);
      setTemp(res.data.main.temp);


      console.log(res.data);

      function backGround() {
        if (res.data.weather[0].id < 250) {
          return (bg = "url('../images/thunder.jpg')");
        } else if (res.data.weather[0].id < 350) {
          return (bg = "url('../images/drizzle.jpg')");
        } else if (res.data.weather[0].id < 550) {
          return (bg = "url('../images/rain.jpg')");
        } else if (res.data.weather[0].id < 650) {
          return (bg = "url('../images/snow.jpg')");
        } else if (res.data.weather[0].id < 790) {
          return (bg = "url('../images/atmosphere.jpg')");
        } else if (res.data.weather[0].id === 800) {
          return (bg = "url('../images/clear.jpg')");
        } else {
          return (bg = "url('../images/clouds.jpg')");
        }
      }
      backGround();
      document.getElementById("1").style.backgroundImage = bg;
    });
  });

  return (
    <div className="App">
      <div className="container" id="1">
        <div className="top">
          <div className="location">
            <p>
              <span className="material-icons">place</span>
              {name}
            </p>
          </div>
          <div className="date">
            <Moment format="MMM DD, ddd">{today}</Moment>
          </div>
          <div className="icon">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
          </div>
          <div className="sky">
            <p>{sky}</p>
          </div>
          <div className="temp">
            <h1>{Math.round(1.8 * (temp - 273) + 32)}</h1>
            <span></span>
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

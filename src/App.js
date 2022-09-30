import "./App.css";
import "./css/layout.css";
import "../public/images"
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

  function backGroun (){
    if (res.data.weather[0].id <232 ){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/thunder.jpg)";
    } else if (res.data.weather[0].id >232){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/drizzle.jpg)";
    } else if (res.data.weather[0].id >321){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/rain.jpg)";
    } else if (res.data.weather[0].id >531){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/snow.jpg)";
    }  else if (res.data.weather[0].id >622){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/atmosphere.jpg)";
    } else if (res.data.weather[0].id === 800){
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/clear.jpg)";
    } else if(res.data.weather[0].id >800) {
      return  document.getElementById('1').style.backgroundImage="url(../../public/images/clouds.jpg)";
    }
  };


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`).then((res) => {
      setName(res.data.name);
      setSky(res.data.weather[0].main);
      setIcon(res.data.weather[0].icon);
      setTemp(res.data.main.temp);
      console.log(res.data);
    });
  });

  return (
    <div className="App" id="1">
      <div className="container">
        <div className="top">
          <div className="date">
            <span>Today</span>
            <Moment format="YYYY MMM DD">{today}</Moment>
          </div>
          <div className="location">
            <p>{name}</p>
          </div>
          <div className="sky">
            <h1>{sky}</h1>
          </div>
          <div className="temp">
            <h1>{Math.round(1.8 * (temp - 273) + 32)}</h1>
          </div>
          <div className="description">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
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

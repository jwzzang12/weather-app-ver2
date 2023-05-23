import './App.css';
import './css/layout.css';
import { useState, useEffect } from 'react';
import React from 'react';
import useGeoLocation from './hooks/useGeolocation';
import axios from 'axios';
import Moment from 'react-moment';

function App() {
  const location = useGeoLocation();
  const lat = JSON.stringify(location.coordinates.lat);
  const lon = JSON.stringify(location.coordinates.lon);

  const [name, setName] = useState([]);
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [icon, setIcon] = useState('');
  const today = new Date();

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`)
      .then((res) => {
        setName(res.data.name);
        setWeather(res.data.weather[0]?.main);
        setTemp(res.data.main.temp);

        const weatherId = res.data.weather[0].id;

        if (weatherId < 250) {
          return setIcon('thunderstorm');
        } else if (weatherId < 350) {
          return setIcon('rainy_light');
        } else if (weatherId < 550) {
          return setIcon('rainy_heavy');
        } else if (weatherId < 650) {
          return setIcon('ac_unit');
        } else if (weatherId < 790) {
          return setIcon('mist');
        } else if (weatherId === 800) {
          return setIcon('sunny');
        } else {
          return setIcon('cloudy');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <div className='container'>
        {location.code === 0 && <span className='error'>{location.message}</span>}
        <div className='location'>
          <span className='material-icons'>place</span>
          {name}
        </div>
        <div className='icon'>
          <span className='material-symbols-outlined'>{icon}</span>
        </div>
        <div className='temp'>
          <span>{Math.round(temp - 273.15)}°</span>
        </div>
        <div className='weather'>
          <span>{weather}</span>
        </div>
        <div className='date'>
          <Moment format='MMM DD, ddd'>{today}</Moment>
        </div>
      </div>
    </div>
  );
}

export default App;

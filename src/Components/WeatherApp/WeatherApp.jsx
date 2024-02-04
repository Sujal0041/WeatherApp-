import React, { useState } from 'react'
import './WeatherApp.css'

import Search_icon from "../Assets/search.png";
import Clear_icon from "../Assets/clear.png";
import Cloud_icon from "../Assets/cloud.png";
import Drizzle_icon from "../Assets/drizzle.png";
import Rain_icon from "../Assets/rain.png";
import Snow_icon from '../Assets/snow.png';
import Wind_icon from '../Assets/wind.png';
import Humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
    let api_key = "f1c923e86431b6d6cef6aa81fc694192";
    const [wicon, setWicon] = useState(Cloud_icon);
    const search = async () =>{
      try {
        const element = document.getElementsByClassName('city-input');
        if(element[0].value === "")
        {
            alert("Please Enter City Name");
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-Location');

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temperature[0].innerHTML = data.main.temp+" °C";
        location[0].innerHTML = data.name;

        console.log(data.weather[0].icon);


        if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
          setWicon(Clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(Cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(Drizzle_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(Snow_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(Rain_icon);
        }
        else
        {
            setWicon(Clear_icon);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Error fetching weather data. Please try again.");
    }
    }
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className ='city-input' placeholder='Search Location' />
            <div className='search-icon' onClick={search}>
                <img src={Search_icon} alt="" />
            </div>
        </div>
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-Location'>London</div>
      <div className='data-container'>

      <div className='element'>
          <img src={Humidity_icon} alt="" className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
            </div>
        </div>

        <div className='element'>
          <img src={Wind_icon} alt="" className='icon'/>
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
            </div>
        </div>

        
    </div>

    <div className='days'>
            <h1 style={{color:"white"}}>16 Days</h1>
            <div className='weather-temp1'>24°C</div>

        </div>

        <div className='month'>
            <h1 style={{color:"white"}}>30 Days</h1>
            <div className='weather-temp1'>24°C</div>

        </div>
    </div>
  )
}
export default WeatherApp

import React, {useState} from 'react'
import './WeatherApp.css'

import search_icon from '../Components/assets/search.png'
import clear_icon from '../Components/assets/clear.png'
import cloud_icon from '../Components/assets/cloud.png'
import drizzle_icon from '../Components/assets/drizzle.png'
import humidity_icon from '../Components/assets/humidity.png'
import rain_icon from '../Components/assets/rain.png'
import snow_icon from '../Components/assets/snow.png'
import wind_icon from '../Components/assets/wind.png'


const WeatherApp = () => {
    const weatherIconMap = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': drizzle_icon,
        '03n': drizzle_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    };


    let api_key = "e8c59bee62f607752a7f6bf013948237";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humiditypercent");
        const wind = document.getElementsByClassName("windrate")
        const temperature = document.getElementsByClassName("weathertemp");
        const location = document.getElementsByClassName("weatherlocation");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
        location[0].innerHTML = data.name

        const icon = data.weather[0].icon || clear_icon;
        setWicon(weatherIconMap[icon]);
    }

    return (
        <div className="container">
            <div className='topbar'>
                <input type="text" className='cityInput' placeholder='Search'/>

                <div className='searchicon' onClick={() => {
                    search()
                }}>
                    <img src={search_icon} alt=""></img>
                </div>
            </div>
            <div className='weatherimage'>
                <img src={wicon}/>
            </div>
            <div className='weathertemp'> 24°c</div>
            <div className='weatherlocation'>London</div>
            <div className='datacontainer'>
                <div className='element'>
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='humiditypercent'> 64%</div>
                        <div className='text'>Humidity</div>
                    </div>

                </div>

                <div className='element'>
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='windrate'>18 kmph</div>
                        <div className='text'>Wind Speed</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeatherApp

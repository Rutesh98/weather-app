import React, { useState } from 'react'
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

let api_key = "e8c59bee62f607752a7f6bf013948237";

const[wicon,setWicon]= useState(cloud_icon);

const search = async () =>{
   const element= document.getElementsByClassName("cityInput");
    if(element[0].value===""){
        return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humiditypercent");
    const wind = document.getElementsByClassName("windrate")
    const temperature = document.getElementsByClassName("weathertemp");
    const location = document.getElementsByClassName("weatherlocation");

    humidity[0].innerHTML=data.main.humidity+" %";
    wind[0].innerHTML=Math.floor(data.wind.speed)+" km/h";
    temperature[0].innerHTML=Math.floor(data.main.temp)+" °c";
    location[0].innerHTML=data.name

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"  ){
        setWicon(clear_icon);
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"  ){
        setWicon(cloud_icon);

    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"  ){
        setWicon(drizzle_icon);

    }else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"  ){
        setWicon(drizzle_icon);

    }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"  ){
        setWicon( rain_icon);

    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"  ){
        setWicon( rain_icon);

    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"  ){
        setWicon( snow_icon);

    }
    else{
        setWicon(clear_icon);
    }
}

return (
        <div className="container">
            <div className='topbar'>
                <input type="text" className='cityInput' placeholder='Search' />

                <div className='searchicon' onClick={()=>{search()}} >
                    <img src={search_icon} alt=""></img>
                </div>
            </div>
            <div className='weatherimage'>
                <img src={wicon} />
            </div>
            <div className='weathertemp'> 24°c </div>
            <div className='weatherlocation'>London</div>
            <div className='datacontainer'>
                <div className='element'>
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className='data'>
                        <div className='humiditypercent' > 64%</div>
                        <div className='text'>Humidity </div>
                    </div>

                </div>

                <div className='element'>
                    <img src={wind_icon} alt="" className='icon' />
                    <div className='data'>
                        <div className='windrate' >18 kmph </div>
                        <div className='text'>Wind Speed </div>
                    </div>

                </div>
            </div>
        </div>
            )
}

            export default WeatherApp

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './WeatherCall.css';


const getWeatherData = async (zipcode) => {
    // get from .env file
    // const apiKey = process.env.TOMORROW_API_KEY; // add TOMORROW_API_KEY = "a8SsXaAesUPGnWdCWK1IvTwtmJLvNXRY" to .env file for testing
    const apiKey = "a8SsXaAesUPGnWdCWK1IvTwtmJLvNXRY";
    const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${zipcode}&fields=temperature,weatherCode&timesteps=1h&units=imperial&apikey=${apiKey}`);
    const temperature = response.data.data.timelines[0].intervals[0].values.temperature;
    const weatherCode = response.data.data.timelines[0].intervals[0].values.weatherCode;
    return { temperature, weatherCode };
};

const weatherCodeToString = (code) => {
    switch (code) {
        case 0: return 'Unknown';
        case 1000: return 'Clear';
        case 1001: return 'Cloudy';
        case 1100: return 'Mostly Clear';
        case 1101: return 'Partly Cloudy';
        case 1102: return 'Mostly Cloudy';
        case 2000: return 'Fog';
        case 2100: return 'Light Fog';
        case 3000: return 'Light Wind';
        case 3001: return 'Wind';
        case 3002: return 'Strong Wind';
        case 4000: return 'Drizzle';
        case 4001: return 'Rain';
        case 4200: return 'Light Rain';
        case 4201: return 'Heavy Rain';
        case 5000: return 'Snow';
        case 5001: return 'Flurries';
        case 5100: return 'Light Snow';
        case 5101: return 'Heavy Snow';
        case 6000: return 'Freezing Drizzle';
        case 6001: return 'Freezing Rain';
        case 6200: return 'Light Freezing Rain';
        case 6201: return 'Heavy Freezing Rain';
        case 7000: return 'Ice Pellets';
        case 7101: return 'Heavy Ice Pellets';
        case 7102: return 'Light Ice Pellets';
        case 8000: return 'Thunderstorm';
        default: return 'Unknown';
    }
};

const getIconUrl = (code) => {
    const iconMap = {
        1000: '01d.png',
        1001: '04d.png',
        1100: '02d.png',
        1101: '03d.png',
        1102: '04d.png',
        2000: '50d.png',
        2100: '50d.png',
        4000: '09d.png', 
        4001: '10d.png', 
        4200: '09d.png', 
        4201: '10d.png', 
        5000: '13d.png', 
        5001: '13d.png', 
        5100: '13d.png', 
        5101: '13d.png', 
        6000: '13d.png', 
        6001: '13d.png', 
        6200: '13d.png', 
        6201: '13d.png', 
        7000: '13d.png', 
        7101: '13d.png', 
        7102: '13d.png', 
        8000: '11d.png', 
    };
  
    const iconPrefix = '/weather-icons/';
    const iconName = iconMap[code];
    const iconPath = `${iconPrefix}${iconName}`; 
  
    return iconName ? iconPath : `${iconPrefix}default.png`; // default icon if none is matched
  };  

const WeatherCall = () => {
  const [weatherData, setWeatherData] = useState(null);
  const zipcode = '77840 US';

  useEffect(() => {
      getWeatherData(zipcode).then(data => setWeatherData(data));
  }, []);

  return (
    weatherData && 
    <Card className="weatherWidget">
        <CardContent>
            <img 
                className="icon"
                src={getIconUrl(weatherData.weatherCode)} 
                alt="weather icon" 
            />
            <Typography variant="h5" component="h2" className="temperature">
                {Math.round(weatherData.temperature)}°F
            </Typography>
            <Typography color="textSecondary" className="condition">
                {weatherCodeToString(weatherData.weatherCode)}
            </Typography>
        </CardContent>
    </Card>
);
};

export default WeatherCall;

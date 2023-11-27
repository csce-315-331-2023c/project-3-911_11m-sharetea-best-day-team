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
  // Mapping of weatherCode to OpenWeatherMap icons
  const iconMap = {
    1000: '01d', // Clear sky
    1001: '04d', // Cloudy
    1100: '02d', // Mostly Clear
    1101: '03d', // Partly Cloudy
    1102: '04d', // Mostly Cloudy (Assumed to be similar to 'Cloudy')
    2000: '50d', // Fog (Assumed to be similar to 'Mist')
    2100: '50d', // Light Fog (Assumed to be similar to 'Mist')
    // ... add other mappings based on the weather conditions
    3000: 'n/a', // Light Wind (No direct icon, might not need one)
    3001: 'n/a', // Wind (No direct icon, might not need one)
    3002: 'n/a', // Strong Wind (No direct icon, might not need one)
    4000: '09d', // Drizzle (Assumed to be similar to 'Shower Rain')
    4001: '10d', // Rain
    4200: '09d', // Light Rain (Assumed to be similar to 'Shower Rain')
    4201: '10d', // Heavy Rain
    5000: '13d', // Snow
    5001: '13d', // Flurries (Assumed to be similar to 'Snow')
    5100: '13d', // Light Snow
    5101: '13d', // Heavy Snow
    6000: '13d', // Freezing Drizzle (Assumed to be similar to 'Snow')
    6001: '13d', // Freezing Rain (Assumed to be similar to 'Snow')
    6200: '13d', // Light Freezing Rain (Assumed to be similar to 'Snow')
    6201: '13d', // Heavy Freezing Rain (Assumed to be similar to 'Snow')
    7000: '13d', // Ice Pellets (Assumed to be similar to 'Snow')
    7101: '13d', // Heavy Ice Pellets (Assumed to be similar to 'Snow')
    7102: '13d', // Light Ice Pellets (Assumed to be similar to 'Snow')
    8000: '11d', // Thunderstorm
  };

  const iconPrefix = 'http://openweathermap.org/img/wn/'; // base URL for icons
  const iconName = iconMap[code];
  const iconUrl = `${iconPrefix}${iconName}@2x.png`; // assuming you want the 2x size

  return iconName ? iconUrl : `${iconPrefix}01d@2x.png`; // default icon if none is matched
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const WeatherCall = () => {
    const [weatherData, setWeatherData] = useState(null);
    const zipcode = '77840 US';

    useEffect(() => {
        getWeatherData(zipcode).then(data => setWeatherData(data));
    }, []);

    return (
        weatherData && <div className='weather-data'>Temperature: {weatherData.temperature}°F, Condition: {weatherCodeToString(weatherData.weatherCode)}</div>
    )
};

export default WeatherCall;

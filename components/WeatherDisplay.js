import React from 'react';
import styles from '../styles/WeatherDisplay.module.css';

const WeatherDisplay = ({ weather, forecast }) => {
    const forecastItems = forecast ? forecast.list.slice(0, 5).map((item, index) => (
        <div key={index} className={styles.forecastItem}>
            <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
            <p>{item.main.temp}°</p>
            <p>{item.weather[0].description}</p>
        </div>
    )) : null;

    return (
        <div className={styles.weatherDisplay}>
            <h2>Current Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp}°</p>
            <p>Weather: {weather.weather[0].description}</p>
            <div className={styles.forecast}>
                <h3>5-Day Forecast</h3>
                <div className={styles.forecastContainer}>
                    {forecastItems}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;

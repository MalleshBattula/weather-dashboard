import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import WeatherDisplay from '../components/WeatherDisplay';
import Favorites from '../components/Favorites';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

    useEffect(() => {
        const savedCity = localStorage.getItem('lastCity');
        if (savedCity) {
            fetchWeather(savedCity);
        }
        // Fetch favorite cities from JSON server
        axios.get('http://localhost:3001/favorites')
            .then(response => setFavorites(response.data))
            .catch(error => console.error(error));
    }, []);

    const fetchWeather = async (cityName) => {
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`);
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${unit}`);
            setWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            setCity(cityName);
            localStorage.setItem('lastCity', cityName);
        } catch (error) {
            console.error('Error fetching the weather data', error);
        }
    };

    const addFavorite = async (cityName) => {
        try {
            const response = await axios.post('http://localhost:3001/favorites', { name: cityName });
            setFavorites([...favorites, response.data]);
        } catch (error) {
            console.error('Error adding favorite city', error);
        }
    };

    const removeFavorite = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/favorites/${id}`);
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (error) {
            console.error('Error removing favorite city', error);
        }
    };

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div className={styles.container}>
            <h1 style={{marginTop:10}}>Weather Dashboard</h1>
            <button onClick={toggleUnit}>Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</button>
            <Search fetchWeather={fetchWeather} />
            {weather && <WeatherDisplay weather={weather} forecast={forecast} />}
            <Favorites favorites={favorites} fetchWeather={fetchWeather} addFavorite={addFavorite} removeFavorite={removeFavorite} setFavorites={setFavorites} />
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Favorites.module.css';

const Favorites = ({ favorites, fetchWeather, setFavorites }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const handleAddFavorite = async () => {
        if (!input) {
            setError('City name cannot be empty');
            return;
        }

        if (favorites.some(fav => fav.name.toLowerCase() === input.toLowerCase())) {
            setError('City is already in favorites');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/favorites', { name: input });
            setFavorites([...favorites, response.data]);
            setInput('');
            setError('');
        } catch (error) {
            console.error('Error adding favorite city', error);
        }
    };

    const handleRemoveFavorite = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/favorites/${id}`);
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (error) {
            console.error('Error removing favorite city', error);
        }
    };

    return (
        <div className={styles.favorites}>
            <h2>Favorite Cities</h2>
            
            <ul>
                {favorites.map((fav, index) => (
                    <li key={index}>
                        <span onClick={() => fetchWeather(fav.name)}>{fav.name}</span>
                        <button onClick={() => handleRemoveFavorite(fav.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add favorite city"
            />
            <button onClick={handleAddFavorite}>Add</button>
            {error && <p className={styles.error} style={{color:'red'}}>{error}</p>}
        </div>
    );
};

export default Favorites;

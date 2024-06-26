import React, { useState } from 'react';
import styles from '../styles/Search.module.css';

const Search = ({ fetchWeather }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input) {
            fetchWeather(input);
        }
    };

    return (
        <div className={styles.search}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;

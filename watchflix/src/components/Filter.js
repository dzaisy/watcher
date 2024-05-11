// Filter.js
import React, { useState, useEffect } from 'react';


function Filter({ onFilter, setMovies, setFilteredMovies, setSeries, setFilteredSeries }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilter(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        // Handle error (e.g., show a message to the user)
      });

    fetch('http://localhost:3000/series')
      .then(response => response.json())
      .then(data => {
        setSeries(data);
        setFilteredSeries(data);
      })
      .catch(error => {
        console.error('Error fetching series:', error);
        // Handle error (e.g., show a message to the user)
      });
  }, [setMovies, setFilteredMovies, setSeries, setFilteredSeries]); // Include all dependencies here

  return (
    <div className="filter">
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
        <option value="crime">Crime</option>
        {/* Add more genre options as needed */}
      </select>
    </div>
  );
}

export default Filter;



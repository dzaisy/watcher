import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);

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
  }, []);

  const handleSearchInputChange = (query) => {
    // Filter movies based on search query
    const filteredMovies = movies.filter(movie =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );

    // Filter series based on search query
    const filteredSeries = series.filter(serie =>
      serie.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMovies(filteredMovies);
    setFilteredSeries(filteredSeries);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">Watchflix</div>
          <SearchBar onSearch={handleSearchInputChange} />
          <div className="login">Login</div>
          <div className="filter">Filter</div>
          <div className="profile">Profile</div>
          <div className="watchlist">Watchlist</div>
        </nav>
      </header>
      <div className="content">
        <div className="grid-container">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="card">
              <img src={movie.image} alt={movie.name} />
              <div className="card-info">
                <h2>{movie.name}</h2>
                <p className="genre">{movie.genre}</p>
                <p>{movie.description}</p>
                <div className="card-button">
                  <button className="like-btn">♡</button>
                  <button className="wtchl-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-container">
          {filteredSeries.map(serie => (
            <div key={serie.id} className="card">
              <img src={serie.image} alt={serie.name} />
              <div className="card-info">
                <h2>{serie.name}</h2>
                <p className="genre">{serie.genre}</p>
                <p>{serie.description}</p>
                <div className="card-button">
                  <button className="like-btn">♡</button>
                  <button className="wtchl-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
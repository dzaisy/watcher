// App.js
import React, { useState, useEffect } from 'react';

import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter"; // Import the Filter component
import "./App.css"; // Import your CSS file

import Authentication from './components/Authentication';
import Display from './components/Display';
import SearchBar from './components/SearchBar';


function App() {
  const [showAuthentication, setShowAuthentication] = useState(false);
  const [movies, setMovies] = useState([]); 
  const [series, setSeries] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedSeries, setLikedSeries] = useState([]);
  const [renderLiked, setRenderLiked] = useState(false);
  const [seriesWatchlist, setSeriesWatchlist] = useState([]);
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [renderWatchlist, setRenderWatchlist] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => setMovies(data));

    fetch('http://localhost:3000/series')
      .then(response => response.json())
      .then(data => setSeries(data));

      const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies'));
      if (storedLikedMovies) {
        setLikedMovies(storedLikedMovies);
      }

      const storedLikedSeries = JSON.parse(localStorage.getItem('likedSeries'));
      if (storedLikedSeries) {
        setLikedSeries(storedLikedSeries);
      }

      const storedMovieWatchlist = JSON.parse(localStorage.getItem('moviewatchlist'));
      if (storedMovieWatchlist) {
        setMovieWatchlist(storedMovieWatchlist);
      }

      const storedSeriesWatchlist = JSON.parse(localStorage.getItem('series'));
      if (storedSeriesWatchlist) {
        setLikedSeries(storedSeriesWatchlist);
      }
  }, []);

  function handleMovieLike(id) {
    const updatedLikedMovies = likedMovies.includes(id)
      ? likedMovies.filter(movieId => movieId !== id) // checks to see if id of the item is already liked
      : [...likedMovies, id]; // toggoling the status
    setLikedMovies(updatedLikedMovies); // reflects new array
    localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies)); // saves to localStorage
  }

  function handleSeriesLike(id) {
    const updatedLikedSeries = likedSeries.includes(id)
      ? likedSeries.filter(seriesId => seriesId !== id)
      : [...likedSeries, id];
    setLikedSeries(updatedLikedSeries);
    localStorage.setItem('likedSeries', JSON.stringify(updatedLikedSeries)); 
  }

  function handleSeriesWatchlist(id) {
    const updatedSeriesWatchlist = seriesWatchlist.includes(id)
      ? seriesWatchlist.filter(seriesId => seriesId !== id)
      : [...seriesWatchlist, id];
    setSeriesWatchlist(updatedSeriesWatchlist);
    localStorage.setItem('serieswatchlist', JSON.stringify(updatedSeriesWatchlist)); 
  }

  function handleMovieWatchlist(id) {
    const updatedMovieWatchlist = movieWatchlist.includes(id)
      ? movieWatchlist.filter(movieId => movieId !== id) 
      : [...movieWatchlist, id];
    setMovieWatchlist(updatedMovieWatchlist); 
    localStorage.setItem('moviewatchlist', JSON.stringify(updatedMovieWatchlist)); 
  }

  function handleLikeClick() {
    setRenderLiked(!renderLiked) // allows us to toggle btwn t & f
  }

  function handleWatchlistClick() {
    setRenderWatchlist(!renderWatchlist)
  }

  function handleSearch(query) {
    setSearchQuery(query);
    // Filter movies based on search query
    const filteredMovies = movies.filter(movie =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
    
    // Filter series based on search query
    const filteredSeries = series.filter(serie =>
      serie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSeries(filteredSeries);
  };


  const handleGenreFilterChange = (genre) => {
    // Filter movies based on selected genre
    const filteredMovies = genre === ''
      ? movies
      : movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());

    // Filter series based on selected genre
    const filteredSeries = genre === ''
      ? series
      : series.filter(serie => serie.genre.toLowerCase() === genre.toLowerCase());

    setFilteredMovies(filteredMovies);
    setFilteredSeries(filteredSeries);

  const handleWatchflixClick = () => {
    setSearchQuery(''); // Reset the search query

  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">

          <div className="logo">Watchflix</div>
          <SearchBar onSearch={handleSearchInputChange} />
          <div className="login">Login</div>
          <Filter onFilter={handleGenreFilterChange} /> {/* Add the Filter component */}
          <div className="profile">Profile</div>
          <div className="watchlist">Watchlist</div>

      
          <div className="logo" onClick={handleWatchflixClick}>Watchflix</div>
          <SearchBar handleSearch={handleSearch} />
          <button className="filter">Filter</button>
          <button className="login" onClick={() => setShowAuthentication(true)}>Login</button>
          <button className="likes" onClick={handleLikeClick}>♥</button>
          <button className="watchlist" onClick={handleWatchlistClick}>Watchlist</button>


        </nav>
      </header>
      <Display
        movies={searchQuery ? filteredMovies : movies}
        series={searchQuery ? filteredSeries : series}
        likedMovies={likedMovies}
        likedSeries={likedSeries}
        movieWatchlist={movieWatchlist}
        seriesWatchlist={seriesWatchlist}
        renderLiked={renderLiked}
        renderWatchlist={renderWatchlist}
        handleMovieLike={handleMovieLike}
        handleSeriesLike={handleSeriesLike}
        handleMovieWatchlist={handleMovieWatchlist}
        handleSeriesWatchlist={handleSeriesWatchlist}
      />
      {showAuthentication && <Authentication onClose={() => setShowAuthentication(false)} />}
    </div>
  );
}

export default App;



// onClick={() => handleMovieLike(movie.id)} => sets up onclick and ensures that when btn is clicked function is called with the movie id. manages a/r from likes
// style={{color: likedMovies.includes(movie.id) ? 'red' : 'white'}} sets btn style


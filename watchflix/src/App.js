import './App.css';
import React, { useState, useEffect } from 'react';

import SearchBar from "./components/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);

import Authentication from './components/Authentication';
import Display from './components/Display';

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
  const [trailerLink, setTrailerLink] = useState([])


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

  function handleTrailerClick(link) {
    setTrailerLink(link);
  }



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

          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="button">Search</button>
          </div>

          <button className="login" onClick={() => setShowAuthentication(true)}>Login</button>
          <button className="filter">Filter</button>
          <button className="likes" onClick={handleLikeClick}>♥</button>
          <button className="watchlist" onClick={handleWatchlistClick}>Watchlist</button>

        </nav>
      </header>
      <Display
        movies={movies}
        series={series}
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
        handleTrailerClick={handleTrailerClick}
      />
      {showAuthentication && <Authentication onClose={() => setShowAuthentication(false)} />}

    </div>
  );
}


export default App;

export default App;


// onClick={() => handleMovieLike(movie.id)} => sets up onclick and ensures that when btn is clicked function is called with the movie id. manages a/r from likes
// style={{color: likedMovies.includes(movie.id) ? 'red' : 'white'}} sets btn style 


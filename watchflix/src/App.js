import './App.css';
import React, { useState, useEffect } from 'react';
import Authentication from './components/Authentication';
import Like from './components/Like';
import WatchList from './components/WatchList';

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

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
      
          <div className="logo">Watchflix</div>
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
      <div className="content">
        {renderLiked && (
          <Like 
            likedMovies={likedMovies}
            likedSeries={likedSeries}
            handleMovieLike={handleMovieLike}
            handleSeriesLike={handleSeriesLike}
          />
        )}
        {renderWatchlist && (
          <WatchList 
            movieWatchlist={movieWatchlist}
            seriesWatchlist={seriesWatchlist}
            handleMovieWatchlist={handleMovieWatchlist}
            handleSeriesWatchlist={handleSeriesWatchlist}
          />
        )}
        <div className="grid-container">
          {movies.map(movie => (
            <div key={movie.id} className="card">
              <img src={movie.image} alt={movie.name} />
              <div className="card-info">
                <h2>{movie.name}</h2>
                <p className="genre">{movie.genre}</p>
                <p>{movie.description}</p>
                <div className="card-button">
                  <button className="like-btn" onClick={() => handleMovieLike(movie.id)} style={{color: likedMovies.includes(movie.id) ? 'red' : 'white'}}>♥</button>
                  <button className="wtchl-btn" onClick={() => handleMovieWatchlist(movie.id)} style={{color: movieWatchlist.includes(movie.id) ? 'red' : 'white'}}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-container">
          {series.map(serie => (
            <div key={serie.id} className="card">
              <img src={serie.image} alt={serie.name} />
              <div className="card-info">
                <h2>{serie.name}</h2>
                <p className="genre">{serie.genre}</p>
                <p>{serie.description}</p>
                <div className="card-button">
                  <button className="like-btn" onClick={() => handleSeriesLike(serie.id)} style={{color: likedSeries.includes(serie.id) ? 'red' : 'white'}}>♥</button>  
                  <button className="wtchl-btn" onClick={() => handleSeriesWatchlist(serie.id)} style={{color: seriesWatchlist.includes(serie.id) ? 'red' : 'white'}}>+</button>        
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAuthentication && <Authentication onClose={() => setShowAuthentication(false)} />}
    </div>
  );
}

export default App;



// onClick={() => handleMovieLike(movie.id)} => sets up onclick and ensures that when btn is clicked function is called with the movie id. manages a/r from likes
// style={{color: likedMovies.includes(movie.id) ? 'red' : 'white'}} sets btn style 



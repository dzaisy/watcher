import './App.css';
import React, {useState, useEffect} from 'react';
import Watchlist from './components/WatchList';

function App() {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => setMovies(data));

    fetch('http://localhost:3000/series')
      .then(response => response.json())
      .then(data => setSeries(data));
  }, []);
  const addToWatchlist = (item) => {
   
    if (!watchlist.some(watchlistItem => watchlistItem.id === item.id)) {
      setWatchlist(prevWatchlist => [...prevWatchlist, item]);
    }
  };

  const removeFromWatchlist = (itemId) => {
   
    setWatchlist(prevWatchlist => prevWatchlist.filter(item => item.id !== itemId));
  };


  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">Watchflix</div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
          <div className="filter">Filter</div>
          <div className="profile">Profile</div>
          <div className="watchlist">Watchlist</div>
        </nav>
      </header>
      <div className="content">
        <div className="grid-container">
          {movies.map(movie => (
            <div key={movie.id} className="card">
              <img src={movie.image} alt={movie.name} />
              <div className="card-info">
                <h2>{movie.name}</h2>
                <p className="genre">{movie.genre}</p>
                <p>{movie.description}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />


    </div>

  );
}

export default App;


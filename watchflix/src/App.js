import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Collection from './components/Collection';

function App() {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3000/movies')
    .then(res => {
      setMovies(res.data.movies)
    })
    .catch(error => {
      console.error('error fetching data', error)
    })
  }, []);

  useEffect(() => {
    axios
    .get('http://localhost:3000/series')
    .then(res => {
      setSeries(res.data.series)
    })
    .catch(error => {
      console.error('error fetching data', error)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">Watchflix</div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
          <div className="profile">Profile</div>
          <div className="filter">Filter</div>
        </nav>
      </header>
      <Collection movies={movies} series={series} />
    </div>
  );
}

export default App;


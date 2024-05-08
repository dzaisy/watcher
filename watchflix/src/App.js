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
        <h1>watchflix</h1>
      </header>
      <Collection movies={movies} series={series}/>
    </div>
  );
}

export default App;


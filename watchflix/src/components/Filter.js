import './Filter.css';
import React, {useState} from 'react';

function Filter({ onFilter}) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="filter">
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
        <option value="crime">Crime</option>
        <option value="biography">Biography</option>
        <option value="history">History</option>
        <option value="sport">Sport</option>
        <option value="thriller">Thriller</option>
        <option value="documentary">Documentary</option>
        <option value="sci-fi">Sci-Fi</option>
      </select>
    </div>
  );
}

export default Filter;


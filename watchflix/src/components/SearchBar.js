// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
         <input type="text" placeholder="Search..." value={query} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;


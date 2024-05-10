

import React from 'react';

function WatchList(props) {
  const { movieWatchlist, seriesWatchlist, handleMovieWatchlist, handleSeriesWatchlist } = props;
  
  return (
    <div className="watchlist-container">
      <div className="watchlist" >
        <div className="watchlist-dropdown">
          <h2>Watchlist</h2>
          <ul>
            {movieWatchlist.map(name => (
              <li key={name}>
                Movie ID: {name}{''}
                <button onClick={() => handleMovieWatchlist(name)}>x</button>
              </li>
            ))}
          </ul>
          <ul>
            {seriesWatchlist.map(name => (
              <li key={name}>
                Series ID: {name}{''}
                <button onClick={() => handleSeriesWatchlist(name)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}
export default WatchList;


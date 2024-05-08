
import React from 'react';

function Watchlist({ watchlist, removeFromWatchlist }) {
  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      <ul>
       
        {watchlist.map((item) => (
          <li key={item.id}>
            
            <h3>{item.name}</h3>
            <p className="genre">{item.genre}</p>
            <p>{item.description}</p>
           
            <button onClick={() => removeFromWatchlist(item.id)}>Remove from Watchlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;



